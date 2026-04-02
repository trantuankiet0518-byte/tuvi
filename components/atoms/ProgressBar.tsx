interface Props {
  value: number;        // 0–100
  label?: string;
  showPercent?: boolean;
  className?: string;
}

export default function ProgressBar({ value, label, showPercent = true, className = "" }: Props) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="text-outline">{label}</span>}
          {showPercent && <span className="text-primary font-bold">{clamped}%</span>}
        </div>
      )}
      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
