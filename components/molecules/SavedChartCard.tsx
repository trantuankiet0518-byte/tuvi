"use client";

import type { TuViEngineResult } from "@/lib/bazi/types";
import { getBranchLabel } from "@/lib/bazi/display";

interface Props {
  id: string;
  result: TuViEngineResult;
  savedAt: string;
  onLoad: () => void;
  onDelete: () => void;
}

export default function SavedChartCard({ id, result, savedAt, onLoad, onDelete }: Props) {
  const date = new Date(savedAt).toLocaleDateString("vi-VN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div
      className="group relative rounded-xl bg-surface-container-low p-4 hover:bg-surface-container-high transition-all cursor-pointer"
      onClick={onLoad}
    >
      {/* Delete */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant opacity-0 group-hover:opacity-100 hover:text-error transition-all"
        aria-label="Xóa lá số"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>

      <p className="text-sm font-bold text-on-surface truncate pr-8">
        {result.profile.fullName || "Ẩn danh"}
      </p>

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

      <p className="text-[9px] text-outline mt-2">{date}</p>

      <div className="flex items-center gap-1 mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="material-symbols-outlined text-sm">open_in_new</span>
        <span className="text-[10px] font-semibold">Xem lá số</span>
      </div>
    </div>
  );
}
