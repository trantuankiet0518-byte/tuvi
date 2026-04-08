import Icon from "@/components/atoms/Icon";

const steps = [
  {
    title: "1. Xác định vị trí sao",
    desc: "Tìm kiếm sao trên 12 cung của lá số. Lưu ý trạng thái Miếu, Vượng, Đắc, Hãm ảnh hưởng trực tiếp đến tính lý.",
  },
  {
    title: "2. Xét sự hội tụ",
    desc: "Một sao không đứng độc lập. Phải xét các sao trong Tam hợp (Mệnh-Di-Quan-Tài) và Xung chiếu để có cái nhìn tổng quát.",
  },
];

const references = [
  { icon: "description", title: "Tử Vi Đẩu Số Toàn Thư", sub: "Bản dịch hiệu đính 2024" },
  { icon: "auto_stories", title: "Cách Cục Đặc Biệt", sub: "500 cách cục phú quý & bần hàn" },
];

export default function ThuVienGuide() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Quick guide */}
      <div className="lg:col-span-2">
        <div className="ui-shell relative rounded-[2.5rem] p-12 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <h3 className="text-3xl font-black tracking-tight mb-10 text-on-surface uppercase">Hướng dẫn tra cứu nhanh</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {steps.map(({ title, desc }) => (
              <div key={title} className="ui-panel-soft space-y-4 rounded-[1.75rem] p-6">
                <h5 className="text-base font-black text-primary uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="ui-pill flex h-6 w-6 items-center justify-center rounded-lg text-[10px]">{title.split('.')[0]}</span>
                  {title.split('. ')[1]}
                </h5>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* References */}
      <div className="ui-shell flex flex-col rounded-[2.5rem] p-10">
        <h3 className="text-xl font-black mb-8 text-on-surface uppercase tracking-tight">Tài liệu tham khảo</h3>
        <ul className="space-y-6 flex-1">
          {references.map(({ icon, title, sub }) => (
            <li key={title} className="flex items-start gap-5 group cursor-pointer active:scale-95 transition-all">
              <div className="ui-panel-soft flex h-12 w-12 items-center justify-center rounded-2xl text-on-surface-variant transition-all group-hover:text-primary">
                <Icon name={icon} className="text-2xl" />
              </div>
              <div className="pt-1">
                <p className="text-base font-black text-on-surface group-hover:text-primary transition-colors tracking-tight">{title}</p>
                <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-widest mt-1 opacity-60">{sub}</p>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-10 w-full rounded-2xl bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-fixed-dim)_100%)] py-4 text-xs font-black uppercase tracking-[0.2em] text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95">
          Xem tất cả tài liệu
        </button>
      </div>
    </section>
  );
}
