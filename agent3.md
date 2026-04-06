# API Contract Spec

This file defines the backend contract expected by the current frontend.

## Shared Rules

### Response Envelope

All service-backed endpoints should return:

```ts
type ApiSuccess<T> = {
  ok: true;
  data: T;
};

type ApiFailure = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};
```

Frontend service functions already map to this shape.

### Error Handling

Use stable machine-readable codes:

- `validation_error`
- `unauthorized`
- `not_found`
- `rate_limited`
- `server_error`
- `network_error`

Keep human-readable text in `message`.

---

## 1. Auth

### `POST /auth/login`

Request:

```ts
{
  email: string;
  password: string;
}
```

Success:

```ts
{
  ok: true;
  data: {
    authenticated: true;
    email?: string;
    name?: string;
  };
}
```

Failure:

- `validation_error` for missing fields
- `unauthorized` for invalid credentials

### `POST /auth/register`

Request:

```ts
{
  fullName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}
```

Success:

```ts
{
  ok: true;
  data: {
    authenticated: true;
    email?: string;
    name?: string;
  };
}
```

Failure:

- `validation_error`
- `conflict` if account already exists
- `unauthorized` if terms are not accepted, if backend enforces it separately

### Client Session

Frontend currently keeps a lightweight session store in:

- `lib/services/authSession.ts`

If backend moves to httpOnly cookies later:

- keep the same frontend function signatures
- change only the implementation inside `authSession.ts`

---

## 2. Fortune Generation

### `POST /api/tuvi`

Request:

```ts
{
  fullName: string;
  gender: "nam" | "nu";
  calendarType: "duong" | "am";
  birthDate: string;
  birthTime: string;
  timezone: string;
  eightCharProviderSect?: 1 | 2;
}
```

Success:

```ts
{
  ok: true;
  data: TuViEngineResult;
}
```

Failure:

- `validation_error`
- `server_error`
- `network_error`

### Required Compatibility

Frontend expects:

- `profile.fullName`
- `profile.genderLabel`
- `profile.solarDateTime`
- `profile.lunarDateTime`
- `profile.timezone`
- `overview.*`
- `palaces[]`
- `keyStars[]`
- `decadeCycles[]`
- `summary[]`
- `analysis.*`

Do not rename these fields without updating the frontend contract.

---

## 3. Profile

### `GET /profile`

Purpose:

- load the current user profile

Success:

```ts
{
  ok: true;
  data: ProfileSettingsDraft;
}
```

Failure:

- `unauthorized`
- `not_found`
- `server_error`

### `PUT /profile`

Request:

```ts
ProfileSettingsDraft
```

Success:

```ts
{
  ok: true;
  data: ProfileSettingsDraft;
}
```

Failure:

- `validation_error`
- `unauthorized`
- `server_error`

### Frontend Expectations

The frontend currently uses:

- `loadInitialProfile()`
- `saveProfile()`
- `resetProfile()`

These should remain stable.

---

## 4. Saved Charts

### `GET /saved-charts`

Success:

```ts
{
  ok: true;
  data: SavedChart[];
}
```

### `POST /saved-charts`

Request:

```ts
{
  result: TuViEngineResult;
}
```

Success:

```ts
{
  ok: true;
  data: SavedChart;
}
```

### `DELETE /saved-charts/:id`

Success:

```ts
{
  ok: true;
  data: { deleted: true };
}
```

### SavedChart Shape

```ts
{
  id: string;
  savedAt: string;
  result: TuViEngineResult;
}
```

### Frontend Expectations

Current consumer:

- `useSavedCharts()`

The hook can keep its API even if the backing data source changes.

---

## 5. Migration Strategy

When backend is ready:

1. Keep the frontend service function names.
2. Replace the implementation inside `lib/services/*`.
3. Keep `ApiResult<T>` as the UI boundary.
4. Only change components if the data shape itself changes.

### Suggested rollout order

1. Auth
2. Fortune generation
3. Profile
4. Saved charts

---

## 6. Non-Goals

This frontend does not require:

- direct component-to-backend calls
- raw `fetch()` inside UI components
- multiple response envelope formats
- backend-specific logic in forms

