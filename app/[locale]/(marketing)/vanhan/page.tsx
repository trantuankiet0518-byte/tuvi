import { getVanHanContent } from "@/app/api/vanhan/content";
import type { DayPrediction, PredictionTone } from "@/app/api/vanhan/content";

function SectionTitle({ title, eyebrow }: { title: string; eyebrow: string }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-on-surface md:text-4xl">{title}</h2>
    </div>
  );
}

const toneStyles: Record<PredictionTone, string> = {
  positive: "border-primary/20 bg-primary/10",
  neutral: "border-outline-variant/20 bg-surface-container-low/20",
  caution: "border-error/20 bg-error/10",
};

const toneDotStyles: Record<PredictionTone, string> = {
  positive: "bg-primary",
  neutral: "bg-on-surface-variant",
  caution: "bg-error",
};

const toneLabels: Record<PredictionTone, string> = {
  positive: "Thuận lợi",
  neutral: "Bình thường",
  caution: "Cẩn trọng",
};

function DayCard({ day, featured = false }: { day: DayPrediction; featured?: boolean }) {
  return (
    <div
      className={`rounded-[1.75rem] border p-6 ${toneStyles[day.tone]} ${featured ? "md:p-8" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-on-surface-variant">
            {day.label}
          </p>
          <p className={`mt-1 ${featured ? "text-2xl" : "text-lg"} font-black tracking-tight text-on-surface`}>
            {day.date}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${toneDotStyles[day.tone]}`} />
            <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              {toneLabels[day.tone]}
            </span>
          </div>
          <span className="rounded-full border border-outline-variant/15 bg-surface-container-low/40 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-on-surface-variant">
            {day.cung}
          </span>
        </div>
      </div>

      {day.stars.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {day.stars.map((star) => (
            <span
              key={star}
              className="rounded-full border border-outline-variant/10 bg-surface-container-low/30 px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-on-surface-variant"
            >
              {star}
            </span>
          ))}
        </div>
      )}

      <p className={`mt-4 ${featured ? "text-base" : "text-sm"} leading-7 text-on-surface-variant`}>
        {day.summary}
      </p>

      {featured && (
        <div className="mt-5 rounded-[1.25rem] border border-outline-variant/10 bg-surface-container-low/30 p-4">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-on-surface-variant">
            Lời khuyên
          </p>
          <p className="mt-2 text-sm leading-7 text-on-surface-variant">{day.advice}</p>
        </div>
      )}
    </div>
  );
}

export default async function VanHanPage() {
  const content = getVanHanContent();
  const pred = content.prediction;

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-6 pb-16 pt-24">
      <section className="ui-shell rounded-[2.75rem] p-8 md:p-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow={pred.subtitle} title={pred.title} />
          <div className="rounded-full border border-outline-variant/15 bg-surface-container-low/40 px-4 py-2">
            <span className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-on-surface-variant">
              Hôm nay âm lịch: {pred.lunarToday}
            </span>
          </div>
        </div>

        {/* Tomorrow – featured card */}
        <div className="mt-8">
          <p className="mb-4 text-[0.65rem] font-black uppercase tracking-[0.28em] text-on-surface-variant">
            Ngày mai – Lưu Nhật hạn
          </p>
          <DayCard day={pred.tomorrow} featured />
        </div>

        {/* Week segments */}
        <div className="mt-10">
          <p className="mb-6 text-[0.65rem] font-black uppercase tracking-[0.28em] text-on-surface-variant">
            Tuần tới – Lưu Nhật hạn ngày 22 → 28
          </p>
          <div className="space-y-6">
            {pred.weekSegments.map((segment) => (
              <div key={segment.period}>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-primary">
                  {segment.period}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {segment.days.map((day) => (
                    <DayCard key={day.date} day={day} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Week summary banner */}
        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="rounded-[1.5rem] border border-outline-variant/15 bg-surface-container-low/20 p-6">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-on-surface-variant">
              Tổng kết tuần
            </p>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">{pred.weekSummary}</p>
          </div>
          <div className="rounded-[1.5rem] border border-error/15 bg-error/5 p-6 md:max-w-xs">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-error">
              Điểm cần canh chừng
            </p>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">{pred.weekAdvice}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
