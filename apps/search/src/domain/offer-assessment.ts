import type { Offer, Product } from "@peremena/contracts";

import { isUnrequestedConsumablePart } from "./consumable-parts.js";
import { brandsIn, canonicalBrand } from "./product-from-query.js";

type Assessment = NonNullable<Offer["assessment"]>;

const ORIGINAL = /(?:^|[^\p{L}])(?:оригинал\p{L}*|original|genuine|oem)(?=$|[^\p{L}])/iu;
const COMPATIBLE = /(?:^|[^\p{L}])(?:не\s*оригинал\p{L}*|неоригинал\p{L}*|совместим\p{L}*|аналог\p{L}*|compatible|replacement)(?=$|[^\p{L}])/iu;
const DEVICE_PART = /(?:^|[^\p{L}])(?:плата|форматер|печатающ\p{L}*\s+головк\p{L}*|ролик|шлейф|узел|запчаст\p{L}*|spare\s+part)(?=$|[^\p{L}])/iu;
/**
 * Parts and add-ons sold for a device: «Радиатор для видеокарты RTX 4070 Super», «Кулер для процессора»,
 * «Блок питания для ноутбука». They name the model, but the buyer asked for the device itself.
 */
const ACCESSORY = /(?:^|[^\p{L}])(?:радиатор\p{L}*|кулер\p{L}*|вентилятор\p{L}*|система\s+охлажден\p{L}*|водоблок\p{L}*|термопрокладк\p{L}*|термопаст\p{L}*|бэкплейт\p{L}*|backplate|кронштейн\p{L}*|держател\p{L}*|подставк\p{L}*|блок\p{L}*\s+питани\p{L}*|зарядн\p{L}*|аккумулятор\p{L}*|батаре\p{L}*|чех(?:ол|л)\p{L}*|плёнк\p{L}*|пленк\p{L}*|защитн\p{L}*\s+стекл\p{L}*|райзер\p{L}*|riser|коробк\p{L}*\s+(?:от|для)|box\s+only)(?=$|[^\p{L}])/iu;
const FOR_DEVICE = /(?:^|[^\p{L}])для\s+(?:видеокарт\p{L}*|процессор\p{L}*|ноутбук\p{L}*|консол\p{L}*|ибп|сервер\p{L}*|монитор\p{L}*|роутер\p{L}*|маршрутизатор\p{L}*|коммутатор\p{L}*)(?=$|[^\p{L}])/iu;

/** Accessories are named first («Радиатор для …»); a device listing may mention one later («ИБП …, с аккумулятором»). */
function isAccessoryFor(title: string, query: string): boolean {
  const head = title.split(/\s+/).slice(0, 3).join(" ");
  return (ACCESSORY.test(head) && !ACCESSORY.test(query)) || (FOR_DEVICE.test(title) && !FOR_DEVICE.test(query) && !/(?:^|\s)для(?=\s|$)/iu.test(query));
}

const INTERFACES: ReadonlyArray<[string, RegExp]> = [
  ["hdmi", /hdmi/iu], ["dvi", /(?<![a-z])dvi/iu], ["vga", /(?<![a-z])(?:vga|d-sub)/iu],
  ["displayport", /displayport|(?<![a-z])(?:mini[\s-]?)?dp(?![a-z])/iu], ["usb-c", /type[\s-]?c|usb[\s-]?c(?![a-z])/iu],
];

function interfaces(text: string): Set<string> {
  return new Set(INTERFACES.filter(([, pattern]) => pattern.test(text)).map(([name]) => name));
}

const DRUM_UNIT = /(?:^|[^\p{L}])(?:фотовал\p{L}*|фотобарабан\p{L}*|драм[\s-]?картридж\p{L}*|drum|opc|блок\s+фотобарабан\p{L}*)(?=$|[^\p{L}])/iu;
const THIRD_PARTY_BRANDS = /(?:^|[^\p{L}\p{N}])(?:nv[\s-]?print|hi[\s-]?black|cactus|sakura|easyprint|netproduct|colortek|katun|bion|parus|uniton|profiline|t2|static\s+control|qualicom|xiongcai|colouring|ink-?power)(?=$|[^\p{L}\p{N}])/iu;

function compact(value: string): string {
  return value.toLocaleLowerCase("ru").replace(/[^a-zа-яё0-9]+/giu, "");
}

