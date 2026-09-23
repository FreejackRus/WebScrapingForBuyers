import { useMemo, useState } from "react";

import { nextOfferSort, sortOffers } from "entities/offer";
import type { OfferSort, OfferSortColumn } from "entities/offer";

import { useFilteredOffers } from "../filter-offers";

export const OFFER_PAGE_SIZE = 8;

export function useOfferTable() {
  const filtered = useFilteredOffers();
  const [sort, setSort] = useState<OfferSort>();
  const [page, setPage] = useState(1);
  const sorted = useMemo(() => sortOffers(filtered, sort), [filtered, sort]);
  const pageCount = Math.max(1, Math.ceil(sorted.length / OFFER_PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const rows = sorted.slice((safePage - 1) * OFFER_PAGE_SIZE, safePage * OFFER_PAGE_SIZE);

  return {
    rows,
    total: sorted.length,
    page: safePage,
    pageCount,
    pageSize: OFFER_PAGE_SIZE,
    sort,
    setPage,
    cycleSort: (column: OfferSortColumn) => {
      setSort((current) => nextOfferSort(current, column));
      setPage(1);
    },
  };
}
