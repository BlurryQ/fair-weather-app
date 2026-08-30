# TODO / Action List

Generated from `TODO` comments in the codebase, ordered by priority.

> **P1 is done** (2026-08-30) — fixed in `DogGrid.tsx`, `getImages.ts`, `UserContext.tsx`, `App.css`. See notes under each item.

Priority key:
- **P1** – Bugs / broken behaviour in the live app
- **P2** – Finish the in-progress settings toggle feature (currently dead commented-out code)
- **P3** – Refactors and code-quality cleanup
- **P4** – Polish, styling, and low-risk follow-ups

---

## P1 — Bugs in the live app ✅ DONE

### DogGrid image loading
- [x] `DogGrid.tsx:16` — add loaders while fetching images → central `settingsRefreshing` flag in `UserContext`; DogGrid dims the grid instead of stacking a 150px spinner per hour card
- [x] `DogGrid.tsx:27` / `:35` — loaders not running as expected → root cause was `updateImageUrls()` called from the render body of ~5 `DogGrid` instances at once; moved to one guarded effect in `UserContext`
- [x] `DogGrid.tsx:23` — prevent errors when images are outdated → `<img onError>` swaps a failed user upload to its bundled default (once)
- [x] `DogGrid.tsx:24` — verify `:23` → covered by the `onError` fallback
- [x] `DogGrid.tsx:33` — dead check (`getImages` always returns 4) → deleted

### Image data / settings sync
- [x] cross-device drift — expiry path and on-reload path now call `refreshAllSettings()` (full `getAllSettings`) instead of image-URLs-only; old blob URLs revoked in the `'all'` branch. (TODO comment removed from `App.css`.)

---

## P2 — Finish the settings toggle-switch feature ✅ DONE

One feature spread across four files; most of it was commented out.

- [x] `SettingsCard.tsx` — `<Toggle>` wired up; `isSettingOn` inits from `setting.active`; a `handleToggle` wrapper mirrors the switch into `newImageSettings` via `formatImageSettingsForDB` so SaveButton persists the `<name>_on` column
- [x] `SettingsCard.tsx` — first-toggle colour bug fixed by dropping the `querySelectorAll('.settings-card')[index]` + positional `classList[1]` hack; card class is now state-driven (`isSettingOn ? 'settings-card' : 'settings-card disabled'`). The `index` prop is gone entirely.
- [x] `ImageSettings.tsx` — stopped passing `index`
- [x] `getImages.ts` — `add()` now skips a slot whose `<name>_on` is `false` (strict check, so no saved-settings = unchanged behaviour)
- [x] `App.css` — toggle placement + dimmed controls on a disabled card; removed the stale conflicting `.settings-card label` rule in `settingsCard.css`

---

## P3 — Refactors & cleanup

### AuthPage
- [ ] `src/components/AuthPage.tsx:49` — use `id` / `name` instead of `placeholder` to identify fields
- [ ] `src/components/AuthPage.tsx:66` — move submit handling into the form's `onSubmit` rather than a separate handler
- [ ] `src/components/AuthPage.tsx:65` — extract a util function taking pageName + authObj
- [ ] `src/components/AuthPage.tsx:97` — review "use fx?"

### UserContext
- [ ] `src/context/UserContext.tsx:131` — move logic below, return `updatedUser`
- [ ] `src/context/UserContext.tsx:153` — same; consider merging into a single function

### Settings components
- [ ] `src/components/settings/CoreSettings.tsx:133` — extract the repeated radio buttons into a component
- [ ] `src/components/settings/CoreSettings.tsx:29` — refactor
- [ ] `src/components/settings/CoreSettings.tsx:14` — move this helper elsewhere if it's being kept

---

## P4 — Polish & low-risk

- [ ] `src/components/AuthPage.tsx:119` — improve the loading state
- [ ] `src/App.css:152` — styling for mobile weather cards
- [ ] `src/models/weatherAPI/weatherModel.ts:6` — review comments
