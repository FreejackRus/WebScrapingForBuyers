import type { Product, SearchEvent, SearchSnapshot } from "@peremena/contracts";

import { apiUrl, request } from "shared/api";

export const searchApi = {
  suggest: (query: string) =>
    request<{ products: Product[] }>(apiUrl("/suggestions"), {
      method: "POST",
      body: JSON.stringify({ query }),
    }),
  start: (query: string, product: Product | string) =>
    request<SearchSnapshot>(apiUrl("/searches"), {
      method: "POST",
      body: JSON.stringify(
        typeof product === "string" ? { query, productId: product } : { query, product },
      ),
    }),
  subscribe: (searchId: string, onEvent: (event: SearchEvent) => void, onError: () => void) => {
    const source = new EventSource(apiUrl(`/searches/${searchId}/events`), { withCredentials: true });
    source.onmessage = (message) => onEvent(JSON.parse(message.data) as SearchEvent);
    source.onerror = onError;
    return source;
  },
  exportUrl: (searchId: string) => apiUrl(`/searches/${searchId}/export.xlsx`),
};
