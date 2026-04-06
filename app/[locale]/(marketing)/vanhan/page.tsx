import { CalendarToday } from "@/components/icons";
import { VanHanSidebar, VanHanTimeline } from "@/components/organisms";

export default function VanHanPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-12 px-6 pb-12 pt-24">
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-[2.75rem] font-extrabold leading-none tracking-tight text-primary">
              Vận Hạn
            </h1>
            <p className="mt-2 max-w-2xl text-on-surface-variant">
              Phân tích dòng chảy thời gian và các vì sao ảnh hưởng đến vận
              mệnh của bạn trong các chu kỳ Đại, Tiểu và Nhật hạn.
            </p>
          </div>
          <div className="bg-surface-container-low flex items-center gap-3 self-start rounded-lg border border-outline-variant/10 px-4 py-2">
            <CalendarToday className="h-4 w-4 text-primary" />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-widest">
              Năm Giáp Thìn 2024
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <VanHanSidebar />
        <VanHanTimeline />
      </div>
    </main>
  );
}
