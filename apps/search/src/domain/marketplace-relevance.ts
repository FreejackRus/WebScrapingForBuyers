import type { Product } from "@peremena/contracts";

/**
 * Decides whether a marketplace listing is the product the buyer asked for.
 *
 * Pure domain logic: titles, MPNs, brands and categories in, a verdict out. It knows
 * nothing about MCP, connectors or HTTP, which is why it lives here and not next to
 * the marketplace transport.
 */

const GENERIC_PRODUCT_TOKENS = new Set([
  "black",
  "white",
  "grey",
  "gray",
  "graphite",
  "and",
  "the",
  "для",
  "мышь",
  "мыши",
  "клавиатура",
  "клавиатуры",
  "проводная",
  "беспроводная",
  "чёрный",
  "черный",
  "белый",
  "серый",
  // Marketing suffixes: "Pro" matches Roborock Q8 Max Pro on a Legion Pro 5 query.
  "pro",
  "plus",
  "max",
  "ultra",
  "mini",
  "lite",
  "air",
  "gen",
  "gen2",
  "new",
  "wifi",
  "rgb",
  "usb",
]);

export type OfferRelevance = { kind: "drop" } | { kind: "weak"; rejectUrl?: boolean } | { kind: "strong"; rejectUrl?: boolean };

function tokenizeProduct(value: string): string[] {
  return value.toLocaleLowerCase("ru").match(/[a-zа-яё0-9]+/giu) ?? [];
}

function isIdentityToken(token: string): boolean {
  if (GENERIC_PRODUCT_TOKENS.has(token)) return false;
  return token.length >= 2;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenIn(haystack: string, token: string): boolean {
  if (!token) return false;
  return new RegExp(`(?:^|[^a-zа-яё0-9])${escapeRegExp(token)}(?:$|[^a-zа-яё0-9])`, "iu").test(haystack);
}

function compactAlnum(value: string): string {
  return value.toLocaleLowerCase("ru").replace(/[^a-zа-яё0-9]+/giu, "");
}

/** Fold Cyrillic lookalikes used in WB titles (К380 / к-380) onto Latin SKUs. */
function compactIdentity(value: string): string {
  return compactAlnum(value).replaceAll("к", "k");
}

/** Word-boundary first. Model SKUs (k380, g102) also match k-380 / k380s / К 380. Short tokens like 3s stay strict so SNV3S does not hit. */
function identityTokenIn(haystack: string, token: string): boolean {
  if (tokenIn(haystack, token)) return true;
  const compactTok = compactIdentity(token);
  if (compactTok.length >= 4 && /\d/.test(compactTok)) {
    return compactIdentity(haystack).includes(compactTok);
  }
  return false;
}

export function tokensIn(haystack: string, tokens: string[]): string[] {
  return tokens.filter((token) => identityTokenIn(haystack, token));
}

const FOREIGN_CATEGORY_MARKERS = [
  "ssd",
  "nvme",
  "накопитель",
  "холодильник",
  "holodilnik",
  "стиральн",
  "телевизор",
  "смартфон",
  "indesit",
  "кофе",
  "coffee",
  "бад",
  "витамин",
  "носк",
  "socks",
  "кроссов",
  "sneaker",
  "кеды",
  "обувь",
  "корм",
  "кошк",
  "котят",
  "коврик",
  "футболк",
  "трусы",
  "колгот",
  "хобби",
  "творчеств",
  "jersey",
  "jersy",
  "подгузник",
  "салфетк",
  "кресло",
  "рыбалк",
  "аргинин",
  "аминокислот",
  "наматрас",
  "пюре",
  "перчатк",
  "удобрен",
  "аэрогрил",
  "полотенц",
  "батончик",
  "пылесос",
  "пылесборник",
  "планшет",
  "проектор",
  "сканер",
  "графическ",
];

export function categorySelfTokens(product: Product): string[] {
  const tokens = new Set<string>();
  const category = product.category.trim().toLocaleLowerCase("ru");
  if (category.includes("мыш")) {
    tokens.add("мышь");
    tokens.add("мыши");
    tokens.add("mouse");
  }
  if (category.includes("клавиатур")) {
    tokens.add("клавиатур");
    tokens.add("keyboard");
  }
  if (category.includes("ноутбук")) {
    tokens.add("ноутбук");
    tokens.add("laptop");
    tokens.add("notebook");
  }
  for (const token of tokenizeProduct(product.name)) {
    if (token === "мышь" || token === "мыши" || token === "mouse") tokens.add(token);
    if (token.startsWith("клавиатур") || token === "keyboard") tokens.add(token);
  }
  return [...tokens];
}

export function hasSelfCategory(product: Product, hay: string): boolean {
  return categorySelfTokens(product).some((token) => tokenIn(hay, token) || (token.length >= 6 && hay.includes(token)));
}

function hasForeignCategoryMarker(hay: string): boolean {
  return FOREIGN_CATEGORY_MARKERS.some((marker) =>
    marker.length >= 4 ? hay.includes(marker) : tokenIn(hay, marker),
  );
}

function hasForeignCategoryClash(product: Product, hay: string): boolean {
  if (categorySelfTokens(product).length === 0) return false;
  if (!hasForeignCategoryMarker(hay)) return false;
  return !hasSelfCategory(product, hay);
}

function oppositeCategoryMarkers(product: Product): string[] {
  const category = `${product.category} ${product.name}`.toLocaleLowerCase("ru");
  if (category.includes("клавиатур") || category.includes("keyboard")) {
    return ["мышь", "мыши", "мышка", "mouse"];
  }
  if (category.includes("мыш") || category.includes("mouse")) {
    return ["клавиатур", "keyboard"];
  }
  return [];
}

function hasOppositeCategory(product: Product, hay: string): boolean {
  if (hasSelfCategory(product, hay)) return false;
  return oppositeCategoryMarkers(product).some(
    (marker) => tokenIn(hay, marker) || (marker.length >= 6 && hay.includes(marker)),
  );
}

function brandIdentityTokens(product: Product): string[] {
  const tokens = new Set<string>();
  for (const token of tokenizeProduct(product.brand)) {
    if (!isIdentityToken(token)) continue;
    tokens.add(token);
    if (token === "logitech") {
      tokens.add("логитек");
      tokens.add("логитеч");
    }
  }
  return [...tokens];
}

function productModelStems(product: Product): string[] {
  const stems = new Set<string>();
  for (const token of [...tokenizeProduct(product.model), ...tokenizeProduct(product.name)]) {
    const compact = compactIdentity(token);
    if (compact.length >= 3 && /\d/.test(compact)) stems.add(compact);
  }
  return [...stems];
}

/** "pro 5" → pro5. Used only to drop rival SKUs, not to widen family cards. */
function productPhraseStems(product: Product): string[] {
  const stems = new Set<string>();
  const tokens = [...tokenizeProduct(product.model), ...tokenizeProduct(product.name)];
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const word = compactIdentity(tokens[index]!);
    const digits = compactIdentity(tokens[index + 1]!);
    if (/^[a-zа-яё]{1,8}$/.test(word) && /^\d{1,4}[a-z]?$/.test(digits)) {
      stems.add(`${word}${digits}`);
    }
  }
  return [...stems];
}

