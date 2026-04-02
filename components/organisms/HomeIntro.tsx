export default function HomeIntro() {
  return (
    <section className="py-32 bg-surface relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-background/50">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQj0mYlknCdybQsn9IwpPz6m_zeW8aOT84hvZPD5Y-MHBxszUCWlI_VVg3ghPfFvzgAdsEkiXdo6UILjLFI0Vsoo-JwD4YblOJOotxACDL6_zM62yt9J-ohRnNnwXCg35q9r55_7vBwrgJedJxNlvGwgCTm3RfSiOdrT6pGF5keswzDxZDhXxkOJDJxHEGUIINkEaELppYvAmpc6TjANei0NHwX6I3nFUfzqNeMz05ItZdAOrTV41CtCAC-DNTM-M4yB4sX-NOxHVQ"
                  alt="Ancient astrological chart"
                  className="w-full h-[600px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute bottom-10 right-10 bg-surface/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
                  <div className="text-primary font-mono text-xs font-black mb-2 tracking-[0.2em]">COORD_REF: 35.6895° N</div>
                  <div className="text-on-surface font-black text-xl tracking-tight uppercase">Mệnh Bàn Thiên Cơ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-secondary/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" />
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-secondary">
                Nguồn Gốc &amp; Triết Lý
              </span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-on-surface">
              Tử Vi là gì? <br />
              <span className="text-on-surface-variant italic font-serif mt-2 block">Một cái nhìn khoa học.</span>
            </h2>

            <div className="space-y-8 text-on-surface-variant leading-relaxed text-lg font-medium">
              <p>
                Xuất phát từ thời kỳ đầu của triều đại nhà Tống, được hệ thống hóa bởi vị đạo sĩ huyền thoại{" "}
                <strong className="text-primary font-black">Trần Đoàn (Hi Di Tiên Sinh)</strong>, Tử Vi không đơn thuần là
                bói toán mà là một môn khoa học nhân văn cổ đại dựa trên xác suất và quan sát thiên văn.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                {[
                  { icon: "balance", title: "Âm Dương & Ngũ Hành", desc: "Nguyên lý cân bằng giữa Kim, Mộc, Thủy, Hỏa, Thổ trong sự vận động của vũ trụ." },
                  { icon: "explore", title: "Tương Tác Hành Tinh", desc: "Vị trí của các vì sao tại thời điểm sinh phản ánh năng lượng nội tại của mỗi cá nhân." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="p-8 rounded-[2rem] bg-surface-container shadow-lg shadow-background/50 hover:border-primary/20 transition-all group active:scale-95">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">{icon}</span>
                    </div>
                    <h4 className="font-black text-on-surface mb-3 text-sm uppercase tracking-wider">{title}</h4>
                    <p className="text-xs font-medium leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
