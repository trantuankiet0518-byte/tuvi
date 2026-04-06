import Image from "next/image";
import { useMessages, useTranslations } from "next-intl";

type IntroItem = {
  title: string;
  description: string;
};

export default function HomeIntro() {
  const t = useTranslations("marketing.intro");
  const messages = useMessages() as {
    marketing?: {
      intro?: {
        items?: IntroItem[];
      };
    };
  };
  const items = messages.marketing?.intro?.items ?? [];

  return (
    <section className="marketing-section py-20 sm:py-24 lg:py-28">
      <div className="marketing-section-inner grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="marketing-kicker">{t("kicker")}</p>
          <h2 className="marketing-title mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
          <p className="marketing-copy mt-8 max-w-2xl text-base sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-outline-variant/35 bg-background/55 p-3 backdrop-blur-xl">
            <div className="relative h-[18rem] overflow-hidden rounded-[1.5rem] border border-white/10">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQj0mYlknCdybQsn9Iw-Pz6m_zeW8aOT84hvZPD5Y-MHBxszUCWlI_VVg3ghPfFvzgAdsEkiXdo6UILjLFI0Vsoo-JwD4YblOJOotxACDL6_zM62yt9J-ohRnNnwXCg35q9r55_7vBwrgJedJxNlvGwgCTm3RfSiOdrT6-GF5keswzDxZDhXxkOJDJxHEGUIINkEaEL--YvAm-c6TjANei0NHwX6I3nFUfzqNeMz05ItZdAOrTV41CtCAC-DNTM-M4yB4sX-NOxHVQ"
                alt="Ancient astrological chart"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
                unoptimized
                className="object-cover object-center opacity-85 grayscale-[0.12]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(10,10,12,0.72))]" />
              <div className="absolute left-4 bottom-4 rounded-[1rem] border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
                <div className="text-[0.68rem] uppercase tracking-[0.24em] text-white/55">
                  {t("imageBadge")}
                </div>
                <p className="mt-2 max-w-xs text-sm leading-6 text-white/88">
                  {t("imageCaption")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-outline-variant/35 bg-background/35">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <div className="grid gap-4 border-b border-outline-variant/35 px-5 py-6 last:border-b-0 sm:grid-cols-[auto_1fr] sm:gap-8 sm:px-7 sm:py-7">
                <div className="text-sm font-semibold tracking-[0.34em] text-on-surface-variant">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-[1.4rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
