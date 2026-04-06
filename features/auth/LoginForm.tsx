"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from "@/components/icons";
import { submitLogin } from "@/lib/services/auth";
import { readPendingRoute } from "@/lib/services/authSession";

const fieldShell =
  "group flex h-14 items-center gap-3 rounded-[1.5rem] border border-white/8 bg-[#151515] px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition focus-within:border-primary/45 focus-within:shadow-[0_0_0_4px_rgba(196,122,0,0.10)]";

export default function LoginForm() {
  const t = useTranslations("auth.login");
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
      const target = readPendingRoute() ?? "/";

      const result = await submitLogin({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
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
    <section className="animate-hero-rise">
      <div className="glass-border-panel relative overflow-hidden rounded-[2.25rem] p-4 sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,122,0,0.06),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />

        <div className="relative rounded-[1.75rem] border border-white/5 bg-[#111111] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-primary/25 bg-primary/10 text-primary shadow-[0_10px_30px_rgba(196,122,0,0.12)]">
            <LogIn className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
          </div>

          <div className="text-center">
            <h1 className="font-cormorant-garamond text-3xl font-semibold tracking-tight text-white sm:text-[2.15rem]">
              {t("title")}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/55 sm:text-[0.95rem]">
              {t("subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            <label className={fieldShell}>
              <Mail
                className="h-4 w-4 shrink-0 text-white/35 transition group-focus-within:text-primary"
                aria-hidden="true"
              />
              <input
                autoComplete="email"
                aria-label={t("email")}
                className="h-full w-full bg-transparent text-[0.95rem] text-white placeholder:text-white/28 focus:outline-none"
                name="email"
                placeholder={t("email")}
                type="email"
              />
            </label>

            <label className={fieldShell}>
              <LockKeyhole
                className="h-4 w-4 shrink-0 text-white/35 transition group-focus-within:text-primary"
                aria-hidden="true"
              />
                <input
                  autoComplete="current-password"
                  aria-label={t("password")}
                  className="h-full w-full bg-transparent text-[0.95rem] text-white placeholder:text-white/28 focus:outline-none"
                  name="password"
                  placeholder={t("password")}
                  type={showPassword ? "text" : "password"}
                />
              <button
                aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                className="shrink-0 rounded-full p-1.5 text-white/35 transition hover:bg-white/5 hover:text-white/65"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </label>

            <button
              className="w-full text-right text-[0.82rem] text-white/65 transition hover:text-white"
              type="button"
            >
              {t("forgotPassword")}
            </button>

            {submitError ? (
              <p className="text-sm font-medium text-red-300">{submitError}</p>
            ) : null}

            <button
              className="mt-1 inline-flex h-14 w-full items-center justify-center rounded-[1.5rem] bg-button-gradient px-6 text-sm font-semibold uppercase tracking-[0.2em] text-on-primary shadow-[0_20px_40px_rgba(196,122,0,0.22)] transition hover:brightness-105 active:scale-[0.99]"
              disabled={isSubmitting}
              type="submit"
            >
              {t("submit")}
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-2 text-sm text-white/55 sm:flex-row sm:justify-center">
            <span>{t("noAccount")}</span>
            <Link
              href="/register"
              className="font-semibold text-primary transition hover:text-primary-fixed-dim"
            >
              {t("signUp")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
