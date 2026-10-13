import { describe, expect, it } from "vitest";
import { toCitilinkOffer } from "./citilink-agent-adapter.js";

const product = { id: "p", brand: "Kingston", model: "KC3000", name: "SSD Kingston KC3000 1TB", mpn: "SKC3000S/1024G", category: "SSD", characteristics: {} };
const item = {
  id: "1626492",
  title: "1ТБ SSD накопитель Kingston KC3000 SKC3000S/1024G M.2 2280, PCIe 4.0 x4, NVMe",
  url: "https://www.citilink.ru/product/ssd-nakopitel-kingston-kc3000-skc3000s-1024g-1626492/",
  price: 26_990,
  clubPrice: 26_700,
  inStock: true,
};

describe("Citilink office agent offers", () => {
  it("maps a tile to an exact, in-stock offer at the regular price", () => {
    const offer = toCitilinkOffer(item, product, "2026-10-13T00:00:00Z");
    expect(offer).toMatchObject({ source: "Ситилинк", price: 26_990, match: "exact", availability: "В наличии" });
    expect(offer?.priceCondition).toContain("клубная");
  });
  it("rejects links outside citilink product pages and empty prices", () => {
    expect(toCitilinkOffer({ ...item, url: "https://evil.example/product/1" }, product, "")).toBeUndefined();
    expect(toCitilinkOffer({ ...item, price: 0 }, product, "")).toBeUndefined();
  });
});
