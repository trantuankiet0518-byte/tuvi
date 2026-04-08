import type { TuViEngineResult } from "@/lib/bazi/types";

export const SAVED_CHARTS_STORAGE_KEY = "tuvi_saved_charts";
export const SAVED_CHARTS_UPDATED_EVENT = "tuvi-saved-charts-updated";
const MAX_CHARTS = 20;

export interface SavedChart {
  id: string;
  savedAt: string;
  result: TuViEngineResult;
}

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

let cachedSavedCharts: SavedChart[] = [];
let cachedSavedChartsSignature = "";

function serializeSavedCharts(charts: SavedChart[]) {
  return JSON.stringify(
    charts.map((chart) => [
      chart.id,
      chart.savedAt,
      chart.result.profile.fullName,
      chart.result.profile.solarDateTime,
      chart.result.profile.lunarDateTime,
      chart.result.profile.timezone,
    ])
  );
}

export function readSavedCharts(): SavedChart[] {
  if (typeof window === "undefined") return [];

  const charts = readJson<SavedChart[]>(SAVED_CHARTS_STORAGE_KEY) ?? [];
  const signature = serializeSavedCharts(charts);

  if (signature !== cachedSavedChartsSignature) {
    cachedSavedChartsSignature = signature;
    cachedSavedCharts = charts;
  }

  return cachedSavedCharts;
}

export function writeSavedCharts(charts: SavedChart[]) {
  const next = charts.slice(0, MAX_CHARTS);
  cachedSavedCharts = next;
  cachedSavedChartsSignature = serializeSavedCharts(next);
  writeJson(SAVED_CHARTS_STORAGE_KEY, next);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SAVED_CHARTS_UPDATED_EVENT));
  }
}

export function saveChart(result: TuViEngineResult): SavedChart {
  const existing = readSavedCharts().find(
    (chart) =>
      chart.result.profile.fullName === result.profile.fullName &&
      chart.result.profile.solarDateTime === result.profile.solarDateTime
  );

  if (existing) {
    const refreshed: SavedChart = {
      ...existing,
      savedAt: new Date().toISOString(),
      result,
    };

    const next = [refreshed, ...readSavedCharts().filter((chart) => chart.id !== existing.id)].slice(0, MAX_CHARTS);
    writeSavedCharts(next);
    return refreshed;
  }

  const entry: SavedChart = {
    id: `chart_${Date.now()}`,
    savedAt: new Date().toISOString(),
    result,
  };

  const next = [entry, ...readSavedCharts()].slice(0, MAX_CHARTS);
  writeSavedCharts(next);
  return entry;
}

export function deleteChart(id: string): SavedChart[] {
  const next = readSavedCharts().filter((chart) => chart.id !== id);
  writeSavedCharts(next);
  return next;
}

export function isChartSaved(result: TuViEngineResult): boolean {
  return readSavedCharts().some(
    (chart) =>
      chart.result.profile.fullName === result.profile.fullName &&
      chart.result.profile.solarDateTime === result.profile.solarDateTime
  );
}

export function getSavedChartId(result: TuViEngineResult): string | null {
  return (
    readSavedCharts().find(
      (chart) =>
        chart.result.profile.fullName === result.profile.fullName &&
        chart.result.profile.solarDateTime === result.profile.solarDateTime
    )?.id ?? null
  );
}

export function readLatestSavedChartProfile(): {
  fullName: string;
  genderLabel?: string;
  solarDateTime?: string;
  lunarDateTime?: string;
  timezone?: string;
} | null {
  const profile = readSavedCharts()[0]?.result?.profile;

  if (!profile) return null;

  return {
    fullName: profile.fullName ?? "",
    genderLabel: profile.genderLabel,
    solarDateTime: profile.solarDateTime,
    lunarDateTime: profile.lunarDateTime,
    timezone: profile.timezone,
  };
}

export function subscribeToSavedCharts(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(SAVED_CHARTS_UPDATED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(SAVED_CHARTS_UPDATED_EVENT, onStoreChange);
  };
}
