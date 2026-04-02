const tieuHanCards = [
  {
    labelColor: "text-primary",
    icon: "trending_up",
    iconColor: "text-primary-fixed-dim",
    title: "Sự Nghiệp",
    status: "Khởi Sắc",
    desc: "Sự xuất hiện của Lưu Hóa Quyền thúc đẩy thăng tiến. Cơ hội đảm nhận vai trò lãnh đạo trong quý 3.",
  },
  {
    labelColor: "text-tertiary",
    icon: "payments",
    iconColor: "text-tertiary",
    title: "Tài Lộc",
    status: "Ổn Định",
    desc: "Lưu Lộc Tồn mang lại nguồn thu phụ. Cẩn trọng chi tiêu vào tháng 5 âm lịch do ảnh hưởng Lưu Phục Binh.",
  },
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-6 mb-10">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      <h2 className="text-xl font-black tracking-[0.2em] px-8 bg-surface-container py-3 rounded-full whitespace-nowrap text-on-surface shadow-sm">
        {label}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent opacity-50" />
    </div>
  );
}

export default function VanHanTimeline() {
  return (
    <div className="md:col-span-9 space-y-16">
      {/* Đại Hạn */}
      <div>
        <SectionDivider label="Đại Hạn (22 - 31 Tuổi)" />
        <div className="bg-surface-container rounded-[2.5rem] p-12 shadow-2xl shadow-background/50 relative overflow-hidden group">
          <div className="absolute top-[-5%] right-[-5%] p-12 opacity-[0.03] dark:opacity-[0.08] pointer-events-none group-hover:opacity-[0.12] transition-all group-hover:scale-110 duration-700">
            <span className="material-symbols-outlined text-[15rem]">auto_awesome</span>
          </div>
          <div className="flex flex-col md:flex-row gap-12 relative z-10">
            <div className="md:w-1/3">
              <div className="text-8xl font-black text-primary/10 tracking-tighter group-hover:text-primary/20 transition-colors">22-31</div>
              <h4 className="text-3xl font-black mt-4 text-on-surface uppercase tracking-tight">Cung Thân</h4>
              <p className="text-base text-on-surface-variant mt-4 italic font-medium leading-relaxed">
                "Giai đoạn rèn luyện và khẳng định bản thân. Các ngôi sao chủ về quyền lực đang hội tụ."
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface-container/50 backdrop-blur-sm p-6 rounded-2xl">
                <span className="text-xs font-black text-primary block mb-4 uppercase tracking-[0.2em]">
                  Cát Tinh
                </span>
                <div className="flex flex-wrap gap-3">
                  {["Hóa Lộc", "Thiên Mã"].map((s) => (
                    <span key={s} className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest shadow-md shadow-primary/10">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-surface-container/50 backdrop-blur-sm p-6 rounded-2xl">
                <span className="text-xs font-black text-error block mb-4 uppercase tracking-[0.2em]">
                  Sát Tinh
                </span>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-error-container text-error-foreground px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest shadow-md shadow-destructive/10">
                    Địa Kiếp
                  </span>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-2 mt-4 p-6 bg-secondary/5 rounded-2xl">
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  <strong className="text-on-surface">Lưu ý quan trọng:</strong> Đại hạn này nằm trong tam hợp Thân - Tý - Thìn, thuộc hành Thủy,
                  tương khắc với bản mệnh Hỏa. Cần kiên nhẫn và tránh nóng vội trong các quyết định đầu tư lớn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiểu Hạn */}
      <div>
        <SectionDivider label="Tiểu Hạn (2024)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tieuHanCards.map(({ labelColor, icon, iconColor, title, status, desc }) => (
            <div
              key={title}
              className="bg-surface-container p-10 rounded-[2.5rem] shadow-xl shadow-background/50 hover:border-primary/30 transition-all group active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className={`text-xs font-black uppercase tracking-[0.3em] ${labelColor}`}>{title}</h4>
                  <p className="text-4xl font-black mt-2 text-on-surface tracking-tighter uppercase">{status}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center ${iconColor} group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-inner`}>
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
              </div>
              <p className="text-base text-on-surface-variant font-medium leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nhật Hạn */}
      <VanHanNhatHan />
    </div>
  );
}

const nhatHanSlots = [
  {
    time: "07:00",
    gio: "GIỜ THÌN",
    gioColor: "text-primary",
    title: "Giờ Đại Cát",
    desc: "Thích hợp khởi hành, gặp gỡ đối tác quan trọng.",
    icon: "star_rate",
    iconColor: "text-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]",
  },
  {
    time: "11:00",
    gio: "GIỜ NGỌ",
    gioColor: "text-on-surface-variant",
    title: "Giờ Trung Bình",
    desc: "Mọi việc bình hòa, nên tập trung xử lý công việc tồn đọng.",
    icon: null,
    iconColor: "",
  },
  {
    time: "17:00",
    gio: "GIỜ DẬU",
    gioColor: "text-error",
    title: "Giờ Hung",
    desc: "Tránh tranh cãi, không nên thực hiện giao dịch tiền bạc lớn.",
    icon: "warning",
    iconColor: "text-error opacity-60",
  },
];

function VanHanNhatHan() {
  return (
    <div className="bg-surface-container rounded-[2.5rem] shadow-2xl shadow-background/50 overflow-hidden">
      <div className="p-10 border-b border-border/50 flex justify-between items-center bg-surface-container/30 backdrop-blur-md">
        <h2 className="text-base font-black tracking-[0.3em] uppercase text-on-surface">Nhật Hạn: 24 Tháng 05, 2024</h2>
        <button className="text-xs font-black text-primary hover:underline flex items-center gap-2 uppercase tracking-widest group">
          Xem tháng này
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>
      <div className="divide-y divide-border/30">
        {nhatHanSlots.map(({ time, gio, gioColor, title, desc, icon, iconColor }) => (
          <div
            key={time}
            className="flex p-8 items-center gap-10 group hover:bg-surface-container/20 transition-all cursor-pointer"
          >
            <div className="w-24 flex-shrink-0 text-center border-r border-border/30 pr-10">
              <span className="text-[0.6875rem] font-black text-on-surface-variant/40 block mb-1">{time}</span>
              <span className={`text-[11px] font-black tracking-widest ${gioColor}`}>{gio}</span>
            </div>
            <div className="flex-1">
              <h5 className="text-lg font-black text-on-surface uppercase tracking-tight">{title}</h5>
              <p className="text-sm text-on-surface-variant font-medium mt-1">{desc}</p>
            </div>
            {icon && (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor} opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100`}>
                <span className="material-symbols-outlined">{icon}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
