# Backend Integration Checklist

Use this file as the short execution checklist after `agent1.md`.

## Goal

Connect the project to a real backend without rewriting UI components.

## Rule

Keep UI code calling the service layer only.

Do not:

- call backend endpoints directly from components
- parse raw backend payloads in UI
- move business logic into forms

## Step 1: Auth

Target files:

- `lib/services/auth.ts`
- `lib/services/authSession.ts`

Do this:

1. Replace local-only auth behavior with backend login/register requests.
2. Keep `submitLogin()` and `submitRegister()` returning `ApiResult`.
3. Keep `readAuthSession()` and `writeAuthSession()` as the client session adapter.
4. Preserve `readPendingRoute()` / `writePendingRoute()` for redirect flow.

Done when:

- login and register still work
- auth errors show in UI
- navbar auth state updates correctly

## Step 2: Fortune Generation

Target files:

- `lib/services/fortune.ts`
- `lib/services/api.ts`

Do this:

1. Point the fortune request to the backend endpoint.
2. Keep the response wrapped in `ApiResult<TuViEngineResult>`.
3. Keep validation/network failures mapped to `error.code` and `error.message`.

Done when:

- `LapLaSoExperience` still works without UI changes
- success and error states both render correctly

## Step 3: Profile

Target files:

- `lib/services/profile.ts`

Do this:

1. Replace localStorage profile persistence with backend fetch/save.
2. Keep `loadInitialProfile()` as the bootstrap function.
3. Keep `saveProfile()` returning `ApiResult<ProfileSettingsDraft>`.
4. Keep `resetProfile()` for local draft reset only.

Done when:

- profile page loads backend data
- save button persists to backend
- navbar profile display updates after save

## Step 4: Saved Charts

Target files:

- `lib/services/savedCharts.ts`
- `lib/hooks/useSavedCharts.ts`

Do this:

1. Replace local saved-chart storage with backend list/create/delete APIs.
2. Keep the hook API stable if possible.
3. Keep update events or swap to a backend data source if needed.

Done when:

- saved charts list loads from backend
- save/delete works
- detail toggle still reflects saved state

## Step 5: Clean Up Fallbacks

Target files:

- `lib/auth.ts`
- any remaining local-storage helpers

Do this:

1. Remove compatibility wrappers only after the backend path is stable.
2. Delete dead storage code once no component uses it.
3. Keep the public service signatures stable during the migration.

Done when:

- no UI component reads storage directly
- all stateful data flows through services

## Success Criteria

- Build passes
- UI behavior is unchanged
- Backend can be swapped without touching components
- Service layer is the only place that knows backend details

