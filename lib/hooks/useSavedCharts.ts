"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { TuViEngineResult } from "@/lib/bazi/types";
import {
  deleteChart,
  getSavedChartId,
  isChartSaved,
  readSavedCharts,
  saveChart,
  subscribeToSavedCharts,
  type SavedChart,
} from "@/lib/services/savedCharts";

export function useSavedCharts() {
  const charts = useSyncExternalStore(
    subscribeToSavedCharts,
    readSavedCharts,
    () => [] as SavedChart[]
  );

  const saveChartEntry = useCallback((result: TuViEngineResult): string => {
    return saveChart(result).id;
  }, []);

  const deleteChartEntry = useCallback((id: string) => {
    deleteChart(id);
  }, []);

  const isSaved = useCallback((result: TuViEngineResult) => isChartSaved(result), []);

  const getSavedId = useCallback((result: TuViEngineResult) => getSavedChartId(result), []);

  return {
    charts,
    saveChart: saveChartEntry,
    deleteChart: deleteChartEntry,
    isSaved,
    getSavedId,
  };
}
