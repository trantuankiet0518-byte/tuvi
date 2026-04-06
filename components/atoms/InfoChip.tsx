interface Props {
  label: string;
  value: string;
  className?: string;
}

export default function InfoChip({ label, value, className = "" }: Props) {
  return (
    <div className={`glass-border-panel-soft flex items-center gap-1.5 rounded-full px-3 py-1 ${className}`}>
      <span className="text-[9px] font-black text-on-secondary-container uppercase tracking-wider">{label}:</span>
      <span className="text-[10px] font-bold text-primary">{value}</span>
    </div>
  );
}
