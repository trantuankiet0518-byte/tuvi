import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomeHero() {
  const t = useTranslations("marketing.hero");

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative z-10 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col gap-6 mb-12">
          <span className="text-sm font-black tracking-[0.4em] text-primary uppercase bg-primary/5 w-fit px-4 py-1.5 rounded-full">
            {t("badge")}
          </span>
          <h1 className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] font-black tracking-tighter max-w-6xl">
            {t("title")} <br />
            <span className="shiny-text">{t("titleHighlight")}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mt-16 border-t border-border/50 pt-16">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed font-medium">
              {t("description")}
            </p>
            <div className="mt-12">
              <Link
                href="/views"
                className="bg-primary text-on-primary hover:opacity-90 rounded-full px-12 py-6 inline-flex items-center gap-4 font-black text-lg group transition-all shadow-2xl shadow-primary/30 active:scale-95"
              >
                {t("cta")}
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-2xl">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9 text-right pb-4">
            <div className="text-6xl lg:text-8xl font-black text-primary tracking-tighter drop-shadow-sm">8000+</div>
            <div className="text-sm font-bold text-on-surface-variant tracking-[0.2em] uppercase mt-2">
              {t("stats")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
