"use client";

import { useTranslations } from "next-intl";
import type { TuViEngineResult } from "@/lib/bazi/types";
import { getBranchLabel } from "@/lib/bazi/display";
import Icon from "@/components/atoms/Icon";

interface Props {
  result: TuViEngineResult;
  savedAt: string;
  onLoad: () => void;
  onDelete: () => void;
}

export default function SavedChartCard({ result, savedAt, onLoad, onDelete }: Props) {
  const t = useTranslations("savedCharts");
  const date = new Date(savedAt).toLocaleDateString("vi-VN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div
      className="group relative rounded-xl border border-white/10 bg-transparent p-4 hover:bg-white/5 transition-all cursor-pointer backdrop-blur-xl"
      onClick={onLoad}
    >
      {/* Delete */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full border border-white/10 bg-transparent text-on-surface-variant opacity-0 group-hover:opacity-100 hover:text-error transition-all"
        aria-label={t("delete")}
      >
        <Icon name="close" className="text-sm" />
      </button>

      <p className="text-sm font-bold text-on-surface truncate pr-8">
        {result.profile.fullName || t("anonymous")}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-2">
        <span className="text-[9px] font-bold uppercase tracking-wider text-primary border border-primary/20 bg-transparent px-2 py-0.5 rounded-full">
          {getBranchLabel(result.overview.menhBranch)}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant border border-white/10 bg-transparent px-2 py-0.5 rounded-full">
          {result.overview.cuc}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant border border-white/10 bg-transparent px-2 py-0.5 rounded-full">
          {result.overview.canChiYear}
        </span>
      </div>

      <p className="text-[9px] text-outline mt-2">{date}</p>

      <div className="flex items-center gap-1 mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon name="open_in_new" className="text-sm" />
        <span className="text-[10px] font-semibold">{t("load")}</span>
      </div>
    </div>
  );
}
