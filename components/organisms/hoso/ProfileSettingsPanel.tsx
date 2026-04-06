"use client";

import { useMemo, useState } from "react";

import Avatar from "@/components/atoms/Avatar";
import Icon from "@/components/atoms/Icon";
import SectionLabel from "@/components/atoms/SectionLabel";
import TogglePill from "@/components/atoms/TogglePill";
import type { ProfileSettingsDraft } from "@/lib/contracts/profile";
import { Link } from "@/i18n/navigation";
import { loadInitialProfile, readLatestSavedChart, resetProfile, saveProfile } from "@/lib/services/profile";

type Gender = "nam" | "nu" | "khac";
type CalendarType = "duong" | "am";
type ProfileSettings = ProfileSettingsDraft;

function genderLabel(gender: Gender) {
  if (gender === "nu") return "Nữ";
  if (gender === "khac") return "Khác";
  return "Nam";
}

function formatProfileSummary(profile: ProfileSettings) {
  const lines = [
    profile.fullName || "Chưa đặt tên",
    profile.birthDate || "Chưa có ngày sinh",
    profile.birthTime || "Chưa có giờ sinh",
    profile.timezone || "Chưa có múi giờ",
  ];

  return lines.join(" • ");
}

function formatShortDateTime(profile: ProfileSettings) {
  if (!profile.birthDate && !profile.birthTime) return "Chưa nhập thông tin lá số";
  return `${profile.birthDate || "????-??-??"} ${profile.birthTime || "--:--"}`.trim();
}

