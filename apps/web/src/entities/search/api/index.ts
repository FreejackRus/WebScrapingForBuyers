import type { Product, SearchEvent, SearchHistoryEntry, SearchSnapshot, SearchSourcesResponse } from "@peremena/contracts";

import { apiUrl, request } from "shared/api";

export const searchApi = {
  suggest: (query: string) =>
    request<{ products: Product[] }>(apiUrl("/suggestions"), {
      method: "POST",
      body: JSON.stringify({ query }),
    }),
  sources: () => request<SearchSourcesResponse>(apiUrl("/sources")),
  history: () => request<{ history: SearchHistoryEntry[] }>(apiUrl("/history")),
  removeHistory: (id: string) => request<{ ok: boolean }>(apiUrl(`/history/${encodeURIComponent(id)}`), { method: "DELETE" }),
  clearHistory: () => request<{ ok: boolean }>(apiUrl("/history"), { method: "DELETE" }),
  start: (query: string, product: Product | string, sources?: string[], fresh?: boolean) =>
    request<SearchSnapshot>(apiUrl("/searches"), {
      method: "POST",
      body: JSON.stringify({
        query,
        ...(typeof product === "string" ? { productId: product } : { product }),
        ...(sources?.length ? { sources } : {}),
        ...(fresh ? { fresh: true } : {}),
      }),
    }),
  subscribe: (searchId: string, onEvent: (event: SearchEvent) => void, onError: () => void) => {
    const source = new EventSource(apiUrl(`/searches/${searchId}/events`), { withCredentials: true });
    source.onmessage = (message) => onEvent(JSON.parse(message.data) as SearchEvent);
    source.onerror = onError;
    return source;
  },
  exportUrl: (searchId: string) => apiUrl(`/searches/${searchId}/export.xlsx`),
};
