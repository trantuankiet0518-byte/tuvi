interface SectionDividerProps {
  label: string;
}

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="mb-10 flex items-center gap-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      <h2 className="text-xl font-black tracking-[0.2em] rounded-full border border-white/10 bg-transparent px-8 py-3 whitespace-nowrap text-on-surface shadow-sm backdrop-blur-xl">
        {label}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent opacity-50" />
    </div>
  );
}
