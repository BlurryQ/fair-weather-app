/**
 * Exports everything needed to move off Supabase into ./migration-data/:
 *   - users.json          (id, email, bcrypt hash, email_confirmed_at, created_at)
 *   - core_settings.json
 *   - image_settings.json
 *   - images/<userId>/<name>   (raw files from the `images` storage bucket)
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_DB_URL
 *
 *   node scripts/export-supabase.mjs
 *
 * Run this at a quiet moment: sign-ups / settings changes made after the export
 * but before cutover will not be migrated.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_DB_URL } = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_DB_URL) {
  console.error(
    'Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / SUPABASE_DB_URL'
  );
  process.exit(1);
}

const OUT = path.resolve('migration-data');
const IMG_OUT = path.join(OUT, 'images');

const sbHeaders = {
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
};

async function exportTables() {
  const client = new pg.Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const users = await client.query(
      `select id, email, encrypted_password, email_confirmed_at, created_at
         from auth.users
        where email is not null
        order by created_at`
    );
    const core = await client.query('select * from public.core_settings');
    const image = await client.query('select * from public.image_settings');

    await writeFile(
      path.join(OUT, 'users.json'),
      JSON.stringify(users.rows, null, 2)
    );
    await writeFile(
      path.join(OUT, 'core_settings.json'),
      JSON.stringify(core.rows, null, 2)
    );
    await writeFile(
      path.join(OUT, 'image_settings.json'),
      JSON.stringify(image.rows, null, 2)
    );
    console.log(
      `users: ${users.rowCount}  core_settings: ${core.rowCount}  image_settings: ${image.rowCount}`
    );
  } finally {
    await client.end();
  }
}

async function listBucket(prefix) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/list/images`,
    {
      method: 'POST',
      headers: { ...sbHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix, limit: 1000, offset: 0 }),
    }
  );
  if (!res.ok) throw new Error(`list ${prefix}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function downloadFile(objectPath, destPath) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/images/${objectPath}`,
    { headers: sbHeaders }
  );
  if (!res.ok) throw new Error(`download ${objectPath}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
}

async function exportStorage() {
  const top = await listBucket('');
  const folders = top.filter((e) => e.id === null);
  let count = 0;
  for (const folder of folders) {
    const files = await listBucket(`${folder.name}/`);
    await mkdir(path.join(IMG_OUT, folder.name), { recursive: true });
    for (const file of files) {
      if (file.id === null) continue; // nested folder, not expected
      await downloadFile(
        `${folder.name}/${file.name}`,
        path.join(IMG_OUT, folder.name, file.name)
      );
      count++;
    }
  }
  console.log(`images: ${count} files across ${folders.length} users`);
}

async function main() {
  await mkdir(IMG_OUT, { recursive: true });
  await exportTables();
  await exportStorage();
  console.log('\nDone -> migration-data/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
