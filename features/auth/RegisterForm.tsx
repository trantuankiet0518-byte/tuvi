"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";

export default function RegisterForm() {
  const t = useTranslations("auth.register");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-md">
      <div className="card-glass p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter text-on-surface mb-2">{t("title")}</h1>
          <p className="text-on-surface-variant opacity-80">{t("subtitle")}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label={t("fullName")} name="fullName" type="text" placeholder="Nguyá»…n VÄƒn A" icon="person" />
          <FormField label={t("email")} name="email" type="email" placeholder="celestial@meridian.com" icon="mail" />
          <FormField label={t("password")} name="password" type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" icon="lock" />
          <div className="flex items-start gap-3 py-2">
            <input id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded-sm border-outline-variant bg-surface-container-lowest text-primary focus:ring-0" />
            <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed">
              {t("agreePrefix")}{" "}
              <Link href="#" className="text-primary hover:underline">{t("terms")}</Link>
              {" "}{t("and")}{" "}
              <Link href="#" className="text-primary hover:underline">{t("privacy")}</Link>
            </label>
          </div>
          <Button type="submit" variant="primary" className="w-full py-4 tracking-widest uppercase text-xs">{t("submit")}</Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-on-surface-variant text-sm">
            {t("haveAccount")}{" "}
            <Link href="/login" className="text-primary font-bold hover:underline ml-1">{t("signIn")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}