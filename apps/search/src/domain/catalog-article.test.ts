import { describe, expect, it } from "vitest";

import { withCatalogArticles } from "./catalog-article.js";
import { productFromQuery } from "./product-from-query.js";

describe("withCatalogArticles", () => {
  it("takes a single catalogue article when the query has none", () => {
    const product = withCatalogArticles(productFromQuery("ssd kingston kc3000 1tb", "query"), ["SKC3000S/1024G"], "NETLAB");
    expect(product.mpn).toBe("SKC3000S/1024G");
    expect(product.characteristics["артикул по прайсу NETLAB"]).toBe("SKC3000S/1024G");
  });

  it("keeps an article the buyer typed", () => {
    const typed = productFromQuery("pantum tl-5120p", "query");
    expect(withCatalogArticles({ ...typed, mpn: "TL-5120P", model: "картридж" }, ["TL-5120"], "NETLAB").mpn).toBe("TL-5120P");
  });

  it("does not take an unrelated article for a brandless query", () => {
    expect(withCatalogArticles(productFromQuery("картридж 5120", "query"), ["TC-SH016"], "NETLAB").mpn).toBe("");
  });

  it("does not take an OEM code without the model number", () => {
    expect(withCatalogArticles(productFromQuery("12400 процессор", "query"), ["CM8071504555317SRL4V"], "NETLAB").mpn).toBe("");
  });

  it("only notes several variants", () => {
    const base = productFromQuery("samsung 990 pro 2тб", "query");
    const product = withCatalogArticles(base, ["MZ-V9P2T0BW", "MZ-V9P2T0CW"], "NETLAB");
    expect(product.mpn).toBe(base.mpn);
    expect(product.characteristics["артикулы по прайсу NETLAB"]).toBe("MZ-V9P2T0BW, MZ-V9P2T0CW");
  });
});

describe("cleanNetlabArticle", async () => {
  const { cleanNetlabArticle } = await import("../infrastructure/sources/netlab-price-feed.js");
  it("keeps capacity suffixes and splits article pairs", () => {
    expect(cleanNetlabArticle("SKC3000S/1024G")).toBe("SKC3000S/1024G");
    expect(cleanNetlabArticle("BX8071512400FSRL5Z/BX8071512400FSRL4W")).toBe("BX8071512400FSRL5Z");
    expect(cleanNetlabArticle("MZ-V9P2T0BW_DP")).toBe("MZ-V9P2T0BW");
  });
});

describe("withCatalogArticles after a variant was chosen", () => {
  it("does not offer the variants again when the product already carries one of them", () => {
    const chosen = { id: "x", name: "Kingston KC3000", brand: "Kingston", model: "KC3000", mpn: "SKC3000D/2048G", category: "SSD", characteristics: {} };
    expect(withCatalogArticles(chosen, ["SKC3000S/1024G", "SKC3000D/2048G"], "NETLAB")).toBe(chosen);
  });
});