function articles(value: string): string[] {
  return value.match(/\b[A-ZА-ЯЁ]{1,8}-?\d{2,}[A-ZА-ЯЁ0-9-]*\b/giu)?.map(compact) ?? [];
}

function identityIn(haystack: string, expected: string): boolean {
  const parts = expected.toLocaleLowerCase("ru").match(/[a-zа-яё0-9]+/giu) ?? [];
  if (parts.length === 0) return false;
  const body = parts.map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[^a-zа-яё0-9]*");
  return new RegExp(`(?:^|[^a-zа-яё0-9])${body}(?=$|[^a-zа-яё0-9])`, "iu").test(haystack);
}

/**
 * Multi-word models are written in any order in listings: «DDR5 Fury» ↔ «FURY Beast DDR5»,
 * «Back-UPS 650» ↔ «Back-UPS 650VA». Every word must be present; a bare number may carry a unit.
 */
function tokensIn(haystack: string, expected: string): boolean {
  const words = expected.toLocaleLowerCase("ru").match(/[a-zа-яё0-9]+/giu) ?? [];
  if (words.length < 2) return false;
  const hay = haystack.toLocaleLowerCase("ru");
  return words.every((word) => {
    const unit = /^\d+$/.test(word) ? "(?:va|ва|w|вт)?" : "";
    return new RegExp(`(?:^|[^a-zа-яё0-9])${word}${unit}(?=$|[^a-zа-яё0-9])`, "iu").test(hay);
  });
}

/**
 * The model inside a maker article: Kingston «SKC3000S/1024G» is a KC3000. Exactly one letter precedes it and only
 * letters may follow, so «G102» never matches the switch «SG1024».
 */
function modelInArticle(haystack: string, model: string): boolean {
  const compactModel = compact(model);
  if (compactModel.length < 5 || !/\d/.test(compactModel) || !/[a-z]/.test(compactModel)) return false;
  return (haystack.toLocaleLowerCase("ru").match(/[a-z0-9]+/g) ?? []).some((token) => {
    const at = token.indexOf(compactModel);
    // A maker prefix is required: a bare suffix is a sibling model («TL-5120X» is not «TL-5120»).
    if (at !== 1) return false;
    return /^[a-z]{0,3}$/.test(token.slice(at + compactModel.length));
  });
}

function matchedIdentity(product: Product, title: string): "article" | "model" | undefined {
  const mpn = compact(product.mpn);
  const model = compact(product.model);
  const expected = mpn && identityIn(title, product.mpn)
    ? mpn
    : model && (identityIn(title, product.model) || tokensIn(title, product.model) || modelInArticle(title, product.model))
      ? model
      : "";
  if (!expected) return undefined;
  const expectedDigits = expected.replace(/\D/g, "");
  // «SKC3000S» is the KC3000 itself (maker prefix/suffix), not a sibling model.
  const ownArticle = (article: string) => new RegExp(`^[a-z]${expected.replace(/[^a-z0-9]/g, "")}[a-z]{0,3}$`).test(article);
  const rivals = articles(title).filter((article) => article !== expected && !expected.includes(article) && !ownArticle(article));
  // A different article with the same digits is a sibling model («TL-5120X» vs «TL-5120»). Multi-word models
  // («Back-UPS 650») are not articles themselves, so the listing's own article («BX650MI») is no rival.
  const multiWordModel = expected !== mpn && (product.model.match(/[a-zа-яё0-9]+/giu)?.length ?? 0) > 1;
  if (!multiWordModel && rivals.some((article) => expectedDigits && article.replace(/\D/g, "") === expectedDigits)) return undefined;
  return expected === mpn ? "article" : "model";
}

const PRINTER_BRANDS = "pantum|hp|canon|kyocera|xerox|brother|ricoh|samsung|epson|lexmark|konica|minolta|sharp|oki|katusha|катюша";

/**
 * «Тонер-картридж TL-5120 для Pantum BP5100» — the maker named only as the target printer is how
 * compatible consumables are worded; an original names its maker before «для» («Картридж Pantum TL-5120 для BP5100»).
 */
