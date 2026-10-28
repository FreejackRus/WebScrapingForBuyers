import type { Offer, Product } from "@peremena/contracts";
import { describe, expect, it, vi } from "vitest";

import { type SourceAdapter, withRawFound } from "../domain/source-adapter.js";
import { SearchService } from "./search-service.js";

// Older tests repeat a search on purpose (last-good fallback); the cache has its own tests below.
process.env.SEARCH_CACHE_MINUTES = "0";

const product: Product = { id: "p", name: "Logitech K380", brand: "Logitech", model: "K380", mpn: "920-007584" } as Product;

function offer(source: string, price = 1000): Offer {
  return {
    id: `${source}-${price}`,
    source,
    seller: source,
    title: "Logitech K380",
    price,
    priceCondition: "Обычная цена",
    currency: "RUB",
    availability: "В наличии",
    condition: "new",
    match: "exact",
    url: "https://example.com",
    fetchedAt: new Date().toISOString(),
    demo: false,
  } as Offer;
}

function source(name: string, behaviour: () => Promise<Offer[]>): SourceAdapter {
  return { name, search: behaviour };
}

async function finish(service: SearchService, id: string): Promise<void> {
  await new Promise<void>((resolve) => {
    const off = service.subscribe(id, (event) => {
      if (event.type === "complete") {
        off();
        resolve();
      }
    });
  });
}

const retention = { ttlMs: 1000, maxSearches: 2, maxLastGood: 2 };

describe("SearchService retention", () => {
  it("drops finished searches after the TTL", async () => {
    let now = 0;
    const service = new SearchService([source("A", async () => [offer("A")])], retention, () => now);
    const first = service.start("q", product);
    await finish(service, first.id);
    now = 5000;
    service.start("q2", product);
    expect(service.get(first.id)).toBeUndefined();
  });

  it("evicts the oldest finished search above the cap", async () => {
    const service = new SearchService([source("A", async () => [offer("A")])], retention, () => 0);
    const ids: string[] = [];
    for (let i = 0; i < 2; i += 1) {
      const snap = service.start(`q${i}`, product);
      ids.push(snap.id);
      await finish(service, snap.id);
    }
    const third = service.start("q3", product);
    expect(service.get(ids[0]!)).toBeUndefined();
    expect(service.get(ids[1]!)).toBeDefined();
    expect(service.get(third.id)).toBeDefined();
  });

  it("never drops a search that is still running", async () => {
    let release: () => void = () => {};
    const slow = source("SLOW", () => new Promise<Offer[]>((resolve) => (release = () => resolve([]))));
    const service = new SearchService([slow], { ...retention, maxSearches: 1 }, () => 0);
    const running = service.start("q", product);
    service.start("q2", product);
    expect(service.get(running.id)).toBeDefined();
    release();
  });
});

describe("SearchService last-good fallback", () => {
  it("reuses the last real offers when a source fails", async () => {
    let fail = false;
    const flaky = source("A", async () => {
      if (fail) throw new Error("boom");
      return [offer("A")];
    });
    const service = new SearchService([flaky]);
    const ok = service.start("q", product);
    await finish(service, ok.id);
    fail = true;
    const second = service.start("q", product, undefined, { fresh: true });
    await finish(service, second.id);
    const snap = service.get(second.id)!;
    expect(snap.offers).toHaveLength(1);
    expect(snap.sources[0]?.status).toBe("error");
  });

  it("caps remembered result sets", async () => {
    const names = ["A", "B", "C"];
    const service = new SearchService(names.map((n) => source(n, async () => [offer(n)])), retention);
    const snap = service.start("q", product);
    await finish(service, snap.id);
    expect((service as unknown as { lastGoodReal: Map<string, Offer[]> }).lastGoodReal.size).toBe(2);
  });
});

describe("SearchService IT scope logging", () => {
  it("logs how many source offers the IT filter dropped", async () => {
    const accessory = { ...offer("A", 500), id: "A-case", title: "Чехол для ноутбука" };
    const service = new SearchService([source("A", async () => [offer("A"), accessory])]);
    const spy = vi.spyOn(console, "info").mockImplementation(() => undefined);
    try {
      const snap = service.start("q", product);
      await finish(service, snap.id);
      const line = spy.mock.calls
        .map((call) => JSON.parse(String(call[0])) as Record<string, unknown>)
        .find((entry) => entry.msg === "source_collect");
      expect(line).toMatchObject({ source: "A", found: 2, offers: 1, droppedByItScope: 1 });
    } finally {
      spy.mockRestore();
    }
  });
});

