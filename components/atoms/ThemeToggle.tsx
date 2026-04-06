"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "./Icon";

export default function ThemeToggle() {
  const t = useTranslations("shared");
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true
  );

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
      aria-label={t("toggleTheme")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/25 bg-background/35 text-on-surface-variant transition-colors hover:bg-black/4 backdrop-blur-xl"
    >
      <Icon className="text-[1.2rem]" name={isDark ? "light_mode" : "dark_mode"} />
    </button>
  );
}
