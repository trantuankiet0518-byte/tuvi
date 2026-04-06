"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import ToggleButton from "@/components/atoms/ToggleButton";

interface GenderToggleGroupProps {
  value: "nam" | "nu";
  onChange: (value: "nam" | "nu") => void;
}

const GenderToggleGroup = memo(function GenderToggleGroup({ value, onChange }: GenderToggleGroupProps) {
  const t = useTranslations("laplaso.form.genderLabels");

  return (
    <div className="flex gap-3">
      <ToggleButton
        icon="male"
        label={t("male")}
        isActive={value === "nam"}
        onClick={() => onChange("nam")}
      />
      <ToggleButton
        icon="female"
        label={t("female")}
        isActive={value === "nu"}
        onClick={() => onChange("nu")}
      />
    </div>
  );
});

export default GenderToggleGroup;
