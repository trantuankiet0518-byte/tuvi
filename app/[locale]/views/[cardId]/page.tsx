import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ cardId: string; locale: string }>;
}

export default async function CardDetailPage({ params }: Props) {
  const { cardId } = await params;
  const t = await getTranslations("views.chart");

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
      <div className="flex items-start justify-between">
        <div>
          <Link href="/views" className="mb-3 flex items-center gap-1 text-xs text-on-surface-variant transition-colors hover:text-primary">
            <Icon name="arrow_back" className="text-sm" />
            {t("back")}
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">{chart.name}</h1>
          <p className="mt-1 text-sm text-on-surface-variant">{chart.date}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{chart.palace}</Badge>
          <Badge variant="primary">{chart.element}</Badge>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="48" stroke="currentColor" strokeWidth="0.1" className="text-outline-variant" />
            <circle cx="50" cy="50" fill="none" r="30" stroke="currentColor" strokeWidth="0.1" className="text-outline-variant" />
            <line stroke="currentColor" strokeWidth="0.1" x1="50" x2="50" y1="2" y2="98" className="text-outline-variant" />
            <line stroke="currentColor" strokeWidth="0.1" x1="2" x2="98" y1="50" y2="50" className="text-outline-variant" />
          </svg>
        </div>

        <div
          className="relative z-10 mx-auto aspect-square max-w-2xl rounded-lg border border-outline-variant/20"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: "1px",
            backgroundColor: "rgba(83,68,52,0.15)",
          }}
        >
          {["Tý", "Ngọ", "Mùi", "Thân", "Thìn", "", "", "Dậu", "Mão", "", "", "Tuất", "Dần", "Sửu", "Tý", "Hợi"].map((cell, i) => {
            const isCenter = i === 5 || i === 6 || i === 9 || i === 10;
            if (isCenter && i !== 5) return null;
            if (i === 5) {
              return (
                <div
                  key="center"
                  className="flex flex-col items-center justify-center bg-background p-4 text-center"
                  style={{ gridColumn: "2 / span 2", gridRow: "2 / span 2" }}
                >
                  <h2 className="text-lg font-bold uppercase tracking-widest text-primary">{t("title")}</h2>
                  <p className="mt-2 text-[10px] tracking-wider text-on-surface-variant/60">{chart.name}</p>
                </div>
              );
            }
            return (
              <div key={i} className="flex aspect-square flex-col justify-between bg-surface-container-low p-2">
                <span className="text-[10px] font-bold text-outline">{cell}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            { label: t("stats.element"), value: chart.element },
            { label: t("stats.group"), value: chart.group },
            { label: t("stats.polarity"), value: chart.polarity },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">{label}:</span>
              <span className="text-xs font-semibold text-primary">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="primary" icon="auto_awesome" iconPosition="left">
          {t("actions.aiReading")}
        </Button>
        <Button variant="ghost" icon="share">
          {t("actions.share")}
        </Button>
      </div>
    </div>
  );
}
