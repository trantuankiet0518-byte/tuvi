interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <label className={`ml-1 block text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant ${className}`}>
      {children}
    </label>
  );
}
