export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiFailure = {
  ok: false;
  error: ApiError;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export function success<T>(data: T): ApiSuccess<T> {
  return { ok: true, data };
}

export function failure(code: string, message: string, details?: unknown): ApiFailure {
  return {
    ok: false,
    error: {
      code,
      message,
      details,
    },
  };
}

export function isFailure<T>(result: ApiResult<T>): result is ApiFailure {
  return !result.ok;
}
