"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Eye, EyeOff, LockKeyhole, Mail } from "@/components/icons";
import { submitRegister } from "@/lib/services/auth";
import { readPendingRoute } from "@/lib/services/authSession";

const fieldShell =
  "group flex h-14 items-center gap-3 rounded-[24px] border border-[#2b261f] bg-[#171513] px-4 text-[#f4efe7] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition focus-within:border-[#7b5d36] focus-within:shadow-[0_0_0_4px_rgba(255,185,95,0.08)]";

export default function RegisterForm() {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "");
      const fullName = String(formData.get("fullName") ?? "");
      const password = String(formData.get("password") ?? "");
      const acceptedTerms = formData.get("terms") === "on";
      const target = readPendingRoute() ?? "/";

      const result = await submitRegister({
        fullName,
        email,
        password,
        acceptedTerms,
      });

      if (!result.ok) {
        setSubmitError(result.error.message);
        return;
      }

      router.replace(target);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-[500px] animate-hero-rise">
      <div className="rounded-[28px] border border-white/8 bg-[#11100f] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-5">
        <div className="rounded-[24px] border border-white/6 bg-[#141311] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:px-7 sm:py-7">
          <div className="text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#8f8a84]">
              {t("badge")}
            </p>
            <h2 className="mt-3 text-[1.9rem] font-semibold tracking-[-0.045em] text-[#f4efe7] sm:text-[2.15rem]">
              {t("title")}
            </h2>
            <p className="mx-auto mt-3 max-w-[30ch] text-[0.95rem] leading-6 text-[#a59f98]">
              {t("subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-6">
            <label className="space-y-2 gap-10">
              <div className={fieldShell}>
                <input
                  autoComplete="name"
                  aria-label={t("fullName")}
                  className="h-full w-full bg-transparent text-[0.98rem] text-[#f4efe7] :text-[#5a544d] focus:outline-none"
                  name="fullName"
                  type="text"
                />
              </div>
            </label>
            <label className="space-y-2">
              <div className={fieldShell}>
                <Mail
                  className="h-4 w-4 shrink-0 text-[#7d766f]"
                  aria-hidden="true"
                />
                <input
                  autoComplete="email"
                  aria-label={t("email")}
                  className="h-full w-full bg-transparent text-[0.98rem] text-[#f4efe7] :text-[#5a544d] focus:outline-none"
                  name="email"
                  type="email"
                />
              </div>
            </label>
            <label className="space-y-2">
              <div className={fieldShell}>
                <LockKeyhole
                  className="h-4 w-4 shrink-0 text-[#7d766f]"
                  aria-hidden="true"
                />
                <input
                  autoComplete="new-password"
                  aria-label={t("password")}
                  className="h-full w-full bg-transparent text-[0.98rem] text-[#f4efe7] :text-[#5a544d] focus:outline-none"
                  name="password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  aria-label={
                    showPassword ? t("hidePassword") : t("showPassword")
                  }
                  className="shrink-0 rounded-full p-1.5 text-[#7d766f] transition hover:bg-white/5 hover:text-[#f4efe7]"
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </label>

            <label className="flex items-start gap-3 rounded-[22px] border border-[#2a2520] bg-[#131110] px-4 py-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-[#4a4238] bg-transparent text-[#ffbe6a] focus:ring-[#ffbe6a]/30"
              />
              <span className="text-[0.82rem] leading-6 text-[#a59f98]">
                {t("agreePrefix")}{" "}
                <Link
                  href="#"
                  className="font-medium text-[#f4efe7] hover:text-[#ffbe6a] hover:underline"
                >
                  {t("terms")}
                </Link>{" "}
                {t("and")}{" "}
                <Link
                  href="#"
                  className="font-medium text-[#f4efe7] hover:text-[#ffbe6a] hover:underline"
                >
                  {t("privacy")}
                </Link>
              </span>
            </label>

            <button
              className="mt-2 inline-flex h-16 w-full items-center justify-center rounded-[24px] bg-[#ffbe6a] px-6 text-[0.95rem] font-semibold tracking-[0.24em] text-[#1a1208] shadow-[0_18px_36px_rgba(255,190,106,0.28)] transition hover:brightness-105 active:scale-[0.99]"
              disabled={isSubmitting}
              type="submit"
            >
              {t("submit")}
            </button>

            {submitError ? (
              <p className="text-sm font-medium text-red-300">{submitError}</p>
            ) : null}
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#a59f98]">
            <span>{t("haveAccount")}</span>
            <Link
              href="/login"
              className="font-semibold text-[#ffbe6a] transition hover:underline"
            >
              {t("signIn")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
