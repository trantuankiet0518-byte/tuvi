"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import Input from "@/components/atoms/Input";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ onSearch, placeholder, className = "" }: SearchBarProps) {
  const t = useTranslations("common");
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Input
        icon="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder ?? t("search")}
        className="pr-10"
      />
      {query && (
        <button
          type="button"
          onClick={() => { setQuery(""); onSearch?.(""); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      )}
    </form>
  );
}
