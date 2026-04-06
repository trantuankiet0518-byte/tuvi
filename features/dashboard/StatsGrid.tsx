import { useTranslations } from "next-intl";
import Badge from "@/components/atoms/Badge";
import Icon from "@/components/atoms/Icon";

interface StatItem {
  key: "charts" | "readings" | "saved";
  value: string;
  trend?: string;
  icon: string;
}

const stats: StatItem[] = [
  { key: "charts",   value: "12", trend: "+2", icon: "auto_awesome" },
  { key: "readings", value: "48", trend: "+5", icon: "visibility"   },
  { key: "saved",    value: "7",               icon: "bookmark"     },
];

export default function StatsGrid() {
  const t = useTranslations("dashboard.stats");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ key, value, trend, icon }) => (
        <div
          key={key}
          className="card-low p-5 hover:border-primary/20 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-3">
            <Icon className="text-primary" name={icon} />
            {trend && <Badge variant="success">{trend}</Badge>}
          </div>
          <p className="text-2xl font-bold text-on-surface">{value}</p>
          <p className="text-xs text-on-surface-variant mt-1">{t(key)}</p>
        </div>
      ))}
    </div>
  );
}
