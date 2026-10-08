import { useMemo, useState } from "react";
import type { Offer } from "@peremena/contracts";

import { nextOfferSort, sortOffers } from "entities/offer";
import type { OfferSort, OfferSortColumn } from "entities/offer";

import { useFilteredOffers } from "../filter-offers";

export const OFFER_PAGE_SIZE = 8;

export function buildOfferTablePage(offers: Offer[], sort: OfferSort | undefined, page: number) {
  const sorted = sortOffers(offers, sort);
  const reviewRows = sorted.filter((offer) => offer.assessment?.group === "needs_review");
  const primaryRows = sorted.filter((offer) => offer.assessment?.group !== "needs_review");
  const pageCount = Math.max(1, Math.ceil(primaryRows.length / OFFER_PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const rows = primaryRows.slice((safePage - 1) * OFFER_PAGE_SIZE, safePage * OFFER_PAGE_SIZE);

  return { rows, reviewRows, total: primaryRows.length, page: safePage, pageCount };
}

export function useOfferTable() {
  const filtered = useFilteredOffers();
  const [sort, setSort] = useState<OfferSort>();
  const [page, setPage] = useState(1);
  const tablePage = useMemo(() => buildOfferTablePage(filtered, sort, page), [filtered, sort, page]);

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
