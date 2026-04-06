import { getTranslations } from "next-intl/server";
import { ArrowRight } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import RevealOnScroll from "./RevealOnScroll";
import HomeHeroVideo from "./HomeHeroVideo";

const heroSteps = [
  { key: "step1", labelKey: "step1Label" },
  { key: "step2", labelKey: "step2Label" },
  { key: "step3", labelKey: "step3Label" },
] as const;

export default async function HomeHero() {
  const t = await getTranslations("marketing.homeHero");

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,193,116,0.16),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(255,193,116,0.08),transparent_28%),linear-gradient(90deg,rgba(11,13,14,0.94)_0%,rgba(11,13,14,0.74)_38%,rgba(11,13,14,0.32)_100%)]" />
        <HomeHeroVideo />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-background/60 to-background" />
      </div>

      <div className="marketing-section-inner relative z-10 min-h-[calc(100svh-10rem)]">
        <div className="mx-auto flex min-h-[calc(100svh-10rem)] max-w-4xl flex-col items-center justify-center pb-10 pt-20 text-center sm:pb-14 lg:pt-24">
          <RevealOnScroll variant="scale-in" delay={100} className="inline-block">
            <p className="marketing-kicker text-primary">{t("kicker")}</p>
          </RevealOnScroll>

          <RevealOnScroll variant="scale-in" delay={200}>
            <h1 className="marketing-title mt-6 max-w-2xl text-5xl leading-[0.94] sm:text-6xl lg:text-[6.2rem]">
              {t("headline")}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll variant="from-left" delay={300}>
            <p className="marketing-copy mt-6 max-w-2xl text-base sm:text-lg">
              {t("description")}
            </p>
          </RevealOnScroll>

          <RevealOnScroll variant="scale-in" delay={400}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/laplaso"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-fixed-dim)_100%)] px-6 py-3.5 text-sm font-semibold text-on-primary shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.02]"
              >
                {t("primaryCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="from-right" delay={500}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-on-surface-variant sm:gap-x-5">
              {heroSteps.map((step, index) => (
                <span key={step.key} className="contents">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-on-surface-variant">
                    {t(step.key)}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-primary/60" />
                  <span className={index === 0 || index === 2 ? "text-foreground" : ""}>
                    {t(step.labelKey)}
                  </span>
                  {index < heroSteps.length - 1 ? (
                    <span className="h-1 w-1 rounded-full bg-outline-variant/80" />
                  ) : null}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
