import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";
import { assessOffer } from "./offer-assessment.js";
import { productFromQuery } from "./product-from-query.js";

const offer = (title: string): Offer => ({
  id: title, source: "NETLAB", seller: "NETLAB", title, price: 12000,
  priceCondition: "Публичная", currency: "RUB", availability: "В наличии",
  condition: "new", match: "probable", url: "https://example.test/cpu",
  fetchedAt: new Date(0).toISOString(), demo: false,
});

describe("CPU result precision", () => {
  it.each(["12400f", "процессор 12400f", "12400f процессор"])("normalizes CPU query %s", (query) => {
    const product = productFromQuery(query);
    expect(product.name).toBe("Процессор Intel 12400F");
    expect(product.model).toBe("12400F");
    expect(product.category).toBe("Процессоры");
  });
  it.each([
    "Игровой пк Intel Core i5 12400F + RTX 5060",
    "Системный блок Intel Core i5-12400F",
    "Компьютер Intel Core i5-12400F",
    "Процессоры Intel Core i5-13400TEF, i5-12400F, i5-14400F, i5-13600KF",
  ])("requires review rather than treating %s as a standalone selected CPU", (title) => {
    expect(assessOffer(productFromQuery("12400F"), offer(title), "12400F")?.assessment?.group).toBe("needs_review");
  });
  it.each([
    "CPU Intel Core i5-12400F Alder Lake OEM CM8071504650609SRL5Z/CM8071504650608SRL5Z",
    "CPU Intel Core i5-12400F Alder Lake BOX (BX8071512400FSRL5Z/BX8071512400FSRL4W)",
    "Процессор Intel Core i5 12400F, OEM",
    "2026 Intel core i5 12400F oem Гарантия Новые",
  ])("retains a single processor %s", (title) => {
    expect(assessOffer(productFromQuery("12400F"), offer(title), "12400F")?.assessment?.group).toBe("match");
  });
  it("does not turn a requested computer into a processor", () => {
    expect(productFromQuery("Игровой ПК Intel Core i5-12400F").category).not.toBe("Процессоры");
  });
});
