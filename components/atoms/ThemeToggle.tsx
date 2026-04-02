"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Sync with html class on mount
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
    >
      <span className="material-symbols-outlined text-[1.2rem]">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
