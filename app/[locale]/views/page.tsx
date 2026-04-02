import { useTranslations } from "next-intl";
import StatsGrid from "@/features/dashboard/StatsGrid";
import RecentCharts from "@/features/dashboard/RecentCharts";

export default function ViewsDashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
          {t("title")}
        </h1>
        <p className="text-on-surface-variant mt-1">
          {t("welcome", { name: "Nguyễn Văn A" })}
        </p>
      </div>
      <StatsGrid />
      <RecentCharts />
    </div>
  );
}
