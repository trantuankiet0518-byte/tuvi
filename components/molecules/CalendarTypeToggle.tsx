"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import TogglePill from "@/components/atoms/TogglePill";

interface CalendarTypeToggleProps {
  value: "duong" | "am";
  onChange: (value: "duong" | "am") => void;
}

const CalendarTypeToggle = memo(function CalendarTypeToggle({ value, onChange }: CalendarTypeToggleProps) {
  const t = useTranslations("laplaso.form.calendarLabels");

  return (
    <div className="flex gap-1 rounded-xl border border-white/10 bg-transparent p-1 backdrop-blur-xl">
      <TogglePill
        label={t("solar")}
        isActive={value === "duong"}
        onClick={() => onChange("duong")}
      />
      <TogglePill
        label={t("lunar")}
        isActive={value === "am"}
        onClick={() => onChange("am")}
      />
    </div>
  );
});

export default CalendarTypeToggle;
