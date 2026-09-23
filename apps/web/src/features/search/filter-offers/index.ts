import type { Offer } from "@peremena/contracts";

import { filterOffers } from "entities/offer";
import { useSearchStore } from "entities/search";

const emptyOffers: Offer[] = [];

export function useFilteredOffers() {
  const offers = useSearchStore((state) => state.snapshot?.offers ?? emptyOffers);
  const needle = useSearchStore((state) => state.offerFilter);
  const tableFilter = useSearchStore((state) => state.tableFilter);
  return filterOffers(offers, needle, tableFilter);
}
