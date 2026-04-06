import { useMessages, useTranslations } from "next-intl";

export default function HomeBenefits() {
  const t = useTranslations("marketing.benefits");
  const messages = useMessages() as {
    marketing?: {
      benefits?: {
        items?: string[];
      };
    };
  };
  const items = messages.marketing?.benefits?.items ?? [];

  return (
    <section className="marketing-section py-20 sm:py-24 lg:py-28">
      <div className="marketing-section-inner">
        <div className="glass-border-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
          <p className="marketing-kicker">{t("kicker")}</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="marketing-title max-w-xl text-4xl sm:text-5xl lg:text-6xl">
                {t("title")}
              </h2>
              <p className="marketing-copy mt-8 max-w-lg text-base sm:text-lg">
                {t("description")}
              </p>
            </div>

            <div className="grid gap-3">
              {items.map((item, index) => (
                <div key={item}>
                  <div className="glass-border-panel-soft flex items-start gap-4 rounded-[1.4rem] p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-outline-variant/35 bg-background/65 text-sm font-semibold text-foreground">
                      {String(index + 1)}
                    </div>
                    <p className="pt-1 text-sm leading-7 text-on-surface-variant">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
