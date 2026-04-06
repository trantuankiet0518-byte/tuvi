import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LoginLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("auth.shell");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0b0c] text-foreground selection:bg-primary selection:text-on-primary">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,122,0,0.14),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(255,193,116,0.06),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(74,96,128,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0)_24%,rgba(255,255,255,0.02)_100%)]" />
        <div className="absolute left-[-8%] top-[-12%] h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-3xl animate-float-drift" />
        <div className="absolute right-[-10%] top-[12%] h-[24rem] w-[24rem] rounded-full bg-secondary/12 blur-3xl animate-float-drift [animation-delay:1.6s]" />
        <div className="absolute bottom-[-16%] left-[14%] h-[28rem] w-[28rem] rounded-full bg-tertiary/10 blur-3xl animate-soft-pulse" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[620px] flex-col px-4 py-5 sm:px-6">
        <header className="flex items-center justify-center py-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold tracking-tight text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              TV
            </span>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/75">
                {t("brand")}
              </p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-white/40">
                {t("subtitle")}
              </p>
            </div>
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center py-4 sm:py-8">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </main>
  );
}
