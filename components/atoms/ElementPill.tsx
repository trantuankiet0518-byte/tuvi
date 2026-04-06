import { getElementLabel } from "@/lib/bazi/display";

interface Props {
  element: string;
  className?: string;
}

export default function ElementPill({ element, className = "" }: Props) {
  return (
    <span
      className={`rounded-full border border-white/10 bg-transparent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-on-surface-variant backdrop-blur-xl ${className}`}
    >
      {getElementLabel(element)}
    </span>
  );
}
