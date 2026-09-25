import type { Offer } from "@peremena/contracts";

import { useSearchStore } from "entities/search";

const emptyOffers: Offer[] = [];

export function useOfferCard() {
  const selectedOfferId = useSearchStore((state) => state.selectedOfferId);
  const openOffer = useSearchStore((state) => state.openOffer);
  const closeOffer = useSearchStore((state) => state.closeOffer);
  const offers = useSearchStore((state) => state.snapshot?.offers ?? emptyOffers);
  const offer = offers.find((row) => row.id === selectedOfferId);

  return { offer, openOffer, closeOffer };
}
