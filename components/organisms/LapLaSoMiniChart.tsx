"use client";

import { useState } from "react";
import type { TuViEngineResult, TuViPalace } from "@/lib/bazi/types";
import { getBranchLabel } from "@/lib/bazi/display";
import PalaceCell from "@/components/molecules/PalaceCell";
import InfoChip from "@/components/atoms/InfoChip";
import PalaceDetailModal from "@/components/organisms/PalaceDetailModal";

interface Props {
  result: TuViEngineResult;
}

const RING_LAYOUT: Array<string | null> = [
  "Ti",   "Ngo",  "Mui",  "Than",
  "Thin", null,   null,   "Dau",
  "Mao",  null,   null,   "Tuat",
  "Dan",  "Suu",  "Ty",   "Hoi",
];

function ThienBan({ result }: { result: TuViEngineResult }) {
  const info: [string, string][] = [
    ["Họ tên",     result.profile.fullName || "Ẩn danh"],
    ["Giới tính",  result.profile.genderLabel],
    ["Dương lịch", result.profile.solarDateTime],
    ["Âm lịch",    result.profile.lunarDateTime],
    ["Năm can chi",result.overview.canChiYear],
    ["Ngày can chi",result.overview.canChiDay],
    ["Mệnh",       getBranchLabel(result.overview.menhBranch)],
    ["Thân",       getBranchLabel(result.overview.thanBranch)],
    ["Cục",        result.overview.cuc],
    ["Múi giờ",    result.profile.timezone],
  ];

  return (
    <div className="rounded-[20px] bg-[radial-gradient(circle_at_top,rgba(210,171,98,0.15),rgba(23,31,51,0.95)_60%)] p-4 h-full flex flex-col">
      <div className="text-center mb-3">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Thiên Bàn</div>
        <div className="text-sm font-black text-on-surface mt-1">Bắc Tông</div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {info.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-surface-container-low/70 px-2 py-1.5">
            <div className="text-[7px] font-black uppercase tracking-[0.2em] text-outline">{label}</div>
            <div className="text-[10px] font-semibold text-on-surface leading-snug mt-0.5 truncate">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LapLaSoMiniChart({ result }: Props) {
  const [selectedPalace, setSelectedPalace] = useState<TuViPalace | null>(null);
  const palaceByBranch = Object.fromEntries(result.palaces.map((p) => [p.branch, p]));

  return (
    <>
      <div
        className="col-span-12 lg:col-span-8 rounded-xl p-5 relative overflow-hidden"
        style={{ background: "rgba(49,57,77,0.4)", backdropFilter: "blur(20px)" }}
      >
        <div className="absolute top-0 right-0 p-6 opacity-[0.05] pointer-events-none select-none">
          <span className="material-symbols-outlined text-[100px]">auto_awesome</span>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-primary">Lá số Bắc Tông</h2>
              <p className="text-[10px] text-on-surface-variant mt-0.5">
                Click vào cung để xem chi tiết phụ tinh và giải thích
              </p>
            </div>
            <span className="text-xs text-outline bg-surface-container-high px-3 py-1 rounded-full">
              {result.overview.canChiYear}
            </span>
          </div>

          <div
            className="grid gap-2"
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
              if (index === 6 || index === 9 || index === 10) return null;
              if (!branch) return null;

              const palace = palaceByBranch[branch];
              if (!palace) return <div key={index} className="rounded-xl bg-surface-container-low/30 min-h-[130px]" />;

              return (
                <PalaceCell
                  key={branch}
                  palace={palace}
                  onClick={() => setSelectedPalace(palace)}
                />
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {[
              { label: "Mệnh",     value: getBranchLabel(result.overview.menhBranch) },
              { label: "Thân",     value: getBranchLabel(result.overview.thanBranch) },
              { label: "Cục",      value: result.overview.cuc },
              { label: "Năm sinh", value: result.overview.canChiYear },
              { label: "Âm dương", value: result.overview.amDuong },
            ].map(({ label, value }) => (
              <InfoChip key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>

      {selectedPalace && (
        <PalaceDetailModal
          palace={selectedPalace}
          onClose={() => setSelectedPalace(null)}
        />
      )}
    </>
  );
}