function brandOnlyAsTarget(title: string): boolean {
  const lower = title.toLocaleLowerCase("ru");
  const target = new RegExp(`(?:^|\\s)для\\s+(?:принтер\\p{L}*\\s+|мфу\\s+)?(${PRINTER_BRANDS})(?=$|[^\\p{L}])`, "iu").exec(lower);
  if (!target || target.index === undefined) return false;
  const before = lower.slice(0, target.index);
  return !new RegExp(`(?:^|[^\\p{L}])(?:${PRINTER_BRANDS})(?=$|[^\\p{L}])`, "iu").test(before);
}

function originInTitle(title: string): "original" | "compatible" | "unknown" {
  if (COMPATIBLE.test(title)) return "compatible";
  if (THIRD_PARTY_BRANDS.test(title)) return "compatible";
  if (ORIGINAL.test(title)) return "original";
  if (brandOnlyAsTarget(title)) return "compatible";
  return "unknown";
}

/** «N-TL-5120», «CS-TL-5120»: a third-party maker prefixes the original article with its own code. */
function prefixedArticle(product: Product, title: string): boolean {
  const parts = product.mpn.toLocaleLowerCase("ru").match(/[a-zа-яё0-9]+/giu) ?? [];
  if (parts.length === 0) return false;
  const body = parts.map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[^a-zа-яё0-9]*");
  return new RegExp(`(?:^|[^a-zа-яё0-9-])[a-z]{1,4}-${body}(?=$|[^a-zа-яё0-9])`, "iu").test(title);
}

function requestedOrigin(query: string): "original" | "compatible" | undefined {
  if (COMPATIBLE.test(query)) return "compatible";
  if (ORIGINAL.test(query)) return "original";
  return undefined;
}

function capacities(value: string): number[] {
  const kits = [...value.matchAll(/(\d+)\s*[xх×]\s*(\d+(?:[.,]\d+)?)\s*(тб|tb|гб|gb)(?=$|[^\p{L}])/giu)];
  if (kits.length > 0) {
    return kits.map((match) => {
      const total = Number(match[1]) * Number(match[2]!.replace(",", "."));
      return /тб|tb/iu.test(match[3]!) ? total * 1024 : total;
    });
  }
  const result: number[] = [];
  for (const match of value.matchAll(/(\d+(?:[.,]\d+)?)\s*(тб|tb|гб|gb)(?=$|[^\p{L}])/giu)) {
    const amount = Number(match[1]!.replace(",", "."));
    result.push(/тб|tb/iu.test(match[2]!) ? amount * 1024 : amount);
  }
  return result;
}

function kitQuantity(value: string): number | undefined {
  const match = value.match(/(\d+)\s*[xх×]\s*\d+(?:[.,]\d+)?\s*(?:тб|tb|гб|gb)(?=$|[^\p{L}])/iu);
  return match ? Number(match[1]) : undefined;
}

function requestedPack(value: string): number | undefined {
  const match = value.match(/(?:упаковк\p{L}*|комплект\p{L}*)?\s*(\d+)\s*(?:шт\.?|штук)(?=$|[^\p{L}])/iu);
  return match ? Number(match[1]) : undefined;
}

function pageYield(value: string): number | undefined {
  const match = value.match(/(\d+(?:[\s\u00a0]\d{3})*)\s*(?:страниц\p{L}*|pages?)(?=$|[^\p{L}])/iu);
  return match ? Number(match[1]!.replace(/\s/g, "")) : undefined;
}

function assessConditions(query: string, fallback: string, title: string, reasons: string[]): "match" | "review" | "reject" {
  let state: "match" | "review" = "match";
  const wantedCapacity = capacities(query).length > 0 ? capacities(query) : capacities(fallback);
  if (wantedCapacity.length > 0) {
    const offeredCapacity = capacities(title);
    if (offeredCapacity.length === 0) {
      reasons.push("Объём не указан");
      state = "review";
    } else if (wantedCapacity.some((value) => !offeredCapacity.includes(value))) {
      return "reject";
    } else {
      reasons.push("Объём совпадает");
    }
  }
  const wantedPack = kitQuantity(query) ?? requestedPack(query) ?? kitQuantity(fallback) ?? requestedPack(fallback);
  if (wantedPack !== undefined) {
    const offeredPack = kitQuantity(title) ?? requestedPack(title);
    if (offeredPack === undefined) {
      reasons.push("Количество в комплекте не указано");
      state = "review";
    } else if (offeredPack !== wantedPack) {
      return "reject";
    } else {
      reasons.push("Количество в комплекте совпадает");
    }
  }
  const wantedYield = pageYield(query) ?? pageYield(fallback);
  if (wantedYield !== undefined) {
    const offeredYield = pageYield(title);
    if (offeredYield === undefined) {
      reasons.push("Ресурс не указан");
      state = "review";
    } else if (offeredYield !== wantedYield) {
      return "reject";
    } else {
      reasons.push("Ресурс совпадает");
    }
  }
  return state;
}

