"use client";

interface TogglePillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TogglePill({ label, isActive, onClick }: TogglePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-1.5 text-[10px] font-black uppercase transition-all ${
        isActive ? "bg-surface text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
      }`}
    >
      {label}
    </button>
  );
}
