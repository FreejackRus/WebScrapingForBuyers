import type { Product, QueryUnderstanding } from "@peremena/contracts";

import { brandsIn, canonicalBrand, inferCategory } from "./product-from-query.js";

const compact = (value: string) => value.toLocaleLowerCase("ru").replace(/[^a-zа-яё0-9]+/giu, "");

/** Long or unrecognised requests are where the AI reading helps; short model codes are clear already. */
export function needsUnderstanding(query: string, product: Product): boolean {
  const words = query.trim().split(/\s+/).filter(Boolean);
  return product.category === "Каталог" || words.length >= 4;
}

/**
 * Merges the AI reading into the rule-based product, keeping only what the buyer actually typed:
 * a model or article must appear in the query, a brand must be a known maker named in it,
 * the product type only fills an unknown category. The query itself stays the search text for
 * «оригинальный», «б/у» and quantity words.
 */
export function mergeUnderstanding(product: Product, understanding: QueryUnderstanding, query: string): Product {
  const typed = compact(query);
  const grounded = (value: string | undefined) => (value && compact(value).length >= 2 && typed.includes(compact(value)) ? value.trim() : undefined);
  const model = grounded(understanding.model);
  const mpn = grounded(understanding.mpn);
  const brandKey = understanding.brand ? canonicalBrand(understanding.brand) : undefined;
  const brand = brandKey && brandsIn(query).has(brandKey) ? understanding.brand!.trim() : undefined;
  const typeCategory = understanding.productType ? inferCategory(understanding.productType) : "Каталог";
  const category = product.category === "Каталог" && typeCategory !== "Каталог" ? typeCategory : product.category;
  if (!model && !mpn && !brand && category === product.category) return product;

  const nextBrand = brand ?? (product.brand === "—" ? "" : product.brand);
  const nextModel = model ?? product.model;
  const productType = category !== "Каталог" && understanding.productType ? understanding.productType.trim() : "";
  return {
    ...product,
    brand: nextBrand || "—",
    model: nextModel,
    mpn: mpn ?? product.mpn,
    // A clean name drives marketplace queries; «нужно 5 штук мышек … для бухгалтерии» would not.
    name: model ? [productType, nextBrand, nextModel].filter(Boolean).join(" ") : product.name,
    category,
    characteristics: {
      ...product.characteristics,
      "разбор запроса": "AI",
      ...(understanding.quantity ? { количество: String(understanding.quantity) } : {}),
    },
  };
}
