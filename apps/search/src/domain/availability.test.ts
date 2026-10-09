import { offerAvailabilityStatus } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

describe("shared legacy availability classification", () => {
  it.each([
    ["В наличии", "in_stock"],
    ["В наличии: 5", "in_stock"],
    ["В наличии: 0", "out_of_stock"],
    ["склад: более 50 шт.", "in_stock"],
    ["удалённый склад: 1–20 шт.", "in_stock"],
    ["склад: 21–50 шт.; в пути: более 50 шт.", "in_stock"],
    ["склад: 0 шт.; в пути: 1–20 шт.", "on_order"],
    ["в пути: более 50 шт. (2026-10-20)", "on_order"],
    ["Под заказ", "on_order"],
    ["Нет в наличии", "out_of_stock"],
    ["Уточнить наличие", "unknown"],
    ["Наличие не подтверждено", "unknown"],
    ["Неизвестно", "unknown"],
    ["Смотрите в магазинах", "unknown"],
    ["", "unknown"],
  ])("classifies %s as %s", (availability, expected) => {
    expect(offerAvailabilityStatus({ availability })).toBe(expected);
  });

  it("honors explicit unknown and out-of-stock instead of optimistic legacy text", () => {
    expect(offerAvailabilityStatus({ availability: "В наличии", availabilityStatus: "unknown" })).toBe("unknown");
    expect(offerAvailabilityStatus({ availability: "В наличии", availabilityStatus: "out_of_stock" })).toBe("out_of_stock");
  });
});
