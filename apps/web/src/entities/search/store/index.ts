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
  suggesting: boolean;
  error: string;
  source: EventSource | undefined;
  setQuery: (query: string) => void;
  setOfferFilter: (value: string) => void;
  setTableFilter: (value: OfferTableFilter | undefined) => void;
  reset: () => void;
  suggest: (options?: { quiet?: boolean }) => Promise<void>;
  start: (product: Product) => Promise<void>;
  applyEvent: (event: SearchEvent) => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  suggestions: [],
  snapshot: undefined,
  offerFilter: "",
  tableFilter: undefined,
  activity: null,
  suggesting: false,
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
      suggesting: false,
    });
  },
  suggest: async (options) => {
    const { query, source, activity } = get();
    if (activity === "search") return;
    const quiet = options?.quiet === true;
    if (!quiet) source?.close();
    set({
      suggesting: true,
      activity: quiet ? activity : "suggest",
      error: "",
      ...(quiet
        ? {}
        : { suggestions: [], snapshot: undefined, source: undefined }),
    });
    try {
      const result = await searchApi.suggest(query.trim());
      set({
        suggestions: result.products,
        suggesting: false,
        activity: quiet ? get().activity : null,
        error:
          result.products.length === 0
            ? "Подсказок нет. Уточните бренд, модель или MPN."
            : "",
      });
    } catch (reason) {
      set({
        suggesting: false,
        activity: quiet ? get().activity : null,
        error: reason instanceof Error ? reason.message : "Ошибка поиска",
      });
    }
  },
  start: async (product) => {
    const { source } = get();
    source?.close();
    const query = product.name.trim();
    set({
      query,
      activity: "search",
      suggesting: false,
      error: "",
      suggestions: [],
      offerFilter: "",
      tableFilter: undefined,
      snapshot: undefined,
    });
    try {
      const created = await searchApi.start(query || product.name, product);
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