export default function ProfileSettingsPanel() {
  const [form, setForm] = useState<ProfileSettings>(() => loadInitialProfile());
  const [status, setStatus] = useState<"idle" | "saved" | "loaded" | "saving">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  const summaryItems = useMemo(
    () => [
      { label: "Họ tên", value: form.fullName || "Chưa đặt tên" },
      { label: "Giới tính", value: genderLabel(form.gender) },
      { label: "Sinh", value: formatShortDateTime(form) },
      { label: "Múi giờ", value: form.timezone || "+07:00" },
      { label: "Âm lịch", value: form.lunarDateTime || "Chưa ghi chú" },
      { label: "Nơi sinh", value: form.birthPlace || "Chưa nhập" },
    ],
    [form]
  );

  const update = (field: keyof ProfileSettings, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    setSaveError(null);
    setStatus("saving");

    const result = await saveProfile(form);

    if (!result.ok) {
      setSaveError(result.error.message);
      setStatus("idle");
      return;
    }

    setForm(result.data);
    setStatus("saved");
  };

  const handleLoadLatest = () => {
    const latest = readLatestSavedChart();
    if (!latest) return;

    setForm((current) => ({
      ...current,
      ...latest,
      updatedAt: new Date().toISOString(),
    }));
    setStatus("loaded");
    setSaveError(null);
  };

  const handleReset = () => {
    setForm(resetProfile());
    setStatus("idle");
    setSaveError(null);
  };

  return (
    <main className="relative isolate overflow-hidden pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-40 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-0 h-80 w-80 rounded-full bg-tertiary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-on-surface-variant">
              Hồ sơ cá nhân
            </p>
            <h1 className="text-4xl leading-none text-on-surface md:text-6xl">
              Điều chỉnh thông tin cá nhân và lá số trong một không gian riêng.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg">
              Trang này lưu hồ sơ mặc định của bạn ngay trong máy, đồng bộ với menu account trên navbar
              và giữ cho dữ liệu sinh, giờ sinh, múi giờ, cùng ghi chú lá số luôn nhất quán.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleLoadLatest}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-on-surface transition-colors hover:bg-white/10"
            >
              Nạp lá số gần nhất
            </button>
            <Link
              href="/laplaso"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-transform hover:scale-[1.01]"
            >
              Mở lá số
              <Icon name="arrow_outward" className="text-[1.1rem]" />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <section className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-on-surface-variant">
                    Điều khiển hồ sơ
                  </div>
                  <div className="mt-2 text-xl font-semibold text-on-surface">
                    Chỉnh dữ liệu cá nhân
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-surface/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                  {status === "saving" ? "Đang lưu" : status === "saved" ? "Đã lưu cục bộ" : status === "loaded" ? "Đã nạp lá số" : "Bản nháp"}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3 md:col-span-2">
                  <SectionLabel>Thông tin cá nhân</SectionLabel>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-on-surface-variant">Họ và tên</span>
                      <input
                        value={form.fullName}
                        onChange={(event) => update("fullName", event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary/60"
                        placeholder="Nhập họ và tên"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-on-surface-variant">Email</span>
                      <input
                        value={form.email}
                        onChange={(event) => update("email", event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary/60"
                        placeholder="email@domain.com"
                        type="email"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-on-surface-variant">Số điện thoại</span>
                      <input
                        value={form.phone}
                        onChange={(event) => update("phone", event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary/60"
                        placeholder="09xx xxx xxx"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-on-surface-variant">Nơi sinh</span>
                      <input
                        value={form.birthPlace}
                        onChange={(event) => update("birthPlace", event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary/60"
                        placeholder="Thành phố / quốc gia"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <SectionLabel>Thông tin lá số</SectionLabel>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-on-surface-variant">Ngày sinh</span>
                      <input
                        value={form.birthDate}
                        onChange={(event) => update("birthDate", event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary/60"
                        type="date"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-on-surface-variant">Giờ sinh</span>
                      <input
                        value={form.birthTime}
                        onChange={(event) => update("birthTime", event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary/60"
                        type="time"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-on-surface-variant">Múi giờ</span>
                      <input
                        value={form.timezone}
                        onChange={(event) => update("timezone", event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary/60"
                        placeholder="+07:00"
                      />
                    </label>

                    <div className="space-y-2">
                      <span className="text-sm font-medium text-on-surface-variant">Âm / dương</span>
                      <div className="flex gap-2 rounded-2xl border border-white/10 bg-surface/70 p-2">
                        <TogglePill
                          label="Dương lịch"
                          isActive={form.calendarType === "duong"}
                          onClick={() => update("calendarType", "duong")}
                        />
                        <TogglePill
                          label="Âm lịch"
                          isActive={form.calendarType === "am"}
                          onClick={() => update("calendarType", "am")}
                        />
                      </div>
                    </div>

                    <label className="space-y-2 md:col-span-2">
                      <span className="text-sm font-medium text-on-surface-variant">
                        Ghi chú âm lịch hoặc mô tả lá số
                      </span>
                      <textarea
                        value={form.lunarDateTime}
                        onChange={(event) => update("lunarDateTime", event.target.value)}
                        className="min-h-28 w-full rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary/60"
                        placeholder="Nhập âm lịch, cột mốc sinh, hoặc ghi chú riêng"
                      />
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <SectionLabel>Tùy chọn</SectionLabel>
                  <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
                    {[
                      { label: "Nam", value: "nam" as Gender },
                      { label: "Nữ", value: "nu" as Gender },
                      { label: "Khác", value: "khac" as Gender },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => update("gender", item.value)}
                        className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition-all ${
                          form.gender === item.value
                            ? "border-primary/40 bg-primary/10 text-on-surface shadow-lg shadow-primary/5"
                            : "border-white/10 bg-surface/60 text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                        }`}
                      >
                        <div className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
                          Giới tính
                        </div>
                        <div className="mt-2 text-base">{item.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={status === "saving"}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "saving" ? "Đang lưu..." : "Lưu hồ sơ"}
                  <Icon name="check" className="text-[1.05rem]" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-on-surface transition-colors hover:bg-white/5"
                >
                  Xoá bản nháp
                </button>
                <p className="text-sm text-on-surface-variant">
                  Dữ liệu được lưu cục bộ và sẽ hiện trong menu account sau khi lưu.
                </p>
              </div>

              {saveError ? <p className="mt-3 text-sm font-medium text-red-300">{saveError}</p> : null}
            </div>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-white/10 bg-surface/70 p-6 shadow-2xl shadow-black/15 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-on-surface-variant">
                    Hồ sơ tối thiểu
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-on-surface">Xem nhanh</div>
                </div>
                <Avatar size="lg" fallback={form.fullName || "TV"} />
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold text-on-surface">{form.fullName || "Tài khoản Tử Vi"}</div>
                <div className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {formatProfileSummary(form)}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {summaryItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
                      {item.label}
                    </span>
                    <span className="max-w-[55%] truncate text-sm font-semibold text-on-surface">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-primary/10 p-4 text-sm leading-6 text-on-surface">
                Mẹo: nếu bạn vừa lập một lá số mới, bấm <span className="font-semibold">Nạp lá số gần nhất</span>{" "}
                để kéo nhanh dữ liệu sinh sang hồ sơ này.
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-on-surface-variant shadow-2xl shadow-black/10 backdrop-blur-xl">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-on-surface-variant">
                Trạng thái lưu
              </div>
              <div className="mt-3 text-base font-semibold text-on-surface">
                {status === "saved"
                  ? "Đã lưu hồ sơ vào máy"
                  : status === "loaded"
                    ? "Đã nạp dữ liệu lá số gần nhất"
                    : status === "saving"
                      ? "Đang lưu hồ sơ"
                      : "Chưa lưu thay đổi"}
              </div>
              <p className="mt-2">
                Hồ sơ này chỉ lưu trên trình duyệt hiện tại. Nếu cần, bạn có thể chỉnh lại bất cứ lúc nào mà
                không ảnh hưởng đến lịch sử lá số đã lưu.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
