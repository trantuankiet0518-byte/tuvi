"use client";

import type { TuViPalace, TuViStar } from "@/lib/bazi/types";
import { getBranchLabel, getPalaceLabel, QUALITY_COLORS, QUALITY_LABELS, getStarLabel } from "@/lib/bazi/display";

function StarLine({ star }: { star: TuViStar }) {
  return (
    <div className="flex items-start justify-between gap-1">
      <span className={`text-[10px] font-bold leading-tight ${QUALITY_COLORS[star.quality]}`}>
        {getStarLabel(star.name)}
      </span>
      <span className="text-[8px] text-outline/70 shrink-0">{QUALITY_LABELS[star.quality]}</span>
    </div>
  );
}

interface Props {
  palace: TuViPalace;
  onClick?: () => void;
}

export default function PalaceCell({ palace, onClick }: Props) {
  const hasMinor = palace.minorStars.length > 0;

  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl p-3 flex flex-col gap-1.5 text-left w-full
        bg-surface-container-low min-h-[130px]
        hover:bg-surface-container-high transition-all duration-200
        hover:scale-[1.02] active:scale-[0.98]
        ${palace.isLifePalace ? "ring-1 ring-primary/50" : palace.isBodyPalace ? "ring-1 ring-tertiary/40" : ""}
      `}
    >
      {/* Branch + badges */}
      <div className="flex items-start justify-between gap-1">
        <div>
          <div className="text-[10px] text-outline font-medium">{getBranchLabel(palace.branch)}</div>
          <div className="text-[9px] text-on-surface-variant font-semibold uppercase tracking-wide leading-tight">
            {getPalaceLabel(palace.name)}
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          {palace.isLifePalace && (
            <span className="text-[7px] font-black uppercase text-primary bg-primary/10 px-1 py-0.5 rounded">Mệnh</span>
          )}
          {palace.isBodyPalace && (
            <span className="text-[7px] font-black uppercase text-tertiary bg-tertiary/10 px-1 py-0.5 rounded">Thân</span>
          )}
        </div>
      </div>

      {/* Chính tinh */}
      <div className="flex-1 space-y-0.5">
        {palace.majorStars.length === 0 ? (
          <span className="text-[9px] text-outline/50 italic">Vô chính diệu</span>
        ) : (
          palace.majorStars.map((s) => <StarLine key={s.name} star={s} />)
        )}
      </div>

      {/* Phụ tinh hint */}
      {hasMinor && (
        <div className="flex items-center gap-1 pt-1 border-t border-outline-variant/10">
          <span className="material-symbols-outlined text-[10px] text-outline/60">auto_awesome</span>
          <span className="text-[8px] text-outline/60">{palace.minorStars.length} phụ tinh</span>
          <span className="ml-auto text-[7px] text-primary/60 font-semibold">Chi tiết →</span>
        </div>
      )}
    </button>
  );
}
