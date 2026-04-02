import type { TuViDecadeCycle } from "@/lib/bazi/types";
import { getBranchLabel, getPalaceLabel } from "@/lib/bazi/display";

interface Props {
  decade: TuViDecadeCycle;
  isCurrent?: boolean;
}

export default function DecadeItem({ decade, isCurrent = false }: Props) {
  return (
    <div className={`rounded-xl p-3 space-y-1 ${isCurrent ? "bg-primary/10 ring-1 ring-primary/30" : "bg-surface-container"}`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-black ${isCurrent ? "text-primary" : "text-on-surface"}`}>
          {getPalaceLabel(decade.palace)} · {getBranchLabel(decade.branch)}
        </span>
        <span className="text-[10px] font-mono text-on-surface-variant">
          {decade.startAge}–{decade.endAge} tuổi
        </span>
      </div>
      <p className="text-[10px] text-on-surface-variant leading-relaxed">{decade.focus}</p>
    </div>
  );
}
