import type { Product, SearchEvent, SearchSnapshot } from "@peremena/contracts";

import { apiUrl, request } from "shared/api";

export const searchApi = {
  suggest: (query: string) =>
    request<{ products: Product[] }>(apiUrl("/suggestions"), {
      method: "POST",
      body: JSON.stringify({ query }),
    }),
  sources: () => request<{ sources: string[] }>(apiUrl("/sources")),
  start: (query: string, product: Product | string, sources?: string[]) =>
    request<SearchSnapshot>(apiUrl("/searches"), {
      method: "POST",
      body: JSON.stringify({
        query,
        ...(typeof product === "string" ? { productId: product } : { product }),
        ...(sources?.length ? { sources } : {}),
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
