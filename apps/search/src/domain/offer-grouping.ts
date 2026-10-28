import type { Offer, Product } from "@peremena/contracts";

import { matchedWildcardArticle, normaliseArticleText, wildcardArticleOf } from "./wildcard-article.js";

/**
 * Which model a row is, so the table can show «K380 — 12 предложений, K380s — 5» instead of one
 * mixed list (the «карточка модели» of Yandex Market, research 2026-10-28 §2.2).
 *
 * Deterministic and conservative: no key when the listing does not name the model plainly.
 */
const MAX_SUFFIX = 3;

function compact(text: string): string {
  return normaliseArticleText(text).replace(/[^A-Z0-9]/g, "");
}

export function offerModelKey(product: Product, offer: Pick<Offer, "title" | "mpn">): string | undefined {
  const text = `${offer.title} ${offer.mpn ?? ""}`;
  const wildcard = wildcardArticleOf(product);
  if (wildcard) return matchedWildcardArticle(wildcard, text);

  const model = compact(product.model || product.mpn);
  if (model.length < 3 || !/\d/.test(model) || !/[A-Z]/.test(model)) return undefined;
  const words = normaliseArticleText(text).split(/[^A-Z0-9]+/).filter(Boolean);
  // «K380», «K380S», but not «K3800» (another model) or a long SKU that only starts the same way.
  const keys = words.filter((word) => word.startsWith(model)
    && word.length - model.length <= MAX_SUFFIX
    && !/^\d/.test(word.slice(model.length)));
  if (keys.length === 0) return undefined;
  return keys.sort((left, right) => left.length - right.length)[0];
}

const UNIT = "(?:шт|штук|картридж|флакон|бутыл|баноч|цвет)";
const PACK_PATTERNS = [
  new RegExp(`(?:комплект|набор|упаковк\\p{L}*|пачк\\p{L}*)\\s*(?:из\\s*)?(\\d{1,2})\\s*${UNIT}`, "iu"),
  new RegExp(`(?:^|[^\\p{L}\\d.,])(\\d{1,2})\\s*(?:шт|штук)(?=$|[^\\p{L}])`, "iu"),
];

/** Units in one listing («комплект 4 шт», «набор из 6 цветов»); undefined for a single unit or when unsure. */
export function packQuantity(title: string): number | undefined {
  for (const pattern of PACK_PATTERNS) {
    const value = Number(title.match(pattern)?.[1]);
    if (Number.isInteger(value) && value >= 2 && value <= 50) return value;
  }
  return undefined;
}

/** Adds the model key and, for multi-unit listings, the quantity and price per unit. */
export function withGrouping(product: Product, offer: Offer): Offer {
  const grouped: Offer = { ...offer };
  delete grouped.modelKey;
  delete grouped.packQuantity;
  delete grouped.unitPrice;
  const modelKey = offerModelKey(product, offer);
  if (modelKey) grouped.modelKey = modelKey;
  const quantity = packQuantity(offer.title);
  if (quantity) {
    grouped.packQuantity = quantity;
    grouped.unitPrice = Math.round(offer.price / quantity);
  }
  return grouped;
}
