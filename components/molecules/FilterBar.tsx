"use client";

import { useState } from "react";
import Icon from "@/components/atoms/Icon";

interface FilterBarProps {
  filters: string[];
  activeIndex?: number;
  onFilterChange?: (index: number) => void;
  hint?: string;
}

export default function FilterBar({ filters, activeIndex = 0, onFilterChange, hint }: FilterBarProps) {
  const [active, setActive] = useState(activeIndex);

  const handleChange = (index: number) => {
    setActive(index);
    onFilterChange?.(index);
  };

  return (
    <div className="bg-transparent border border-white/10 p-2 rounded-[2rem] flex flex-wrap items-center gap-2 shadow-xl shadow-background/50 backdrop-blur-xl">
      {filters.map((label, i) => (
        <button
          key={label}
          onClick={() => handleChange(i)}
          className={`px-8 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all min-h-[48px] ${
            active === i
              ? "bg-primary text-on-primary shadow-lg shadow-primary/20 scale-[1.02]"
              : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
          }`}
        >
          {label}
        </button>
      ))}
      {hint && (
        <div className="ml-auto pr-6 hidden lg:flex items-center gap-3 text-xs text-primary font-black uppercase tracking-[0.2em]">
          <Icon name="tune" className="text-lg" />
          {hint}
        </div>
      )}
    </div>
  );
}
