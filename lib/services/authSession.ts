export const AUTH_STORAGE_KEY = "tuvi_auth_state";
export const PENDING_ROUTE_KEY = "tuvi_pending_route";
export const AUTH_SESSION_UPDATED_EVENT = "tuvi-auth-updated";

export type AuthSession = {
  authenticated: boolean;
  email?: string;
  name?: string;
  updatedAt: string;
};

let cachedAuthSession: AuthSession | null = null;
let cachedAuthStorageRaw = "";

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function readAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY) ?? "";
  if (raw === cachedAuthStorageRaw) {
    return cachedAuthSession;
  }

  cachedAuthStorageRaw = raw;
  cachedAuthSession = raw ? readJson<AuthSession>(AUTH_STORAGE_KEY) : null;
  return cachedAuthSession;
}

export function isAuthenticated() {
  return Boolean(readAuthSession()?.authenticated);
}

export function writeAuthSession(session: Omit<AuthSession, "updatedAt">) {
  if (typeof window === "undefined") return;

  const next = {
    ...session,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(next)
  );
  cachedAuthStorageRaw = JSON.stringify(next);
  cachedAuthSession = next;
  window.dispatchEvent(new Event(AUTH_SESSION_UPDATED_EVENT));
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  cachedAuthStorageRaw = "";
  cachedAuthSession = null;
  window.dispatchEvent(new Event(AUTH_SESSION_UPDATED_EVENT));
}

export function writePendingRoute(path: string) {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(PENDING_ROUTE_KEY, path);
}

export function readPendingRoute() {
  if (typeof window === "undefined") return null;

  return window.sessionStorage.getItem(PENDING_ROUTE_KEY);
}

export function clearPendingRoute() {
  if (typeof window === "undefined") return;

  window.sessionStorage.removeItem(PENDING_ROUTE_KEY);
}

export function subscribeToAuthSession(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handler = () => onStoreChange();

  window.addEventListener("storage", handler);
  window.addEventListener(AUTH_SESSION_UPDATED_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(AUTH_SESSION_UPDATED_EVENT, handler);
  };
}
