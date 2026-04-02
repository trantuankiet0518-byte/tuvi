import { Link } from "@/i18n/navigation";

export default function HomeCTA() {
  return (
    <section className="py-32 bg-surface relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          {/* Main CTA card */}
          <div className="md:col-span-8 md:row-span-2 bg-gradient-to-br from-primary/10 to-card rounded-[2.5rem] p-16 flex flex-col justify-end shadow-2xl shadow-background/50">
            <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter text-on-surface leading-[0.9]">
              Bắt đầu hành trình <br /> khám phá bản mệnh.
            </h2>
            <p className="text-on-surface-variant text-xl max-w-md mb-10 font-medium leading-relaxed">
              Hệ thống chương trình đào tạo chuyên sâu từ căn bản đến cao cấp, kết hợp lý thuyết cổ điển và ứng dụng thực tiễn.
            </p>
            <div>
              <Link
                href="/views"
                className="bg-primary text-on-primary px-10 py-5 rounded-full font-black inline-flex items-center gap-3 hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-primary/20"
              >
                Khám phá khóa học
                <span className="material-symbols-outlined text-2xl">north_east</span>
              </Link>
            </div>
          </div>

          {/* Stars card */}
          <div className="md:col-span-4 bg-surface-container rounded-[2.5rem] overflow-hidden relative group shadow-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5BkI15Wjr-CPIFetNzOymti4ILeCp_OylfRgdcnmhlhE50Hx7CRpAvhl0Tr_emHWZlYBsQFmGrK73qcEFWH7AXjLGe1q5HnAiWsYjF7uK0KnEXcgng8cXg5IE107ApzbXrvrnlCyJaJw08yPTVMGJ3iBFKzkGmkzqlMX5wh69aMHsz5YerXpiGpDzwXB0kPb8zWSxjnp-UsdCOFHmCd0tiyG2CZj9GDLz4WspzxbrteQXmpx6HR6oRQP0TyVUYPUqpToFXC9cdyYi"
              alt="Deep space nebula"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000 grayscale dark:grayscale-0"
            />
            <div className="absolute inset-0 p-10 flex flex-col justify-between bg-gradient-to-t from-background/80 to-transparent">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">star</span>
              </div>
              <div className="text-2xl font-black text-on-surface tracking-tight uppercase">114 Chính Tinh <br />&amp; Phụ Tinh</div>
            </div>
          </div>

          {/* Stats card */}
          <div className="md:col-span-4 bg-surface-container/50 backdrop-blur-sm rounded-[2.5rem] p-10 flex flex-col justify-center gap-4 shadow-xl">
            <div className="text-xs tracking-[0.3em] text-on-surface-variant uppercase font-black">Success Rate</div>
            <div className="text-7xl font-black text-primary tracking-tighter">95%</div>
            <div className="text-sm text-on-surface font-bold leading-relaxed">Học viên tự luận giải được <br /> lá số sau 3 tháng.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
