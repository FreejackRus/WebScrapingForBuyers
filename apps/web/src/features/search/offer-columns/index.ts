import { useCallback, useSyncExternalStore } from "react";

import type { OfferSortColumn } from "entities/offer";

export const OFFER_COLUMNS: { key: OfferSortColumn; label: string; width: number }[] = [
  { key: "source", label: "Источник / продавец", width: 168 },
  { key: "title", label: "Товар", width: 280 },
  { key: "match", label: "Совпадение", width: 128 },
  { key: "price", label: "Цена", width: 112 },
  { key: "availability", label: "Наличие", width: 120 },
  { key: "conditions", label: "Условия", width: 168 },
  { key: "fetched", label: "Время запроса", width: 128 },
];

const STORAGE_KEY = "peremena.offer-columns";
const MIN_WIDTH = 72;
const MAX_WIDTH = 560;

export type OfferColumnPrefs = {
  hidden: OfferSortColumn[];
  widths: Partial<Record<OfferSortColumn, number>>;
};

const defaultPrefs: OfferColumnPrefs = { hidden: [], widths: {} };
const listeners = new Set<() => void>();
let prefs: OfferColumnPrefs = readPrefs();

function readPrefs(): OfferColumnPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw) as OfferColumnPrefs;
    const hidden = Array.isArray(parsed.hidden)
      ? parsed.hidden.filter((key): key is OfferSortColumn => OFFER_COLUMNS.some((column) => column.key === key))
      : [];
    const widths = parsed.widths && typeof parsed.widths === "object" ? parsed.widths : {};
    return { hidden, widths };
  } catch {
    return defaultPrefs;
  }
}

function emit(next: OfferColumnPrefs) {
  prefs = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useOfferColumns() {
  const current = useSyncExternalStore(subscribe, () => prefs, () => defaultPrefs);
  const visible = OFFER_COLUMNS.filter((column) => !current.hidden.includes(column.key));

  const setHidden = useCallback((hidden: OfferSortColumn[]) => {
    const next = hidden.filter((key) => key !== "title");
    emit({ ...prefs, hidden: next.length >= OFFER_COLUMNS.length ? ["fetched"] : next });
  }, []);

  const toggle = useCallback((key: OfferSortColumn) => {
    if (key === "title") return;
    const hidden = prefs.hidden.includes(key)
      ? prefs.hidden.filter((item) => item !== key)
      : [...prefs.hidden, key];
    setHidden(hidden);
  }, [setHidden]);

  const setWidth = useCallback((key: OfferSortColumn, width: number) => {
    emit({
      ...prefs,
      widths: { ...prefs.widths, [key]: Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(width))) },
    });
  }, []);

  const reset = useCallback(() => emit(defaultPrefs), []);

  return {
    columns: OFFER_COLUMNS,
    visible,
    hidden: current.hidden,
    widthOf: (key: OfferSortColumn) => current.widths[key] ?? OFFER_COLUMNS.find((column) => column.key === key)?.width ?? 120,
    toggle,
    setWidth,
    reset,
    minWidth: MIN_WIDTH,
  };
}
