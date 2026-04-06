const subject = [
  { label: "Mệnh", value: "Lư Trung Hỏa" },
  { label: "Cung Mệnh", value: "Tý" },
  { label: "Cục", value: "Thủy Nhị Cục" },
];

const highlights = [
  {
    color: "bg-primary shadow-[0_0_8px_rgba(255,193,116,0.6)]",
    title: "Lưu Lộc Tồn",
    desc: "Tại cung Tỵ, chủ về tài lộc bất ngờ và cơ hội kinh doanh.",
  },
  {
    color: "bg-error",
    title: "Lưu Kình Dương",
    desc: "Tại cung Mùi, cẩn trọng va chạm, thị phi và thương tích nhẹ.",
  },
];

export default function VanHanSidebar() {
  return (
    <div className="md:col-span-3 space-y-8">
      {/* Chủ thể */}
      <div className="rounded-[2rem] border border-white/10 bg-transparent p-8 shadow-lg shadow-background/50 backdrop-blur-xl">
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
      <div className="border border-white/10 bg-transparent backdrop-blur-sm p-8 rounded-[2rem] shadow-sm">
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
    </div>
  );
}
