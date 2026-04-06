interface HighlightItemProps {
  color: string;
  title: string;
  description: string;
}

export default function HighlightItem({ color, title, description }: HighlightItemProps) {
  return (
    <div className="flex items-start gap-4 group cursor-help">
      <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 shadow-lg ${color}`} />
      <div>
        <p className="text-sm font-black text-on-surface uppercase tracking-tight group-hover:text-primary transition-colors">{title}</p>
        <p className="text-xs text-on-surface-variant font-medium leading-relaxed mt-1">{description}</p>
      </div>
    </div>
  );
}
