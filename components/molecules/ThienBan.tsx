import type { TuViEngineResult } from "@/lib/bazi/types";
import { getBranchLabel } from "@/lib/bazi/display";

interface ThienBanProps {
  result: TuViEngineResult;
}

export default function ThienBan({ result }: ThienBanProps) {
  const info: [string, string][] = [
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
  ];

  return (
    <div className="rounded-[20px] border border-white/10 bg-transparent p-4 h-full flex flex-col backdrop-blur-xl">
      <div className="text-center mb-3">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Thiên Bàn</div>
        <div className="text-sm font-black text-on-surface mt-1">Bắc Tông</div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {info.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/8 bg-transparent px-2 py-1.5">
            <div className="text-[7px] font-black uppercase tracking-[0.2em] text-outline">{label}</div>
            <div className="text-[10px] font-semibold text-on-surface leading-snug mt-0.5 truncate">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
