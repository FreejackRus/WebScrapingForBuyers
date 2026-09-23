import type { AnalysisResult } from "@peremena/contracts";

import { useSearchStore } from "entities/search";

export function applyChatResult(result: AnalysisResult) {
  const search = useSearchStore.getState();
  search.setTableFilter(result.intent === "filter" ? result.tableFilter : undefined);
  if (result.intent === "search" && result.searchQuery) {
    search.setQuery(result.searchQuery);
    void search.suggest();
  }
}

export function localSearchQuery(text: string) {
  return text
    .replace(/^уточни(?:те)? модель\s*/i, "")
    .replace(/^(найди|найти|поищи|ищи)\s+/i, "")
    .replace(/^запусти(?:те)? поиск\s*/i, "")
    .trim();
}
