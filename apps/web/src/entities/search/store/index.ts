import type { OfferTableFilter, Product, SearchEvent, SearchSnapshot } from "@peremena/contracts";
import { create } from "zustand";

import { searchApi } from "../api";
import { mergeSnapshotOffers } from "./merge";

export { mergeSnapshotOffers } from "./merge";

interface SearchState {
  query: string;
  suggestions: Product[];
  snapshot: SearchSnapshot | undefined;
  offerFilter: string;
  tableFilter: OfferTableFilter | undefined;
  activity: "suggest" | "search" | null;
  error: string;
  source: EventSource | undefined;
  setQuery: (query: string) => void;
  setOfferFilter: (value: string) => void;
  setTableFilter: (value: OfferTableFilter | undefined) => void;
  reset: () => void;
  suggest: () => Promise<void>;
  start: (product: Product) => Promise<void>;
  applyEvent: (event: SearchEvent) => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "мышь Logitech",
  suggestions: [],
  snapshot: undefined,
  offerFilter: "",
  tableFilter: undefined,
  activity: null,
  error: "",
  source: undefined,
  setQuery: (query) => set({ query }),
  setOfferFilter: (offerFilter) => set({ offerFilter }),
  setTableFilter: (tableFilter) => set({ tableFilter }),
  reset: () => {
    get().source?.close();
    set({
      snapshot: undefined,
      suggestions: [],
      error: "",
      source: undefined,
      tableFilter: undefined,
    });
  },
  suggest: async () => {
    const { query, source } = get();
    source?.close();
    set({ activity: "suggest", error: "", suggestions: [], snapshot: undefined, source: undefined });
    try {
      const result = await searchApi.suggest(query.trim());
      set({
        suggestions: result.products,
        activity: null,
        error:
          result.products.length === 0
            ? "Не удалось определить модель. Уточните бренд, артикул или полное название."
            : "",
      });
    } catch (reason) {
      set({
        activity: null,
        error: reason instanceof Error ? reason.message : "Ошибка поиска",
      });
    }
  },
  start: async (product) => {
    const { query, source } = get();
    source?.close();
    set({
      activity: "search",
      error: "",
      suggestions: [],
      offerFilter: "",
      tableFilter: undefined,
      snapshot: undefined,
    });
    try {
      const created = await searchApi.start(query, product.id);
      const next = searchApi.subscribe(
        created.id,
        (event) => get().applyEvent(event),
        () => {
          if (get().source?.readyState === EventSource.CLOSED) {
            set({ error: "Соединение с потоком результатов закрыто." });
          }
        },
      );
      set((state) => ({
        snapshot:
          state.snapshot?.id === created.id ? mergeSnapshotOffers(state.snapshot, created) : created,
        source: next,
        activity: null,
      }));
    } catch (reason) {
      set({
        activity: null,
        error: reason instanceof Error ? reason.message : "Ошибка сбора",
      });
    }
  },
  applyEvent: (event) => {
    if (event.type === "snapshot" || event.type === "complete") {
      set((current) => ({
        snapshot: mergeSnapshotOffers(current.snapshot, event.data),
      }));
      if (event.type === "complete") get().source?.close();
      return;
    }
    set((current) => {
      if (!current.snapshot) return current;
      if (event.type === "offers") {
        const ids = new Set(current.snapshot.offers.map((offer) => offer.id));
        return {
          snapshot: {
            ...current.snapshot,
            offers: [...current.snapshot.offers, ...event.data.filter((offer) => !ids.has(offer.id))],
          },
        };
      }
      return {
        snapshot: {
          ...current.snapshot,
          sources: current.snapshot.sources.map((source) =>
            source.source === event.data.source ? event.data : source,
          ),
        },
      };
    });
  },
}));
