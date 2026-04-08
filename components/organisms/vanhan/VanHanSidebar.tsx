export interface VanHanSidebarProps {
  subject: Array<{ label: string; value: string }>;
  highlights: Array<{ color: string; title: string; desc: string }>;
}

export default function VanHanSidebar({ subject, highlights }: VanHanSidebarProps) {
  return (
    <div className="md:col-span-3 space-y-8">
      {/* Chủ thể */}
      <div className="ui-shell rounded-[2rem] p-8">
        <h3 className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-6">
          Chủ Thể
        </h3>
        <div className="space-y-4">
          {subject.map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-3 border-b border-border/30 last:border-0">
              <span className="text-on-surface-variant text-xs font-black uppercase tracking-widest">{label}</span>
              <span className="text-sm font-black text-on-surface">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lưu tinh điểm nhấn */}
      {highlights.length > 0 && (
        <div className="ui-panel rounded-[2rem] p-8">
          <h3 className="text-secondary font-black text-xs uppercase tracking-[0.3em] mb-6">
            Lưu Tinh Điểm Nhấn
          </h3>
          <div className="space-y-6">
            {highlights.map(({ color, title, desc }) => (
              <div key={title} className="flex items-start gap-4 group cursor-help">
                <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 shadow-lg ${color}`} />
                <div>
                  <p className="text-sm font-black text-on-surface uppercase tracking-tight group-hover:text-primary transition-colors">{title}</p>
                  <p className="text-xs text-on-surface-variant font-medium leading-relaxed mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
