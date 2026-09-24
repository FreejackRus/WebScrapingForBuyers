import type { AnalysisResult } from "@peremena/contracts";

import { useSearchStore } from "entities/search";

/** Apply analysis/chat side-effects: table filter and catalog searchQuery from the model. */
export function applyChatResult(result: AnalysisResult) {
  const search = useSearchStore.getState();
  if (result.intent === "blocked") {
    search.setTableFilter(undefined);
    return;
  }
  if (result.intent === "filter") {
    const fromResult = result.tableFilter;
    // Ensure the offers table mirrors selectedOfferIds even if tableFilter omitted ids.
    const withSelection =
      fromResult?.selectedOfferIds?.length || !result.selectedOfferIds.length
        ? fromResult
        : { ...fromResult, selectedOfferIds: result.selectedOfferIds };
    search.setTableFilter(withSelection ?? { selectedOfferIds: result.selectedOfferIds });
  } else {
    search.setTableFilter(undefined);
  }
  // Never mirror arbitrary chat text into the search box — only explicit search intent.
  if (result.intent === "search" && result.searchQuery && result.searchQuery.trim().length >= 2) {
    search.setQuery(result.searchQuery.trim());
    void search.suggest();
  }
}
