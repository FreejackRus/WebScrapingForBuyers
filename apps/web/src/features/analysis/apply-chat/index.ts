import type { AnalysisResult } from "@peremena/contracts";

import { useSearchStore } from "entities/search";

/** Apply analysis/chat side-effects: table filter and catalog searchQuery from the model. */
export function applyChatResult(result: AnalysisResult) {
  if (result.clarificationQuestion) return;
  const search = useSearchStore.getState();
  if (result.intent === "filter") {
    const fromResult = result.tableFilter;
    // Predicates remain open to matching rows arriving in later SSE batches.
    const dynamic = fromResult && Object.keys(fromResult).some(key => key !== "selectedOfferIds");
    search.setTableFilter(dynamic ? fromResult : (fromResult ?? {selectedOfferIds:result.selectedOfferIds}));
  }
  // Never mirror arbitrary chat text into the search box — only explicit search intent.
  if (result.intent === "search" && result.searchQuery && result.searchQuery.trim().length >= 2) {
    search.setTableFilter(undefined);
    search.setQuery(result.searchQuery.trim());
    void search.start({
      id: `typed-${result.searchQuery.trim().slice(0, 48)}`,
      name: result.searchQuery.trim(), model: result.searchQuery.trim(), brand: "—",
      mpn: "", category: "Каталог", characteristics: { источник: "typed" },
    }, result.tableFilter);
  }
}
