"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import type { TuViEngineResult } from "@/lib/bazi/types";
import { useSavedCharts } from "@/lib/hooks/useSavedCharts";
import { getBranchLabel } from "@/lib/bazi/display";
import Icon from "@/components/atoms/Icon";

interface Props {
  onLoad: (result: TuViEngineResult) => void;
}

type SavedChartCardProps = {
  id: string;
  result: TuViEngineResult;
  savedAt: string;
  labelAnonymous: string;
  labelDelete: string;
  labelLoad: string;
  onLoad: (result: TuViEngineResult) => void;
  onDelete: (id: string) => void;
};

const SavedChartCard = memo(function SavedChartCard({
  id,
  result,
  savedAt,
  labelAnonymous,
  labelDelete,
  labelLoad,
  onLoad,
  onDelete,
}: SavedChartCardProps) {
  const date = new Date(savedAt).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="glass-border-panel-soft group relative cursor-pointer rounded-xl p-4 transition-all hover:-translate-y-0.5"
      onClick={() => onLoad(result)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full glass-border-panel-soft text-on-surface-variant opacity-0 transition-all hover:text-error group-hover:opacity-100"
        aria-label={labelDelete}
      >
        <Icon name="close" className="text-sm" />
      </button>

      <p className="truncate pr-8 text-sm font-bold text-on-surface">
        {result.profile.fullName || labelAnonymous}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="glass-border-panel-soft rounded-full border border-primary/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
          {getBranchLabel(result.overview.menhBranch)}
        </span>
        <span className="glass-border-panel-soft rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">
          {result.overview.cuc}
        </span>
        <span className="glass-border-panel-soft rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">
          {result.overview.canChiYear}
        </span>
      </div>

      <p className="mt-2 text-[9px] text-outline">{date}</p>

      <div className="mt-3 flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
        <Icon name="open_in_new" className="text-sm" />
        <span className="text-[10px] font-semibold">{labelLoad}</span>
      </div>
    </div>
  );
});

export default function SavedChartsList({ onLoad }: Props) {
  const t = useTranslations("savedCharts");
  const { charts, deleteChart } = useSavedCharts();

  if (charts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon name="bookmarks" className="text-primary text-lg" />
        <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">
          {t("title", { count: charts.length })}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {charts.map((chart) => (
          <SavedChartCard
            key={chart.id}
            id={chart.id}
            result={chart.result}
            savedAt={chart.savedAt}
            labelAnonymous={t("anonymous")}
            labelDelete={t("delete")}
            labelLoad={t("load")}
            onLoad={onLoad}
            onDelete={deleteChart}
          />
        ))}
      </div>
    </div>
  );
}
