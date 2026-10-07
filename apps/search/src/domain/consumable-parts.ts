import type { Offer } from "@peremena/contracts";

/**
 * Parts of a printer consumable that marketplaces return for the cartridge's
 * part number: «Чип для картриджа Pantum TL-5120», «Тонер для TL-5120»…
 * A row whose title starts with such a part is a different product unless the
 * buyer asked for that part. Deterministic word list, no LLM.
 */
const PART_WORDS: ReadonlyArray<{ id: string; title: RegExp; query: RegExp }> = [
  { id: "chip", title: /^чип\p{L}*|^chip\b/iu, query: /(?:^|[^\p{L}])(?:чип\p{L}*|chip)(?=$|[^\p{L}])/iu },
  { id: "toner", title: /^тонер(?!-?картридж)\p{L}*|^toner(?!\s*cartridge)\b/iu, query: /(?:^|[^\p{L}])тонер(?!-?картридж)\p{L}*(?=$|[^\p{L}])|(?:^|[^\p{L}])toner(?!\s*cartridge)(?=$|[^\p{L}])/iu },
  { id: "drum", title: /^(?:фотобарабан|барабан|drum\b)/iu, query: /(?:^|[^\p{L}])(?:фотобарабан\p{L}*|барабан\p{L}*|драм\p{L}*|drum)(?=$|[^\p{L}])/iu },
  { id: "blade", title: /^(?:ракел\p{L}*|дозирующ\p{L}*\s+лезви|wiper\s+blade)/iu, query: /(?:^|[^\p{L}])(?:ракел\p{L}*|лезви\p{L}*|blade)(?=$|[^\p{L}])/iu },
  { id: "roller", title: /^(?:вал\b|ролик\p{L}*|резинов\p{L}*\s+вал|магнитн\p{L}*\s+вал|roller\b)/iu, query: /(?:^|[^\p{L}])(?:вал\p{L}*|ролик\p{L}*|roller)(?=$|[^\p{L}])/iu },
  { id: "refill", title: /^(?:заправ\p{L}*|refill\b)/iu, query: /(?:^|[^\p{L}])(?:заправ\p{L}*|refill)(?=$|[^\p{L}])/iu },
];

function leadingTitle(title: string): string {
  // Skip leading quotes/brackets and a marketplace badge like «Новинка!».
  return title.replace(/^[\s"'«(\[]+/u, "").trim();
}

/** True when the offer is a cartridge part the buyer did not ask for. */
export function isUnrequestedConsumablePart(offer: Pick<Offer, "title">, query: string): boolean {
  const title = leadingTitle(offer.title);
  const part = PART_WORDS.find((entry) => entry.title.test(title));
  if (!part) return false;
  return !part.query.test(query);
}
