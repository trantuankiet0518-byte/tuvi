"use client";

import { useCallback, useEffect, useState } from "react";
import type { TuViEngineResult } from "@/lib/bazi/types";

const STORAGE_KEY = "tuvi_saved_charts";
const MAX_CHARTS  = 20;

export interface SavedChart {
  id: string;
  savedAt: string;          // ISO string
  result: TuViEngineResult;
}

function loadFromStorage(): SavedChart[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedChart[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(charts: SavedChart[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(charts));
  } catch {
    // localStorage full — ignore
  }
}

export function useSavedCharts() {
  const [charts, setCharts] = useState<SavedChart[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setCharts(loadFromStorage());
  }, []);

  const saveChart = useCallback((result: TuViEngineResult): string => {
    const id = `chart_${Date.now()}`;
    const entry: SavedChart = { id, savedAt: new Date().toISOString(), result };

    setCharts((prev) => {
      const next = [entry, ...prev].slice(0, MAX_CHARTS);
      saveToStorage(next);
      return next;
    });

    return id;
  }, []);

  const deleteChart = useCallback((id: string) => {
    setCharts((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (result: TuViEngineResult) =>
      charts.some(
        (c) =>
          c.result.profile.fullName === result.profile.fullName &&
          c.result.profile.solarDateTime === result.profile.solarDateTime
      ),
    [charts]
  );

  const getSavedId = useCallback(
    (result: TuViEngineResult) =>
      charts.find(
        (c) =>
          c.result.profile.fullName === result.profile.fullName &&
          c.result.profile.solarDateTime === result.profile.solarDateTime
      )?.id ?? null,
    [charts]
  );

  return { charts, saveChart, deleteChart, isSaved, getSavedId };
}
