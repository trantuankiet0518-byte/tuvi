import Icon from "@/components/atoms/Icon";

type ThuVienBentoProps = {
  searchTerm: string;
};

const tuHoaItems = [
  { label: "Hóa Lộc", search: "hoa loc loc" },
  { label: "Hóa Quyền", search: "hoa quyen quyen" },
  { label: "Hóa Khoa", search: "hoa khoa" },
  { label: "Hóa Kỵ", search: "hoa ky" },
];

const starCards = [
  {
    system: "Phụ Tướng Hệ",
    name: "Thiên Phủ",
    element: "Thổ",
    desc: "Lộc kho của trời, chủ về sự giàu có, ổn định và lòng bao dung. Thiên Phủ đi cùng các sao tốt sẽ tạo nên cách cục phú quý vững bền.",
    search: "thien phu phu tuong he tho",
  },
  {
    system: "Sát Phá Tham Hệ",
    name: "Thất Sát",
    element: "Kim",
    desc: "Tướng quân trên chiến trường, chủ về uy dũng, quyết đoán nhưng cũng đầy rủi ro. Biểu tượng của sự thay đổi mang tính đột phá.",
    search: "that sat sat pha tham kim",
  },
  {
    system: "Cơ Nguyệt Đồng Lương",
    name: "Thiên Cơ",
    element: "Mộc",
    desc: "Mưu thần, chủ về trí tuệ, sự khéo léo và các hoạt động tinh thần. Thiên Cơ linh hoạt, ứng biến nhưng đôi khi thiếu tính kiên định.",
    search: "thien co cu nguyet dong luong moc",
  },
  {
    system: "Lục Sát Tinh",
    name: "Kình Dương",
    element: "Kim",
    desc: "Lưỡi dao sắc bén, mang tính sát phạt và xung đột. Khi đắc địa chủ về quyền uy quân sự, hãm địa chủ về tai nạn và hình thương.",
    search: "kinh duong luc sat tinh kim",
  },
];

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function ThuVienBento({ searchTerm }: ThuVienBentoProps) {
  const query = normalizeText(searchTerm.trim());

  const filteredTuHoaItems = tuHoaItems.filter(({ label, search }) => {
    if (!query) return true;
    return normalizeText(`${label} ${search}`).includes(query);
  });

  const filteredStarCards = starCards.filter(({ system, name, element, desc, search }) => {
    if (!query) return true;
    return normalizeText(`${system} ${name} ${element} ${desc} ${search}`).includes(query);
  });

  const featuredMatches =
    !query ||
    normalizeText("Tử Vi Tinh Đẩu Chính Tinh Vương Khí Quyền lực tôn quý khả năng bao quát").includes(query);

  const hasResults = featuredMatches || filteredTuHoaItems.length > 0 || filteredStarCards.length > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
      {featuredMatches ? (
        <div className="ui-shell md:col-span-8 group relative rounded-[2.5rem] transition-all duration-500 hover:-translate-y-1">
          <div className="relative p-12 flex flex-col h-full min-h-[320px] z-10">
            <div className="flex justify-between items-start mb-16">
              <div className="ui-panel-soft flex h-16 w-16 items-center justify-center rounded-2xl text-primary transition-transform group-hover:scale-110">
                <Icon name="stars" className="text-primary text-3xl" />
              </div>
              <span className="ui-pill rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                Cấp độ: Chính Tinh Vương Khải
              </span>
            </div>
            <div className="mt-auto">
              <h2 className="text-5xl font-black tracking-tighter text-on-surface mb-4">Tử Vi Tinh</h2>
              <p className="text-on-surface-variant text-lg max-w-lg leading-relaxed mb-8 font-medium">
                Đứng đầu trong 14 chính tinh, đại diện cho quyền lực, tôn quý và khả năng bao quát.
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Là "vạn tinh chi chủ" điều hành toàn bộ lá số.
              </p>
              <div className="flex gap-4">
                {["Hành: Thổ", "Loại: Đế Tinh"].map((tag) => (
                  <span key={tag} className="ui-pill rounded-xl px-5 py-2 text-[11px] font-black text-on-surface uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] w-1/2 h-full opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-primary/20 rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full" />
          </div>
        </div>
      ) : null}

      {filteredTuHoaItems.length > 0 ? (
        <div className="ui-shell md:col-span-4 flex flex-col rounded-[2.5rem] p-12">
          <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-4 text-on-surface uppercase">
            <div className="ui-panel-soft flex h-10 w-10 items-center justify-center rounded-xl text-tertiary">
              <Icon name="auto_awesome" className="text-2xl" />
            </div>
            Tứ Hóa
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-10 font-medium">
            Bốn trạng thái biến đổi mạnh mẽ nhất của các chính tinh theo Thiên Can: Khoa, Quyền, Lộc, Kỵ.
          </p>
          <div className="space-y-4 mt-auto">
            {filteredTuHoaItems.map(({ label }) => (
              <div key={label} className="ui-panel-soft flex cursor-pointer items-center justify-between rounded-2xl p-5 transition-all group active:scale-95 hover:-translate-y-0.5">
                <span className="text-base font-black text-on-surface uppercase tracking-wider">{label}</span>
                <Icon name="arrow_outward" className="text-lg text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {filteredStarCards.length > 0 ? (
        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredStarCards.map(({ system, name, element, desc }) => (
            <div key={name} className="ui-panel group flex flex-col rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-2">
              <div className="ui-pill mb-6 w-fit rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                {system}
              </div>
              <h4 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors text-on-surface uppercase tracking-tight">
                {name}
              </h4>
              <p className="text-sm text-on-surface-variant line-clamp-4 mb-8 font-medium leading-relaxed flex-1">{desc}</p>
              <div className="pt-6 border-t border-border/30 flex justify-between items-center mt-auto">
                <span className="ui-pill rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest text-on-surface">
                  Hành: {element}
                </span>
                <button className="ui-panel-soft flex h-10 w-10 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:text-primary">
                  <Icon name="bookmark" className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !hasResults ? (
        <div className="ui-shell md:col-span-12 rounded-[2.5rem] p-12 text-center">
          <p className="text-2xl font-black text-on-surface uppercase tracking-tight">Không tìm thấy kết quả phù hợp</p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-on-surface-variant">
            Thử tìm bằng tên sao, hệ sao, ngũ hành hoặc từ khóa ngắn hơn.
          </p>
        </div>
      ) : null}
    </div>
  );
}
