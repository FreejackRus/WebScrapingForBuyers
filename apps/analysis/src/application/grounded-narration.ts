import { offerAvailabilityStatus, type Offer } from "@peremena/contracts";

const NEUTRAL_SENTENCES = [
  "Сравните предложения в таблице.",
  "Откройте карточку товара для уточнения условий.",
  "Уточните условия у продавца перед покупкой.",
  "Цена и наличие приведены по данным поставщика.",
  "Это заявленные сведения поставщика, а не проверка фактического остатка.",
];
const normalize = (text: string) => text.normalize("NFKC").replace(/\s+/gu, " ").trim();

/** Extractive, source-attributed statements; no inference about BOX, warranty or physical stock. */
export function groundedOfferFacts(offers: Offer[]): string[] {
  return offers.flatMap((offer) => [
    `${offer.source}: ${offer.title} — ${offer.price.toLocaleString("ru-RU")} ₽.`,
    `${offer.title}: заявленное наличие — ${offer.availability || "не указано"}.`,
    `${offer.title}: гарантия по карточке — ${offer.warranty || "не указана"}.`,
  ]);
}

function isExtractive(summary: string, cited: Offer[]): boolean {
  const sentences = [...NEUTRAL_SENTENCES, ...groundedOfferFacts(cited)].map(normalize).sort((a, b) => b.length - a.length);
  let remaining = normalize(summary);
  while (remaining) {
    const sentence = sentences.find((candidate) => remaining === candidate || remaining.startsWith(`${candidate} `));
    if (!sentence) return false;
    remaining = remaining.slice(sentence.length).trim();
  }
  return true;
}

/**
 * Shops and distributors by every spelling a manager or a model uses («WB», «Озон»).
 * Naming one that no cited row comes from is a made-up fact.
 */
const SOURCE_ALIASES = [
  ["wildberries", "вайлдберриз", "wb", "вб"], ["ozon", "озон"], ["авито", "avito"], ["aliexpress", "алиэкспресс"],
  ["яндекс"], ["ситилинк", "citilink"], ["dns", "днс"], ["мегамаркет"], ["netlab", "нетлаб"], ["ocs"],
  ["merlion", "мерлион"], ["treolan", "треолан"], ["servermall"], ["срвтрейд"], ["онлайнтрейд"], ["регард"],
  ["хардпрайс"], ["м.видео", "мвидео"], ["эльдорадо"],
];
/** Claims the data never carries: promises, promotions, bundle contents, seller character. */
const UNSUPPORTED_CLAIMS = /привез|доставим|завтра|послезавтра|промокод|кэшбэк|кешбэк|акци[яиюей](?=$|[^\p{L}])|лицензи|входит\s+в\s+комплект|в\s+комплект\S*\s+входит|надёжн|надежн|проверенн|официальн\S*\s+гаранти/iu;
const PRICE = /(\d{1,3}(?:[\s  ]\d{3})+|\d+)(?:[.,]\d{1,2})?\s*(?:₽|руб)/gu;
const PERCENT = /(\d{1,3})(?:[.,]\d)?\s*%/gu;
const COUNT_WORD = /^\s*(?:предлож|вариант|карточ|продав|источник|магазин|позици|строк)/iu;
const NEGATION_BEFORE = /(?:^|[^\p{L}])(?:не|нет|без)\s+(?:\p{L}+\s+)?$/iu;

const digits = (text: string) => text.replace(/[\s  ]/gu, "");
const lower = (text: string) => text.toLocaleLowerCase("ru");
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Article-like words of a title («K380», «12400F», «C13T67324A») that point at that row. */
const titleTokens = (offer: Offer) => (`${offer.title} ${offer.mpn ?? ""}`.match(/[\p{L}\d-]*\d[\p{L}\d-]*/gu) ?? [])
  .filter((token) => token.length >= 3 && /\p{L}/u.test(token)).map(lower);
const rowText = (offer: Offer) => lower([offer.title, offer.mpn, offer.availability, offer.delivery, offer.warranty, offer.priceCondition].filter(Boolean).join(" "));

function pricesOf(offer: Offer): number[] {
  return [offer.price, offer.unitPrice, offer.oldPrice, offer.previousPrice, offer.verification?.listedPrice]
    .filter((value): value is number => typeof value === "number");
}

