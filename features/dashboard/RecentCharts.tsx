import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Badge from "@/components/atoms/Badge";

const mockCharts = [
  { id: "chart-001", name: "Nguyễn Văn A", date: "15/03/1990", palace: "Tý", element: "Lư Trung Hỏa" },
  { id: "chart-002", name: "Trần Thị B", date: "22/08/1985", palace: "Mão", element: "Đại Hải Thủy" },
];

export default function RecentCharts() {
  const t = useTranslations("dashboard");

  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden">
      <div className="p-5 flex justify-between items-center">
        <h3 className="text-sm font-bold tracking-widest uppercase text-on-surface">
          {t("recentCharts")}
        </h3>
        <Link href="/views" className="text-xs text-primary hover:underline flex items-center gap-1">
          {t("viewAll")}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
      <div className="divide-y divide-outline-variant/10">
        {mockCharts.map((chart) => (
          <Link
            key={chart.id}
            href={`/views/${chart.id}`}
            className="flex p-4 hover:bg-surface-container-high transition-colors cursor-pointer justify-between items-start"
          >
            <div>
              <p className="text-sm font-semibold text-on-surface">{chart.name}</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{chart.date}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{chart.palace}</Badge>
              <Badge variant="secondary">{chart.element}</Badge>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
