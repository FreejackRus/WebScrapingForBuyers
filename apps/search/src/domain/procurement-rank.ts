import { offerAvailabilityStatus, type Offer, type ProductCondition } from "@peremena/contracts";

const AVAILABILITY = { in_stock: 0, unknown: 1, on_order: 2, out_of_stock: 3 } as const;
/** The requested model first: exact/probable, then analogues, then doubtful cards. */
const MATCH: Record<Offer["match"], number> = { exact: 0, probable: 0, analog: 1, doubtful: 2 };
const USED_IN_TITLE = /(?:^|[^\p{L}])(?:б\s*[\/.\\-]?\s*у|бывш[а-яё]*\s+в\s+употреб[а-яё]*)(?=$|[^\p{L}])/iu;
const CONDITION: Record<ProductCondition, number> = {
  new: 0,
  unknown: 1,
  display: 2,
  used: 3,
  refurbished: 4,
};

function packaging(title: string): number {
  if (/\bOEM\b/i.test(title)) return 0;
  if (/\bBOX\b/i.test(title)) return 1;
  return 2;
}

export function normalizeOfferCondition(offer: Offer): ProductCondition {
  const title = offer.title.toLocaleLowerCase("ru");
  if (USED_IN_TITLE.test(title)) return "used";
  if (/refurb|восстанов/i.test(title)) return "refurbished";
  if (/витрин|демо[- ]?образ/i.test(title)) return "display";
  if (offer.condition !== "new") return offer.condition;
  // NETLAB's price list and Avito listings do not state the condition; Avito is mostly private resale.
  // Only an explicit «новый / new / запечатан» in the title makes an Avito row new.
  const source = offer.source.toLocaleUpperCase("ru");
  if (source === "АВИТО") return /(?:^|[^\p{L}])(?:нов(?:ый|ая|ое|ые|ых)|new|запечатан\p{L}*|в упаковке)(?=$|[^\p{L}])/iu.test(title) ? "new" : "unknown";
  return source === "NETLAB" ? "unknown" : "new";
}

function compare(left: Offer, right: Offer): number {
  const leftExcluded = Number(left.demo || left.priceAnomaly === "too_low" || left.assessment?.group === "needs_review");
  const rightExcluded = Number(right.demo || right.priceAnomaly === "too_low" || right.assessment?.group === "needs_review");
  return leftExcluded - rightExcluded
    || Number(left.demo) - Number(right.demo)
    || MATCH[left.match] - MATCH[right.match]
    || AVAILABILITY[offerAvailabilityStatus(left)] - AVAILABILITY[offerAvailabilityStatus(right)]
    || CONDITION[left.condition] - CONDITION[right.condition]
    || packaging(left.title) - packaging(right.title)
    || left.price - right.price
    || left.id.localeCompare(right.id, "ru");
}

export function assignProcurementRanks(offers: Offer[]): void {
  for (const offer of offers) offer.condition = normalizeOfferCondition(offer);
  [...offers].sort(compare).forEach((offer, index) => { offer.procurementRank = index + 1; });
}
