"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { LogIn, ShieldAlert, SunMedium, UserCircle2 } from "@/components/icons";
import Icon from "@/components/atoms/Icon";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Avatar from "@/components/atoms/Avatar";
import ThemeToggle from "@/components/atoms/ThemeToggle";
import {
  clearAuthSession,
  clearPendingRoute,
  isAuthenticated,
  readAuthSession,
  writePendingRoute,
  subscribeToAuthSession,
} from "@/lib/services/authSession";
import { loadInitialProfile, subscribeToProfileSettings } from "@/lib/services/profile";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/laplaso", labelKey: "nav.lapLaSo" },
  { href: "/vanhan", labelKey: "nav.vanHan" },
  { href: "/thuvien", labelKey: "nav.thuVien" },
] as const;

const protectedPrefixes = [
  "/laplaso",
  "/vanhan",
  "/thuvien",
  "/hoso",
  "/views",
];
function hasProfileData(profile: ReturnType<typeof loadInitialProfile> | null) {
  if (!profile) return false;

  return Boolean(
    profile.fullName ||
      profile.birthDate ||
      profile.birthTime ||
      profile.timezone ||
      profile.birthPlace ||
      profile.lunarDateTime
  );
}

function formatProfileLine(profile: ReturnType<typeof loadInitialProfile> | null, t: (key: string) => string) {
  if (!hasProfileData(profile)) return t("noData");

  const parts = [
    profile?.fullName,
    profile?.birthDate,
    profile?.birthTime ? `${t("timePrefix")} ${profile.birthTime}` : null,
    profile?.timezone,
  ].filter(Boolean);

  return parts.length ? parts.join(" • ") : t("minimalProfileReady");
}

function protectedLink(href: string) {
  return protectedPrefixes.some(
    (prefix) => href === prefix || href.startsWith(`${prefix}/`),
  );
}

