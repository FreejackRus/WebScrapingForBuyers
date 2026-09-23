import type { AnalysisResult } from "@peremena/contracts";

import { useSearchStore } from "entities/search";

const SEARCH_DIRECTIVE =
  /уточни(?:те)? модель|запусти(?:те)? поиск|найд[иу]|найти|поищи|\bищи\b|новый поиск|собери предлож/i;

/** True only when the user explicitly asks to start/refine a catalog search. */
export function wantsNewSearch(text: string): boolean {
  return SEARCH_DIRECTIVE.test(text.trim());
}

export function applyChatResult(result: AnalysisResult) {
  const search = useSearchStore.getState();
  if (result.intent === "blocked") {
    search.setTableFilter(undefined);
    return;
  }
  search.setTableFilter(result.intent === "filter" ? result.tableFilter : undefined);
  // Never mirror arbitrary chat text into the search box — only explicit search intent.
  if (result.intent === "search" && result.searchQuery && result.searchQuery.trim().length >= 2) {
    search.setQuery(result.searchQuery.trim());
    void search.suggest();
  }
}

export function localSearchQuery(text: string) {
  return text
    .replace(/^уточни(?:те)? модель\s*/i, "")
    .replace(/^(найди|найти|поищи|ищи)\s+/i, "")
    .replace(/^запусти(?:те)? поиск\s*/i, "")
    .replace(/^собери предложени\w*\s*/i, "")
    .replace(/^новый поиск\s*/i, "")
    .trim();
}
