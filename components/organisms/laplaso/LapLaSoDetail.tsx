"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TuViEngineResult } from "@/lib/bazi/types";
import LapLaSoMiniChart from "@/components/organisms/laplaso/LapLaSoMiniChart";
import LapLaSoVanHanCard from "@/components/organisms/laplaso/LapLaSoVanHanCard";
import { AnalysisSection } from "@/components/molecules";
import { useSavedCharts } from "@/lib/hooks/useSavedCharts";
import { getPalaceLabel } from "@/lib/bazi/display";
import Icon from "@/components/atoms/Icon";

interface LapLaSoDetailProps {
  result: TuViEngineResult;
  onReset: () => void;
}

export default function LapLaSoDetail({ result, onReset }: LapLaSoDetailProps) {
  const { saveChart, deleteChart, isSaved, getSavedId } = useSavedCharts();
  const [justSaved, setJustSaved] = useState(false);
  const resetSavedTimerRef = useRef<number | undefined>(undefined);

  const saved = isSaved(result);
  const savedId = getSavedId(result);

  const today = new Date().toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    return () => {
      if (resetSavedTimerRef.current !== undefined) {
        window.clearTimeout(resetSavedTimerRef.current);
      }
    };
  }, []);

  const handleSave = useCallback(() => {
    if (saved && savedId) {
      deleteChart(savedId);
      setJustSaved(false);
    } else {
      saveChart(result);
      setJustSaved(true);
      if (resetSavedTimerRef.current !== undefined) {
        window.clearTimeout(resetSavedTimerRef.current);
      }
      resetSavedTimerRef.current = window.setTimeout(() => {
        setJustSaved(false);
      }, 2000);
    }
  }, [deleteChart, result, saveChart, saved, savedId]);

  return (
    <div className="col-span-12 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-on-surface">
            Chào, {result.profile.fullName || "bạn"}!
          </h1>
          <p className="text-on-surface-variant/80 font-light max-w-xl">
            Lá số đã được an định. Hãy khám phá các cung, sao và vận hạn của bạn
            bên dưới.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-[0.6875rem] tracking-widest uppercase text-outline">
            <Icon name="calendar_today" className="text-primary-fixed-dim text-sm" />
            <span>{today}</span>
          </div>

          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              saved
                ? "bg-primary/15 text-primary hover:bg-primary/25"
                : "bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright"
            }`}
          >
            <Icon name="bookmark" className="text-sm" />
            {justSaved ? "Đã lưu!" : saved ? "Bỏ lưu" : "Lưu lá số"}
          </button>

          <button
            onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all text-sm font-semibold"
        >
            <Icon name="refresh" className="text-sm" />
            Lập lại
          </button>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "1.75rem",
        }}
      >
        <LapLaSoMiniChart result={result} />
        <LapLaSoVanHanCard result={result} />

        <div
          className="glass-border-panel col-span-12 md:col-span-6 lg:col-span-5 rounded-xl p-8 relative overflow-hidden group"
        >
          <div className="relative z-10 h-full flex flex-col justify-between min-h-[160px]">
          <div>
              <Icon name="format_quote" className="text-primary mb-4 block text-3xl" />
              <h3 className="text-xl font-medium italic leading-relaxed text-on-surface mb-6">
                &ldquo;Mệnh tốt không bằng thân tốt, thân tốt không bằng vận
                tốt.&rdquo;
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-outline-variant" />
              <span className="text-xs font-bold uppercase tracking-widest text-outline">
                Góc kiến thức
              </span>
            </div>
          </div>
        </div>

        <AnalysisSection result={result} />

        <button
          onClick={onReset}
          className="glass-border-panel col-span-12 md:col-span-6 lg:col-span-7 rounded-xl p-8 flex items-center justify-between group cursor-pointer text-left hover:bg-white/5 transition-all"
        >
          <div>
            <h3 className="text-2xl font-bold mb-2 text-on-surface">
              Sẵn sàng khám phá vận mệnh mới?
            </h3>
            <p className="text-on-surface-variant max-w-sm text-sm">
              Lập lá số mới để xem lại Mệnh, Thân cư{" "}
              {getPalaceLabel(result.overview.thanPalace)} và nhịp vận hạn của
              bạn.
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary elev-glow group-hover:scale-110 transition-transform flex-shrink-0 ml-6">
            <Icon name="add" className="text-3xl" />
          </div>
        </button>
      </div>
    </div>
  );
}
