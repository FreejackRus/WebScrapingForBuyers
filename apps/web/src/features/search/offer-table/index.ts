import { useEffect, useMemo, useState } from "react";
import type { Offer } from "@peremena/contracts";

import { groupSameOffers, nextOfferSort, sortOffers } from "entities/offer";
import type { OfferSort, OfferSortColumn } from "entities/offer";

import { useFilteredOffers } from "../filter-offers";
import { useSearchStore } from "entities/search";

export const OFFER_PAGE_SIZE = 8;
export const OFFER_PAGE_SIZES = [8, 20, 50] as const;
const PAGE_SIZE_KEY = "price-radar:offer-page-size";

function readPageSize(): number {
  try {
    const value = Number(localStorage.getItem(PAGE_SIZE_KEY));
    return (OFFER_PAGE_SIZES as readonly number[]).includes(value) ? value : OFFER_PAGE_SIZE;
  } catch {
    return OFFER_PAGE_SIZE;
  }
}

export function buildOfferTablePage(offers: Offer[], sort: OfferSort | undefined, page: number, pageSize: number = OFFER_PAGE_SIZE) {
  const sorted = sortOffers(offers, sort);
  const reviewRows = sorted.filter((offer) => offer.assessment?.group === "needs_review");
  const primaryRows = sorted.filter((offer) => offer.assessment?.group !== "needs_review");
  // One line per item: the same listing from several sellers folds under its best row.
  const groups = groupSameOffers(primaryRows);
  const pageCount = Math.max(1, Math.ceil(groups.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const pageGroups = groups.slice((safePage - 1) * pageSize, safePage * pageSize);
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
  const [pageSize, setPageSizeState] = useState(readPageSize);
  const tablePage = useMemo(() => buildOfferTablePage(filtered, sort, page, pageSize), [filtered, sort, page, pageSize]);

  const offerChannel = useSearchStore((state) => state.offerChannel);
  useEffect(() => setPage(1), [offerFilter, tableFilter, offerChannel]);

  return {
    ...tablePage,
    pageSize,
    setPageSize: (next: number) => {
      setPageSizeState(next);
      setPage(1);
      try { localStorage.setItem(PAGE_SIZE_KEY, String(next)); } catch { /* private mode */ }
    },
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
