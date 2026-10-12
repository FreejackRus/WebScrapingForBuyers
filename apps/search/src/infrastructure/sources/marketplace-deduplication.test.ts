import { describe, expect, it, vi } from "vitest";
import { McpMarketplaceAdapter, type MarketplaceToolCaller } from "./mcp-marketplace-adapter.js";
import { productFromQuery } from "../../domain/product-from-query.js";

const product = productFromQuery("12400F");
const item = { title: "Процессор Intel Core i5 12400F OEM", price_rub: 13990, url: "https://www.citilink.ru/product/intel-core-i5-12400f-123/", seller: "Ситилинк" };
const citilink = (items: object[]) => new McpMarketplaceAdapter({ callTool: vi.fn(async () => ({ items })) }, { name: "Ситилинк", kind: "citilink", tool: "citilink_search", host: "citilink.ru" });

describe("marketplace offer deduplication", () => {
  it("removes duplicate cards with same URL despite different response IDs", async () => {
    expect(await citilink([{ ...item, id: "first" }, { ...item, id: "second" }]).search(product)).toHaveLength(1);
  });
  it("preserves packaging variants with a shared card URL and price", async () => {
    expect(await citilink([{ ...item, id: "oem" }, { ...item, id: "box", title: "Процессор Intel Core i5 12400F BOX" }]).search(product)).toHaveLength(2);
  });
  it("preserves different sellers, URLs, and price variants", async () => {
    const offers = await citilink([item, { ...item, url: item.url.replace("123", "124") }, { ...item, seller: "Другой продавец" }, { ...item, price_rub: 14500 }]).search(product);
    expect(offers).toHaveLength(4);
  });
  it("does not collapse distinct search fallback cards", async () => {
    const { url: _url, ...withoutUrl } = item;
    expect(await citilink([{ ...withoutUrl, id: "first" }, { ...withoutUrl, id: "second" }]).search(product)).toHaveLength(2);
  });
  it("deduplicates repeats within and between Avito pages", async () => {
    const avitoItem = { ...item, url: "https://www.avito.ru/moskva/tovary/intel_core_i5_12400f_123", seller: "Продавец" };
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async (_name, args) => ({ items: args.page === 2 ? [avitoItem, { ...avitoItem, id: "another" }, { ...avitoItem, url: avitoItem.url.replace("123", "124") }, { ...avitoItem, url: avitoItem.url.replace("123", "124"), id: "duplicate" }] : [avitoItem] }));
    const adapter = new McpMarketplaceAdapter({ callTool }, { name: "Авито", kind: "avito", tool: "avito_search", host: "avito.ru" });
    expect(await adapter.search(product)).toHaveLength(2);
    expect(callTool).toHaveBeenCalledTimes(2);
  });
});
