"use client";

import { memo } from "react";
import type { TuViPalace, TuViStar } from "@/lib/bazi/types";
import {
  getBranchLabel,
  getPalaceLabel,
  QUALITY_COLORS,
  QUALITY_LABELS,
  getStarLabel,
} from "@/lib/bazi/display";
import Icon from "@/components/atoms/Icon";

function StarLine({ star }: { star: TuViStar }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className={`text-[11px] font-bold leading-tight md:text-xs ${QUALITY_COLORS[star.quality]}`}>
        {getStarLabel(star.name)}
      </span>
      <span className="shrink-0 text-[9px] text-outline/70">{QUALITY_LABELS[star.quality]}</span>
    </div>
  );
}

interface Props {
  palace: TuViPalace;
  onClick?: () => void;
}

const PalaceCell = memo(function PalaceCell({ palace, onClick }: Props) {
  const hasMinor = palace.minorStars.length > 0;

  return (
    <button
      onClick={onClick}
      className={`
        glass-border-panel-soft min-h-[152px] w-full rounded-xl p-3.5 text-left
        transition-all duration-200 hover:scale-[1.02] hover:bg-white/5 active:scale-[0.98]
        md:min-h-[172px] md:p-4
        ${palace.isLifePalace ? "ring-1 ring-primary/50" : palace.isBodyPalace ? "ring-1 ring-tertiary/40" : ""}
      `}
    >
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11px] font-medium text-outline md:text-xs">
              {getBranchLabel(palace.branch)}
            </div>
            <div className="text-[10px] font-semibold uppercase leading-tight tracking-wide text-on-surface-variant md:text-[11px]">
              {getPalaceLabel(palace.name)}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            {palace.isLifePalace && (
              <span className="rounded border border-primary/20 bg-transparent px-1.5 py-0.5 text-[8px] font-black uppercase text-primary">
                Mệnh
              </span>
            )}
            {palace.isBodyPalace && (
              <span className="rounded border border-tertiary/20 bg-transparent px-1.5 py-0.5 text-[8px] font-black uppercase text-tertiary">
                Thân
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-1">
          {palace.majorStars.length === 0 ? (
            <span className="text-[10px] italic text-outline/50 md:text-[11px]">Vô chính diệu</span>
          ) : (
            palace.majorStars.map((star) => <StarLine key={star.name} star={star} />)
          )}
        </div>

        {hasMinor && (
          <div className="flex items-center gap-1.5 border-t border-white/10 pt-1.5">
            <Icon name="auto_awesome" className="text-[11px] text-outline/60" />
            <span className="text-[9px] text-outline/60">{palace.minorStars.length} phụ tinh</span>
            <span className="ml-auto text-[8px] font-semibold text-primary/60">Chi tiết -&gt;</span>
          </div>
        )}
      </div>
    </button>
  );
});

export default PalaceCell;
