import type { TuViStar } from "@/lib/bazi/types";
import { QUALITY_COLORS, QUALITY_LABELS } from "@/lib/bazi/display";

interface Props {
  quality: TuViStar["quality"];
  className?: string;
}

export default function StarQualityBadge({ quality, className = "" }: Props) {
  return (
    <span
      className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${QUALITY_COLORS[quality]} ${className}`}
      style={{ background: "currentColor", opacity: 1 }}
    >
      <span style={{ mixBlendMode: "normal" }} className="opacity-100 text-inherit">
        {QUALITY_LABELS[quality]}
      </span>
    </span>
  );
}
