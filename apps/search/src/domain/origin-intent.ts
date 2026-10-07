import type { Offer, Product } from "@peremena/contracts";

/**
 * Original vs compatible (third-party) goods, mostly printer consumables.
 *
 * The buyer states the intent in the typed query («картридж Pantum TL-5120
 * оригинальный» / «… совместимый»). Classification is deterministic: explicit
 * words in the listing title plus well-known third-party consumable brands.
 * Offers we cannot classify stay in the table — the filter only removes rows
 * that clearly contradict the request.
 */
export type OriginIntent = "original" | "compatible";
export type OfferOrigin = "original" | "compatible" | "unknown";

const COMPATIBLE_WORDS =
  /(?:^|[^\p{L}])(?:не\s*оригинал\p{L}*|неоригинал\p{L}*|совместим\p{L}*|аналог\p{L}*|compatible|non[-\s]?original|replacement)(?=$|[^\p{L}])/iu;
const ORIGINAL_WORDS = /(?:^|[^\p{L}])(?:оригинал\p{L}*|original|genuine|oem)(?=$|[^\p{L}])/iu;

/** Third-party consumables makers (Russian market). Lowercase, matched as whole words. */
const THIRD_PARTY_BRANDS = [
  "nv print",
  "nvprint",
  "nv-print",
  "cactus",
  "hi-black",
  "hiblack",
  "sakura",
  "static control",
  "bion",
  "profiline",
  "pro-tone",
  "t2",
  "netproduct",
  "colortek",
  "galaprint",
  "easyprint",
  "katun",
  "uniton",
  "retech",
  "aquamarine",
  "gold atm",
  "opticart",
  "superfine",
  "printlight",
  "inkplus",
  "f+",
  "f+ imaging",
  "elp",
  "solution print",
  "target",
  "white cartridge",
  "kolorit",
  "vtc",
];

function hasWord(haystack: string, word: string): boolean {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, "iu").test(haystack);
}

/** What the buyer asked for, or undefined when the query does not say. */
export function originIntent(query: string): OriginIntent | undefined {
  if (COMPATIBLE_WORDS.test(query)) return "compatible";
  if (ORIGINAL_WORDS.test(query)) return "original";
  return undefined;
}

export function offerOrigin(offer: Pick<Offer, "title" | "seller">, product: Pick<Product, "brand">): OfferOrigin {
  const title = offer.title.toLocaleLowerCase("ru");
  if (COMPATIBLE_WORDS.test(title)) return "compatible";
  const seller = (offer.seller ?? "").toLocaleLowerCase("ru");
  const productBrand = product.brand.trim().toLocaleLowerCase("ru");
  const thirdParty = THIRD_PARTY_BRANDS.some(
    (brand) => brand !== productBrand && (hasWord(title, brand) || seller === brand),
  );
  if (thirdParty) return "compatible";
  if (ORIGINAL_WORDS.test(title)) return "original";
  // «Картридж для Pantum TL-5120» — the brand only as a target device is the
  // usual wording of compatible consumables; an original names its maker.
  if (productBrand && hasWord(title, `для ${productBrand}`) && !hasWord(title.replace(`для ${productBrand}`, ""), productBrand)) {
    return "compatible";
  }
  return "unknown";
}

/** Keep offers that do not contradict the stated intent. */
export function matchesOriginIntent(
  offer: Pick<Offer, "title" | "seller">,
  product: Pick<Product, "brand">,
  intent: OriginIntent | undefined,
): boolean {
  if (!intent) return true;
  const origin = offerOrigin(offer, product);
  return intent === "original" ? origin !== "compatible" : origin !== "original";
}
