import type { OfferChannel, Product, WatchItem } from "@peremena/contracts";

import { apiUrl, request } from "shared/api";

export interface NewWatchPayload {
  query: string;
  product: Product;
  channel: OfferChannel;
  price: number;
  inStock: boolean;
}

export const watchlistApi = {
  list: () => request<{ items: WatchItem[] }>(apiUrl("/watchlist")),
  add: (payload: NewWatchPayload) =>
    request<WatchItem>(apiUrl("/watchlist"), { method: "POST", body: JSON.stringify(payload) }),
  remove: (id: string) => request<{ ok: boolean }>(apiUrl(`/watchlist/${encodeURIComponent(id)}`), { method: "DELETE" }),
  check: (id: string) => request<WatchItem>(apiUrl(`/watchlist/${encodeURIComponent(id)}/check`), { method: "POST" }),
};
