"use client";

import { useCallback, useMemo, useState, useTransition } from "react";

import LapLaSoDetail from "@/components/organisms/laplaso/LapLaSoDetail";
import LapLaSoForm from "@/components/organisms/laplaso/LapLaSoForm";
import LapLaSoPreview from "@/components/organisms/laplaso/LapLaSoPreview";
import SavedChartsList from "@/components/organisms/laplaso/SavedChartsList";
import type { FortuneRequest, TuViEngineResult } from "@/lib/bazi/types";
import { submitFortuneRequest } from "@/lib/services/fortune";
import { loadInitialProfile, saveProfile } from "@/lib/services/profile";
import { saveChart } from "@/lib/services/savedCharts";

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
  const [form, setForm] = useState<FortuneRequest>(() => {
    const initialProfile = loadInitialProfile();

    return {
      ...DEFAULT_FORM,
      fullName: initialProfile.fullName || DEFAULT_FORM.fullName,
      gender: initialProfile.gender === "nu" ? "nu" : "nam",
      calendarType: initialProfile.calendarType || DEFAULT_FORM.calendarType,
      birthDate: initialProfile.birthDate || DEFAULT_FORM.birthDate,
      birthTime: initialProfile.birthTime || DEFAULT_FORM.birthTime,
      timezone: initialProfile.timezone || DEFAULT_FORM.timezone,
    };
  });
  const [result, setResult] = useState<TuViEngineResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = useMemo(
    () => Boolean(form.birthDate && form.birthTime && form.timezone),
    [form.birthDate, form.birthTime, form.timezone]
  );

  const updateField = useCallback(
    <K extends keyof FortuneRequest>(field: K, value: FortuneRequest[K]) => {
      setForm((current) => ({ ...current, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (!canSubmit) {
      setError("Vui lòng nhập đủ ngày sinh, giờ sinh và múi giờ.");
      return;
    }

    startTransition(async () => {
      setError(null);

      try {
        const response = await submitFortuneRequest(form);
        if (!response.ok) {
          setResult(null);
          setError(response.error.message);
          return;
        }

        saveChart(response.data);
        await saveProfile({
          ...loadInitialProfile(),
          fullName: form.fullName,
          gender: form.gender,
          calendarType: form.calendarType,
          birthDate: form.birthDate,
          birthTime: form.birthTime,
          timezone: form.timezone,
          lunarDateTime: response.data.profile.lunarDateTime,
        });
        setResult(response.data);
      } catch (submissionError) {
        setResult(null);
        setError(
          submissionError instanceof Error ? submissionError.message : "Không thể lập lá số."
        );
      }
    });
  }, [canSubmit, form]);

  const handleReset = useCallback(() => {
    const initialProfile = loadInitialProfile();

    setResult(null);
    setError(null);
    setForm({
      ...DEFAULT_FORM,
      fullName: initialProfile.fullName || DEFAULT_FORM.fullName,
      gender: initialProfile.gender === "nu" ? "nu" : "nam",
      calendarType: initialProfile.calendarType || DEFAULT_FORM.calendarType,
      birthDate: initialProfile.birthDate || DEFAULT_FORM.birthDate,
      birthTime: initialProfile.birthTime || DEFAULT_FORM.birthTime,
      timezone: initialProfile.timezone || DEFAULT_FORM.timezone,
    });
  }, []);

  const handleLoadSaved = useCallback((saved: TuViEngineResult) => {
    setResult(saved);
    setError(null);
  }, []);

  if (result) {
    return <LapLaSoDetail result={result} onReset={handleReset} />;
  }

  return (
    <>
      <LapLaSoForm
        form={form}
        isPending={isPending}
        onFieldChange={updateField}
        onSubmit={handleSubmit}
      />
      <LapLaSoPreview
        error={error}
        isPending={isPending}
        result={null}
        timezone={form.timezone}
      />
      <div className="col-span-12 mt-4">
        <SavedChartsList onLoad={handleLoadSaved} />
      </div>
    </>
  );
}
