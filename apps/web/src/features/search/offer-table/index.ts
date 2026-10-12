import { useEffect, useMemo, useState } from "react";
import type { Offer } from "@peremena/contracts";

import { groupSameOffers, nextOfferSort, sortOffers } from "entities/offer";
import type { OfferSort, OfferSortColumn } from "entities/offer";

import { useFilteredOffers } from "../filter-offers";
import { useSearchStore } from "entities/search";

export const OFFER_PAGE_SIZE = 8;

export function buildOfferTablePage(offers: Offer[], sort: OfferSort | undefined, page: number) {
  const sorted = sortOffers(offers, sort);
  const reviewRows = sorted.filter((offer) => offer.assessment?.group === "needs_review");
  const primaryRows = sorted.filter((offer) => offer.assessment?.group !== "needs_review");
  // One line per item: the same listing from several sellers folds under its best row.
  const groups = groupSameOffers(primaryRows);
  const pageCount = Math.max(1, Math.ceil(groups.length / OFFER_PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const pageGroups = groups.slice((safePage - 1) * OFFER_PAGE_SIZE, safePage * OFFER_PAGE_SIZE);
  const rows = pageGroups.map((group) => group.lead);
  const grouped = Object.fromEntries(pageGroups.filter((group) => group.others.length > 0).map((group) => [group.lead.id, group.others]));

  return { rows, grouped, reviewRows, total: groups.length, offerCount: primaryRows.length, page: safePage, pageCount };
}

export function useOfferTable() {
  const filtered = useFilteredOffers();
  const offerFilter = useSearchStore((state) => state.offerFilter);
  const tableFilter = useSearchStore((state) => state.tableFilter);
  const [sort, setSort] = useState<OfferSort>();
  const [page, setPage] = useState(1);
  const tablePage = useMemo(() => buildOfferTablePage(filtered, sort, page), [filtered, sort, page]);

  const offerChannel = useSearchStore((state) => state.offerChannel);
  useEffect(() => setPage(1), [offerFilter, tableFilter, offerChannel]);

  return {
    ...tablePage,
    pageSize: OFFER_PAGE_SIZE,
    sort,
    setPage,
    selectSort: (next: OfferSort | undefined) => {
      setSort(next);
      setPage(1);
    },
    cycleSort: (column: OfferSortColumn) => {
      setSort((current) => nextOfferSort(current, column));
      setPage(1);
    },
  };
}
