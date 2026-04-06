import type { ComponentType, SVGProps } from "react";

import {
  ArrowForward,
  AutoAwesome,
  Payments,
  StarRate,
  TrendingUp,
  Warning,
} from "@/components/icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const tieuHanCards: Array<{
  labelColor: string;
  Icon: IconType;
  iconColor: string;
  title: string;
  status: string;
  desc: string;
}> = [
  {
    labelColor: "text-primary",
    Icon: TrendingUp,
    iconColor: "text-primary-fixed-dim",
    title: "Sự Nghiệp",
    status: "Khởi Sắc",
    desc: "Sự xuất hiện của Lưu Hóa Quyền thúc đẩy thăng tiến. Cơ hội đảm nhận vai trò lãnh đạo trong quý 3.",
  },
  {
    labelColor: "text-tertiary",
    Icon: Payments,
    iconColor: "text-tertiary",
    title: "Tài Lộc",
    status: "Ổn Định",
    desc: "Lưu Lộc Tồn mang lại nguồn thu phụ. Cần trọng chi tiêu vào tháng 5 âm lịch do ảnh hưởng Lưu Phục Binh.",
  },
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="mb-10 flex items-center gap-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      <h2 className="whitespace-nowrap rounded-full border border-white/10 bg-transparent px-8 py-3 text-xl font-black tracking-[0.2em] text-on-surface shadow-sm backdrop-blur-xl">
        {label}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent opacity-50" />
    </div>
  );
}

export default function VanHanTimeline() {
  return (
    <div className="space-y-16 md:col-span-9">
      <div>
        <SectionDivider label="Đại Hạn (22 - 31 Tuổi)" />
        <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-transparent p-12 shadow-2xl shadow-background/50 backdrop-blur-xl">
          <div className="pointer-events-none absolute right-[-5%] top-[-5%] p-12 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.12] dark:opacity-[0.08]">
            <AutoAwesome className="h-[15rem] w-[15rem]" />
          </div>
          <div className="relative z-10 flex flex-col gap-12 md:flex-row">
            <div className="md:w-1/3">
              <div className="text-8xl font-black tracking-tighter text-primary/10 transition-colors group-hover:text-primary/20">
                22-31
              </div>
              <h4 className="mt-4 text-3xl font-black uppercase tracking-tight text-on-surface">
                Cung Thân
              </h4>
              <p className="mt-4 text-base font-medium leading-relaxed text-on-surface-variant italic">
                Giai đoạn rèn luyện và khẳng định bản thân. Các ngôi sao chủ về
                quyền lực đang hội tụ.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:w-2/3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-transparent p-6 backdrop-blur-sm">
                <span className="mb-4 block text-xs font-black uppercase tracking-[0.2em] text-primary">
                  Cát Tinh
                </span>
                <div className="flex flex-wrap gap-3">
                  {["Hóa Lộc", "Thiên Mã"].map((value) => (
                    <span
                      key={value}
                      className="rounded-lg bg-primary px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-on-primary shadow-md shadow-primary/10"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-transparent p-6 backdrop-blur-sm">
                <span className="mb-4 block text-xs font-black uppercase tracking-[0.2em] text-error">
                  Sát Tinh
                </span>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-lg bg-error-container px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-error shadow-md shadow-destructive/10">
                    Địa Kiếp
                  </span>
                </div>
              </div>
              <div className="col-span-1 mt-4 rounded-2xl bg-secondary/5 p-6 sm:col-span-2">
                <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
                  <strong className="text-on-surface">Lưu ý quan trọng:</strong>{" "}
                  Đại hạn này nằm trong tam hợp Thân - Tý - Thìn, thuộc hành
                  Thủy, tương khắc với bản mệnh Hỏa. Cần kiên nhẫn và tránh nóng
                  vội trong các quyết định đầu tư lớn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionDivider label="Tiểu Hạn (2024)" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {tieuHanCards.map(({ labelColor, Icon, iconColor, title, status, desc }) => (
            <div
              key={title}
              className="group rounded-[2.5rem] border border-white/10 bg-transparent p-10 shadow-xl shadow-background/50 backdrop-blur-xl transition-all active:scale-[0.98] hover:border-primary/30"
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h4 className={`text-xs font-black uppercase tracking-[0.3em] ${labelColor}`}>
                    {title}
                  </h4>
                  <p className="mt-2 text-4xl font-black uppercase tracking-tighter text-on-surface">
                    {status}
                  </p>
                </div>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-transparent backdrop-blur-xl ${iconColor} shadow-inner transition-all duration-500 group-hover:bg-primary group-hover:text-on-primary`}
                >
                  <Icon className="h-7 w-7" />
                </div>
              </div>
              <p className="text-base font-medium leading-relaxed text-on-surface-variant">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <VanHanNhatHan />
    </div>
  );
}

const nhatHanSlots: Array<{
  time: string;
  gio: string;
  gioColor: string;
  title: string;
  desc: string;
  Icon?: IconType;
  iconColor: string;
}> = [
  {
    time: "07:00",
    gio: "GIỜ THÌN",
    gioColor: "text-primary",
    title: "Giờ Đại Cát",
    desc: "Thích hợp khởi hành, gặp gỡ đối tác quan trọng.",
    Icon: StarRate,
    iconColor: "text-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]",
  },
  {
    time: "11:00",
    gio: "GIỜ NGỌ",
    gioColor: "text-on-surface-variant",
    title: "Giờ Trung Bình",
    desc: "Mọi việc bình hòa, nên tập trung xử lý công việc tồn đọng.",
    iconColor: "",
  },
  {
    time: "17:00",
    gio: "GIỜ DẬU",
    gioColor: "text-error",
    title: "Giờ Hung",
    desc: "Tránh tranh cãi, không nên thực hiện giao dịch tiền bạc lớn.",
    Icon: Warning,
    iconColor: "text-error opacity-60",
  },
];

function VanHanNhatHan() {
  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-transparent shadow-2xl shadow-background/50 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-transparent p-10 backdrop-blur-md">
        <h2 className="text-base font-black uppercase tracking-[0.3em] text-on-surface">
          Nhật Hạn: 24 Tháng 05, 2024
        </h2>
        <button className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:underline">
          Xem tháng này
          <ArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <div className="divide-y divide-border/30">
        {nhatHanSlots.map(({ time, gio, gioColor, title, desc, Icon, iconColor }) => (
          <div
            key={time}
            className="group flex cursor-pointer items-center gap-10 p-8 transition-all hover:bg-surface-container/20"
          >
            <div className="w-24 flex-shrink-0 border-r border-border/90 pr-10 text-center">
              <span className="mb-1 block text-[0.6875rem] font-black text-on-surface-variant/40">
                {time}
              </span>
              <span className={`text-[11px] font-black tracking-widest ${gioColor}`}>
                {gio}
              </span>
            </div>
            <div className="flex-1">
              <h5 className="text-lg font-black uppercase tracking-tight text-on-surface">
                {title}
              </h5>
              <p className="mt-1 text-sm font-medium text-on-surface-variant">
                {desc}
              </p>
            </div>
            {Icon ? (
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${iconColor} scale-75 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100`}
              >
                <Icon className="h-5 w-5" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
