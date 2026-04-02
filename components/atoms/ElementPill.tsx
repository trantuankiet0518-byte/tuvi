import { getElementLabel } from "@/lib/bazi/display";

interface Props {
  element: string;
  className?: string;
}

export default function ElementPill({ element, className = "" }: Props) {
  return (
    <span
      className={`rounded-full bg-surface-container-high px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-on-surface-variant ${className}`}
    >
      {getElementLabel(element)}
    </span>
  );
}
