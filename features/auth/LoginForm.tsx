"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";

export default function LoginForm() {
  const t = useTranslations("auth.login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-[440px] flex flex-col gap-8">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container-highest mb-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
        </div>
        <h1 className="text-[2.75rem] font-bold tracking-tighter leading-tight text-on-surface">{t("title")}</h1>
        <p className="text-on-surface-variant text-[0.875rem] tracking-wide uppercase opacity-70">{t("subtitle")}</p>
      </div>

      <div className="card-glass p-8 shadow-[0_32px_32px_rgba(0,0,0,0.3)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FormField label={t("email")} name="email" type="email" placeholder="alchemist@celestial.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-end">
              <label className="text-[0.6875rem] font-semibold tracking-[0.05em] uppercase text-primary/80">{t("password")}</label>
              <Link href="#" className="text-[0.6875rem] text-primary hover:text-primary-fixed-dim transition-colors">{t("forgotPassword")}</Link>
            </div>
            <FormField label="" name="password" type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" variant="primary" icon="north_east" className="w-full py-3.5 mt-2">{t("submit")}</Button>
        </form>

        <div className="relative my-8 flex items-center">
          <div className="flex-grow" />
          <span className="px-4 text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-on-surface-variant/40">{t("orContinueWith")}</span>
          <div className="flex-grow" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 bg-surface-container-high py-3 rounded-lg hover:bg-surface-container-highest transition-colors active:scale-95">
            <span className="text-sm font-medium text-on-surface">Google</span>
          </button>
          <button className="flex items-center justify-center gap-3 bg-[#1877F2] py-3 rounded-lg hover:brightness-110 transition-all active:scale-95">
            <span className="text-sm font-medium text-white">Facebook</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <span className="text-on-surface-variant/60 text-[0.875rem]">{t("noAccount")}</span>
        <Link href="/register" className="text-primary font-semibold text-[0.875rem] hover:underline">{t("signUp")}</Link>
      </div>
    </div>
  );
}