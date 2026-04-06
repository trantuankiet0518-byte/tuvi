# Backend Guide

This is the short implementation guide for the backend that will serve this frontend.

## Core Principle

Match the frontend service layer first, not the UI components.

The frontend already expects:

- `ApiResult<T>` envelopes
- stable service function names
- typed payloads

## Recommended Stack

Any backend stack is fine if it can provide:

- JSON responses
- consistent error codes
- auth/session support
- profile persistence
- chart persistence

## Endpoints To Implement

### Auth

- `POST /auth/login`
- `POST /auth/register`

### Fortune

- `POST /api/tuvi`

### Profile

- `GET /profile`
- `PUT /profile`

### Saved Charts

- `GET /saved-charts`
- `POST /saved-charts`
- `DELETE /saved-charts/:id`

## Response Contract

Use this exact envelope shape:

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

## Practical Implementation Notes

### 1. Auth

Keep auth responses lightweight:

```ts
{
  authenticated: true,
  email?: string,
  name?: string
}
```

If using httpOnly cookies:

- frontend can keep the same login/register calls
- `lib/services/authSession.ts` can later become a session fetch adapter

### 2. Fortune Result

Return the current `TuViEngineResult` shape exactly.

Do not rename:

- `profile`
- `overview`
- `palaces`
- `keyStars`
- `decadeCycles`
- `summary`
- `analysis`

### 3. Profile

Persist `ProfileSettingsDraft` as-is.

The frontend expects these fields:

- `fullName`
- `email`
- `phone`
- `gender`
- `calendarType`
- `birthDate`
- `birthTime`
- `timezone`
- `birthPlace`
- `lunarDateTime`
- `notes`
- `updatedAt`

### 4. Saved Charts

Persist chart objects in a list.

Shape:

```ts
{
  id: string;
  savedAt: string;
  result: TuViEngineResult;
}
```

## Error Codes

Use stable machine-readable codes:

- `validation_error`
- `unauthorized`
- `not_found`
- `conflict`
- `rate_limited`
- `server_error`
- `network_error`

## Rollout Order

1. Auth
2. Fortune
3. Profile
4. Saved charts

## What Not To Break

Keep these frontend-facing contracts stable:

- `submitLogin()`
- `submitRegister()`
- `submitFortuneRequest()`
- `saveProfile()`
- `loadInitialProfile()`
- `useSavedCharts()`

If a backend change forces contract changes, update the service layer first and only then touch UI components.

