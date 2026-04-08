import {
  ArrowForward,
  AutoAwesome,
  Payments,
  StarRate,
  TrendingUp,
  Warning,
} from "@/components/icons";

export interface VanHanTimelineProps {
  daiHan: {
    ageRange: string;
    palace: string;
    description: string;
    catTinh: string[];
    satTinh: string[];
    notes: string;
  };
  tieuHan: {
    year: number;
    cards: Array<{
      title: string;
      status: string;
      desc: string;
      icon: "TrendingUp" | "Payments" | "StarRate" | "Warning";
      labelColor: string;
      iconColor: string;
    }>;
  };
  nhatHan: {
    date: string;
    slots: Array<{
      time: string;
      gio: string;
      gioColor: string;
      title: string;
      desc: string;
      icon?: "StarRate" | "Warning";
      iconColor: string;
    }>;
  };
}

const ICONS = {
  TrendingUp,
  Payments,
  StarRate,
  Warning,
};

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="mb-10 flex items-center gap-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      <h2 className="ui-pill whitespace-nowrap rounded-full px-8 py-3 text-xl font-black tracking-[0.2em] text-on-surface">
        {label}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent opacity-50" />
    </div>
  );
}

export default function VanHanTimeline({ daiHan, tieuHan, nhatHan }: VanHanTimelineProps) {
  return (
    <div className="space-y-16 md:col-span-9">
      {/* Đại Hạn */}
      <div>
        <SectionDivider label={`Đại Hạn (${daiHan.ageRange} Tuổi)`} />
        <div className="ui-shell group relative rounded-[2.5rem] p-12">
          <div className="pointer-events-none absolute right-[-5%] top-[-5%] p-12 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.12] dark:opacity-[0.08]">
            <AutoAwesome className="h-[15rem] w-[15rem]" />
          </div>
          <div className="relative z-10 flex flex-col gap-12 md:flex-row">
            <div className="md:w-1/3">
              <div className="text-8xl font-black tracking-tighter text-primary/10 transition-colors group-hover:text-primary/20">
                {daiHan.ageRange}
              </div>
              <h4 className="mt-4 text-3xl font-black uppercase tracking-tight text-on-surface">
                Cung {daiHan.palace}
              </h4>
              <p className="mt-4 text-base font-medium leading-relaxed text-on-surface-variant italic">
                {daiHan.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:w-2/3 sm:grid-cols-2">
              <div className="ui-panel-soft rounded-2xl p-6">
                <span className="mb-4 block text-xs font-black uppercase tracking-[0.2em] text-primary">
                  Cát Tinh
                </span>
                <div className="flex flex-wrap gap-3">
                  {daiHan.catTinh.map((value) => (
                    <span
                      key={value}
                      className="rounded-lg bg-primary px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-on-primary shadow-md shadow-primary/10"
                    >
                      {value}
                    </span>
                  ))}
                  {daiHan.catTinh.length === 0 && <span className="text-xs text-on-surface-variant">Không có</span>}
                </div>
              </div>
              <div className="ui-panel-soft rounded-2xl p-6">
                <span className="mb-4 block text-xs font-black uppercase tracking-[0.2em] text-error">
                  Sát Tinh
                </span>
                <div className="flex flex-wrap gap-3">
                  {daiHan.satTinh.map((value) => (
                    <span
                      key={value}
                      className="rounded-lg bg-error-container px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-error shadow-md shadow-destructive/10"
                    >
                      {value}
                    </span>
                  ))}
                  {daiHan.satTinh.length === 0 && <span className="text-xs text-on-surface-variant">Không có</span>}
                </div>
              </div>
              <div className="ui-panel col-span-1 mt-4 rounded-2xl p-6 sm:col-span-2">
                <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
                  <strong className="text-on-surface">Lưu ý quan trọng:</strong>{" "}
                  {daiHan.notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiểu Hạn */}
      <div>
        <SectionDivider label={`Tiểu Hạn (${tieuHan.year})`} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {tieuHan.cards.map(({ labelColor, icon, iconColor, title, status, desc }) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={title}
                className="ui-shell group rounded-[2.5rem] p-10 transition-all active:scale-[0.98] hover:-translate-y-1"
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
                    className={`ui-panel-soft flex h-14 w-14 items-center justify-center rounded-2xl ${iconColor} transition-all duration-500 group-hover:bg-primary group-hover:text-on-primary`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <p className="text-base font-medium leading-relaxed text-on-surface-variant">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nhật Hạn */}
      <div className="ui-shell overflow-hidden rounded-[2.5rem]">
        <div className="flex items-center justify-between border-b border-outline-variant/20 p-10">
          <h2 className="text-base font-black uppercase tracking-[0.3em] text-on-surface">
            Nhật Hạn: {nhatHan.date}
          </h2>
          <button className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:underline">
            Xem tháng này
            <ArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="divide-y divide-border/30">
          {nhatHan.slots.map(({ time, gio, gioColor, title, desc, icon, iconColor }) => {
            const Icon = icon ? ICONS[icon] : null;
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
