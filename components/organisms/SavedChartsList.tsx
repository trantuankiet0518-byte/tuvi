"use client";

import type { TuViEngineResult } from "@/lib/bazi/types";
import { useSavedCharts } from "@/lib/hooks/useSavedCharts";
import { getBranchLabel } from "@/lib/bazi/display";

interface Props {
  onLoad: (result: TuViEngineResult) => void;
}

export default function SavedChartsList({ onLoad }: Props) {
  const { charts, deleteChart } = useSavedCharts();

  if (charts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span
          className="material-symbols-outlined text-primary text-lg"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          bookmarks
        </span>
        <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">
          Lá số đã lưu ({charts.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {charts.map((chart) => {
          const { result, savedAt, id } = chart;
          const date = new Date(savedAt).toLocaleDateString("vi-VN", {
            day: "numeric", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
          });

          return (
            <div
              key={id}
              className="group relative rounded-xl bg-surface-container-low p-4 hover:bg-surface-container-high transition-all cursor-pointer"
              onClick={() => onLoad(result)}
            >
              {/* Delete button */}
              <button
                onClick={(e) => { e.stopPropagation(); deleteChart(id); }}
                className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant opacity-0 group-hover:opacity-100 hover:text-error transition-all"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>

              {/* Name */}
              <p className="text-sm font-bold text-on-surface truncate pr-8">
                {result.profile.fullName || "Ẩn danh"}
              </p>

              {/* Info chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {getBranchLabel(result.overview.menhBranch)}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-full">
                  {result.overview.cuc}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-full">
                  {result.overview.canChiYear}
                </span>
              </div>

              {/* Saved date */}
              <p className="text-[9px] text-outline mt-2">{date}</p>

              {/* Load hint */}
              <div className="flex items-center gap-1 mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span className="text-[10px] font-semibold">Xem lá số</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
