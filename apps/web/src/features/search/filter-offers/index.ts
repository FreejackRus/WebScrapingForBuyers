import { offerChannel, type Offer, type OfferChannel } from "@peremena/contracts";

import { filterOffers } from "entities/offer";
import { useSearchStore } from "entities/search";

const emptyOffers: Offer[] = [];

/** Rows per table tab, and the tab shown: the buyer's pick, else the one with rows (marketplaces first). */
export function channelView(offers: Offer[], chosen: OfferChannel | undefined) {
  const counts: Record<OfferChannel, number> = { marketplace: 0, distributor: 0 };
  for (const offer of offers) counts[offerChannel(offer)] += 1;
  const channel: OfferChannel = chosen ?? (counts.marketplace === 0 && counts.distributor > 0 ? "distributor" : "marketplace");
  return { channel, counts };
}

/** All rows of the current search in the active tab, before the text/table filters. */
export function useChannelOffers() {
  const offers = useSearchStore((state) => state.snapshot?.offers ?? emptyOffers);
  const chosen = useSearchStore((state) => state.offerChannel);
  const setChannel = useSearchStore((state) => state.setOfferChannel);
  const { channel, counts } = channelView(offers, chosen);
  return { channel, counts, setChannel, offers: offers.filter((offer) => offerChannel(offer) === channel) };
}

export function useFilteredOffers() {
  const { offers } = useChannelOffers();
  const needle = useSearchStore((state) => state.offerFilter);
  const tableFilter = useSearchStore((state) => state.tableFilter);
  return filterOffers(offers, needle, tableFilter);
}
