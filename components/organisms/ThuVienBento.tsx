const tuHoaItems = ["Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ"];

const starCards = [
  { system: "Phủ Tướng Hệ", name: "Thiên Phủ", element: "Thổ", desc: "Lộc khố của trời, chủ về sự giàu có, ổn định và lòng bao dung. Thiên Phủ đi cùng các sao tốt sẽ tạo nên cách cục phú quý vững bền." },
  { system: "Sát Phá Tham Hệ", name: "Thất Sát", element: "Kim", desc: "Tướng quân trên chiến trường, chủ về uy dũng, quyết đoán nhưng cũng đầy rủi ro. Biểu tượng của sự thay đổi mang tính đột phá." },
  { system: "Cơ Nguyệt Đồng Lương", name: "Thiên Cơ", element: "Mộc", desc: "Mưu thần, chủ về trí tuệ, sự khéo léo và các hoạt động tinh thần. Thiên Cơ linh hoạt, ứng biến nhưng đôi khi thiếu tính kiên định." },
  { system: "Lục Sát Tinh", name: "Kình Dương", element: "Kim", desc: "Lưỡi đao sắc bén, mang tính sát phạt và xung đột. Khi đắc địa chủ về quyền uy quân sự, hãm địa chủ về tai nạn và hình thương." },
];

export default function ThuVienBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
      {/* Featured: Tử Vi Tinh */}
      <div className="md:col-span-8 group relative overflow-hidden bg-surface-container rounded-[2.5rem] hover:border-primary/30 transition-all duration-500 shadow-xl shadow-background/50">
        <div className="relative p-12 flex flex-col h-full min-h-[320px] z-10">
          <div className="flex justify-between items-start mb-16">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase bg-primary/5 px-4 py-2 rounded-full">
              Cấp độ: Chính Tinh Vươn Khơi
            </span>
          </div>
          <div className="mt-auto">
            <h2 className="text-5xl font-black tracking-tighter text-on-surface mb-4">Tử Vi Tinh</h2>
            <p className="text-on-surface-variant text-lg max-w-lg leading-relaxed mb-8 font-medium">
              Đứng đầu trong 14 chính tinh, đại diện cho quyền lực, tôn quý và khả năng bao quát.
              Là "Vạn tinh chi chủ" điều hành toàn bộ lá số.
            </p>
            <div className="flex gap-4">
              {["Hành: Thổ", "Loại: Đế Tinh"].map((tag) => (
                <span key={tag} className="bg-surface-container px-5 py-2 rounded-xl text-[11px] font-black text-on-surface uppercase tracking-widest shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Decorative pulse ring */}
        <div className="absolute right-[-10%] bottom-[-10%] w-1/2 h-full opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-primary/20 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full" />
        </div>
      </div>

      {/* Tứ Hóa card */}
      <div className="md:col-span-4 bg-surface-container/30 backdrop-blur-sm rounded-[2.5rem] p-12 flex flex-col shadow-xl">
        <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-4 text-on-surface uppercase">
          <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          Tứ Hóa
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-10 font-medium">
          Bốn trạng thái biến đổi mạnh mẽ nhất của các chính tinh theo Thiên Can: Khoa, Quyền, Lộc, Kỵ.
        </p>
        <div className="space-y-4 mt-auto">
          {tuHoaItems.map((item) => (
            <div key={item} className="flex items-center justify-between p-5 bg-surface-container rounded-2xl hover:border-primary/30 hover:bg-surface-container/50 transition-all cursor-pointer group active:scale-95 shadow-sm">
              <span className="text-base font-black text-on-surface uppercase tracking-wider">{item}</span>
              <span className="material-symbols-outlined text-lg text-on-surface-variant group-hover:text-primary transition-colors">
                arrow_forward_ios
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Star cards grid */}
      <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {starCards.map(({ system, name, element, desc }) => (
          <div key={name} className="bg-surface-container rounded-[2rem] p-8 hover:border-primary/20 hover:-translate-y-2 transition-all duration-300 group shadow-lg shadow-background/50 flex flex-col">
            <div className="text-secondary font-black text-[10px] tracking-[0.2em] uppercase mb-6 bg-secondary/5 w-fit px-3 py-1 rounded-lg">
              {system}
            </div>
            <h4 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors text-on-surface uppercase tracking-tight">{name}</h4>
            <p className="text-sm text-on-surface-variant line-clamp-4 mb-8 font-medium leading-relaxed flex-1">{desc}</p>
            <div className="pt-6 border-t border-border/30 flex justify-between items-center mt-auto">
              <span className="text-[10px] text-on-surface font-black uppercase tracking-widest bg-surface-container px-3 py-1 rounded-lg">Hành: {element}</span>
              <button className="w-10 h-10 rounded-xl hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">bookmark</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
