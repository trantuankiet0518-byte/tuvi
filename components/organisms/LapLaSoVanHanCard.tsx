import type { TuViEngineResult } from "@/lib/bazi/types";
import { getBranchLabel, getPalaceLabel, getStarLabel } from "@/lib/bazi/display";

interface Props {
  result: TuViEngineResult;
}

export default function LapLaSoVanHanCard({ result }: Props) {
  const decades = result.decadeCycles.slice(0, 2);
  const keyStars = result.keyStars.slice(0, 4);
  const currentAge = 30;
  const currentDecade = result.decadeCycles.find((cycle) => currentAge >= cycle.startAge && currentAge <= cycle.endAge);
  const progress = currentDecade
    ? Math.round(((currentAge - currentDecade.startAge) / (currentDecade.endAge - currentDecade.startAge)) * 100)
    : 60;

  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="bg-surface-container rounded-xl p-6 h-full space-y-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">waves</span>
          <h2 className="text-lg font-bold text-on-surface">Vận hạn hiện tại</h2>
        </div>

        {keyStars.length > 0 ? (
          <div className="space-y-3">
            {keyStars.map((star, index) => (
              <div key={star} className="flex items-start gap-4">
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                    index % 2 === 0 ? "bg-primary shadow-[0_0_8px_rgba(255,193,116,0.6)]" : "bg-tertiary"
                  }`}
                />
                <div>
                  <div
                    className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
                      index % 2 === 0 ? "text-primary" : "text-tertiary"
                    }`}
                  >
                    {getStarLabel(star)}
                  </div>
                  {decades[index] ? (
                    <>
                      <div className="text-sm font-medium text-on-surface">
                        Cung {getPalaceLabel(decades[index].palace)} - {getBranchLabel(decades[index].branch)}
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed mt-1">{decades[index].focus}</p>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {currentDecade ? (
          <div className="p-4 bg-surface-container-low rounded-lg">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-outline">
                Đại vận {currentDecade.startAge}-{currentDecade.endAge} tuổi
              </span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : null}

        {result.summary[0] ? <p className="text-xs text-on-surface-variant leading-relaxed italic">{result.summary[0]}</p> : null}
      </div>
    </div>
  );
}
