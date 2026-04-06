import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/organisms";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("shared");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-on-primary">
      <Navbar />

      <main>{children}</main>

      <footer className="border-t border-outline-variant/40 bg-background py-8">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 px-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <div className="text-base font-semibold tracking-tight text-foreground">{t("brand")}</div>
            <p className="mt-1 text-sm leading-6 text-on-surface-variant">
              {t("tagline")} for the Modern Age.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.22em] text-on-surface-variant sm:justify-end">
            {[t("footer.privacy"), t("footer.terms"), "FAQ"].map((label) => (
              <a key={label} href="#" className="transition-colors hover:text-foreground">
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
