# TODO / Action List

Generated from `TODO` comments in the codebase, ordered by priority.

> **P1 is done** (2026-08-30) — fixed in `DogGrid.tsx`, `getImages.ts`, `UserContext.tsx`, `App.css`. See notes under each item.
> **P2 is done** (2026-08-30) — per-image on/off toggles wired through settings → getImages. Commit `39fe350`.
> **P3 is done** (2026-08-30) — AuthPage, UserContext and CoreSettings refactors, no behaviour change. Two latent bugs found and logged under P4.

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

## P3 — Refactors & cleanup ✅ DONE

### AuthPage ✅ DONE
- [x] `AuthPage.tsx:49` — inputs identified by `name=`; `handleChange` switches on `name`, not placeholder text
- [x] `AuthPage.tsx:66` — submit runs off `<form onSubmit>` (FormEvent); button `onClick` removed
- [x] `AuthPage.tsx:65` — per-page Appwrite call extracted to `utils/authAction`, returns `{error, success, redirect, resetInputs, clearAfterDelay}` the component applies
- [x] `AuthPage.tsx:97` — kept the `clearError` timeout (via `clearAfterDelay`); an effect would also dismiss errors the other pages keep until next submit

### UserContext ✅ DONE
- [x] `UserContext.tsx` `file` / `deleteImage` branches — the inline imageUrls array building is gone; both branches now call module-scope `upsertImageUrl` / `removeImageUrl` pure helpers (each returns a new array). Kept as two helpers rather than one nullable-url function — clearer at the call site.

### Settings components ✅ DONE
- [x] `CoreSettings.tsx:133` — radio rows extracted to `components/common/RadioGroup` (Fragment keys, identical DOM)
- [x] `CoreSettings.tsx:29` — `handleChange` cleaned: typed event, dropped 5 `console.log`s and the dead cross-field branch, `switch` on input id, range checks via one `hourError` helper. Direct-mutation model kept (inputs are uncontrolled). See new P4 note re: the cross-field rule.
- [x] `CoreSettings.tsx:14` — `HourErrors` moved to `src/types/settings/HourErrors.ts`

---

## P4 — Polish & low-risk ✅ DONE

- [x] `src/components/AuthPage.tsx` — loading state now renders the shared `<Loader />` (CircleLoader spinner) instead of bare "Loading..." text. Verified with a stalled-network browser pass.
- [x] `src/components/AuthPage.tsx` — Reset Email now renders `.error` / `.success` in its own message slot; verified the "Cannot find this email address" error shows and self-clears. _(found + fixed 2026-08-30)_
- [x] `src/components/settings/CoreSettings.tsx` — cross-field hour validation wired up via `validateHours(first, last)`, recomputed from both values on each edit so fixing one field clears the other's stale error; `SaveButton` stays disabled while either error is set. _(found + fixed 2026-08-30)_
- [x] `src/App.css:181` — styling for mobile weather cards. Reworked `forecast.css` `max-width: 767px` block; the marker comment is gone. _(done + shipped 2026-08-30, commit `10d80a9`)_
  1. Fixed — dropped the hard-coded `grid-template-rows: 180px`; card height now tracks content (~195px for the common single-image hour).
  2. Fixed — mobile hides the `.opaque` favicon padding and sizes the real images to their count via `:has()` sibling checks: 1 fills the image column, 2 sit in a row, 3–4 wrap. Desktop keeps its fixed 2×2 placeholder grid (pure CSS, no `getImages` change).
  3. Fixed — the expand chevron (`#carrat`) is centred in a real 34px column instead of a 10px sliver. (`.show-weather-details` was already dead/unused CSS.)
  4. Not a bug — the second "Sun Aug 30th" is an intentional `<DateSelector top={false}>` in `HourlyWeather.tsx` for day-nav from the bottom of a long list. Left as-is.
  - Also folded away the redundant 630/550/500/460/410px `.dog` width media blocks.
- [x] `src/models/weatherAPI/weatherModel.ts` — dead code removed: commented-out `getWeatherData` (unused; superseded by `getLatandLongWeather`) and the old axios snippets. (`axios` stays a dependency — still used by `netlify/functions/weatherApiRequest.ts`.)
