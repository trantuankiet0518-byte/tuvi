import type { ProfileSettingsDraft } from "@/lib/contracts/profile";
import { failure, success, type ApiResult } from "@/lib/api-schema";
import {
  readLatestSavedChartProfile,
  SAVED_CHARTS_UPDATED_EVENT,
} from "@/lib/services/savedCharts";

const PROFILE_STORAGE_KEY = "tuvi_profile_settings";
export const PROFILE_UPDATED_EVENT = "tuvi-profile-updated";

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(key, JSON.stringify(value));
}

const DEFAULT_PROFILE: ProfileSettingsDraft = {
  fullName: "",
  email: "",
  phone: "",
  gender: "nam",
  calendarType: "duong",
  birthDate: "",
  birthTime: "12:00",
  timezone: "+07:00",
  birthPlace: "",
  lunarDateTime: "",
  notes: "",
  updatedAt: "",
};

let cachedProfile: ProfileSettingsDraft = DEFAULT_PROFILE;
let cachedProfileStorageRaw = "";

function syncProfileCache(): ProfileSettingsDraft {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  const savedRaw = window.localStorage.getItem(PROFILE_STORAGE_KEY) ?? "";
  const latestProfile = readLatestSavedChartProfile();
  const latestRaw = JSON.stringify(latestProfile ?? null);
  const signature = `${savedRaw}|${latestRaw}`;

  if (signature === cachedProfileStorageRaw) {
    return cachedProfile;
  }

  let saved: ProfileSettingsDraft | null = null;
  try {
    saved = savedRaw ? (JSON.parse(savedRaw) as ProfileSettingsDraft) : null;
  } catch {
    saved = null;
  }
  const latest: Partial<ProfileSettingsDraft> | null = latestProfile
    ? {
        fullName: latestProfile.fullName ?? "",
        gender:
          latestProfile.genderLabel === "Nữ"
            ? "nu"
            : latestProfile.genderLabel === "Khác"
              ? "khac"
              : "nam",
        birthDate: latestProfile.solarDateTime?.split("T")[0] ?? "",
        birthTime: latestProfile.solarDateTime?.split("T")[1]?.slice(0, 5) ?? "12:00",
        timezone: latestProfile.timezone ?? "+07:00",
        lunarDateTime: latestProfile.lunarDateTime ?? "",
      }
    : null;

  cachedProfile = {
    ...DEFAULT_PROFILE,
    ...latest,
    ...saved,
  };
  cachedProfileStorageRaw = signature;

  return cachedProfile;
}

export function loadInitialProfile(): ProfileSettingsDraft {
  return syncProfileCache();
}

export function readLatestSavedChart(): Partial<ProfileSettingsDraft> | null {
  const profile = readLatestSavedChartProfile();

  if (!profile) return null;

  return {
    fullName: profile.fullName ?? "",
    gender:
      profile.genderLabel === "Nữ"
        ? "nu"
        : profile.genderLabel === "Khác"
          ? "khac"
          : "nam",
    birthDate: profile.solarDateTime?.split("T")[0] ?? "",
    birthTime: profile.solarDateTime?.split("T")[1]?.slice(0, 5) ?? "12:00",
    timezone: profile.timezone ?? "+07:00",
    lunarDateTime: profile.lunarDateTime ?? "",
  };
}

export async function saveProfile(profile: ProfileSettingsDraft): Promise<ApiResult<ProfileSettingsDraft>> {
  if (!profile.fullName.trim() && !profile.email.trim() && !profile.phone.trim()) {
    return failure("validation_error", "Ít nhất một trường hồ sơ cần có dữ liệu.");
  }

  const next = {
    ...profile,
    updatedAt: new Date().toISOString(),
  };

  writeJson(PROFILE_STORAGE_KEY, next);
  cachedProfile = next;
  cachedProfileStorageRaw = `${JSON.stringify(next)}|${JSON.stringify(readLatestSavedChartProfile() ?? null)}`;
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
  console.log("[profile] save", next);
  return success(next);
}

export function resetProfile(): ProfileSettingsDraft {
  return { ...DEFAULT_PROFILE };
}

export function subscribeToProfileSettings(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handler = () => onStoreChange();

  window.addEventListener("storage", handler);
  window.addEventListener(PROFILE_UPDATED_EVENT, handler);
  window.addEventListener(SAVED_CHARTS_UPDATED_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(PROFILE_UPDATED_EVENT, handler);
    window.removeEventListener(SAVED_CHARTS_UPDATED_EVENT, handler);
  };
}
