import type { BasketItem, BasketResponse, JustificationResponse, Offer, RequestPosition, SplitRequestResponse } from "@peremena/contracts";
import { create } from "zustand";

import { apiUrl, request } from "shared/api";

import { normalizeQuery, toBasketOffer } from "./lib";

export const basketApi = {
  list: () => request<BasketResponse>(apiUrl("/basket")),
  add: (query: string, quantity: number, offer: Offer) =>
    request<BasketResponse>(apiUrl("/basket"), { method: "POST", body: JSON.stringify({ query, quantity, offer: toBasketOffer(offer) }) }),
  setQuantity: (id: string, quantity: number) =>
    request<BasketResponse>(apiUrl(`/basket/${encodeURIComponent(id)}`), { method: "PATCH", body: JSON.stringify({ quantity }) }),
  remove: (id: string) => request<BasketResponse>(apiUrl(`/basket/${encodeURIComponent(id)}`), { method: "DELETE" }),
  clear: () => request<BasketResponse>(apiUrl("/basket"), { method: "DELETE" }),
  justify: () => request<JustificationResponse>(apiUrl("/basket/justify"), { method: "POST", body: "{}" }),
  split: (text: string) => request<SplitRequestResponse>(apiUrl("/request/split"), { method: "POST", body: JSON.stringify({ text }) }),
};

interface BasketState {
  items: BasketItem[];
  open: boolean;
  error: string;
  /** Quantity from a bulk request position; applies to «В корзину» while that query is the current search. */
  planned: RequestPosition | undefined;
  load: () => Promise<void>;
  add: (offer: Offer, query: string) => Promise<void>;
  setQuantity: (id: string, quantity: number) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  setOpen: (open: boolean) => void;
  plan: (position: RequestPosition | undefined) => void;
  quantityFor: (query: string) => number;
}

export const useBasketStore = create<BasketState>((set, get) => {
  const run = async (action: () => Promise<BasketResponse>) => {
    try {
      const { items } = await action();
      set({ items, error: "" });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Корзина недоступна" });
    }
  };
  return {
    items: [],
    open: false,
    error: "",
    planned: undefined,
    load: () => run(basketApi.list),
    add: (offer, query) => run(() => basketApi.add(query, get().quantityFor(query), offer)),
    setQuantity: (id, quantity) => run(() => basketApi.setQuantity(id, quantity)),
    remove: (id) => run(() => basketApi.remove(id)),
    clear: () => run(basketApi.clear),
    setOpen: (open) => set({ open }),
    plan: (position) => set({ planned: position }),
    quantityFor: (query) => {
      const planned = get().planned;
      return planned && normalizeQuery(planned.query) === normalizeQuery(query) ? planned.quantity : 1;
    },
  };
});
