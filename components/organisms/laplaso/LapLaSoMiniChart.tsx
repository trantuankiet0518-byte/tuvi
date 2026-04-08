"use client";

import { memo, useMemo, useState } from "react";
import type { TuViEngineResult, TuViPalace } from "@/lib/bazi/types";
import { getBranchLabel } from "@/lib/bazi/display";
import PalaceCell from "@/components/molecules/PalaceCell";
import InfoChip from "@/components/atoms/InfoChip";
import PalaceDetailModal from "@/components/organisms/laplaso/PalaceDetailModal";
import Icon from "@/components/atoms/Icon";

interface Props {
  result: TuViEngineResult;
}

const RING_LAYOUT: Array<string | null> = [
  "Ti", "Ngo", "Mui", "Than",
  "Thin", null, null, "Dau",
  "Mao", null, null, "Tuat",
  "Dan", "Suu", "Ty", "Hoi",
];

const ThienBan = memo(function ThienBan({ result }: { result: TuViEngineResult }) {
  const info: [string, string][] = useMemo(
    () => [
      ["Họ tên", result.profile.fullName || "Ẩn danh"],
      ["Giới tính", result.profile.genderLabel],
      ["Dương lịch", result.profile.solarDateTime],
      ["Âm lịch", result.profile.lunarDateTime],
      ["Năm can chi", result.overview.canChiYear],
      ["Ngày can chi", result.overview.canChiDay],
      ["Mệnh", getBranchLabel(result.overview.menhBranch)],
      ["Thân", getBranchLabel(result.overview.thanBranch)],
      ["Cục", result.overview.cuc],
      ["Múi giờ", result.profile.timezone],
    ],
    [result],
  );

  return (
    <div className="glass-border-panel-soft flex h-full flex-col rounded-[20px] p-5 md:p-6">
      <div className="mb-4 text-center">
        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Thiên Bàn</div>
        <div className="mt-1 text-base font-black text-on-surface">Bắc Tông</div>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2">
        {info.map(([label, value]) => (
          <div key={label} className="glass-border-panel-soft rounded-lg px-3 py-2">
            <div className="text-[8px] font-black uppercase tracking-[0.2em] text-outline">{label}</div>
            <div className="mt-1 truncate text-[11px] font-semibold leading-snug text-on-surface md:text-xs">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default function LapLaSoMiniChart({ result }: Props) {
  const [selectedPalace, setSelectedPalace] = useState<TuViPalace | null>(null);

  const palaceByBranch = useMemo(
    () => Object.fromEntries(result.palaces.map((palace) => [palace.branch, palace])),
    [result.palaces],
  );

  const overviewInfo = useMemo(
    () => [
      { label: "Mệnh", value: getBranchLabel(result.overview.menhBranch) },
      { label: "Thân", value: getBranchLabel(result.overview.thanBranch) },
      { label: "Cục", value: result.overview.cuc },
      { label: "Năm sinh", value: result.overview.canChiYear },
      { label: "Âm dương", value: result.overview.amDuong },
    ],
    [result.overview],
  );

  return (
    <>
      <div className="glass-border-panel relative col-span-12 overflow-hidden rounded-xl p-6 md:p-7">
        <div className="pointer-events-none absolute right-0 top-0 select-none p-6 opacity-[0.15]">
          <Icon name="auto_awesome" className="text-[100px]" />
        </div>

        <div className="relative z-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-primary md:text-2xl">Lá số Bắc Tông</h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                Chạm vào từng cung để xem phụ tinh và phần giải thích chi tiết
              </p>
            </div>
            <span className="glass-border-panel-soft rounded-full px-3.5 py-1.5 text-sm text-outline">
              {result.overview.canChiYear}
            </span>
          </div>

          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gridTemplateRows: "repeat(4, minmax(0, 1fr))",
            }}
          >
            {RING_LAYOUT.map((branch, index) => {
              if (index === 5) {
                return (
                  <div key="center" style={{ gridColumn: "2 / span 2", gridRow: "2 / span 2" }}>
                    <ThienBan result={result} />
                  </div>
                );
              }

              if (index === 6 || index === 9 || index === 10 || !branch) {
                return null;
              }

              const palace = palaceByBranch[branch];
              if (!palace) {
                return (
                  <div
                    key={index}
                    className="glass-border-panel-soft min-h-[152px] rounded-xl md:min-h-[172px]"
                  />
                );
              }

              return (
                <PalaceCell
                  key={branch}
                  palace={palace}
                  onClick={() => setSelectedPalace(palace)}
                />
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {overviewInfo.map(({ label, value }) => (
              <InfoChip key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>

      {selectedPalace && (
        <PalaceDetailModal palace={selectedPalace} onClose={() => setSelectedPalace(null)} />
      )}
    </>
  );
}
