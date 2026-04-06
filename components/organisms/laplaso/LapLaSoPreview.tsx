import type { TuViEngineResult } from "@/lib/bazi/types";
import { useTranslations } from "next-intl";
import { getBranchLabel, getPalaceLabel, getStarLabel, QUALITY_LABELS } from "@/lib/bazi/display";
import Icon from "@/components/atoms/Icon";

interface LapLaSoPreviewProps {
  result: TuViEngineResult | null;
  isPending: boolean;
  error: string | null;
  timezone: string;
}

export default function LapLaSoPreview({ result, isPending, error, timezone }: LapLaSoPreviewProps) {
  const t = useTranslations("laplaso.preview");
  const palaces = result?.palaces ?? [];
  const summary = result?.summary ?? [];
  const keyStars = result?.keyStars.slice(0, 6) ?? [];
  const decades = result?.decadeCycles.slice(0, 4) ?? [];
  const coreTraits = result?.analysis.coreTraits ?? [];
  const career = result?.analysis.career ?? [];
  const relationship = result?.analysis.relationship ?? [];

  return (
    <section className="sticky top-24 lg:col-span-7">
      <div className="mb-6 flex items-end justify-between px-2">
        <div className="flex flex-col gap-1">
          <span className="text-[0.6875rem] font-black uppercase tracking-[0.3em] text-primary">
            {t("livePreview")}
          </span>
          <h3 className="text-xl font-black tracking-tight text-on-surface">
            {result ? t("chartReady") : t("chartEmpty")}
          </h3>
        </div>
        <span className="rounded-md bg-surface-container px-2 py-1 font-mono text-[10px] tracking-tighter text-on-surface-variant">
          {t("timezone")}: {timezone}
        </span>
      </div>

      <div className="glass-border-panel relative overflow-hidden rounded-[2.5rem] p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,210,140,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(104,164,255,0.1),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.07]">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-primary" />
            <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-secondary" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-primary" />
          </svg>
        </div>

        <div className="relative z-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {palaces.length > 0 ? (
            palaces.map((palace) => (
              <article
                key={`${palace.name}-${palace.branch}`}
                className="glass-border-panel-soft rounded-[2rem] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-primary">
                      {getPalaceLabel(palace.name)}
                    </p>
                    <h4 className="mt-2 text-2xl font-black tracking-tight text-on-surface">{getBranchLabel(palace.branch)}</h4>
                  </div>
                  <div className="space-y-1 text-right">
                    {palace.isLifePalace ? <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">{t("lifePalace")}</p> : null}
                    {palace.isBodyPalace ? <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{t("bodyPalace")}</p> : null}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {palace.majorStars.length > 0 ? (
                    palace.majorStars.map((star) => (
                      <span
                        key={`${palace.name}-${star.name}`}
                        className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-primary"
                      >
                        {getStarLabel(star.name)} {QUALITY_LABELS[star.quality]}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                      {t("noMajorStars")}
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">{t("minorStars")}</p>
                  {palace.minorStars.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {palace.minorStars.map((star) => (
                        <span
                          key={`${palace.name}-${star.name}`}
                          className="rounded-full bg-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-on-surface"
                        >
                          {getStarLabel(star.name)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-on-surface-variant italic">{t("noMinorStars")}</p>
                  )}
                </div>

                <p className="mt-4 text-xs leading-relaxed text-on-surface-variant">{palace.note}</p>
              </article>
            ))
          ) : (
            <div className="glass-border-panel rounded-[2rem] p-10 text-center md:col-span-2 xl:col-span-3">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary shadow-[0_0_30px_rgba(255,198,124,0.22)]">
                <Icon name="auto_awesome" className="text-4xl" />
              </div>
              <h2 className="mt-6 text-2xl font-black uppercase tracking-[0.2em] text-on-surface">{t("emptyTitle")}</h2>
              <p className="mt-3 text-sm text-on-surface-variant">
                {t("emptyDescription")}
              </p>
              {isPending ? <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">{t("calculating")}</p> : null}
              {error ? <p className="mt-4 text-sm font-semibold text-red-300">{error}</p> : null}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {(result
            ? [
                { label: t("labels.menh"), value: getBranchLabel(result.overview.menhBranch) },
                { label: t("labels.than"), value: getBranchLabel(result.overview.thanBranch) },
                { label: t("labels.cuc"), value: result.overview.cuc },
                { label: t("labels.birthYear"), value: result.overview.canChiYear },
              ]
            : [
                { label: t("labels.engine"), value: "Tử Vi Đẩu Số" },
                { label: t("labels.mode"), value: "12 Cung" },
                { label: t("labels.output"), value: "Mệnh + Thân + Đại hạn" },
              ]).map(({ label, value }) => (
            <div
              key={label}
              className="glass-border-panel-soft flex items-center gap-3 rounded-2xl px-5 py-2.5"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">{label}</span>
              <span className="text-xs font-black text-on-surface">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-border-panel-soft rounded-[2rem] p-6">
          <p className="text-sm font-black uppercase tracking-wider text-on-surface">{t("overviewTitle")}</p>
          <div className="mt-4 space-y-3">
            {summary.length > 0 ? (
              summary.map((item) => (
                <p key={item} className="text-sm leading-relaxed text-on-surface-variant">
                  {item}
                </p>
              ))
            ) : (
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {t("noSummary")}
              </p>
            )}
          </div>
        </div>

        <div className="glass-border-panel-soft rounded-[2rem] p-6">
          <p className="text-sm font-black uppercase tracking-wider text-on-surface">{t("keyStarsTitle")}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {keyStars.length > 0 ? (
              keyStars.map((star) => (
                <span key={star} className="rounded-full bg-primary/10 px-4 py-2 text-xs font-black uppercase text-primary">
                  {getStarLabel(star)}
                </span>
              ))
            ) : (
              <p className="text-sm text-on-surface-variant">{t("waitingMajorStars")}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="glass-border-panel-soft rounded-[2rem] p-6">
          <p className="text-sm font-black uppercase tracking-wider text-on-surface">{t("decadeTitle")}</p>
          <div className="mt-4 space-y-3">
            {decades.length > 0 ? (
              decades.map((item) => (
                <div key={`${item.palace}-${item.startAge}`} className="glass-border-panel-soft rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-primary">
                      {getPalaceLabel(item.palace)} | {getBranchLabel(item.branch)}
                    </span>
                    <span className="text-xs font-mono text-on-surface-variant">
                      {item.startAge}-{item.endAge} tuổi
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">{item.focus}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-on-surface-variant">{t("noDecades")}</p>
            )}
          </div>
        </div>

        <div className="glass-border-panel-soft rounded-[2rem] p-6">
          <p className="text-sm font-black uppercase tracking-wider text-on-surface">{t("quickAnalysis")}</p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">{t("coreTraits")}</p>
              {coreTraits.map((item) => (
                <p key={item} className="mt-1 text-sm text-on-surface-variant">
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">{t("career")}</p>
              {career.slice(0, 2).map((item) => (
                <p key={item} className="mt-1 text-sm text-on-surface-variant">
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">{t("relationship")}</p>
              {relationship.slice(0, 2).map((item) => (
                <p key={item} className="mt-1 text-sm text-on-surface-variant">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