function skuStemsIn(hay: string): string[] {
  const stems = new Set<string>();
  const tokens = tokenizeProduct(hay);
  for (const token of tokens) {
    const compact = compactIdentity(token);
    if (/^[a-z]{1,3}\d{2,4}[a-z]?$/.test(compact)) stems.add(compact.replace(/s$/, ""));
  }
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const letter = compactIdentity(tokens[index]!);
    const digits = compactIdentity(tokens[index + 1]!);
    if (/^[a-z]{1,3}$/.test(letter) && /^\d{2,4}$/.test(digits)) stems.add(`${letter}${digits}`);
  }
  return [...stems];
}

function hasRivalModelSku(product: Product, hay: string): boolean {
  const ours = [...new Set([...productModelStems(product), ...productPhraseStems(product)])];
  if (ours.length === 0) return false;
  const compactHay = compactIdentity(hay);
  if (ours.some((stem) => compactHay.includes(stem))) return false;
  return skuStemsIn(hay).some(
    (stem) => !ours.some((our) => stem === our || our.startsWith(stem) || stem.startsWith(our)),
  );
}

function missesShortModelQualifier(product: Product, hay: string): boolean {
  return tokenizeProduct(product.model)
    .filter((token) => token.length === 2 && /^[a-zа-яё]+$/iu.test(token) && !GENERIC_PRODUCT_TOKENS.has(token))
    .some((token) => !identityTokenIn(hay, token));
}

const ACCESSORY_PREFIX =
  /чех(?:ол|л)|наклейк|коннектор|зарядк|док-?станц|подставк|сумк|кабел|адаптер|защитн|стекл|пл[её]нк|\bcase\b|\bcover\b|\bskin\b|\bdock\b|\bcable\b|\badapter\b/iu;

function hasAccessoryPrefixClash(product: Product, hay: string): boolean {
  const category = product.category.toLocaleLowerCase("ru");
  if (category.includes("аксессуар") || category.includes("кабел") || category.includes("док-станц")) {
    return false;
  }
  const accessory = ACCESSORY_PREFIX.exec(hay);
  if (!accessory || accessory.index === undefined) return false;
  const modelPositions = tokenizeProduct(product.model)
    .filter((token) => isIdentityToken(token))
    .map((token) => hay.search(new RegExp(`(?:^|[^a-zа-яё0-9])${escapeRegExp(token)}(?:$|[^a-zа-яё0-9])`, "iu")))
    .filter((index) => index >= 0);
  if (modelPositions.length === 0) return false;
  return accessory.index < Math.min(...modelPositions);
}

/** Brand + own category, no rival SKU (K120 vs K380) and no coffee/mice swap.
 * Compact SKUs (k380, g102) may omit the token on WB. Phrase models (MX Master 3S)
 * still need mx/master/3s — «Мышь Logitech» is not that mouse. */