function selectedFacts(product: Product): string {
  const characteristics = Object.entries(product.characteristics ?? {})
    .map(([name, value]) => `${name} ${String(value)}`)
    .join(" ");
  return `${product.name} ${characteristics}`;
}

/** Conservatively classifies a row using product facts only; shop/seller names are never manufacturer evidence. */
export function assessOffer(product: Product, offer: Offer, query: string): Offer | null {
  const identity = matchedIdentity(product, `${offer.title} ${offer.mpn ?? ""}`);
  if (!identity) return null;
  // An exact article is the buyer's own choice of part: «302N494021» is a developer unit by design.
  const forIndex = offer.title.search(/(?:^|\s)для\s/iu);
  const partForDevice = forIndex >= 0 && identityIn(offer.title.slice(forIndex), product.mpn);
  if (isAccessoryFor(offer.title, query) && identity !== "article") return null;
  if ((identity !== "article" || partForDevice) && ((DEVICE_PART.test(offer.title) && !DEVICE_PART.test(query)) || isUnrequestedConsumablePart(offer, query))) return null;

  // Another maker's product that merely shares the number: «D-Link DEM-CB50/M240» for «Logitech M240».
  const wantedBrand = canonicalBrand(product.brand);
  if (wantedBrand) {
    const named = brandsIn(offer.title);
    if (named.size > 0 && !named.has(wantedBrand)) return null;
  }
  // A drum unit is not the cartridge the buyer asked for.
  const head = offer.title.split(/\s+/).slice(0, 3).join(" ");
  if (DRUM_UNIT.test(head) && !DRUM_UNIT.test(query)) return null;

  // «Кабель HDMI» is not an HDMI–DVI adapter: every interface in the title must be one the buyer named.
  if (product.category === "Кабели и адаптеры") {
    const asked = interfaces(query);
    if (asked.size > 0 && [...interfaces(offer.title)].some((name) => !asked.has(name))) return null;
  }

  const reasons = [identity === "article" ? "Артикул совпадает" : "Модель совпадает"];
  let group: Assessment["group"] = "match";
  if (product.category === "Процессоры") {
    if (/(?:^|[\s,;])(?:пк|компьютер[а-яё]*|системн[а-яё]*\s+блок)(?=[\s,;:.!–—-]|$)/iu.test(offer.title.replace(/(?:^|\s)для\s+(?:пк|компьютер[а-яё]*)/giu, ""))) {
      group = "needs_review";
      reasons.push("В карточке готовый компьютер, а не отдельный процессор");
    }
    const cpuModels = new Set(Array.from(offer.title.matchAll(/(?<![a-z0-9])(?:i[3579][- ]*(1\d{4}(?:tef|te|kf|ks|k|f|t)?)|(1\d{4}(?:tef|te|kf|ks|k|f|t)))(?![a-z0-9])/gi), (match) => (match[1] ?? match[2])!.toUpperCase()));
    if (cpuModels.size > 1) {
      group = "needs_review";
      reasons.push("В карточке несколько моделей процессоров; цена выбранной модели не подтверждена");
    }
  }
  const wantedOrigin = requestedOrigin(query);
  const offeredOrigin = prefixedArticle(product, offer.title) ? "compatible" : originInTitle(offer.title);
  if (wantedOrigin && offeredOrigin !== "unknown" && wantedOrigin !== offeredOrigin) return null;
  if (wantedOrigin === "original") {
    if (offeredOrigin === "original") {
      reasons.push("Продавец указывает оригинальность; подлинность не проверена");
    } else {
      reasons.push("Оригинальность не указана");
      group = "needs_review";
    }
  } else if (wantedOrigin === "compatible" && offeredOrigin === "compatible") {
    reasons.push("Совместимость указана продавцом");
  }

  const conditions = assessConditions(query, selectedFacts(product), offer.title, reasons);
  if (conditions === "reject") return null;
  if (conditions === "review") group = "needs_review";
  return { ...offer, assessment: { group, reasons } };
}
