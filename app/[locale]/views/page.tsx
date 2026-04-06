import { useTranslations } from "next-intl";
import StatsGrid from "@/features/dashboard/StatsGrid";
import RecentCharts from "@/features/dashboard/RecentCharts";

export default function ViewsDashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
          {t("title")}
        </h1>
        <p className="mt-1 text-on-surface-variant">
          {t("welcome", { name: t("demoName") })}
        </p>
      </div>
      <StatsGrid />
      <RecentCharts />
    </div>
  );
}
