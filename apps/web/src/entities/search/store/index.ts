import type { OfferTableFilter, Product, SearchEvent, SearchSnapshot } from "@peremena/contracts";
import { create } from "zustand";

import { searchApi } from "../api";
import { mergeSnapshotOffers } from "./merge";

export { mergeSnapshotOffers } from "./merge";

const SELECTED_SOURCES_KEY = "peremena.selected-sources";

function readSelectedSources(): string[] {
  try {
    const raw = localStorage.getItem(SELECTED_SOURCES_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeSelectedSources(sources: string[]) {
  try {
    localStorage.setItem(SELECTED_SOURCES_KEY, JSON.stringify(sources));
  } catch {
    /* ignore quota */
  }
}

interface SearchState {
  query: string;
  suggestions: Product[];
  snapshot: SearchSnapshot | undefined;
  offerFilter: string;
  tableFilter: OfferTableFilter | undefined;
  selectedOfferId: string | undefined;
  availableSources: string[];
  selectedSources: string[];
  activity: "suggest" | "search" | null;
  suggesting: boolean;
  error: string;
  source: EventSource | undefined;
  setQuery: (query: string) => void;
  setOfferFilter: (value: string) => void;
  setTableFilter: (value: OfferTableFilter | undefined) => void;
  setSelectedSources: (sources: string[]) => void;
  loadSources: () => Promise<void>;
  openOffer: (id: string) => void;
  closeOffer: () => void;
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
  selectedOfferId: undefined,
  availableSources: [],
  selectedSources: typeof localStorage === "undefined" ? [] : readSelectedSources(),
  activity: null,
  suggesting: false,
  error: "",
  source: undefined,
  setQuery: (query) => set({ query }),
  setOfferFilter: (offerFilter) => set({ offerFilter }),
  setTableFilter: (tableFilter) => set({ tableFilter }),
  setSelectedSources: (selectedSources) => {
    writeSelectedSources(selectedSources);
    set({ selectedSources });
  },
  loadSources: async () => {
    try {
      const result = await searchApi.sources();
      const availableSources = result.sources.filter(Boolean);
      const remembered = get().selectedSources.filter((name) => availableSources.includes(name));
      const selectedSources = remembered.length > 0 ? remembered : availableSources;
      writeSelectedSources(selectedSources);
      set({ availableSources, selectedSources });
    } catch {
      set({ availableSources: get().availableSources });
    }
  },
  openOffer: (selectedOfferId) => set({ selectedOfferId }),
  closeOffer: () => set({ selectedOfferId: undefined }),
  reset: () => {
    get().source?.close();
    set({
      snapshot: undefined,
      suggestions: [],
      error: "",
      source: undefined,
      tableFilter: undefined,
      selectedOfferId: undefined,
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
        : { suggestions: [], snapshot: undefined, source: undefined, selectedOfferId: undefined }),
    });
    try {
      const result = await searchApi.suggest(query.trim());
      set({
        suggestions: result.products,
        suggesting: false,
        activity: quiet ? get().activity : null,
        error: !quiet && result.products.length === 0
          ? "Подсказок нет. Уточните бренд, модель или MPN."
          : "",
      });
    } catch (reason) {
      set({
        suggesting: false,
        activity: quiet ? get().activity : null,
        error: quiet ? "" : reason instanceof Error ? reason.message : "Ошибка поиска",
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
      selectedOfferId: undefined,
      snapshot: undefined,
    });
    try {
      const created = await searchApi.start(query || product.name, product, get().selectedSources);
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
