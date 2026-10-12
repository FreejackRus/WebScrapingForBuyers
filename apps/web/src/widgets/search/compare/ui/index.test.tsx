import type { Offer } from "@peremena/contracts";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MAX_COMPARE, toggleCompare } from "features/compare";

import { CompareDialog } from "./index";

const offer = (id: string, price: number): Offer => ({
  id, source: `Shop ${id}`, seller: "", title: `Samsung 990 PRO 2TB ${id}`, price, priceCondition: "Публичная цена", currency: "RUB",
  availability: "В наличии", condition: "new", match: "exact", url: `https://shop/${id}`, fetchedAt: "", demo: false,
});

describe("compare selection", () => {
  it("adds up to four rows and removes on second click", () => {
    let ids: string[] = [];
    for (const id of ["a", "b", "c", "d", "e"]) ids = toggleCompare(ids, id);
    expect(ids).toEqual(["a", "b", "c", "d"]);
    expect(ids).toHaveLength(MAX_COMPARE);
    expect(toggleCompare(ids, "b")).toEqual(["a", "c", "d"]);
  });
});

describe("CompareDialog", () => {
  it("shows one column per offer and highlights the lowest price", () => {
    const html = renderToStaticMarkup(<CompareDialog offers={[offer("a", 30_000), offer("b", 25_000)]} onClose={() => {}} />);
    expect(html).toContain("Shop a");
    expect(html).toContain("Shop b");
    expect(html).toContain("Проверка карточки");
    expect(html).toContain("Характеристики");
    expect((html.match(/compare-lowest/g) ?? []).length).toBe(1);
    expect(html.indexOf("compare-lowest")).toBeGreaterThan(html.indexOf("Shop b"));
  });
});
