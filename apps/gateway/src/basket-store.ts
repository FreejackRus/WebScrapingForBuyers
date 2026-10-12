import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { BasketItem, BasketOffer, ProductCondition } from "@peremena/contracts";

export const MAX_BASKET_ITEMS = 100;
export const MAX_QUANTITY = 10_000;
const CONDITIONS: readonly ProductCondition[] = ["new", "refurbished", "used", "display", "unknown"];

const str = (value: unknown, max: number): string | undefined =>
  typeof value === "string" && value.length <= max ? value : undefined;

/** Validates an untrusted offer snapshot from the browser; undefined when anything is off. */
export function parseBasketOffer(raw: unknown): BasketOffer | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const o = raw as Record<string, unknown>;
  const source = str(o.source, 80);
  const seller = str(o.seller, 200) ?? "";
  const title = str(o.title, 400);
  const priceCondition = str(o.priceCondition, 200) ?? "";
  const availability = str(o.availability, 200) ?? "";
  const url = str(o.url, 2_000);
  const mpn = str(o.mpn, 80);
  const note = str(o.verificationNote, 400);
  const condition = CONDITIONS.find((value) => value === o.condition) ?? "unknown";
  const price = typeof o.price === "number" && Number.isFinite(o.price) && o.price >= 0 && o.price < 1e9 ? o.price : undefined;
  // Only web links: the basket is rendered as a clickable list and exported to Excel.
  if (!source || !title || price === undefined || !url || !/^https?:\/\//i.test(url)) return undefined;
  return {
    source, seller, title, price, priceCondition, availability, condition, url,
    ...(mpn ? { mpn } : {}),
    ...(note ? { verificationNote: note } : {}),
  };
}

export function parseQuantity(raw: unknown): number | undefined {
  return typeof raw === "number" && Number.isInteger(raw) && raw >= 1 && raw <= MAX_QUANTITY ? raw : undefined;
}

function isBasketItem(value: unknown): value is BasketItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.addedAt === "string" &&
    typeof item.query === "string" &&
    parseQuantity(item.quantity) !== undefined &&
    parseBasketOffer(item.offer) !== undefined
  );
}

export type AddResult = { item: BasketItem } | { error: "full" };

/**
 * Per-user purchase basket, same storage approach as SearchHistory: memory plus an
 * optional JSON file on a volume, debounced atomic writes, broken file = empty basket.
 */
export class BasketStore {
  private readonly byUser = new Map<string, BasketItem[]>();
  private dirty = false;
  private timer: NodeJS.Timeout | undefined;
  private running: Promise<void> | undefined;

  constructor(
    private readonly filePath?: string,
    private readonly now: () => number = Date.now,
    private readonly debounceMs = 200,
  ) {
    this.load();
  }

  list(userId: string): BasketItem[] {
    return structuredClone(this.byUser.get(userId) ?? []);
  }

  add(userId: string, input: { query: string; quantity: number; offer: BasketOffer }): AddResult {
    const items = this.byUser.get(userId) ?? [];
    // The same row added twice means «more of it», not a second line.
    const same = items.find((item) => item.offer.url === input.offer.url && item.offer.price === input.offer.price && item.offer.title === input.offer.title);
    if (same) {
      same.quantity = Math.min(MAX_QUANTITY, same.quantity + input.quantity);
      this.schedule();
      return { item: structuredClone(same) };
    }
    if (items.length >= MAX_BASKET_ITEMS) return { error: "full" };
    const item: BasketItem = {
      id: randomUUID(),
      addedAt: new Date(this.now()).toISOString(),
      query: input.query.trim().slice(0, 300),
      quantity: input.quantity,
      offer: structuredClone(input.offer),
    };
    this.byUser.set(userId, [...items, item]);
    this.schedule();
    return { item: structuredClone(item) };
  }

  setQuantity(userId: string, id: string, quantity: number): BasketItem | undefined {
    const item = (this.byUser.get(userId) ?? []).find((entry) => entry.id === id);
    if (!item) return undefined;
    item.quantity = quantity;
    this.schedule();
    return structuredClone(item);
  }

  remove(userId: string, id: string): boolean {
    const items = this.byUser.get(userId) ?? [];
    const next = items.filter((item) => item.id !== id);
    if (next.length === items.length) return false;
    this.byUser.set(userId, next);
    this.schedule();
    return true;
  }

  clear(userId: string): void {
    if (this.byUser.delete(userId)) this.schedule();
  }

  private load(): void {
    if (!this.filePath) return;
    try {
      const parsed: unknown = JSON.parse(readFileSync(this.filePath, "utf8"));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
      for (const [userId, items] of Object.entries(parsed)) {
        if (Array.isArray(items)) this.byUser.set(userId, items.filter(isBasketItem).slice(0, MAX_BASKET_ITEMS));
      }
    } catch {
      // No file yet, or it is unreadable: start empty.
    }
  }

  /** Writes any pending change right away; call it on shutdown. Never rejects. */
  async flush(): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    await this.drain();
  }

  private schedule(): void {
    if (!this.filePath) return;
    this.dirty = true;
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = undefined;
      void this.drain();
    }, this.debounceMs);
  }

  private drain(): Promise<void> {
    if (this.running) return this.running;
    const run = (async () => {
      try {
        while (this.dirty) {
          this.dirty = false;
          await this.write();
        }
      } finally {
        this.running = undefined;
      }
    })();
    this.running = run;
    return run;
  }

  private async write(): Promise<void> {
    if (!this.filePath) return;
    try {
      await mkdir(dirname(this.filePath), { recursive: true });
      const tmp = `${this.filePath}.tmp`;
      await writeFile(tmp, JSON.stringify(Object.fromEntries(this.byUser)), { encoding: "utf8", mode: 0o600 });
      await rename(tmp, this.filePath);
    } catch (error) {
      console.warn(JSON.stringify({ msg: "basket_save_failed", error: error instanceof Error ? error.message : String(error) }));
    }
  }
}
