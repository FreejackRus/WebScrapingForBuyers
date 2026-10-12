import { create } from "zustand";

export const MAX_COMPARE = 4;

interface CompareState {
  /** Search the selection belongs to; a new search starts with an empty selection. */
  searchId?: string;
  ids: string[];
  open: boolean;
  toggle: (searchId: string | undefined, id: string) => void;
  reset: () => void;
  setOpen: (open: boolean) => void;
}

/** Pure toggle used by the store: adds up to the cap, removes when present. */
export function toggleCompare(ids: string[], id: string, max = MAX_COMPARE): string[] {
  if (ids.includes(id)) return ids.filter((item) => item !== id);
  return ids.length >= max ? ids : [...ids, id];
}

export const useCompareStore = create<CompareState>((set, get) => ({
  ids: [],
  open: false,
  toggle: (searchId, id) => {
    const current = get().searchId === searchId ? get().ids : [];
    set({ ids: toggleCompare(current, id), ...(searchId ? { searchId } : {}) });
  },
  reset: () => set({ ids: [], open: false }),
  setOpen: (open) => set({ open }),
}));

/** Ids still selected for this search (empty for another search). */
export function useCompareIds(searchId: string | undefined): string[] {
  const ids = useCompareStore((state) => state.ids);
  const owner = useCompareStore((state) => state.searchId);
  return owner === searchId ? ids : EMPTY;
}
const EMPTY: string[] = [];
