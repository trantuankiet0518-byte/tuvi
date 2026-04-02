import { useTranslations } from "next-intl";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { Link } from "@/i18n/navigation";

interface Props {
  params: Promise<{ cardId: string; locale: string }>;
}

export default async function CardDetailPage({ params }: Props) {
  const { cardId } = await params;
  const t = useTranslations("views.chart");

  // Mock data — replace with real fetch by cardId
  const chart = {
    id: cardId,
    name: "Nguyễn Văn A",
    date: "15/03/1990",
    palace: "Tý",
    element: "Lư Trung Hỏa",
    group: "Thủy Nhị Cục",
    polarity: "Dương Nam",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/views" className="text-xs text-on-surface-variant hover:text-primary flex items-center gap-1 mb-3 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Quay lại
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">{chart.name}</h1>
          <p className="text-on-surface-variant mt-1 text-sm">{chart.date}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{chart.palace}</Badge>
          <Badge variant="primary">{chart.element}</Badge>
        </div>
      </div>

      {/* Chart grid preview */}
      <div className="relative bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="48" stroke="currentColor" strokeWidth="0.1" className="text-outline-variant" />
            <circle cx="50" cy="50" fill="none" r="30" stroke="currentColor" strokeWidth="0.1" className="text-outline-variant" />
            <line stroke="currentColor" strokeWidth="0.1" x1="50" x2="50" y1="2" y2="98" className="text-outline-variant" />
            <line stroke="currentColor" strokeWidth="0.1" x1="2" x2="98" y1="50" y2="50" className="text-outline-variant" />
          </svg>
        </div>

        <div
          className="relative z-10 aspect-square max-w-2xl mx-auto rounded-lg border border-outline-variant/20"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: "1px",
            backgroundColor: "rgba(83,68,52,0.15)",
          }}
        >
          {["Tỵ","Ngọ","Mùi","Thân","Thìn","","","Dậu","Mão","","","Tuất","Dần","Sửu","Tý","Hợi"].map((cell, i) => {
            const isCenter = i === 5 || i === 6 || i === 9 || i === 10;
            if (isCenter && i !== 5) return null;
            if (i === 5) {
              return (
                <div
                  key="center"
                  className="bg-background flex flex-col items-center justify-center text-center p-4"
                  style={{ gridColumn: "2 / span 2", gridRow: "2 / span 2" }}
                >
                  <h2 className="text-lg font-bold text-primary tracking-widest uppercase">{t("title")}</h2>
                  <p className="text-[10px] text-on-surface-variant/60 tracking-wider mt-2">{chart.name}</p>
                </div>
              );
            }
            return (
              <div key={i} className="bg-surface-container-low p-2 flex flex-col justify-between aspect-square">
                <span className="text-[10px] font-bold text-outline">{cell}</span>
              </div>
            );
          })}
        </div>

        {/* Stats chips */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {[
            { label: "Ngũ Hành", value: chart.element },
            { label: "Cục", value: chart.group },
            { label: "Âm Dương", value: chart.polarity },
          ].map(({ label, value }) => (
            <div key={label} className="px-3 py-1.5 bg-secondary-container rounded-full flex items-center gap-2">
              <span className="text-[10px] font-bold text-on-secondary-container uppercase tracking-wider">{label}:</span>
              <span className="text-xs font-semibold text-primary">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="primary" icon="auto_awesome" iconPosition="left">
          Giải đoán AI
        </Button>
        <Button variant="ghost" icon="share">
          Chia sẻ
        </Button>
      </div>
    </div>
  );
}
