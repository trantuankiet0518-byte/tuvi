"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
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
      return;
    }

    saveChart(result);
    setJustSaved(true);

    if (resetSavedTimerRef.current !== undefined) {
      window.clearTimeout(resetSavedTimerRef.current);
    }

    resetSavedTimerRef.current = window.setTimeout(() => {
      setJustSaved(false);
    }, 2000);
  }, [deleteChart, result, saveChart, saved, savedId]);

  const vanHanHref = savedId ? `/views/${savedId}/vanhan` : null;

  return (
    <div className="col-span-12 space-y-8">
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
            Chào, {result.profile.fullName || "bạn"}!
          </h1>
          <p className="max-w-xl font-light text-on-surface-variant/80">
            Lá số đã được an định. Bảng lá số nằm trọn ở phía trên, còn toàn bộ phần diễn giải
            được gom xuống bên dưới để dễ theo dõi hơn.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest text-outline">
            <Icon name="calendar_today" className="text-sm text-primary-fixed-dim" />
            <span>{today}</span>
          </div>

          <button
            onClick={handleSave}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              saved
                ? "bg-primary/15 text-primary hover:bg-primary/25"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright hover:text-on-surface"
            }`}
          >
            <Icon name="bookmark" className="text-sm" />
            {justSaved ? "Đã lưu!" : saved ? "Bỏ lưu" : "Lưu lá số"}
          </button>

          {vanHanHref ? (
            <Link
              href={vanHanHref}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-all hover:opacity-90"
            >
              <Icon name="timeline" className="text-sm" />
              Phân tích vận hạn
            </Link>
          ) : null}

          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-lg bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:bg-surface-bright hover:text-on-surface"
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

        <div className="col-span-12 grid grid-cols-1 gap-5 xl:grid-cols-12">
          <LapLaSoVanHanCard
            result={result}
            className="xl:col-span-4"
            analysisHref={vanHanHref ?? undefined}
          />

          <div className="glass-border-panel relative col-span-12 overflow-hidden rounded-xl p-8 xl:col-span-8">
            <div className="relative z-10 flex h-full min-h-[160px] flex-col justify-between">
              <div>
                <Icon name="format_quote" className="mb-4 block text-3xl text-primary" />
                <h3 className="mb-6 text-xl font-medium italic leading-relaxed text-on-surface">
                  &ldquo;Mệnh tốt không bằng thân tốt, thân tốt không bằng vận tốt.&rdquo;
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant">
                  Phần bàn luận được đặt ngay dưới bảng để bạn xem lá số trước, rồi mới đọc diễn
                  giải theo từng lớp thông tin mà không bị chia màn hình.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <div className="h-px w-8 bg-outline-variant" />
                <span className="text-xs font-bold uppercase tracking-widest text-outline">
                  Góc kiến thức
                </span>
              </div>
            </div>
          </div>
        </div>

        <AnalysisSection result={result} />

        <button
          onClick={onReset}
          className="glass-border-panel col-span-12 flex cursor-pointer items-center justify-between rounded-xl p-8 text-left transition-all hover:-translate-y-0.5"
        >
          <div>
            <h3 className="mb-2 text-2xl font-bold text-on-surface">
              Sẵn sàng khám phá vận mệnh mới?
            </h3>
            <p className="max-w-sm text-sm text-on-surface-variant">
              Lập lá số mới để xem lại Mệnh, Thân cư {getPalaceLabel(result.overview.thanPalace)} và
              nhịp vận hạn của bạn.
            </p>
          </div>
          <div className="ml-6 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary text-on-primary elev-glow transition-transform group-hover:scale-110">
            <Icon name="add" className="text-3xl" />
          </div>
        </button>
      </div>
    </div>
  );
}
