interface Props {
  label: string;
  value: string;
  className?: string;
}

export default function InfoChip({ label, value, className = "" }: Props) {
  return (
    <div
      className={`glass-border-panel-soft flex items-center gap-2 rounded-full px-3.5 py-1.5 ${className}`}
    >
      <span className="text-[10px] font-black uppercase tracking-wider text-on-secondary-container">
        {label}:
      </span>
      <span className="text-[11px] font-bold text-primary md:text-xs">{value}</span>
    </div>
  );
}
