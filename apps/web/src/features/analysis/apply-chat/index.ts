import type { AnalysisResult } from "@peremena/contracts";

import { useSearchStore } from "entities/search";

/** Apply analysis/chat side-effects: table filter and catalog searchQuery from the model. */
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
