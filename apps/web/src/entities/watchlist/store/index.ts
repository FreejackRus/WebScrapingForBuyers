import type { WatchItem } from "@peremena/contracts";
import { create } from "zustand";

import { watchlistApi, type NewWatchPayload } from "../api";

interface WatchlistState {
  items: WatchItem[];
  loaded: boolean;
  /** Item ids being rechecked right now (a check runs a whole search, up to minutes). */
  checking: string[];
  error: string;
  load: () => Promise<void>;
  add: (payload: NewWatchPayload) => Promise<WatchItem | undefined>;
  remove: (id: string) => Promise<void>;
  check: (id: string) => Promise<void>;
}

const message = (reason: unknown, fallback: string) => (reason instanceof Error ? reason.message : fallback);

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  items: [],
  loaded: false,
  checking: [],
  error: "",
  load: async () => {
    try {
      set({ items: (await watchlistApi.list()).items, loaded: true });
    } catch {
      // A convenience list: a failed load must not break the page.
      set({ loaded: true });
    }
  },
  add: async (payload) => {
    try {
      const item = await watchlistApi.add(payload);
      // The gateway replaces an older item of the same product and channel; mirror that.
      const rest = get().items.filter(
        (entry) => !(entry.product.id === item.product.id && entry.product.name === item.product.name && entry.channel === item.channel),
      );
      set({ items: [item, ...rest], error: "" });
      return item;
    } catch (reason) {
      set({ error: message(reason, "Не удалось добавить в отслеживание") });
      return undefined;
    }
  },
  remove: async (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
    try {
      await watchlistApi.remove(id);
    } catch {
      void get().load();
    }
  },
  check: async (id) => {
    set({ checking: [...get().checking, id], error: "" });
    try {
      const item = await watchlistApi.check(id);
      set({ items: get().items.map((entry) => (entry.id === id ? item : entry)) });
    } catch (reason) {
      set({ error: message(reason, "Проверка не удалась") });
    } finally {
      set({ checking: get().checking.filter((entry) => entry !== id) });
    }
  },
}));
