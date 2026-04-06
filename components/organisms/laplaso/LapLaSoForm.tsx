"use client";

import { memo, useCallback } from "react";
import { useTranslations } from "next-intl";

import type { FortuneRequest } from "@/lib/bazi/types";
import Icon from "@/components/atoms/Icon";
import { GenderToggleGroup, CalendarTypeToggle } from "@/components/molecules";
import { SectionLabel, InfoCallout } from "@/components/atoms";

interface LapLaSoFormProps {
  form: FortuneRequest;
  isPending: boolean;
  onFieldChange: <K extends keyof FortuneRequest>(field: K, value: FortuneRequest[K]) => void;
  onSubmit: () => void;
}

const LapLaSoForm = memo(function LapLaSoForm({ form, isPending, onFieldChange, onSubmit }: LapLaSoFormProps) {
  const t = useTranslations("laplaso.form");

  const timezones = [
    { label: t("timezoneLabels.hanoi"), value: "+07:00" },
    { label: t("timezoneLabels.saigon"), value: "+07:00" },
    { label: t("timezoneLabels.beijing"), value: "+08:00" },
    { label: t("timezoneLabels.california"), value: "-08:00" },
    { label: t("timezoneLabels.paris"), value: "+01:00" },
  ];

  const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("fullName", event.target.value);
  }, [onFieldChange]);

  const handleDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("birthDate", event.target.value);
  }, [onFieldChange]);

  const handleTimeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("birthTime", event.target.value);
  }, [onFieldChange]);

  const handleTimezoneChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onFieldChange("timezone", event.target.value);
  }, [onFieldChange]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  }, [onSubmit]);

  return (
    <section className="lg:col-span-5 space-y-8 lg:space-y-10">
      <header className="mx-auto max-w-2xl text-center space-y-4">
        <p className="text-[0.6875rem] font-black uppercase tracking-[0.35em] text-primary">
          {t("kicker")}
        </p>
        <h1
          className="font-black tracking-tighter text-on-surface"
          style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: "0.95" }}
        >
          {t("title")}
          <br />
          <span className="text-primary">{t("highlight")}</span>
        </h1>
        <p className="mx-auto max-w-xl text-sm md:text-base font-medium leading-relaxed text-on-surface-variant">
          {t("description")}
        </p>
      </header>

      <form className="glass-border-panel mx-auto w-full max-w-2xl space-y-8 rounded-3xl p-10" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <SectionLabel>{t("fullName")}</SectionLabel>
          <input
            type="text"
            value={form.fullName}
            onChange={handleNameChange}
            placeholder={t("fullNamePlaceholder")}
            className="w-full rounded-2xl bg-surface-container/50 px-6 py-4 text-lg font-semibold text-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="space-y-3">
          <SectionLabel>{t("gender")}</SectionLabel>
          <GenderToggleGroup
            value={form.gender}
            onChange={(value) => onFieldChange("gender", value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <SectionLabel>{t("datetime")}</SectionLabel>
            <CalendarTypeToggle
              value={form.calendarType}
              onChange={(value) => onFieldChange("calendarType", value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={form.birthDate}
              onChange={handleDateChange}
              className="w-full rounded-2xl bg-surface-container/50 px-6 py-4 font-bold text-on-surface outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
            <input
              type="time"
              value={form.birthTime}
              onChange={handleTimeChange}
              className="w-full rounded-2xl bg-surface-container/50 px-6 py-4 font-bold text-on-surface outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="space-y-3">
          <SectionLabel>{t("timezone")}</SectionLabel>
          <div className="group relative">
            <select
              value={form.timezone}
              onChange={handleTimezoneChange}
              className="w-full cursor-pointer appearance-none rounded-2xl bg-surface-container/50 px-6 py-4 text-lg font-bold text-on-surface outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              {timezones.map((timezone) => (
                <option key={timezone.label} value={timezone.value}>
                  {timezone.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-hover:text-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full rounded-2xl bg-primary py-6 text-base font-black uppercase tracking-[0.2em] text-on-primary shadow-2xl shadow-primary/30 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
        >
          {isPending ? t("submitting") : t("submit")}
        </button>
      </form>

      <div className="mx-auto max-w-2xl">
        <InfoCallout
          title={t("importantTitle")}
          description={t("importantDescription")}
        />
      </div>
    </section>
  );
});

LapLaSoForm.displayName = "LapLaSoForm";

export default LapLaSoForm;
