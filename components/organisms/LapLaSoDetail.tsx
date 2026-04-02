"use client";

import { useState } from "react";
import type { TuViEngineResult } from "@/lib/bazi/types";
import LapLaSoMiniChart from "@/components/organisms/LapLaSoMiniChart";
import LapLaSoVanHanCard from "@/components/organisms/LapLaSoVanHanCard";
import { getPalaceLabel, getStarLabel, getBranchLabel, QUALITY_COLORS, QUALITY_LABELS } from "@/lib/bazi/display";

// ─── Phân tích đầy đủ ─────────────────────────────────────────────────────────
function AnalysisSection({ result }: { result: TuViEngineResult }) {
  const { summary, analysis, decadeCycles, keyStars, palaces } = result;

  const menhPalace    = palaces.find((p) => p.isLifePalace);
  const quanLocPalace = palaces.find((p) => p.name === "Quan Loc");
  const taiBachPalace = palaces.find((p) => p.name === "Tai Bach");
  const phuThePalace  = palaces.find((p) => p.name === "Phu The");

  return (
    <>
      {/* Tổng quan + Cụm sao */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Tổng quan lá số */}
        <div className="rounded-2xl bg-surface-container-high/80 p-6 space-y-3 shadow-lg"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              summarize
            </span>
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Tổng quan lá số</h3>
          </div>
          {summary.map((line, i) => (
            <p key={i} className="text-sm leading-relaxed text-on-surface-variant">{line}</p>
          ))}
        </div>

        {/* Cụm sao trọng tâm */}
        <div className="rounded-2xl bg-surface-container-high/80 p-6 space-y-3 shadow-lg"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Cụm sao trọng tâm</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keyStars.length > 0 ? keyStars.map((s) => (
              <span key={s} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase text-primary">
                {getStarLabel(s)}
              </span>
            )) : (
              <p className="text-sm text-on-surface-variant">Không có sao trọng tâm.</p>
            )}
          </div>
          {/* Sao Mệnh chi tiết */}
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

      {/* Đại hạn + Phân tích nhanh */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Đại hạn mở đầu */}
        <div className="rounded-2xl bg-surface-container-high/80 p-6 space-y-3 shadow-lg"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-sm">timeline</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Đại hạn mở đầu</h3>
          </div>
          {decadeCycles.slice(0, 4).map((d) => (
            <div key={`${d.palace}-${d.startAge}`} className="rounded-xl bg-surface-container-highest p-3 space-y-1">
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

        {/* Phân tích nhanh */}
        <div className="rounded-2xl bg-surface-container-high/80 p-6 space-y-4 shadow-lg"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-sm">psychology</span>
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
import { useSavedCharts } from "@/lib/hooks/useSavedCharts";

interface LapLaSoDetailProps {
  result: TuViEngineResult;
  onReset: () => void;
}

export default function LapLaSoDetail({ result, onReset }: LapLaSoDetailProps) {
  const { saveChart, deleteChart, isSaved, getSavedId } = useSavedCharts();
  const [justSaved, setJustSaved] = useState(false);

  const saved   = isSaved(result);
  const savedId = getSavedId(result);

  const today = new Date().toLocaleDateString("vi-VN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const handleSave = () => {
    if (saved && savedId) {
      deleteChart(savedId);
      setJustSaved(false);
    } else {
      saveChart(result);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  return (
    <div className="col-span-12 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-on-surface">
            Chào, {result.profile.fullName || "bạn"}!
          </h1>
          <p className="text-on-surface-variant/80 font-light max-w-xl">
            Lá số đã được an định. Hãy khám phá các cung, sao và vận hạn của bạn bên dưới.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-[0.6875rem] tracking-widest uppercase text-outline">
            <span className="material-symbols-outlined text-primary-fixed-dim text-sm">calendar_today</span>
            <span>{today}</span>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              saved
                ? "bg-primary/15 text-primary hover:bg-primary/25"
                : "bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright"
            }`}
          >
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
            {justSaved ? "Đã lưu!" : saved ? "Bỏ lưu" : "Lưu lá số"}
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all text-sm font-semibold"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Lập lại
          </button>
        </div>
      </header>

      {/* Bento grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1.75rem" }}>
        <LapLaSoMiniChart result={result} />
        <LapLaSoVanHanCard result={result} />

        {/* Quote */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5 bg-surface-container-high rounded-xl p-8 relative overflow-hidden group"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="relative z-10 h-full flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="material-symbols-outlined text-primary mb-4 block text-3xl">format_quote</span>
              <h3 className="text-xl font-medium italic leading-relaxed text-on-surface mb-6">
                &ldquo;Mệnh tốt không bằng thân tốt, thân tốt không bằng vận tốt.&rdquo;
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-outline-variant" />
              <span className="text-xs font-bold uppercase tracking-widest text-outline">Góc kiến thức</span>
            </div>
          </div>
        </div>

        {/* ── Phân tích đầy đủ ── */}
        <AnalysisSection result={result} />

        {/* CTA */}
        <button
          onClick={onReset}
          className="col-span-12 md:col-span-6 lg:col-span-7 bg-gradient-to-br from-surface-container to-surface-container-high rounded-xl p-8 flex items-center justify-between group cursor-pointer text-left hover:from-surface-container-high hover:to-surface-bright transition-all"
        >
          <div>
            <h3 className="text-2xl font-bold mb-2 text-on-surface">Sẵn sàng khám phá vận mệnh mới?</h3>
            <p className="text-on-surface-variant max-w-sm text-sm">
              Lập lá số mới để xem lại Mệnh, Thân cư {getPalaceLabel(result.overview.thanPalace)} và nhịp vận hạn của bạn.
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary elev-glow group-hover:scale-110 transition-transform flex-shrink-0 ml-6">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
        </button>
      </div>
    </div>
  );
}