describe("SearchService source deadline", () => {
  it("marks a hung source as failed and still completes the search", async () => {
    const hung = source("HUNG", () => new Promise<Offer[]>(() => undefined));
    const fast = source("FAST", async () => [offer("FAST")]);
    const service = new SearchService([hung, fast], undefined, Date.now, 50);
    const snap = service.start("q", product);
    await finish(service, snap.id);
    const result = service.get(snap.id)!;
    expect(result.status).toBe("complete");
    expect(result.sources.find((s) => s.source === "HUNG")?.status).toBe("error");
    expect(result.sources.find((s) => s.source === "FAST")?.status).toBe("done");
    expect(result.offers.map((o) => o.source)).toEqual(["FAST"]);
  });
});

describe("SearchService query intent", () => {
  const cartridge: Product = {
    id: "c",
    name: "Картридж Pantum TL-5120",
    brand: "Pantum",
    model: "TL-5120",
    mpn: "TL-5120",
    category: "Картриджи",
    characteristics: {},
  };
  const titled = (title: string, price: number): Offer => ({ ...offer("WB", price), title });
  const rows = [
    titled("Картридж Pantum TL-5120 оригинальный", 9000),
    titled("Картридж NV Print TL-5120 совместимый", 2500),
    titled("Чип для картриджа Pantum TL-5120", 300),
    titled("Картридж Pantum TL-5120", 8800),
  ];

  async function titles(query: string): Promise<string[]> {
    const service = new SearchService([source("WB", async () => structuredClone(rows))]);
    const snap = service.start(query, cartridge);
    await finish(service, snap.id);
    return service.get(snap.id)!.offers.map((o) => o.title);
  }

  it("drops compatible rows and chips for «оригинальный»", async () => {
    expect(await titles("картридж pantum tl-5120 оригинальный")).toEqual([
      "Картридж Pantum TL-5120 оригинальный",
      "Картридж Pantum TL-5120",
    ]);
  });

  it("drops explicit originals for «совместимый»", async () => {
    expect(await titles("картридж tl-5120 совместимый")).toEqual([
      "Картридж NV Print TL-5120 совместимый",
      "Картридж Pantum TL-5120",
    ]);
  });

  it("keeps original and compatible cartridges without intent, still without chips", async () => {
    expect(await titles("картридж 5120")).toHaveLength(3);
  });
});

describe("SearchService offer assessment", () => {
  it("applies the same deterministic assessment to fresh and cached rows", async () => {
    let fail = false;
    const raw = { ...offer("A"), title: "Logitech K380" };
    const adapter = source("A", async () => {
      if (fail) throw new Error("offline");
      return [structuredClone(raw)];
    });
    const service = new SearchService([adapter]);

    const fresh = service.start("Logitech K380", product);
    await finish(service, fresh.id);
    const freshAssessment = service.get(fresh.id)!.offers[0]?.assessment;
    expect(freshAssessment?.group).toBe("match");
    expect(freshAssessment?.reasons.length).toBeGreaterThan(0);

    fail = true;
    const cached = service.start("Logitech K380", product);
    await finish(service, cached.id);
    expect(service.get(cached.id)!.offers[0]?.assessment).toEqual(freshAssessment);
  });
});


describe("SearchService availability contract", () => {
  it.each([
    ["склад: более 50 шт.", "in_stock"],
    ["удалённый склад: 1–20 шт.; в пути: более 50 шт.", "in_stock"],
    ["в пути: более 50 шт.", "on_order"],
    ["Под заказ", "on_order"],
    ["Нет в наличии", "out_of_stock"],
    ["Уточнить наличие", "unknown"],
  ])("normalizes %s in snapshots, SSE and fallback results", async (availability, expected) => {
    let fail = false;
    const service = new SearchService([source("A", async () => {
      if (fail) throw new Error("unavailable");
      return [{ ...offer("A"), availability }];
    })]);
    for (const fallback of [false, true]) {
      fail = fallback;
      const snapshot = service.start("Logitech K380", product);
      const events: Offer[] = [];
      const off = service.subscribe(snapshot.id, event => {
        if (event.type === "offers") events.push(...event.data);
      });
      await finish(service, snapshot.id);
      off();
      expect(service.get(snapshot.id)!.offers[0]).toHaveProperty("availabilityStatus", expected);
      expect(events[0]).toHaveProperty("availabilityStatus", expected);
    }
  });
});

