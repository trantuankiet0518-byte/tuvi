import type { TuViEngineResult } from "@/lib/bazi/types";
import { getBranchLabel, getPalaceLabel } from "@/lib/bazi/display";

interface DecadeProgressCardProps {
  result: TuViEngineResult;
}

function getCurrentAge(solarDateTime: string): number {
  try {
    const yearMatch = solarDateTime.match(/(\d{4})/);
    if (!yearMatch) return 30;
    const birthYear = parseInt(yearMatch[1]);
    return new Date().getFullYear() - birthYear;
  } catch {
    return 30;
  }
}

export default function DecadeProgressCard({ result }: DecadeProgressCardProps) {
  const currentAge = getCurrentAge(result.profile.solarDateTime);
  const currentDecade = result.decadeCycles.find(
    (d) => currentAge >= d.startAge && currentAge <= d.endAge
  ) ?? result.decadeCycles[0];

  const progress = currentDecade
    ? Math.min(100, Math.round(
        ((currentAge - currentDecade.startAge) /
          (currentDecade.endAge - currentDecade.startAge)) * 100
      ))
    : 0;

  if (!currentDecade) return null;

  return (
    <div className="rounded-xl border border-white/8 bg-transparent p-4 space-y-3 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-outline mb-1">Đại vận đang chạy</p>
          <p className="text-base font-black text-primary">
            {getPalaceLabel(currentDecade.palace)} · {getBranchLabel(currentDecade.branch)}
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            {currentDecade.startAge}–{currentDecade.endAge} tuổi
          </p>
        </div>
        <span className="text-2xl font-black text-primary/30">{progress}%</span>
      </div>
      <div className="w-full border border-white/8 bg-transparent h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[10px] text-on-surface-variant leading-relaxed">{currentDecade.focus}</p>
    </div>
  );
}
