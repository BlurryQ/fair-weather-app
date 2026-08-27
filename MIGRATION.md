# Supabase → Appwrite Cloud migration

This branch (`db-change`) replaces Supabase (auth, database, storage) with
Appwrite Cloud. Existing users keep their password — no re-signup, no forced
reset. Anyone with a live session is logged out once and logs back in.

## What changed in the code

| Area | Before | After |
| --- | --- | --- |
| Client | `src/models/supabase/` | `src/models/appwrite/` |
| Auth | `supabase.auth.*` | `account.*` (Appwrite `Account`) |
| Settings | `core_settings` / `image_settings` tables, RLS | same-named collections, per-document permissions |
| Images | `images` bucket, `<userId>/<name>` paths, signed URLs | `images` collection (`user`, `name`, `file_id`) + private bucket files (`Role.user` only), fetched with a short-lived JWT into an object URL |
| New sign-up provisioning | Supabase DB trigger | `provisionUserSettings()` runs client-side after signup |
| Session marker | Supabase user `confirmed_at` | mapped from Appwrite `registration` |
| Keepalive | GitHub Action | deleted (Appwrite Cloud does not pause) |

Env vars: `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLIC_ANON` are gone. New:
`VITE_APPWRITE_ENDPOINT`, `VITE_APPWRITE_PROJECT_ID`, `VITE_APPWRITE_DATABASE_ID`,
`VITE_APPWRITE_BUCKET_ID`. See `.env.example`.

Email verification is **not** enforced. The import marks every migrated user as
verified, so if you turn enforcement on later only new sign-ups are affected.
Password recovery works on Cloud with no SMTP setup (Appwrite's shared mailer).

---

## Runbook

### 0. Local prep

```
npm install
```

### 1. Appwrite console (you)

1. Create an account, organisation, and project at cloud.appwrite.io. **Region:
   Frankfurt (EU).**
2. Project settings → note the **Project ID**. Endpoint is
   `https://fra.cloud.appwrite.io/v1`.
3. **Add platform** → Web → name it, hostname `fair-weather-app.netlify.app`.
   Add a second Web platform for `localhost` for local dev.
4. **API keys → Create API key** (server). Scopes: `users.read`, `users.write`,
   `databases.read`, `databases.write`, `collections.read`, `collections.write`,
   `attributes.read`, `attributes.write`, `indexes.read`, `indexes.write`,
   `documents.read`, `documents.write`, `files.read`, `files.write`,
   `buckets.read`, `buckets.write`. This key is for the scripts only.

### 2. Create the schema (you run)

Copy `.env.example` to `.env` and fill in `APPWRITE_ENDPOINT`,
`APPWRITE_PROJECT_ID`, `APPWRITE_API_KEY` (the long **secret** from the API key,
not its name). Use `KEY=value` with no spaces or quotes. The `npm run migrate:*`
scripts load `.env` automatically (`node --env-file=.env`).

```
npm run migrate:setup
```

Creates database `main`, collections `core_settings` / `image_settings` /
`images`, and bucket `images`. Re-runnable.

### 3. Export from Supabase (you run)

Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_DB_URL` to `.env`.
The Postgres connection string is in the Supabase dashboard → Settings →
Database → Connection string (URI).

> **PAUSE POINT — stop writes to Supabase here.** Run the export at a quiet
> time. Any sign-up or settings change made after this point will not be
> migrated. You do not need to formally pause the Supabase project yet; just
> stop expecting new data to carry over.

```
npm run migrate:export
```

Writes `migration-data/` (git-ignored — it contains password hashes).

### 4. Import into Appwrite (you run)

```
npm run migrate:import -- --dry-run     # inspect
npm run migrate:import                  # for real
```

Idempotent-ish: existing users/documents are skipped, not overwritten. Re-run
with `--skip-users` / `--skip-settings` / `--skip-images` to retry one phase.

### 5. Verify before cutover (you)

With the dev server pointed at Appwrite (`.env` with the `VITE_APPWRITE_*`
values), check with **one real migrated account**:

- log in with the existing password
- Settings page loads core + image settings
- an existing uploaded weather image renders (needs the Web platform origin
  registered in step 1.3 — image fetches are CORS + JWT)
- reload the page — the image still renders (object URLs are regenerated)
- upload a new image, then confirm a *different* account cannot see it
- change a setting, reload, it persisted
- password recovery email arrives and resets

### 6. Netlify cutover (you)

1. Site settings → Environment variables: add `VITE_APPWRITE_ENDPOINT`,
   `VITE_APPWRITE_PROJECT_ID`, `VITE_APPWRITE_DATABASE_ID` (`main`),
   `VITE_APPWRITE_BUCKET_ID` (`images`). Remove `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_PUBLIC_ANON`.
2. Merge `db-change` → `main` / trigger a deploy.
3. Smoke-test production (same checklist as step 5).

### 7. Decommission Supabase (you)

- Delete the `SUPABASE_*` GitHub Actions secrets. *(done)*
- Keepalive workflow file is deleted on this branch; it disappears from the
  Actions tab once `main` has the change.
- Leave the Supabase project **read-only for ~1 week** as a fallback, then
  delete it to free the slot.

---

## Rollback

Before step 6 there is nothing to roll back — production is still Supabase.
After step 6: restore the two `VITE_SUPABASE_*` Netlify vars, redeploy `main`
without this branch. Data written to Appwrite after cutover would not be in
Supabase, hence the short verification window.

## Known trade-offs

- Uploaded images are private per user (`Role.user` on both the bucket file and
  the `images` document). A plain `<img src>` cannot carry the Appwrite session
  cross-origin, so the app fetches each file with a ~15 min JWT and renders an
  object URL. Those URLs do not survive a reload, so `UserContext` regenerates
  them on every load (one `listDocuments` + one fetch per uploaded image, only
  for images the user actually has).
- New sign-ups provision their settings client-side in two `createDocument`
  calls. If the second fails the user has core but not image settings — rare,
  and re-running would need a small repair helper.