function isProductFamilyCard(product: Product, hay: string): boolean {
  if (!productModelStems(product).some((stem) => stem.length >= 4)) return false;
  if (!hasSelfCategory(product, hay)) return false;
  if (hasForeignCategoryMarker(hay) || hasOppositeCategory(product, hay)) return false;
  if (hasRivalModelSku(product, hay)) return false;
  return brandIdentityTokens(product).some((token) => identityTokenIn(hay, token));
}

export function productIdentityTokens(product: Product): { strong: string[]; weak: string[] } {
  const strong = new Set<string>();
  const weak = new Set<string>();
  for (const token of tokenizeProduct(product.model)) {
    if (isIdentityToken(token)) strong.add(token);
  }
  // Digit tokens from the current title (k380), not leftover mouse SKUs.
  for (const token of tokenizeProduct(product.name)) {
    if (isIdentityToken(token) && /\d/.test(token)) strong.add(token);
  }
  const mpn = product.mpn.trim().toLocaleLowerCase("ru");
  if (mpn.length >= 3) {
    strong.add(mpn);
    const compact = compactAlnum(mpn);
    if (compact.length >= 3) strong.add(compact);
    for (const token of tokenizeProduct(mpn)) {
      if (token.length >= 5) strong.add(token);
    }
  }
  for (const token of brandIdentityTokens(product)) {
    weak.add(token);
  }
  return { strong: [...strong], weak: [...weak] };
}

/**
 * MCP scrapers (Citilink especially) may return homepage/promo cards when
 * search HTML is stale or blocked. Drop a different category (SSD, fridge,
 * coffee, socks, hobby, feed) for a mouse query. Token overlap uses word
 * boundaries so "3s" does not keep Kingston SNV3S. WB catalog URLs never
 * carry G102/MPN — do not drop a priced WB card just because the path is
 * /catalog/<id>. Strong tokens come from the selected product (k380, mx,
 * master, 3s, g102, MPN) — never a leftover mouse list. Brand + own
 * category (Logitech + клавиатура) is the same family even without a
 * literal k380 — WB titles are often «клавиатура logitech», «K 380»,
 * «К380s». Rival SKUs (K120) and coffee/mice still drop. Graphite vs
 * Pale Grey MX Master 3S is the same model — keep it.
 */
export function assessMarketplaceOfferRelevance(
  title: string,
  offerMpn: string | undefined,
  explicitUrl: string | undefined,
  product: Product,
  kind?: string,
  offerBrand?: string,
  offerSeller?: string,
): OfferRelevance {
  const { strong, weak } = productIdentityTokens(product);
  const titleHay = `${title} ${offerMpn ?? ""} ${offerBrand ?? ""}`.toLocaleLowerCase("ru");
  const urlHay = (explicitUrl ?? "").toLocaleLowerCase("ru");
  const sellerHay = (offerSeller ?? "").toLocaleLowerCase("ru");
  const identityHay = `${titleHay} ${urlHay}`;
  const categoryHay = `${identityHay} ${sellerHay}`;
  const strongHits = tokensIn(identityHay, strong);
  const weakHits = tokensIn(identityHay, weak);
  const familyCard = isProductFamilyCard(product, titleHay);
  if (missesShortModelQualifier(product, identityHay)) return { kind: "drop" };
  if (hasAccessoryPrefixClash(product, titleHay)) return { kind: "drop" };
  if (hasOppositeCategory(product, identityHay) && strongHits.length === 0) return { kind: "drop" };
  if (hasForeignCategoryMarker(categoryHay) && strongHits.length === 0) return { kind: "drop" };
  if (hasForeignCategoryClash(product, identityHay)) return { kind: "drop" };
  if (hasRivalModelSku(product, titleHay)) return { kind: "drop" };

  if (strongHits.length === 0 && weakHits.length === 0 && !familyCard) {
    if (kind === "wb" && strong.length === 0 && hasSelfCategory(product, titleHay)) return { kind: "weak" };
    return { kind: "drop" };
  }
  if (strongHits.length === 0 && strong.length > 0 && !familyCard) return { kind: "drop" };

  const productPage = /\/product\/|\/catalog\/\d+|\/tovary\//i.test(urlHay);
  const urlHasIdentity = tokensIn(urlHay, [...strong, ...weak]).length > 0;
  if (kind !== "wb" && productPage && !urlHasIdentity) {
    const titleStrong = tokensIn(titleHay, strong);
    const titleWeak = tokensIn(titleHay, weak);
    const sameCategory = hasSelfCategory(product, titleHay);
    if (titleStrong.length === 0 && !sameCategory && !familyCard) return { kind: "drop" };
    if (titleStrong.length === 0 && titleWeak.length === 0 && !familyCard) return { kind: "drop" };
    if (titleStrong.length === 0 && strong.length > 0 && !familyCard) return { kind: "drop" };
    return { kind: titleStrong.length > 0 ? "strong" : "weak", rejectUrl: true };
  }

  if (strongHits.length === 0) return { kind: "weak" };
  return { kind: "strong" };
}
