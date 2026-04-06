import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HomeCTA() {
  const t = useTranslations("marketing.cta");

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <div className="border-y border-outline-variant/35 py-14 text-center">
          <p className="marketing-kicker">{t("kicker")}</p>

          <h2 className="marketing-title mx-auto mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
            {t("title")}
          </h2>

          <p className="marketing-copy mx-auto mt-8 max-w-2xl text-base sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/laplaso"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-fixed-dim)_100%)] px-8 py-4 text-sm font-semibold text-on-primary shadow-[0_18px_36px_rgba(0,0,0,0.18)]"
            >
              {t("primary")}
            </Link>
            <Link
              href="/thuvien"
              className="inline-flex items-center justify-center rounded-full border border-outline-variant/70 bg-background/55 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-xl"
            >
              {t("secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
