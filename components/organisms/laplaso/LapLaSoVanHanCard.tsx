import type { TuViEngineResult } from "@/lib/bazi/types";
import { getBranchLabel, getPalaceLabel, getStarLabel, QUALITY_COLORS, QUALITY_LABELS } from "@/lib/bazi/display";
import Icon from "@/components/atoms/Icon";

interface Props {
  result: TuViEngineResult;
}

// Tính tuổi hiện tại từ năm sinh trong solarDateTime
function getCurrentAge(solarDateTime: string): number {
  try {
    // solarDateTime dạng "2024-03-15 12:00" hoặc tương tự
    const yearMatch = solarDateTime.match(/(\d{4})/);
    if (!yearMatch) return 30;
    const birthYear = parseInt(yearMatch[1]);
    return new Date().getFullYear() - birthYear;
  } catch {
    return 30;
  }
}

export default function LapLaSoVanHanCard({ result }: Props) {
  const currentAge    = getCurrentAge(result.profile.solarDateTime);
  const currentDecade = result.decadeCycles.find(
    (d) => currentAge >= d.startAge && currentAge <= d.endAge
  ) ?? result.decadeCycles[0];

  const progress = currentDecade
    ? Math.min(100, Math.round(
        ((currentAge - currentDecade.startAge) /
          (currentDecade.endAge - currentDecade.startAge)) * 100
      ))
    : 0;

  // Lấy cung Mệnh và Thân để hiển thị sao trọng tâm
  const menhPalace = result.palaces.find((p) => p.isLifePalace);
  const thanPalace = result.palaces.find((p) => p.isBodyPalace);
  const quanLocPalace = result.palaces.find((p) => p.name === "Quan Loc");

  // Key stars từ Mệnh + Quan Lộc
  const keyStarObjects = [
    ...(menhPalace?.majorStars ?? []),
    ...(quanLocPalace?.majorStars ?? []),
  ].slice(0, 4);

  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="glass-border-panel rounded-xl p-6 h-full space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Icon name="waves" className="text-tertiary" />
          <h2 className="text-lg font-bold text-on-surface">Vận hạn hiện tại</h2>
        </div>

        {/* Đại vận hiện tại */}
        {currentDecade && (
          <div className="glass-border-panel-soft rounded-xl p-4 space-y-3">
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
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-on-surface-variant leading-relaxed">{currentDecade.focus}</p>
          </div>
        )}

        {/* Sao trọng tâm cung Mệnh */}
        {keyStarObjects.length > 0 && (
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-outline">Sao trọng tâm</p>
            {keyStarObjects.map((star, i) => (
              <div key={star.name} className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  i % 2 === 0 ? "bg-primary shadow-[0_0_8px_rgba(255,193,116,0.5)]" : "bg-tertiary"
                }`} />
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-bold ${QUALITY_COLORS[star.quality]}`}>
                    {getStarLabel(star.name)}
                  </span>
                  <span className="text-[9px] text-outline ml-1.5">{QUALITY_LABELS[star.quality]}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mệnh & Thân */}
        <div className="grid grid-cols-2 gap-2">
          {menhPalace && (
            <div className="glass-border-panel-soft rounded-lg p-3">
              <p className="text-[8px] font-black uppercase tracking-widest text-primary mb-1">Cung Mệnh</p>
              <p className="text-sm font-bold text-on-surface">{getBranchLabel(menhPalace.branch)}</p>
              <p className="text-[9px] text-on-surface-variant mt-0.5">
                {menhPalace.majorStars.length > 0
                  ? menhPalace.majorStars.map((s) => getStarLabel(s.name)).join(", ")
                  : "Vô chính diệu"}
              </p>
            </div>
          )}
          {thanPalace && (
            <div className="glass-border-panel-soft rounded-lg p-3">
              <p className="text-[8px] font-black uppercase tracking-widest text-tertiary mb-1">Cung Thân</p>
              <p className="text-sm font-bold text-on-surface">{getBranchLabel(thanPalace.branch)}</p>
              <p className="text-[9px] text-on-surface-variant mt-0.5">
                {getPalaceLabel(thanPalace.name)}
              </p>
            </div>
          )}
        </div>

        {/* Tóm tắt */}
        {result.summary[0] && (
          <p className="text-[10px] text-on-surface-variant leading-relaxed italic border-t border-outline-variant/10 pt-3">
            {result.summary[0]}
          </p>
        )}
      </div>
    </div>
  );
}
