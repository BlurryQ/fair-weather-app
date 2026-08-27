/**
 * Creates the Appwrite database, collections, attributes, indexes and storage
 * bucket that the app expects. Safe to re-run: "already exists" errors are
 * ignored.
 *
 * Env: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY
 * Optional: APPWRITE_DATABASE_ID (default "main"), APPWRITE_BUCKET_ID (default "images")
 *
 *   node scripts/setup-appwrite.mjs
 */
import { Client, Databases, Storage, Permission, Role } from 'node-appwrite';

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

const databases = new Databases(client);
const storage = new Storage(client);
const DB = APPWRITE_DATABASE_ID;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ok409 = (err) => {
  if (err?.code === 409) return; // already exists - fine
  if (err?.code === 403) {
    console.error(
      `\n${err.message}\n` +
        `This is an Appwrite plan limit. Reuse an existing resource by id ` +
        `(set APPWRITE_DATABASE_ID / APPWRITE_BUCKET_ID) or free one up in the console.\n`
    );
    process.exit(1);
  }
  throw err;
};

async function ensureDatabase() {
  try {
    await databases.get(DB);
    console.log(`Database ${DB} (exists)`);
    return;
  } catch (err) {
    if (err?.code !== 404) throw err;
  }
  try {
    await databases.create(DB, 'fair-weather');
    console.log(`Database ${DB} (created)`);
  } catch (err) {
    ok409(err);
    console.log(`Database ${DB} (exists)`);
  }
}

const CORE_INT = [
  ['first_hour', 0, 23, 6],
  ['last_hour', 0, 23, 22],
];
const CORE_BOOL = [
  ['is_celsius', true],
  ['is_miles', true],
];

const IMG_INT = [
  ['high_temp', -100, 100, 17],
  ['high_uv', 0, 20, 3],
  ['high_wind', 0, 500, 35],
  ['low_temp', -100, 100, 5],
  ['low_visability', 0, 100, 2],
  ['low_wind', 0, 500, 20],
  ['rain_chance', 0, 100, 60],
  ['snow_chance', 0, 100, 60],
];
const IMG_BOOL = [
  ['good_day_on', true],
  ['high_temp_on', true],
  ['high_uv_on', true],
  ['high_wind_on', true],
  ['low_temp_on', true],
  ['low_visability_on', true],
  ['low_wind_on', true],
  ['rain_chance_on', true],
  ['snow_chance_on', true],
];

async function createCollection(id, name) {
  await databases
    .createCollection(DB, id, name, [Permission.create(Role.users())], true)
    .catch(ok409);
  console.log(`  collection ${id} ok`);
}

async function addIntAttrs(colId, defs) {
  for (const [key, min, max, def] of defs) {
    await databases
      .createIntegerAttribute(DB, colId, key, false, min, max, def)
      .catch(ok409);
  }
}

async function addBoolAttrs(colId, defs) {
  for (const [key, def] of defs) {
    await databases
      .createBooleanAttribute(DB, colId, key, false, def)
      .catch(ok409);
  }
}

async function waitForAttributes(colId) {
  for (let i = 0; i < 40; i++) {
    const col = await databases.getCollection(DB, colId);
    if (col.attributes.every((a) => a.status === 'available')) return;
    await sleep(1000);
  }
  throw new Error(`attributes for ${colId} never became available`);
}

async function main() {
  await ensureDatabase();

  console.log('core_settings');
  await createCollection('core_settings', 'Core Settings');
  await addIntAttrs('core_settings', CORE_INT);
  await addBoolAttrs('core_settings', CORE_BOOL);

  console.log('image_settings');
  await createCollection('image_settings', 'Image Settings');
  await addIntAttrs('image_settings', IMG_INT);
  await addBoolAttrs('image_settings', IMG_BOOL);

  console.log('images');
  await createCollection('images', 'Images');
  await databases
    .createStringAttribute(DB, 'images', 'user', 40, true)
    .catch(ok409);
  await databases
    .createStringAttribute(DB, 'images', 'name', 64, true)
    .catch(ok409);
  await databases
    .createStringAttribute(DB, 'images', 'file_id', 40, true)
    .catch(ok409);

  console.log('waiting for attributes to become available...');
  await waitForAttributes('core_settings');
  await waitForAttributes('image_settings');
  await waitForAttributes('images');

  await databases
    .createIndex(DB, 'images', 'by_user', 'key', ['user'])
    .catch(ok409);

  await ensureBucket();

  console.log('\nDone.');
}

async function ensureBucket() {
  const cfg = [
    'Weather Images',
    [Permission.create(Role.users())],
    true, // fileSecurity - per-file permissions
    true, // enabled
    5 * 1024 * 1024, // maxFileSize
    [], // allowedFileExtensions - empty: migrated files have no extension
    'none', // compression
    false, // encryption
    false, // antivirus
  ];
  try {
    await storage.getBucket(APPWRITE_BUCKET_ID);
    await storage.updateBucket(APPWRITE_BUCKET_ID, ...cfg);
    console.log(`bucket ${APPWRITE_BUCKET_ID} (updated)`);
    return;
  } catch (err) {
    if (err?.code !== 404) throw err;
  }
  try {
    await storage.createBucket(APPWRITE_BUCKET_ID, ...cfg);
    console.log(`bucket ${APPWRITE_BUCKET_ID} (created)`);
  } catch (err) {
    ok409(err); // 403 -> message + exit; 409 -> falls through (exists)
    await storage.updateBucket(APPWRITE_BUCKET_ID, ...cfg);
    console.log(`bucket ${APPWRITE_BUCKET_ID} (updated)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
