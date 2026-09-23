import { useSearchStore } from "entities/search";

export function useSuggest() {
  return useSearchStore((state) => state.suggest);
}
