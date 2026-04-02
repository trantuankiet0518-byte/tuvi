"use client";

import { memo, useCallback } from "react";

import type { FortuneRequest } from "@/lib/bazi/types";

interface LapLaSoFormProps {
  form: FortuneRequest;
  isPending: boolean;
  onFieldChange: <K extends keyof FortuneRequest>(field: K, value: FortuneRequest[K]) => void;
  onSubmit: () => void;
}

const TIMEZONES = [
  { label: "Hà Nội (GMT+7)", value: "+07:00" },
  { label: "Sài Gòn (GMT+7)", value: "+07:00" },
  { label: "Beijing (GMT+8)", value: "+08:00" },
  { label: "California (GMT-8)", value: "-08:00" },
  { label: "Paris (GMT+1)", value: "+01:00" },
];

const LapLaSoForm = memo(function LapLaSoForm({ form, isPending, onFieldChange, onSubmit }: LapLaSoFormProps) {
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
    <section className="lg:col-span-5 space-y-10">
      <header>
        <h1 className="mb-3 font-black tracking-tighter text-on-surface" style={{ fontSize: "3.5rem", lineHeight: "1" }}>
          Khởi Tạo <br />
          <span className="text-primary">Mệnh Bàn</span>
        </h1>
        <p className="max-w-md text-lg font-medium leading-relaxed text-on-surface-variant">
          Nhập thông tin chính xác để khởi tạo lá số Tử Vi với Mệnh, Thân và 12 cung chuyên sâu.
        </p>
      </header>

      <form className="space-y-8 rounded-3xl bg-surface-container p-10 shadow-2xl shadow-background/50" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <label className="ml-1 block text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Họ tên</label>
          <input
            type="text"
            value={form.fullName}
            onChange={handleNameChange}
            placeholder="Nguyễn Văn A"
            className="w-full rounded-2xl bg-surface-container/50 px-6 py-4 text-lg font-semibold text-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="space-y-3">
          <label className="ml-1 block text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Giới tính</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onFieldChange("gender", "nam")}
              className={`flex min-h-[56px] flex-1 items-center justify-center gap-3 rounded-2xl border px-6 py-4 font-black transition-all ${
                form.gender === "nam"
                  ? "border-primary bg-primary text-on-primary shadow-lg shadow-primary/20"
                  : "border-border/50 bg-surface-container/50 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-2xl">male</span>
              Nam
            </button>
            <button
              type="button"
              onClick={() => onFieldChange("gender", "nu")}
              className={`flex min-h-[56px] flex-1 items-center justify-center gap-3 rounded-2xl border px-6 py-4 font-black transition-all ${
                form.gender === "nu"
                  ? "border-primary bg-primary text-on-primary shadow-lg shadow-primary/20"
                  : "border-border/50 bg-surface-container/50 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-2xl">female</span>
              Nữ
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Ngày và giờ sinh</label>
            <div className="flex gap-1 rounded-xl bg-surface-container p-1">
              <button
                type="button"
                onClick={() => onFieldChange("calendarType", "duong")}
                className={`rounded-lg px-4 py-1.5 text-[10px] font-black uppercase transition-all ${
                  form.calendarType === "duong" ? "bg-surface text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Dương lịch
              </button>
              <button
                type="button"
                onClick={() => onFieldChange("calendarType", "am")}
                className={`rounded-lg px-4 py-1.5 text-[10px] font-black uppercase transition-all ${
                  form.calendarType === "am" ? "bg-surface text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Âm lịch
              </button>
            </div>
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
          <label className="ml-1 block text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Nơi sinh và múi giờ</label>
          <div className="group relative">
            <select
              value={form.timezone}
              onChange={handleTimezoneChange}
              className="w-full cursor-pointer appearance-none rounded-2xl bg-surface-container/50 px-6 py-4 text-lg font-bold text-on-surface outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              {TIMEZONES.map((timezone) => (
                <option key={timezone.label} value={timezone.value}>
                  {timezone.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-hover:text-primary">
              expand_more
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full rounded-2xl bg-primary py-6 text-base font-black uppercase tracking-[0.2em] text-on-primary shadow-2xl shadow-primary/30 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
        >
          {isPending ? "Đang lập lá số..." : "An Định Mệnh Bàn"}
        </button>
      </form>

      <div className="group relative overflow-hidden rounded-3xl bg-secondary/5 p-8">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary/10 blur-3xl transition-all group-hover:scale-150" />
        <div className="relative z-10 flex items-start gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <span className="material-symbols-outlined text-2xl">info</span>
          </div>
          <div>
            <h4 className="text-base font-black uppercase tracking-wider text-on-surface">Thông tin quan trọng</h4>
            <p className="mt-2 text-sm font-medium leading-relaxed text-on-surface-variant">
              Engine này ưu tiên cấu trúc Tử Vi Đẩu Số: an Mệnh, an Thân, 12 cung, chính tinh, phụ tinh và đại hạn.
              Dương lịch sẽ được quy đổi theo múi giờ, âm lịch sẽ tính trực tiếp trên giờ sinh địa phương.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

LapLaSoForm.displayName = "LapLaSoForm";

export default LapLaSoForm;
