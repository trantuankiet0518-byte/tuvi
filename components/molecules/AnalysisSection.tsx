import type { TuViEngineResult } from "@/lib/bazi/types";
import { getPalaceLabel, getStarLabel, getBranchLabel, QUALITY_COLORS, QUALITY_LABELS } from "@/lib/bazi/display";
import Icon from "@/components/atoms/Icon";

interface AnalysisSectionProps {
  result: TuViEngineResult;
}

export default function AnalysisSection({ result }: AnalysisSectionProps) {
  const { summary, analysis, decadeCycles, keyStars, palaces } = result;

  // Optimization: use fixed indices from the engine instead of find()
  const menhPalace = palaces[0];
  const quanLocPalace = palaces[4];
  const taiBachPalace = palaces[8];
  const phuThePalace = palaces[10];

  return (
    <>
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-white/10 bg-transparent p-6 space-y-3 shadow-lg backdrop-blur-xl"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <Icon name="summarize" className="text-primary text-sm" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Tổng quan lá số</h3>
          </div>
          {summary.map((line, i) => (
            <p key={i} className="text-sm leading-relaxed text-on-surface-variant">{line}</p>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-transparent p-6 space-y-3 shadow-lg backdrop-blur-xl"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <Icon name="stars" className="text-primary text-sm" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Cụm sao trọng tâm</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keyStars.length > 0 ? keyStars.map((s) => (
              <span key={s} className="rounded-full border border-primary/20 bg-transparent px-3 py-1 text-xs font-black uppercase text-primary">
                {getStarLabel(s)}
              </span>
            )) : (
              <p className="text-sm text-on-surface-variant">Không có sao trọng tâm.</p>
            )}
          </div>
          {menhPalace && menhPalace.majorStars.length > 0 && (
            <div className="pt-2 border-t border-outline-variant/10 space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-outline">Cung Mệnh · {getBranchLabel(menhPalace.branch)}</p>
              {menhPalace.majorStars.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${QUALITY_COLORS[s.quality]}`}>{getStarLabel(s.name)}</span>
                  <span className="text-[9px] text-outline">{QUALITY_LABELS[s.quality]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-white/10 bg-transparent p-6 space-y-3 shadow-lg backdrop-blur-xl"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <Icon name="timeline" className="text-tertiary text-sm" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Đại hạn mở đầu</h3>
          </div>
          {decadeCycles.slice(0, 4).map((d) => (
            <div key={`${d.palace}-${d.startAge}`} className="rounded-xl border border-white/8 bg-transparent p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-primary">
                  {getPalaceLabel(d.palace)} · {getBranchLabel(d.branch)}
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant">{d.startAge}–{d.endAge} tuổi</span>
              </div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">{d.focus}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-transparent p-6 space-y-4 shadow-lg backdrop-blur-xl"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <Icon name="psychology" className="text-secondary text-sm" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Phân tích nhanh</h3>
          </div>

          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary">Cốt cách</p>
            {analysis.coreTraits.map((t, i) => (
              <p key={i} className="text-xs text-on-surface-variant leading-relaxed">{t}</p>
            ))}
          </div>

          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary">Sự nghiệp</p>
            {analysis.career.map((t, i) => (
              <p key={i} className="text-xs text-on-surface-variant leading-relaxed">{t}</p>
            ))}
            {quanLocPalace && (
              <p className="text-[9px] text-outline mt-1">
                Quan Lộc ({getBranchLabel(quanLocPalace.branch)}):&nbsp;
                {quanLocPalace.majorStars.length > 0
                  ? quanLocPalace.majorStars.map((s) => getStarLabel(s.name)).join(", ")
                  : "Vô chính diệu"}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary">Tình cảm</p>
            {analysis.relationship.map((t, i) => (
              <p key={i} className="text-xs text-on-surface-variant leading-relaxed">{t}</p>
            ))}
            {phuThePalace && (
              <p className="text-[9px] text-outline mt-1">
                Phu Thê ({getBranchLabel(phuThePalace.branch)}):&nbsp;
                {phuThePalace.majorStars.length > 0
                  ? phuThePalace.majorStars.map((s) => getStarLabel(s.name)).join(", ")
                  : "Vô chính diệu"}
              </p>
            )}
          </div>

          {taiBachPalace && (
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-primary">Tài lộc</p>
              <p className="text-[9px] text-outline">
                Tài Bạch ({getBranchLabel(taiBachPalace.branch)}):&nbsp;
                {taiBachPalace.majorStars.length > 0
                  ? taiBachPalace.majorStars.map((s) => getStarLabel(s.name)).join(", ")
                  : "Vô chính diệu"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
