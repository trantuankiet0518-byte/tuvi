import type { ProfileSettingsDraft } from "@/lib/contracts/profile";
import { failure, success, type ApiResult } from "@/lib/api-schema";
import {
  readLatestSavedChartProfile,
  SAVED_CHARTS_UPDATED_EVENT,
} from "@/lib/services/savedCharts";

const PROFILE_STORAGE_KEY = "tuvi_profile_settings";
export const PROFILE_UPDATED_EVENT = "tuvi-profile-updated";

function parseSolarDateTime(solarDateTime?: string) {
  if (!solarDateTime) {
    return {
      birthDate: "",
      birthTime: "12:00",
    };
  }

  const [birthDate = "", birthTimeRaw = "12:00"] = solarDateTime.split(/[T ]/);

  return {
    birthDate,
    birthTime: birthTimeRaw.slice(0, 5) || "12:00",
  };
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

function mapGenderLabelToDraftValue(genderLabel?: string): ProfileSettingsDraft["gender"] {
  if (genderLabel === "Nữ") return "nu";
  if (genderLabel === "Khác") return "khac";
  return "nam";
}

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
    ? (() => {
        const { birthDate, birthTime } = parseSolarDateTime(latestProfile.solarDateTime);

        return {
          fullName: latestProfile.fullName ?? "",
          gender: mapGenderLabelToDraftValue(latestProfile.genderLabel),
          birthDate,
          birthTime,
          timezone: latestProfile.timezone ?? "+07:00",
          lunarDateTime: latestProfile.lunarDateTime ?? "",
        };
      })()
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

  const { birthDate, birthTime } = parseSolarDateTime(profile.solarDateTime);

  return {
    fullName: profile.fullName ?? "",
    gender: mapGenderLabelToDraftValue(profile.genderLabel),
    birthDate,
    birthTime,
    timezone: profile.timezone ?? "+07:00",
    lunarDateTime: profile.lunarDateTime ?? "",
  };
}

export async function saveProfile(profile: ProfileSettingsDraft): Promise<ApiResult<ProfileSettingsDraft>> {
  const hasAnyProfileData = Boolean(
    profile.fullName.trim() ||
      profile.email.trim() ||
      profile.phone.trim() ||
      profile.birthDate.trim() ||
      profile.birthTime.trim() ||
      profile.timezone.trim() ||
      profile.birthPlace.trim() ||
      profile.lunarDateTime.trim() ||
      profile.notes.trim()
  );

  if (!hasAnyProfileData) {
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
