import type { Product } from "@peremena/contracts";

const compact = (value: string) => value.toLocaleLowerCase("ru").replace(/[^a-zа-яё0-9]+/giu, "");

/** A typed «mpn» that is only the model again («m240», «kc3000») is not a maker article. */
function hasRealArticle(product: Product): boolean {
  const mpn = compact(product.mpn);
  return mpn.length > 0 && mpn !== compact(product.model) && !compact(product.model).endsWith(mpn);
}

/**
 * Adds what a distributor catalogue knows about the product. One article → it becomes the
 * product article, so storefronts and marketplaces are searched by the exact code. Several
 * (colours, kits, heatsink versions) → only noted, the search stays by model.
 */
export function withCatalogArticles(product: Product, articles: string[], source: string): Product {
  if (articles.length === 0) return product;
  if (articles.length === 1) {
    const article = articles[0]!;
    if (hasRealArticle(product)) return product;
    // The article must carry the typed model number. «картридж 5120» must not become a Sharp toner, and an OEM
    // code without the number («CM8071504555317SRL4V» for 12400) would hide the 12400 / 12400F difference (eval 2026-10-12).
    const modelTokens = (product.model.toLocaleLowerCase("ru").match(/[a-z]*\d+[a-z0-9]*/giu) ?? []).map(compact);
    if (!modelTokens.some((token) => token.length >= 3 && compact(article).includes(token))) return product;
    return { ...product, mpn: article, characteristics: { ...product.characteristics, [`артикул по прайсу ${source}`]: article } };
  }
  return { ...product, characteristics: { ...product.characteristics, [`артикулы по прайсу ${source}`]: articles.join(", ") } };
}
