import VanHanSidebar from "@/components/organisms/VanHanSidebar";
import VanHanTimeline from "@/components/organisms/VanHanTimeline";

export default function VanHanPage() {
  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-[2.75rem] font-extrabold tracking-tight text-primary leading-none">
              Vận Hạn
            </h1>
            <p className="text-on-surface-variant mt-2 max-w-2xl">
              Phân tích dòng chảy thời gian và các vì sao ảnh hưởng đến vận mệnh của bạn trong các chu kỳ
              Đại, Tiểu và Nhật hạn.
            </p>
          </div>
          <div className="bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/10 flex items-center gap-3 self-start">
            <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
            <span className="text-[0.6875rem] tracking-widest uppercase font-semibold">
              Năm Giáp Thìn 2024
            </span>
          </div>
        </div>
      </section>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <VanHanSidebar />
        <VanHanTimeline />
      </div>
    </main>
  );
}
