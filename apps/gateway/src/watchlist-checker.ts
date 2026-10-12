import type { Product, SearchSnapshot, WatchItem } from "@peremena/contracts";
import { fetchWithTimeout } from "@peremena/service-kit";

import { compareWatch, watchedPrice } from "./watch-compare.js";
import type { WatchlistStore } from "./watchlist.js";

export const CHECK_TIMEOUT_MS = 180_000;
const POLL_MS = 3_000;
const REQUEST_TIMEOUT_MS = 30_000;
/** Pause between items of a scheduled run, so sources are not hammered. */
export const CHECK_PAUSE_MS = 20_000;
/** The first scheduled run waits for the other services to come up. */
export const FIRST_RUN_DELAY_MS = 5 * 60_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** The stored product goes as a picked (non-typed) payload, so search uses it as-is. */
function searchProduct(product: Product): Product {
  if (product.characteristics.источник !== "typed") return product;
  return { ...product, characteristics: { ...product.characteristics, источник: "watchlist" } };
}

/** Runs one search for the watched product and waits for it to complete. */
export async function runWatchSearch(searchUrl: string, item: WatchItem, options: { timeoutMs?: number; pollMs?: number } = {}): Promise<SearchSnapshot> {
  const query = (item.query || item.product.name).slice(0, 300);
  const created = await fetchWithTimeout(
    `${searchUrl}/searches`,
    { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: query.length >= 2 ? query : item.product.name, product: searchProduct(item.product) }) },
    REQUEST_TIMEOUT_MS,
  );
  if (!created.ok) {
    const payload = (await created.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error ?? `Поиск не запущен (${created.status})`);
  }
  let snapshot = (await created.json()) as SearchSnapshot;
  const deadline = Date.now() + (options.timeoutMs ?? CHECK_TIMEOUT_MS);
  while (snapshot.status !== "complete") {
    if (Date.now() > deadline) throw new Error("Поиск не завершился вовремя");
    await sleep(options.pollMs ?? POLL_MS);
    const response = await fetchWithTimeout(`${searchUrl}/searches/${encodeURIComponent(snapshot.id)}`, {}, REQUEST_TIMEOUT_MS);
    if (!response.ok) throw new Error(`Поиск недоступен (${response.status})`);
    snapshot = (await response.json()) as SearchSnapshot;
  }
  return snapshot;
}

/** Rechecks one item and stores the result; never throws (an error lands in checkError). */
export async function checkWatchItem(
  store: WatchlistStore,
  searchUrl: string,
  userId: string,
  item: WatchItem,
  now: () => number = Date.now,
  options: { timeoutMs?: number; pollMs?: number } = {},
): Promise<WatchItem | undefined> {
  try {
    const snapshot = await runWatchSearch(searchUrl, item, options);
    const current = watchedPrice(snapshot.offers, item.channel);
    if (!current) {
      // Nothing usable now: the product is effectively gone from this channel.
      return store.update(userId, item.id, {
        last: item.last ? { ...item.last, inStock: false, at: new Date(now()).toISOString() } : null,
        change: item.baseline.inStock ? "out_of_stock" : "same",
        checkError: "Подходящих предложений не найдено",
      });
    }
    return store.update(userId, item.id, {
      last: { ...current, at: new Date(now()).toISOString() },
      change: compareWatch(item.baseline, current),
    });
  } catch (error) {
    return store.update(userId, item.id, {
      last: item.last,
      change: item.change,
      checkError: error instanceof Error ? error.message : "Проверка не удалась",
    });
  }
}

/** Hours between scheduled rechecks; 0 (or garbage) turns the schedule off. */
export function checkIntervalHours(raw = process.env.WATCHLIST_CHECK_HOURS): number {
  if (raw === undefined || raw.trim() === "") return 24;
  const hours = Number(raw);
  return Number.isFinite(hours) && hours > 0 ? hours : 0;
}

/**
 * Rechecks every watched item one by one with a pause between them. Returns a stop
 * function; nothing is scheduled when the interval is 0.
 */
export function startWatchlistScheduler(
  store: WatchlistStore,
  searchUrl: string,
  options: { hours?: number; firstDelayMs?: number; pauseMs?: number; log?: (msg: object) => void } = {},
): () => void {
  const hours = options.hours ?? checkIntervalHours();
  if (hours <= 0) return () => undefined;
  let stopped = false;
  let timer: NodeJS.Timeout | undefined;
  const run = async () => {
    const items = store.all();
    for (const [index, { userId, item }] of items.entries()) {
      if (stopped) return;
      if (index > 0) await sleep(options.pauseMs ?? CHECK_PAUSE_MS);
      await checkWatchItem(store, searchUrl, userId, item);
    }
    options.log?.({ msg: "watchlist_checked", items: items.length });
  };
  const loop = () => {
    timer = setTimeout(() => {
      void run().finally(() => {
        if (!stopped) loop();
      });
    }, hours * 3_600_000);
    timer.unref?.();
  };
  timer = setTimeout(() => {
    void run().finally(() => {
      if (!stopped) loop();
    });
  }, options.firstDelayMs ?? FIRST_RUN_DELAY_MS);
  timer.unref?.();
  return () => {
    stopped = true;
    clearTimeout(timer);
  };
}
