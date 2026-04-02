import type { TuViEngineResult, TuViPalace, TuViStar } from "@/lib/bazi/types";
import {
  getBranchLabel,
  getElementLabel,
  getPalaceLabel,
  getStarLabel,
  QUALITY_COLORS,
  QUALITY_LABELS,
} from "@/lib/bazi/display";

interface Props {
  result: TuViEngineResult;
}

const RING_LAYOUT: Array<string | null> = [
  "Ti",
  "Ngo",
  "Mui",
  "Than",
  "Thin",
  null,
  null,
  "Dau",
  "Mao",
  null,
  null,
  "Tuat",
  "Dan",
  "Suu",
  "Ty",
  "Hoi",
];

function ElementPill({ value }: { value: string }) {
  return (
    <span className="rounded-full border border-outline-variant/20 bg-surface-container-high px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-on-surface">
      {getElementLabel(value)}
    </span>
  );
}

function StarLine({ star }: { star: TuViStar }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <div className={`text-[10px] font-bold leading-tight ${QUALITY_COLORS[star.quality]}`}>{getStarLabel(star.name)}</div>
        <div className="text-[8px] text-outline/70 uppercase tracking-wider">{QUALITY_LABELS[star.quality]}</div>
      </div>
      <ElementPill value={star.element} />
    </div>
  );
}

function MinorStarTag({ star }: { star: TuViStar }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md bg-surface-container-high/40 px-2 py-1">
      <span className="text-[8px] text-on-surface-variant leading-tight">{getStarLabel(star.name)}</span>
      <span className="text-[8px] font-bold uppercase tracking-wider text-outline">{getElementLabel(star.element)}</span>
    </div>
  );
}

function PalaceCell({ palace }: { palace: TuViPalace }) {
  return (
    <div
      className={`rounded-xl p-3 flex flex-col gap-2 bg-surface-container-low min-h-[210px] ${
        palace.isLifePalace ? "ring-1 ring-primary/50" : palace.isBodyPalace ? "ring-1 ring-tertiary/40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[10px] text-outline font-medium">{getBranchLabel(palace.branch)}</div>
          <div className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wide">{getPalaceLabel(palace.name)}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <ElementPill value={palace.element} />
          {palace.isLifePalace ? (
            <span className="text-[8px] font-black uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">Mệnh</span>
          ) : null}
          {palace.isBodyPalace ? (
            <span className="text-[8px] font-black uppercase tracking-wider text-tertiary bg-tertiary/10 px-1.5 py-0.5 rounded">Thân</span>
          ) : null}
        </div>
      </div>

      <div>
        <div className="mb-1 text-[8px] font-black uppercase tracking-wider text-outline">Chính tinh</div>
        <div className="space-y-1">
          {palace.majorStars.length > 0 ? (
            palace.majorStars.map((star) => <StarLine key={star.name} star={star} />)
          ) : (
            <span className="text-[9px] text-outline/60 italic">Vô chính diệu</span>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-outline-variant/10">
        <div className="mb-1 text-[8px] font-black uppercase tracking-wider text-outline">Phụ tinh Bắc Tông</div>
        {palace.minorStars.length > 0 ? (
          <div className="grid gap-1">
            {palace.minorStars.map((star) => (
              <MinorStarTag key={star.name} star={star} />
            ))}
          </div>
        ) : (
          <span className="text-[8px] text-outline/50 italic">Không có</span>
        )}
      </div>
    </div>
  );
}

function ThienBan({ result }: { result: TuViEngineResult }) {
  const info = [
    ["Họ tên", result.profile.fullName || "Ẩn danh"],
    ["Giới tính", result.profile.genderLabel],
    ["Dương lịch", result.profile.solarDateTime],
    ["Âm lịch", result.profile.lunarDateTime],
    ["Năm can chi", result.overview.canChiYear],
    ["Ngày can chi", result.overview.canChiDay],
    ["Mệnh", getBranchLabel(result.overview.menhBranch)],
    ["Thân", getBranchLabel(result.overview.thanBranch)],
    ["Mệnh chủ", result.overview.menhChu],
    ["Thân chủ", result.overview.thanChu],
    ["Cục", result.overview.cuc],
    ["Múi giờ", result.profile.timezone],
  ];

  return (
    <div className="rounded-[28px] border border-primary/15 bg-[radial-gradient(circle_at_top,_rgba(210,171,98,0.18),_rgba(27,30,41,0.9)_52%)] p-5 h-full">
      <div className="mb-4 text-center">
        <div className="text-[11px] font-black uppercase tracking-[0.35em] text-primary">Thiên Bàn</div>
        <div className="mt-2 text-lg font-black text-on-surface">Trường phái Bắc Tông</div>
        <div className="mt-1 text-[11px] text-on-surface-variant">Địa bàn 12 cung bao quanh thông tin trung tâm để tiện luận đoán và xét sinh khắc.</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {info.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-surface-container-low/70 px-3 py-2">
            <div className="text-[8px] font-black uppercase tracking-[0.22em] text-outline">{label}</div>
            <div className="mt-1 text-[11px] font-semibold leading-snug text-on-surface">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LapLaSoMiniChart({ result }: Props) {
  const palaceByBranch = Object.fromEntries(result.palaces.map((palace) => [palace.branch, palace]));

  return (
    <div
      className="col-span-12 lg:col-span-8 rounded-xl p-6 relative overflow-hidden"
      style={{ background: "rgba(49,57,77,0.4)", backdropFilter: "blur(20px)" }}
    >
      <div className="absolute top-0 right-0 p-6 opacity-[0.06] pointer-events-none select-none">
        <span className="material-symbols-outlined text-[100px]">auto_awesome</span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-primary">Lá số Bắc Tông</h2>
            <p className="text-xs text-on-surface-variant mt-1">Địa Bàn 12 cung và Thiên Bàn trung tâm, có ghi rõ hành cung và hành sao.</p>
          </div>
          <span className="text-xs text-outline bg-surface-container-high px-3 py-1 rounded-full">Lá số: {result.overview.canChiYear}</span>
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
                <div key="thien-ban" style={{ gridColumn: "2 / span 2", gridRow: "2 / span 2" }}>
                  <ThienBan result={result} />
                </div>
              );
            }

            if (index === 6 || index === 9 || index === 10) {
              return null;
            }

            if (!branch) {
              return null;
            }

            const palace = palaceByBranch[branch];
            return <PalaceCell key={branch} palace={palace} />;
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 justify-center">
          {[
            { label: "Mệnh", value: getBranchLabel(result.overview.menhBranch) },
            { label: "Thân", value: getBranchLabel(result.overview.thanBranch) },
            { label: "Cục", value: result.overview.cuc },
            { label: "Năm sinh", value: result.overview.canChiYear },
            { label: "Âm dương", value: result.overview.amDuong },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-1.5 bg-secondary-container/40 rounded-full px-3 py-1">
              <span className="text-[9px] font-black text-on-secondary-container uppercase tracking-wider">{label}:</span>
              <span className="text-[10px] font-bold text-primary">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
