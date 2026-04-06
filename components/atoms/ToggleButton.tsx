"use client";

import Icon from "@/components/atoms/Icon";

interface ToggleButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ToggleButton({ icon, label, isActive, onClick }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[56px] flex-1 items-center justify-center gap-3 rounded-2xl border px-6 py-4 font-black transition-all ${
        isActive
          ? "border-primary/25 bg-transparent text-primary shadow-lg shadow-primary/10 backdrop-blur-xl"
          : "border-white/10 bg-transparent text-on-surface-variant hover:bg-white/5 hover:text-on-surface backdrop-blur-xl"
      }`}
    >
      <Icon name={icon} className="text-2xl" />
      {label}
    </button>
  );
}
