import Icon from "./Icon";

interface InfoCalloutProps {
  title: string;
  description: string;
  icon?: string;
  className?: string;
}

export default function InfoCallout({
  title,
  description,
  icon = "info",
  className = "",
}: InfoCalloutProps) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-secondary/5 p-8 ${className}`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary/10 blur-3xl transition-all group-hover:scale-150" />
      <div className="relative z-10 flex items-start gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
          <Icon className="text-2xl" name={icon} />
        </div>
        <div>
          <h4 className="text-base font-black uppercase tracking-wider text-on-surface">{title}</h4>
          <p className="mt-2 text-sm font-medium leading-relaxed text-on-surface-variant">{description}</p>
        </div>
      </div>
    </div>
  );
}
