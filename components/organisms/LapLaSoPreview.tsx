import type { TuViEngineResult } from "@/lib/bazi/types";
import { getBranchLabel, getPalaceLabel, getStarLabel, QUALITY_LABELS } from "@/lib/bazi/display";

interface LapLaSoPreviewProps {
  result: TuViEngineResult | null;
  isPending: boolean;
  error: string | null;
  timezone: string;
}

export default function LapLaSoPreview({ result, isPending, error, timezone }: LapLaSoPreviewProps) {
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
          <span className="text-[0.6875rem] font-black uppercase tracking-[0.3em] text-primary">Live Preview</span>
          <h3 className="text-xl font-black tracking-tight text-on-surface">{result ? "Lá số tử vi 12 cung" : "Bản đồ sao"}</h3>
        </div>
        <span className="rounded-md bg-surface-container px-2 py-1 font-mono text-[10px] tracking-tighter text-on-surface-variant">
          TZ: {timezone}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-container p-10 shadow-2xl shadow-background/50">
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
                className="rounded-[2rem] border border-white/10 bg-surface-container/50 p-5 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-primary">{getPalaceLabel(palace.name)}</p>
                    <h4 className="mt-2 text-2xl font-black tracking-tight text-on-surface">{getBranchLabel(palace.branch)}</h4>
                  </div>
                  <div className="space-y-1 text-right">
                    {palace.isLifePalace ? <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Mệnh</p> : null}
                    {palace.isBodyPalace ? <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Thân</p> : null}
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
                      Vô chính diệu
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Phụ tinh</p>
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
                    <p className="text-xs text-on-surface-variant italic">Không có phụ tinh.</p>
                  )}
                </div>

                <p className="mt-4 text-xs leading-relaxed text-on-surface-variant">{palace.note}</p>
              </article>
            ))
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-surface-container/30 p-10 text-center md:col-span-2 xl:col-span-3">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
              </div>
              <h2 className="mt-6 text-2xl font-black uppercase tracking-[0.2em] text-on-surface">Mệnh bàn</h2>
              <p className="mt-3 text-sm text-on-surface-variant">
                Nhập thông tin bên trái để an Mệnh, an Thân, sắp 12 cung và sinh bộ sao Tử Vi.
              </p>
              {isPending ? <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">Đang tính toán...</p> : null}
              {error ? <p className="mt-4 text-sm font-semibold text-red-300">{error}</p> : null}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {(result
            ? [
                { label: "Mệnh", value: getBranchLabel(result.overview.menhBranch) },
                { label: "Thân", value: getBranchLabel(result.overview.thanBranch) },
                { label: "Cục", value: result.overview.cuc },
                { label: "Năm sinh", value: result.overview.canChiYear },
              ]
            : [
                { label: "Engine", value: "Tử Vi Đẩu Số" },
                { label: "Mode", value: "12 Cung" },
                { label: "Output", value: "Mệnh + Thân + Đại hạn" },
              ]).map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl bg-surface-container/50 px-5 py-2.5 shadow-sm backdrop-blur-md"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">{label}</span>
              <span className="text-xs font-black text-on-surface">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-surface-container/30 p-6">
          <p className="text-sm font-black uppercase tracking-wider text-on-surface">Tổng quan lá số</p>
          <div className="mt-4 space-y-3">
            {summary.length > 0 ? (
              summary.map((item) => (
                <p key={item} className="text-sm leading-relaxed text-on-surface-variant">
                  {item}
                </p>
              ))
            ) : (
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Chưa có dữ liệu để diễn giải. Khi tính xong, khu vực này sẽ tóm tắt Mệnh, Thân, cục và trục nghề nghiệp.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] bg-surface-container/30 p-6">
          <p className="text-sm font-black uppercase tracking-wider text-on-surface">Cụm sao trọng tâm</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {keyStars.length > 0 ? (
              keyStars.map((star) => (
                <span key={star} className="rounded-full bg-primary/10 px-4 py-2 text-xs font-black uppercase text-primary">
                  {getStarLabel(star)}
                </span>
              ))
            ) : (
              <p className="text-sm text-on-surface-variant">Đang chờ bộ sao chính tinh.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] bg-surface-container/30 p-6">
          <p className="text-sm font-black uppercase tracking-wider text-on-surface">Đại hạn mở đầu</p>
          <div className="mt-4 space-y-3">
            {decades.length > 0 ? (
              decades.map((item) => (
                <div key={`${item.palace}-${item.startAge}`} className="rounded-2xl bg-surface-container/50 p-4">
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
              <p className="text-sm text-on-surface-variant">Chưa có dữ liệu đại hạn.</p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] bg-surface-container/30 p-6">
          <p className="text-sm font-black uppercase tracking-wider text-on-surface">Phân tích nhanh</p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Cốt cách</p>
              {coreTraits.map((item) => (
                <p key={item} className="mt-1 text-sm text-on-surface-variant">
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Sự nghiệp</p>
              {career.slice(0, 2).map((item) => (
                <p key={item} className="mt-1 text-sm text-on-surface-variant">
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Tình cảm</p>
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
