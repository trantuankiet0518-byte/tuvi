"use client";

import { useCallback, useMemo, useState, useTransition } from "react";

import LapLaSoDetail from "@/components/organisms/LapLaSoDetail";
import LapLaSoForm from "@/components/organisms/LapLaSoForm";
import LapLaSoPreview from "@/components/organisms/LapLaSoPreview";
import type { FortuneRequest, TuViEngineResult } from "@/lib/bazi/types";

const DEFAULT_FORM: FortuneRequest = {
  fullName: "",
  gender: "nam",
  calendarType: "duong",
  birthDate: "",
  birthTime: "12:00",
  timezone: "+07:00",
  eightCharProviderSect: 2,
};

export default function LapLaSoExperience() {
  const [form, setForm] = useState<FortuneRequest>(DEFAULT_FORM);
  const [result, setResult] = useState<TuViEngineResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = useMemo(() => Boolean(form.birthDate && form.birthTime && form.timezone), [form.birthDate, form.birthTime, form.timezone]);

  const updateField = useCallback(<K extends keyof FortuneRequest>(field: K, value: FortuneRequest[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!canSubmit) {
      setError("Vui lòng nhập đủ ngày sinh, giờ sinh và múi giờ.");
      return;
    }

    startTransition(async () => {
      setError(null);

      const response = await fetch("/api/tuvi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as TuViEngineResult | { error: string };

      if (!response.ok || "error" in data) {
        setResult(null);
        setError("error" in data ? data.error : "Không thể lập lá số.");
        return;
      }

      setResult(data);
    });
  }, [canSubmit, form]);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
    setForm(DEFAULT_FORM);
  }, []);

  if (result) {
    return <LapLaSoDetail result={result} onReset={handleReset} />;
  }

  return (
    <>
      <LapLaSoForm form={form} isPending={isPending} onFieldChange={updateField} onSubmit={handleSubmit} />
      <LapLaSoPreview error={error} isPending={isPending} result={null} timezone={form.timezone} />
    </>
  );
}
