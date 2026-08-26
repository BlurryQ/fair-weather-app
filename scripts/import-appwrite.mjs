/**
 * Imports ./migration-data/ into Appwrite.
 *
 *   - users        : createBcryptUser (Supabase bcrypt hash imported as-is),
 *                    email marked verified where email_confirmed_at was set
 *   - settings     : one document per user, $id == Supabase user id
 *   - images       : bucket file + `images` document per file
 *
 * Env: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY
 * Optional: APPWRITE_DATABASE_ID (default "main"), APPWRITE_BUCKET_ID (default "images")
 *
 *   node scripts/import-appwrite.mjs [--dry-run] [--skip-users] [--skip-settings] [--skip-images]
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import {
  Client,
  Users,
  Databases,
  Storage,
  ID,
  Permission,
  Role,
} from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';

const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry-run');

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID = 'main',
  APPWRITE_BUCKET_ID = 'images',
} = process.env;

if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY) {
  console.error(
    'Missing APPWRITE_ENDPOINT / APPWRITE_PROJECT_ID / APPWRITE_API_KEY'
  );
  process.exit(1);
}

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);

const users = new Users(client);
const databases = new Databases(client);
const storage = new Storage(client);
const DB = APPWRITE_DATABASE_ID;
const DATA = path.resolve('migration-data');

const readJson = async (name) =>
  JSON.parse(await readFile(path.join(DATA, name), 'utf8'));

const toBool = (v) =>
  v === true || v === 1 || v === '1' || v === 't' || v === 'true';
const toInt = (v) => (v === null || v === undefined ? undefined : Number(v));

const ownerPerms = (uid) => [
  Permission.read(Role.user(uid)),
  Permission.update(Role.user(uid)),
  Permission.delete(Role.user(uid)),
];

const skip409 = (err, label) => {
  if (err?.code === 409) {
    console.log(`  skip (exists): ${label}`);
    return;
  }
  console.error(`  FAIL ${label}: ${err?.message || err}`);
};

async function importUsers() {
  const rows = await readJson('users.json');
  console.log(`\nusers (${rows.length})`);
  for (const u of rows) {
    if (!u.encrypted_password) {
      console.log(`  skip (no password hash): ${u.email}`);
      continue;
    }
    if (DRY) {
      console.log(
        `  would create ${u.email} (${u.id})${u.email_confirmed_at ? ' [verified]' : ''}`
      );
      continue;
    }
    try {
      await users.createBcryptUser(u.id, u.email, u.encrypted_password);
      if (u.email_confirmed_at) {
        await users.updateEmailVerification(u.id, true);
      }
      console.log(`  ok ${u.email}`);
    } catch (err) {
      skip409(err, u.email);
    }
  }
}

async function importSettings() {
  const core = await readJson('core_settings.json');
  console.log(`\ncore_settings (${core.length})`);
  for (const r of core) {
    const data = {
      first_hour: toInt(r.first_hour),
      last_hour: toInt(r.last_hour),
      is_celsius: toBool(r.is_celsius),
      is_miles: toBool(r.is_miles),
    };
    if (DRY) {
      console.log(`  would set core_settings/${r.id}`);
      continue;
    }
    try {
      await databases.createDocument(
        DB,
        'core_settings',
        r.id,
        data,
        ownerPerms(r.id)
      );
      console.log(`  ok core_settings/${r.id}`);
    } catch (err) {
      skip409(err, `core_settings/${r.id}`);
    }
  }

  const image = await readJson('image_settings.json');
  console.log(`\nimage_settings (${image.length})`);
  const INT_KEYS = [
    'high_temp',
    'high_uv',
    'high_wind',
    'low_temp',
    'low_visability',
    'low_wind',
    'rain_chance',
    'snow_chance',
  ];
  const BOOL_KEYS = [
    'good_day_on',
    'high_temp_on',
    'high_uv_on',
    'high_wind_on',
    'low_temp_on',
    'low_visability_on',
    'low_wind_on',
    'rain_chance_on',
    'snow_chance_on',
  ];
  for (const r of image) {
    const data = {};
    for (const k of INT_KEYS) if (r[k] !== undefined) data[k] = toInt(r[k]);
    for (const k of BOOL_KEYS) data[k] = toBool(r[k]);
    if (DRY) {
      console.log(`  would set image_settings/${r.id}`);
      continue;
    }
    try {
      await databases.createDocument(
        DB,
        'image_settings',
        r.id,
        data,
        ownerPerms(r.id)
      );
      console.log(`  ok image_settings/${r.id}`);
    } catch (err) {
      skip409(err, `image_settings/${r.id}`);
    }
  }
}

async function importImages() {
  console.log('\nimages');
  let userDirs = [];
  try {
    userDirs = await readdir(path.join(DATA, 'images'), { withFileTypes: true });
  } catch {
    console.log('  no images/ directory - nothing to do');
    return;
  }
  for (const dir of userDirs) {
    if (!dir.isDirectory()) continue;
    const userId = dir.name;
    const files = await readdir(path.join(DATA, 'images', userId));
    for (const name of files) {
      const full = path.join(DATA, 'images', userId, name);
      if (DRY) {
        console.log(`  would upload ${userId}/${name}`);
        continue;
      }
      try {
        const file = await storage.createFile(
          APPWRITE_BUCKET_ID,
          ID.unique(),
          InputFile.fromPath(full, name),
          ownerPerms(userId) // private: read/update/delete by the owner only
        );
        await databases.createDocument(
          DB,
          'images',
          ID.unique(),
          { user: userId, name, file_id: file.$id },
          ownerPerms(userId)
        );
        console.log(`  ok ${userId}/${name}`);
      } catch (err) {
        console.error(`  FAIL ${userId}/${name}: ${err?.message || err}`);
      }
    }
  }
}

async function main() {
  if (DRY) console.log('DRY RUN - no writes');
  if (!args.has('--skip-users')) await importUsers();
  if (!args.has('--skip-settings')) await importSettings();
  if (!args.has('--skip-images')) await importImages();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