function sentenceOk(sentence: string, cited: Offer[]): boolean {
  const text = lower(sentence);
  // Which cited rows the sentence speaks about: the shop it names, otherwise an article from the title.
  const byShop = cited.filter((offer) => text.includes(lower(offer.source)) || text.includes(lower(offer.seller)));
  const named = byShop.length > 0 ? byShop : cited.filter((offer) => titleTokens(offer).some((token) => text.includes(token)));
  const prices = named.flatMap(pricesOf);
  const all = cited.flatMap(pricesOf);
  const differences = all.flatMap((left) => all.map((right) => Math.abs(left - right))).filter((value) => value > 0);
  const percents = all.flatMap((left) => all.flatMap((right) => left === right ? [] : [
    Math.round(Math.abs(left - right) / Math.max(left, right) * 100), Math.round(Math.abs(left - right) / Math.min(left, right) * 100),
  ]));

  const justified: Array<[number, number]> = [];
  for (const match of sentence.matchAll(PRICE)) {
    const value = Number(digits(match[1]!));
    if (!prices.includes(value) && !(named.length > 0 && differences.includes(value))) return false;
    justified.push([match.index!, match.index! + match[0].length]);
  }
  for (const match of sentence.matchAll(PERCENT)) {
    const value = Number(match[1]);
    if (!percents.some((percent) => Math.abs(percent - value) <= 1)) return false;
    justified.push([match.index!, match.index! + match[0].length]);
  }
  for (const match of sentence.matchAll(/\d+(?:[.,]\d+)?/gu)) {
    const at = match.index!;
    if (justified.some(([start, end]) => at >= start && at < end)) continue;
    const value = match[0];
    if (cited.some((offer) => rowText(offer).includes(value))) continue;
    // «3 предложения», «из 5 вариантов»: a count no larger than what was shown.
    if (Number(value) <= Math.max(cited.length, 1) && COUNT_WORD.test(sentence.slice(at + value.length))) continue;
    return false;
  }

  for (const aliases of SOURCE_ALIASES) {
    if (!aliases.some((name) => new RegExp(`(?:^|[^\\p{L}])${escape(name)}(?=$|[^\\p{L}])`, "iu").test(text))) continue;
    if (!cited.some((offer) => aliases.some((name) => lower(`${offer.source} ${offer.seller}`).includes(name)))) return false;
  }

  const about = named.length > 0 ? named : cited;
  for (const match of text.matchAll(/в\s+наличии/gu)) {
    if (NEGATION_BEFORE.test(text.slice(Math.max(0, match.index! - 20), match.index!))) continue;
    if (!about.some((offer) => offerAvailabilityStatus(offer) === "in_stock")) return false;
  }
  for (const match of text.matchAll(/(?:^|[^\p{L}])нов(?:ый|ая|ое|ые)(?=$|[^\p{L}])/gu)) {
    if (NEGATION_BEFORE.test(text.slice(Math.max(0, match.index! - 20), match.index! + 1))) continue;
    if (!about.some((offer) => offer.condition === "new")) return false;
  }
  if (/скидк/iu.test(text) && !cited.some((offer) => offer.oldPrice)) return false;
  return true;
}

/**
 * Fail closed, fact by fact (research 2026-10-28 §2.1, approved by the owner the same day).
 * The model writes its own short prose, but every price, number, percentage, shop name,
 * «в наличии» and «новый» must come from the rows it cites in `offerIds`, and a price must sit
 * next to the row it belongs to (shop or article named in the same sentence). Promises the data
 * cannot back (delivery dates, promotions, bundle contents, seller reliability) are refused.
 * A refusal makes the caller answer with the deterministic text. URLs are added by the server.
 */
export function validateGroundedNarration(summary: string, offerIds: string[] | undefined, allowed: Offer[]): boolean {
  if (!summary.trim() || summary.length > 1800 || /(?:https?:|www\.|javascript:|\]\(|<|>)/iu.test(summary)) return false;
  const ids = offerIds ?? [];
  if (ids.length > 20 || new Set(ids).size !== ids.length || ids.some((id) => !allowed.some((offer) => offer.id === id))) return false;
  const cited = allowed.filter((offer) => ids.includes(offer.id));
  if (isExtractive(summary, cited)) return true;
  // Prose with no cited row (standalone chat, warnings) stays on the whitelist: nothing to check it against.
  if (cited.length === 0) return false;
  if (UNSUPPORTED_CLAIMS.test(summary)) return false;
  const sentences = normalize(summary).split(/(?<=[.!?…])\s+|\n+/u).filter(Boolean);
  return sentences.every((sentence) => sentenceOk(sentence, cited));
}
