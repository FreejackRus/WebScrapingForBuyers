import { describe, expect, it } from "vitest";
import { decodeSearchLink, encodeSearchLink } from "./index";

const product = { id: "p1", brand: "Samsung", model: "990 PRO", name: "SSD Samsung 990 PRO 2 ТБ", mpn: "MZ-V9P2T0BW", category: "SSD", characteristics: { a: "b" } };

describe("search share link", () => {
  it("round-trips product and tab through the hash", () => {
    const url = encodeSearchLink("https://radar.local/app#old", product, "distributor");
    expect(url.startsWith("https://radar.local/app#search=")).toBe(true);
    const decoded = decodeSearchLink(new URL(url).hash);
    expect(decoded?.product).toEqual({ ...product, characteristics: {} });
    expect(decoded?.channel).toBe("distributor");
  });
  it("ignores broken or empty links", () => {
    expect(decodeSearchLink("#search=@@@")).toBeUndefined();
    expect(decodeSearchLink("")).toBeUndefined();
    expect(decodeSearchLink(`#search=${btoa(JSON.stringify({ product: { name: " " } }))}`)).toBeUndefined();
  });
});
