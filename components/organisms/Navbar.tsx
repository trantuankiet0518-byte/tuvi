"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Avatar from "@/components/atoms/Avatar";
import ThemeToggle from "@/components/atoms/ThemeToggle";

const navLinks = [
  { href: "/",          labelKey: "nav.home" },
  { href: "/laplaso",   labelKey: "nav.lapLaSo" },
  { href: "/vanhan",    labelKey: "nav.vanHan" },
  { href: "/thuvien",   labelKey: "nav.thuVien" },
  { href: "/hoso",      labelKey: "nav.hoSo" },
] as const;

export default function Navbar() {
  const t        = useTranslations();
  const pathname = usePathname();
  const router   = useRouter();
  const locale   = useLocale();

  const toggleLocale = () =>
    router.replace(pathname, { locale: locale === "vi" ? "en" : "vi" });

  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tighter text-on-surface hover:opacity-80 transition-opacity">
          Tử Vi <span className="text-primary">Alchemist</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container/50 rounded-full px-2 py-1.5">
          {navLinks.map(({ href, labelKey }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-semibold rounded-full px-4 py-2 transition-all min-h-[40px] flex items-center ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface/50"
                }`}
              >
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            onClick={toggleLocale}
            className="hidden sm:inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 py-1.5 text-xs font-bold rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            {locale === "vi" ? "EN" : "VI"}
          </button>

          <Link href="/laplaso">
            <button className="hidden lg:flex items-center px-5 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-full transition-all hover:opacity-90 active:scale-95 elev-glow">
              {t("nav.newChart")}
            </button>
          </Link>

          <div className="min-w-[44px] min-h-[44px] flex items-center justify-center">
            <Avatar size="sm" />
          </div>
        </div>
      </div>
    </header>
  );
}
