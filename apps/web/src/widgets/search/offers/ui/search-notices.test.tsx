import type { Product, SearchSnapshot } from "@peremena/contracts";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const start = vi.fn();
let mockSnapshot: SearchSnapshot | undefined;

vi.mock("entities/search", () => ({
  useSearchStore: (selector: (state: unknown) => unknown) => selector({ snapshot: mockSnapshot, start }),
}));

const { SearchNotices, cachedNotice, pendingSourceNames, productForVariant, shouldAutoReview, variantArticles } = await import("./search-notices");

const product: Product = {
  id: "ssd",
  brand: "Kingston",
  model: "KC3000",
  name: "Kingston KC3000 1TB",
  mpn: "",
  category: "SSD",
  characteristics: { источник: "typed", "артикулы по прайсу NETLAB": "SKC3000S/1024G, SKC3000D/2048G" },
};

const snapshot = (patch: Partial<SearchSnapshot> = {}): SearchSnapshot => ({
  id: "s1",
  query: "kc3000",
  product,
  status: "complete",
  offers: [],
  sources: [
    { source: "Ozon", status: "loading" },
    { source: "Ситилинк", status: "pending" },
    { source: "WB", status: "done" },
  ],
  ...patch,
});

describe("variant chooser", () => {
  it("lists price-list articles and pins the chosen one as a non-typed product", () => {
    expect(variantArticles(product)).toEqual(["SKC3000S/1024G", "SKC3000D/2048G"]);
    const chosen = productForVariant(product, "SKC3000D/2048G");
    expect(chosen.mpn).toBe("SKC3000D/2048G");
    expect(chosen.characteristics.источник).toBe("variant");
    expect(productForVariant({ ...product, characteristics: { источник: "suggest" } }, "A").characteristics.источник).toBe("suggest");
  });

  it("renders chips and restarts the search with the article", () => {
    mockSnapshot = snapshot();
    const html = renderToStaticMarkup(<SearchNotices />);
    expect(html).toContain("Уточните вариант:");
    expect(html).toContain("SKC3000D/2048G");
  });
});

describe("pending sources and cache notices", () => {
  it("names sources still answering only while running", () => {
    expect(pendingSourceNames(snapshot())).toEqual([]);
    expect(pendingSourceNames(snapshot({ status: "running" }))).toEqual(["Ozon", "Ситилинк"]);
    mockSnapshot = snapshot({ status: "running" });
    expect(renderToStaticMarkup(<SearchNotices />)).toContain("Ещё ищут: Ozon, Ситилинк…");
  });

  it("shows when cached results were collected", () => {
    const at = "2026-10-12T10:00:00.000Z";
    expect(cachedNotice(at, Date.parse(at) + 12 * 60_000)).toMatch(/^Результаты от \d\d:\d\d \(12 мин назад\)$/);
    mockSnapshot = snapshot({ cachedAt: at });
    const html = renderToStaticMarkup(<SearchNotices />);
    expect(html).toContain("Результаты от");
    expect(html).toContain("Обновить");
  });
});

describe("automatic AI review", () => {
  it("runs once per finished search with a short review group", () => {
    const done = snapshot();
    expect(shouldAutoReview(done, 3, undefined, new Set())).toBe(true);
    expect(shouldAutoReview(snapshot({ status: "running" }), 3, undefined, new Set())).toBe(false);
    expect(shouldAutoReview(done, 0, undefined, new Set())).toBe(false);
    expect(shouldAutoReview(done, 9, undefined, new Set())).toBe(false);
    expect(shouldAutoReview(done, 3, "s1", new Set())).toBe(false);
    expect(shouldAutoReview(done, 3, undefined, new Set(["s1"]))).toBe(false);
  });
});
