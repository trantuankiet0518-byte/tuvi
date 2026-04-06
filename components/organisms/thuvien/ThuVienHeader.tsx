"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/components/atoms/Icon";

const filters = ["all", "major", "minor", "transforms", "cycles"] as const;

type ThuVienHeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function ThuVienHeader({ searchTerm, onSearchChange }: ThuVienHeaderProps) {
  const t = useTranslations("thuvien");
  const [active, setActive] = useState(0);

  return (
    <>
      <header className="mb-20">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-4">
            <p className="w-fit rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.4em] text-primary">
              {t("kicker")}
            </p>
            <h1 className="text-5xl font-black tracking-tighter text-on-surface lg:text-7xl">
              {t("title")} <span className="text-on-surface-variant">{t("titleAccent")}</span>
            </h1>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-on-surface-variant">
              {t("description")}
            </p>
          </div>
          <div className="flex gap-3 self-start">
            <span className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-xs font-black uppercase tracking-widest text-on-surface shadow-sm backdrop-blur-xl">
              {t("stats.totalStars")}
            </span>
            <span className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-xs font-black uppercase tracking-widest text-on-surface shadow-sm backdrop-blur-xl">
              {t("stats.updated")}
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <label className="group relative block">
            <span className="sr-only">Tìm kiếm trong thư viện</span>
            <Icon name="search" className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant transition-colors group-focus-within:text-primary" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Tìm sao, hệ sao, ngũ hành..."
              className="h-14 w-full rounded-[1.5rem] border border-white/10 bg-transparent px-14 pr-14 text-base font-medium text-on-surface outline-none placeholder:text-on-surface-variant shadow-xl shadow-background/50 backdrop-blur-xl transition-all focus:border-primary/30 focus:bg-white/5"
            />
            {searchTerm.length > 0 ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface"
                aria-label="Xóa nội dung tìm kiếm"
              >
                <Icon name="close" className="text-lg" />
              </button>
            ) : null}
          </label>

          <p className="text-sm font-medium text-on-surface-variant lg:max-w-xs lg:text-right">
            Gõ tên sao, hệ sao, ngũ hành hoặc mô tả để lọc nhanh nội dung.
          </p>
        </div>
      </header>

      <section className="mb-16">
        <div className="flex flex-wrap items-center gap-2 rounded-[2rem] border border-white/10 bg-transparent p-2 shadow-xl shadow-background/50 backdrop-blur-xl">
          {filters.map((key, i) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(i)}
              className={`min-h-[48px] rounded-2xl px-8 py-3 text-sm font-black uppercase tracking-widest transition-all ${
                active === i
                  ? "scale-[1.02] bg-primary text-on-primary shadow-lg shadow-primary/20"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              }`}
            >
              {t(`filters.${key}`)}
            </button>
          ))}
          <div className="ml-auto hidden items-center gap-3 pr-6 text-xs font-black uppercase tracking-[0.2em] text-primary lg:flex">
            <Icon name="tune" className="text-lg" />
            {t("filterByElement")}
          </div>
        </div>
      </section>
    </>
  );
}