export default function Navbar() {
  const t = useTranslations("shared");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accessPromptOpen, setAccessPromptOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const authenticated = useSyncExternalStore(
    subscribeToAuthSession,
    isAuthenticated,
    () => false,
  );
  const latestProfile = useSyncExternalStore(
    subscribeToProfileSettings,
    loadInitialProfile,
    loadInitialProfile,
  );

  const toggleLocale = () =>
    router.replace(pathname, { locale: locale === "vi" ? "en" : "vi" });

  useEffect(() => {
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!accountRef.current) return;
      if (!accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAccountOpen(false);
        setMobileOpen(false);
        setAccessPromptOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname === "/vi" || pathname === "/en"
      : pathname.startsWith(href);

  const closeMenus = () => {
    setAccountOpen(false);
    setMobileOpen(false);
  };

  const handleProtectedClick = (
    href: string,
    event?: ReactMouseEvent<HTMLAnchorElement>,
  ) => {
    if (!protectedLink(href) || authenticated) return;

    event?.preventDefault();
    closeMenus();
    writePendingRoute(href);
    setPendingHref(href);
    setAccessPromptOpen(true);
  };

  const handleLogout = () => {
    clearAuthSession();
    clearPendingRoute();
    setAccountOpen(false);
  };

  const handleLoginJump = () => {
    setAccessPromptOpen(false);
    setPendingHref(null);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-3xl border border-outline-variant/25 bg-background/60 px-4 backdrop-blur-2xl shadow-[0_10px_28px_rgba(0,0,0,0.12)] sm:px-5">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-outline-variant/25 bg-surface-container-low text-primary shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-transform group-hover:rotate-6">
              <SunMedium className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-semibold tracking-tight text-foreground">
                {t("brand")}
              </div>
              <div className="text-[0.72rem] uppercase tracking-[0.22em] text-on-surface-variant">
                {t("tagline")}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                onClick={(event) => handleProtectedClick(href, event)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-primary/8 text-primary"
                    : "text-on-surface-variant hover:bg-black/4 hover:text-foreground dark:hover:bg-white/4"
                }`}
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={toggleLocale}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/25 bg-background/35 text-xs font-semibold text-on-surface-variant transition-colors hover:bg-black/4 hover:text-foreground dark:hover:bg-white/4"
                title={t("changeLanguage")}
              >
                {locale === "vi" ? "EN" : "VI"}
              </button>
            </div>

            <Link
              href="/laplaso"
              onClick={(event) => handleProtectedClick("/laplaso", event)}
              className="hidden items-center gap-2 rounded-full bg-primary/85 px-5 py-2 text-sm font-semibold text-on-primary transition-transform hover:scale-[1.02] lg:inline-flex"
            >
              {t("nav.newChart")}
            </Link>

            <div ref={accountRef} className="relative">
              {authenticated ? (
                <>
                  <button
                    type="button"
                    onClick={() => setAccountOpen((open) => !open)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/25 bg-background/55 text-foreground transition-colors hover:bg-black/4 dark:hover:bg-white/4"
                    aria-haspopup="menu"
                    aria-expanded={accountOpen}
                    aria-label={t("openAccountMenu")}
                  >
                    <Avatar
                      size="sm"
                      fallback={
                        latestProfile?.fullName ||
                        readAuthSession()?.name ||
                        "TV"
                      }
                    />
                  </button>

                  {accountOpen ? (
                    <div
                      role="menu"
                      aria-label={t("accountMenu")}
                      className="absolute right-0 top-12 w-[20rem] overflow-hidden rounded-3xl border border-outline-variant/25 bg-background/90 p-3 text-foreground shadow-2xl shadow-black/14 backdrop-blur-2xl"
                    >
                      <div className="flex items-start gap-3 rounded-2xl border border-outline-variant/25 bg-surface-container-low p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/25 bg-background/70">
                          <Avatar
                            size="sm"
                            fallback={
                              latestProfile?.fullName ||
                              readAuthSession()?.name ||
                              "TV"
                            }
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold">
                            {latestProfile?.fullName ||
                              readAuthSession()?.name ||
                              t("brand")}
                          </div>
                          <div className="mt-1 text-xs leading-5 text-on-surface-variant">
                            {formatProfileLine(latestProfile, t)}
                          </div>
                        </div>
                        </div>

                      <div className="mt-3 space-y-1">
                        <div className="rounded-2xl px-4 py-3 text-sm font-medium text-on-surface-variant">
                          <div className="flex items-center justify-between">
                            <span>{t("theme")}</span>
                            <ThemeToggle />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-on-surface-variant transition-colors hover:bg-red-500/8 hover:text-red-500 dark:hover:text-red-300"
                        >
                          <span>{t("logout")}</span>
                          <Icon name="logout" className="text-[1.1rem]" />
                        </button>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-outline-variant/25 bg-background/55 px-4 text-sm font-semibold text-foreground transition-colors hover:bg-black/4 dark:hover:bg-white/4"
                >
                  <LogIn className="h-4 w-4" />
                  {t("login")}
                </Link>
              )}
            </div>

            <button
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/25 text-foreground transition-colors hover:bg-black/4 dark:hover:bg-white/4 lg:hidden"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "close" : "menu"} className="text-[1.2rem]" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-background/90 px-6 pt-24 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-4 text-center">
            {navLinks.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                onClick={(event) => {
                  handleProtectedClick(href, event);
                  setMobileOpen(false);
                }}
                className={`py-2 text-2xl font-semibold transition-colors ${
                  isActive(href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {t(labelKey)}
              </Link>
            ))}

            <hr className="my-4 border-outline-variant/40" />

            <div className="flex justify-center gap-6">
              <ThemeToggle />
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 font-semibold text-on-surface-variant transition-colors hover:text-primary"
              >
                <Icon name="language" className="text-sm" />
                {locale === "vi" ? "EN" : "VI"}
              </button>
            </div>

            <div className="rounded-3xl border border-outline-variant/25 bg-background/60 p-4 text-left backdrop-blur-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
                {t("minimalProfile")}
              </div>
              <div className="mt-2 text-base font-semibold text-foreground">
                {latestProfile?.fullName ||
                  readAuthSession()?.name ||
                  t("noData")}
              </div>
              <div className="mt-1 text-sm text-on-surface-variant">
                {formatProfileLine(latestProfile, t)}
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Link
                href="/laplaso"
                onClick={(event) => {
                  handleProtectedClick("/laplaso", event);
                  setMobileOpen(false);
                }}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
              >
                {t("newChart")}
              </Link>
            </div>

            {!authenticated ? (
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-outline-variant/25 px-4 py-3 text-sm font-semibold text-foreground"
              >
                <LogIn className="h-4 w-4" />
                {t("login")}
              </Link>
            ) : null}
          </nav>
        </div>
      ) : null}

      {accessPromptOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label={t("closeLoginPrompt")}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setAccessPromptOpen(false);
              setPendingHref(null);
            }}
          />
          <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-outline-variant/25 bg-background/90 p-6 text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-outline-variant/25 bg-surface-container-low text-primary">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-semibold">
                  {t("loginRequiredTitle")}
                </div>
                <div className="text-sm text-on-surface-variant">
                  {pendingHref
                    ? `${pendingHref} ${t("loginRequiredDescription")}`
                    : t("loginRequiredDescription")}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-on-surface-variant">
              {t("loginRequiredBody")}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-full border border-outline-variant/25 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-black/4"
                onClick={() => {
                  setAccessPromptOpen(false);
                  setPendingHref(null);
                }}
              >
                {t("later")}
              </button>
              <Link
                href="/login"
                onClick={handleLoginJump}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/90 px-5 py-2.5 text-sm font-semibold text-on-primary transition-transform hover:scale-[1.01]"
              >
                <UserCircle2 className="h-4 w-4" />
                {t("loginNow")}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
