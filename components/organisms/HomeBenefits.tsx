const benefits = [
  { icon: "person_search", title: "Biết mình biết người", desc: "Thấu hiểu bản chất, thế mạnh và những góc khuất trong tâm lý để tối ưu hóa sự phát triển cá nhân." },
  { icon: "visibility", title: "Tìm hiểu Họa phúc", desc: "Dự báo những giai đoạn thăng trầm của cuộc đời để có sự chuẩn bị tâm thế vững vàng nhất." },
  { icon: "auto_awesome", title: "Thoát khỏi mê tín", desc: "Tiếp cận mệnh lý một cách duy lý, không sa đà vào các hủ tục cúng bái vô căn cứ." },
  { icon: "bolt", title: "Định hướng hành động", desc: "Biết khi nào nên tiến, khi nào nên lùi. Hành động thuận theo quy luật của tự nhiên." },
];

export default function HomeBenefits() {
  return (
    <section className="py-32 bg-surface relative z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center mb-24 relative z-10">
        <span className="text-xs font-black tracking-[0.5em] text-primary uppercase bg-primary/5 px-4 py-2 rounded-full">
          Insight &amp; Vision
        </span>
        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mt-8 text-on-surface">Tại sao cần biết Tử Vi?</h2>
        <div className="h-1.5 w-24 bg-primary mx-auto mt-8 rounded-full shadow-lg shadow-primary/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group p-10 bg-surface-container rounded-[2.5rem] hover:border-primary/30 transition-all duration-500 flex flex-col items-center text-center shadow-xl shadow-background/50 hover:-translate-y-2"
            >
              <div className="w-20 h-20 rounded-3xl bg-surface-container flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-inner">
                <span
                  className="material-symbols-outlined text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
              </div>
              <h3 className="text-xl font-black mb-4 text-on-surface tracking-tight uppercase">{title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
