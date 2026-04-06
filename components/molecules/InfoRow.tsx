interface InfoRowProps {
  label: string;
  value: string;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-border/30 last:border-0">
      <span className="text-on-surface-variant text-xs font-black uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-on-surface">{value}</span>
    </div>
  );
}
