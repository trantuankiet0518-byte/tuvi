# Agent 1 Notes

This file records the architecture and implementation decisions made in this worktree, with a backend-first integration guide for future development.

## What Was Done

### 1. API contract layer

Added a stable result wrapper so UI code no longer assumes success:

- `lib/api-schema.ts`
  - `ApiError`
  - `ApiSuccess<T>`
  - `ApiFailure`
  - `ApiResult<T>`
  - helpers: `success`, `failure`, `isFailure`

### 2. Domain contracts

Added typed contracts so forms and services share the same payload shape:

- `lib/contracts/auth.ts`
  - `LoginFormValues`
  - `RegisterFormValues`
  - `AuthProfile`
- `lib/contracts/profile.ts`
  - `Gender`
  - `CalendarType`
  - `ProfileSettingsDraft`
- `lib/contracts/fortune.ts`
  - `FortuneRequestPayload`

### 3. Service layer

Moved data logic out of UI and into services:

- `lib/services/api.ts`
  - `postJson<TResponse, TBody>()` now returns `Promise<ApiResult<TResponse>>`
- `lib/services/auth.ts`
  - `submitLogin()`
  - `submitRegister()`
  - session writes are handled through the auth session service
- `lib/services/profile.ts`
  - `loadInitialProfile()`
  - `readLatestSavedChart()`
  - `saveProfile()`
  - `resetProfile()`
- `lib/services/fortune.ts`
  - `submitFortuneRequest()`
- `lib/services/savedCharts.ts`
  - saved chart storage access
  - chart save/delete helpers
  - subscription event for store updates
- `lib/services/authSession.ts`
  - auth session storage access
  - pending route helpers
  - subscription event for auth updates

### 4. UI refactors

Updated forms and containers to use `async/await` and `ApiResult`:

- `features/auth/LoginForm.tsx`
- `features/auth/RegisterForm.tsx`
- `components/organisms/laplaso/LapLaSoExperience.tsx`
- `components/organisms/hoso/ProfileSettingsPanel.tsx`
- `components/organisms/shared/Navbar.tsx`

### 5. Store/snapshot optimization

Reduced direct storage reads and rerender noise:

- `lib/hooks/useSavedCharts.ts`
  - now uses `useSyncExternalStore`
- `lib/services/savedCharts.ts`
  - cache snapshot + update event
- `lib/services/profile.ts`
  - profile snapshot cache + subscription
- `lib/services/authSession.ts`
  - auth snapshot cache + subscription
- `components/organisms/shared/Navbar.tsx`
  - subscribes to auth and profile stores separately

### 6. Saved chart rendering cleanup

Reduced unnecessary rerenders in saved-chart UI:

- `components/organisms/laplaso/SavedChartsList.tsx`
  - extracted memoized `SavedChartCard`
- `components/organisms/laplaso/LapLaSoDetail.tsx`
  - cleaned up `setTimeout` with ref + unmount cleanup

### 7. Build/runtime fixes already in place

- local SVG icon system replaced the broken remote icon font path
- Google Fonts dependency was removed from the local font path
- Next build worker threads are enabled in `next.config.ts`

## Current Backend-Friendly Architecture

The app is now structured so the UI mostly talks to service functions instead of owning data logic.

### UI layer

Forms/components should:

- collect input
- call a service
- inspect `ApiResult`
- render errors/state

They should not:

- know backend endpoints directly
- parse raw response formats
- own storage keys if a service exists
- depend on a particular backend implementation

### Service layer

This is the primary integration point for backend work.

Current service responsibilities:

- `authSession.ts`
  - store/read auth state and pending route
- `auth.ts`
  - login/register workflows
- `profile.ts`
  - profile bootstrap/save/reset
- `fortune.ts`
  - fortune-request submission
- `savedCharts.ts`
  - chart persistence and updates

## How To Connect A Real Backend

Replace the internals of the service layer first. Keep UI components unchanged as much as possible.

### 1. Auth

Target file:

- `lib/services/auth.ts`

Replace:

- local session creation
- local `writeAuthSession()`
- local-only validation

With:

- backend login/register endpoints
- server-issued session or token
- backend validation errors mapped into `ApiResult`

Recommended approach:

1. `submitLogin()` calls `POST /auth/login`
2. `submitRegister()` calls `POST /auth/register`
3. On success, persist only the minimum client session state needed by the UI
4. Keep `authSession.ts` as the client session adapter

If you later move auth fully to cookies/httpOnly sessions:

- keep the UI calling `submitLogin()` / `submitRegister()`
- change `authSession.ts` to reflect backend session state instead of localStorage

### 2. Profile

Target file:

- `lib/services/profile.ts`

Replace:

- localStorage save/load
- local merge with latest saved chart

With:

- backend profile endpoint, for example:
  - `GET /profile`
  - `PUT /profile`

Keep the function signatures stable:

- `loadInitialProfile()`
- `saveProfile(profile)`
- `resetProfile()`

If the backend stores profile centrally, the frontend should only:

- request profile data
- render it
- submit updates

### 3. Saved charts

Target file:

- `lib/services/savedCharts.ts`

Replace:

- localStorage persistence
- client-side chart list mutations

With:

- backend chart endpoints, for example:
  - `GET /saved-charts`
  - `POST /saved-charts`
  - `DELETE /saved-charts/:id`

Keep these UI-facing helpers stable if possible:

- `readSavedCharts()`
- `saveChart()`
- `deleteChart()`
- `isChartSaved()`
- `getSavedChartId()`

If backend state becomes authoritative:

- `useSavedCharts()` can stay as the consumer hook
- swap its implementation to fetch/subscribe to backend data instead of local snapshot data

### 4. Fortune / chart generation

Target file:

- `lib/services/fortune.ts`

This should become a thin API adapter:

- send the request payload
- receive `ApiResult<TuViEngineResult>`
- map server validation/network errors into the shared contract

Then `LapLaSoExperience` and related components can remain unchanged.

### 5. API result format

Keep the `ApiResult<T>` wrapper as the stable contract between UI and backend.

Recommended backend response shape:

```ts
{
  ok: true,
  data: ...
}
```

or

```ts
{
  ok: false,
  error: {
    code: string,
    message: string,
    details?: unknown
  }
}
```

That keeps:

- form error rendering simple
- API migration low-risk
- component code stable

## Backend Migration Order

Recommended order:

1. Auth endpoints
2. Fortune generation endpoint
3. Profile persistence endpoint
4. Saved charts endpoint
5. Optional removal of localStorage/sessionStorage fallbacks

## Files Most Likely To Change Next

If backend work starts, these are the files to touch first:

- `lib/services/auth.ts`
- `lib/services/profile.ts`
- `lib/services/savedCharts.ts`
- `lib/services/fortune.ts`
- `lib/services/api.ts`
- `lib/services/authSession.ts`

UI components should only need light changes if any:

- `features/auth/LoginForm.tsx`
- `features/auth/RegisterForm.tsx`
- `components/organisms/laplaso/LapLaSoExperience.tsx`
- `components/organisms/hoso/ProfileSettingsPanel.tsx`
- `components/organisms/shared/Navbar.tsx`

## Notes

- Build currently passes.
- The project now uses a local SVG icon system and no longer depends on the broken remote icon font path.
- The build worker thread setting is enabled because this Windows workspace had spawn-related build issues.