describe("SearchService procurement quality", () => {
  it("emits an updated snapshot when a later batch changes existing ranks", async () => {
    let releaseSecond: (rows: Offer[]) => void = () => undefined;
    const service = new SearchService([
      source("FIRST", async () => [offer("FIRST", 1_000)]),
      source("SECOND", () => new Promise(resolve => { releaseSecond = resolve; })),
    ]);
    const started = service.start("Logitech K380", product);
    const snapshots: Offer[][] = [];
    const off = service.subscribe(started.id, event => {
      if (event.type === "snapshot") snapshots.push(event.data.offers);
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    releaseSecond([offer("SECOND", 900)]);
    await finish(service, started.id);
    off();
    expect(snapshots.some(rows => rows.length === 2 && rows.find(row => row.source === "FIRST")?.procurementRank === 2)).toBe(true);
  });
  it("keeps unknown NETLAB condition honest and lets explicit title evidence win", async () => {
    const service = new SearchService([source("NETLAB", async () => [
      { ...offer("NETLAB", 1000), id: "unknown", title: "Intel Core i5-12400F BOX" },
      { ...offer("NETLAB", 900), id: "display", title: "Intel Core i5-12400F с витрины" },
      { ...offer("NETLAB", 800), id: "used", title: "Intel Core i5-12400F Б/У" },
    ])]);
    const snapshot = service.start("12400F", { ...product, brand: "Intel", model: "12400F", name: "Intel Core i5-12400F", mpn: "BX8071512400F" });
    await finish(service, snapshot.id);
    expect(service.get(snapshot.id)!.offers.map(row => [row.id, row.condition])).toEqual([
      ["unknown", "unknown"], ["display", "display"], ["used", "used"],
    ]);
  });

  it("ranks eligible real offers by availability, condition, packaging and price", async () => {
    const rows = [
      { ...offer("A", 700), id: "order", availability: "Под заказ", condition: "new" as const },
      { ...offer("A", 800), id: "used", condition: "used" as const },
      { ...offer("A", 1000), id: "box-expensive", title: "Logitech K380 BOX" },
      { ...offer("A", 900), id: "box-cheap", title: "Logitech K380 BOX" },
      { ...offer("A", 850), id: "oem", title: "Logitech K380 OEM" },
      { ...offer("A", 1), id: "anomaly", priceAnomaly: "too_low" as const },
      { ...offer("A", 50), id: "demo", demo: true },
    ];
    const service = new SearchService([source("A", async () => rows)]);
    const snapshot = service.start("Logitech K380", product);
    await finish(service, snapshot.id);
    const ranked = [...service.get(snapshot.id)!.offers].sort((a, b) => a.procurementRank! - b.procurementRank!);
    expect(ranked.map(row => row.id)).toEqual([
      "oem", "box-cheap", "box-expensive", "used", "order", "anomaly", "demo",
    ]);
  });
});

describe("SearchService top-card verification", () => {
  it("re-checks the top rows, sinks a sold-out card and checks the next one", async () => {
    const checked: string[] = [];
    const verifier = {
      supports: (row: Offer) => row.source === "A",
      fetch: async (row: Offer) => {
        checked.push(row.id);
        return row.price === 900 ? { title: "Logitech K380", available: false } : { title: "Logitech K380", price: row.price * 1.2 };
      },
    };
    const service = new SearchService(
      [source("A", async () => [offer("A", 900), offer("A", 1000), offer("A", 1100), offer("A", 1200)])],
      undefined,
      Date.now,
      5000,
      [verifier],
    );
    const snap = service.start("Logitech K380", product);
    await finish(service, snap.id);
    const rows = [...service.get(snap.id)!.offers].sort((a, b) => a.procurementRank! - b.procurementRank!);
    expect(checked).toEqual(["A-900", "A-1000", "A-1100", "A-1200"]);
    expect(rows.at(-1)).toMatchObject({ id: "A-900", verification: { status: "unavailable" } });
    expect(rows[0]).toMatchObject({ id: "A-1000", price: 1200, verification: { status: "price_changed", listedPrice: 1000 } });
  });

  it("keeps the search usable when a card check fails", async () => {
    const verifier = { supports: () => true, fetch: async () => { throw new Error("403"); } };
    const service = new SearchService([source("A", async () => [offer("A")])], undefined, Date.now, 5000, [verifier]);
    const snap = service.start("Logitech K380", product);
    await finish(service, snap.id);
    expect(service.get(snap.id)!.offers[0]).not.toHaveProperty("verification");
  });
});

describe("SearchService recent-result cache", () => {
  const minute = 60_000;
  function setup(cacheMs = 15 * minute) {
    let now = 1_000_000;
    let calls = 0;
    const service = new SearchService(
      [source("A", async () => { calls += 1; return [offer("A")]; })],
      { ttlMs: 6 * 60 * minute, maxSearches: 50, maxLastGood: 10 },
      () => now,
      undefined,
      [],
      cacheMs,
    );
    return { service, calls: () => calls, advance: (ms: number) => { now += ms; } };
  }

  it("reuses a recent completed search as a new complete snapshot", async () => {
    const { service, calls, advance } = setup();
    const first = service.start("Logitech K380", product);
    await finish(service, first.id);
    advance(5 * minute);
    const again = service.start("  logitech   k380 ", product);
    expect(again.id).not.toBe(first.id);
    expect(again.status).toBe("complete");
    expect(again.cachedAt).toBe(new Date(1_000_000).toISOString());
    expect(again.offers).toHaveLength(1);
    expect(service.get(again.id)?.cachedAt).toBeDefined();
    expect(calls()).toBe(1);
  });

  it("misses for another product, another source set or a running search", async () => {
    const { service, calls } = setup();
    const running = service.start("q", product);
    expect(service.start("q", product).cachedAt).toBeUndefined();
    await finish(service, running.id);
    expect(service.start("q", { ...product, mpn: "OTHER" }).cachedAt).toBeUndefined();
    expect(service.start("q", product, ["missing"]).cachedAt).toBeUndefined();
    expect(calls()).toBeGreaterThanOrEqual(2);
  });

  it("expires after the cache window", async () => {
    const { service, advance } = setup();
    const first = service.start("q", product);
    await finish(service, first.id);
    advance(15 * minute);
    const again = service.start("q", product);
    expect(again.cachedAt).toBeUndefined();
    expect(again.status).toBe("running");
  });

  it("is bypassed by fresh and disabled by 0", async () => {
    const fresh = setup();
    const first = fresh.service.start("q", product);
    await finish(fresh.service, first.id);
    expect(fresh.service.start("q", product, undefined, { fresh: true }).cachedAt).toBeUndefined();

    const off = setup(0);
    const one = off.service.start("q", product);
    await finish(off.service, one.id);
    expect(off.service.start("q", product).cachedAt).toBeUndefined();
  });
});

describe("SearchService source outcome", () => {
  it("tells «nothing found», «all filtered» and «no answer» apart", async () => {
    const service = new SearchService([
      source("Empty", async () => []),
      source("Filtered", async () => { throw new Error("WB: нет подходящих карточек (38 отсеяны)."); }),
      source("Down", async () => { throw new Error("connect ECONNREFUSED"); }),
      source("Good", async () => [offer("Good")]),
    ]);
    const started = service.start("q", product);
    await finish(service, started.id);
    const outcome = Object.fromEntries(service.get(started.id)!.sources.map((state) => [state.source, [state.status, state.outcome, state.found]]));
    expect(outcome).toEqual({
      Empty: ["done", "nothing_found", 0],
      Filtered: ["done", "filtered_out", 38],
      Down: ["error", "error", undefined],
      Good: ["done", "offers", 1],
    });
  });
});

describe("SearchService raw counts", () => {
  it("reports what the shop returned, not only what the adapter kept", async () => {
    const service = new SearchService([source("Ozon", async () => withRawFound([offer("Ozon")], 12))]);
    const started = service.start("q", product);
    await finish(service, started.id);
    expect(service.get(started.id)!.sources[0]).toMatchObject({ outcome: "offers", found: 12, kept: 1 });
  });
});
