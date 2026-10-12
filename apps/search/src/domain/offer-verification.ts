import type { Offer, Product } from "@peremena/contracts";

import { assessOffer } from "./offer-assessment.js";

/** What a product card says right now. Missing fields are simply not checked. */
export interface CardFacts {
  title?: string;
  /** Price a company pays (no loyalty-card discount). */
  price?: number;
  available?: boolean;
  /** Flattened characteristics («Модель Dell P2423D; Тип Монитор»). */
  specs?: string;
  /** Short manager-facing remark about the price basis, e.g. «без Ozon Карты». */
  priceBasis?: string;
}

export interface CardVerifier {
  supports(offer: Offer): boolean;
  fetch(offer: Offer, signal?: AbortSignal): Promise<CardFacts | undefined>;
}

/** Below this relative difference the listed price counts as confirmed. */
export const PRICE_TOLERANCE = 0.03;

const money = (value: number) => `${Math.round(value).toLocaleString("ru-RU")} ₽`;

/** Applies a card check to a collected row. Pure: returns a new row. */
export function applyCardFacts(offer: Offer, facts: CardFacts, product: Product, query: string, checkedAt: string): Offer {
  if (facts.available === false) {
    return {
      ...offer,
      availability: "Нет в наличии (проверено на карточке)",
      availabilityStatus: "out_of_stock",
      verification: { status: "unavailable", checkedAt, note: "На карточке товара нет в наличии" },
    };
  }
  const cardText = [facts.title, facts.specs].filter(Boolean).join(" ");
  // The card title alone, or with its characteristics, must still pass the query check.
  const confirmsModel = !facts.title
    || assessOffer(product, { ...offer, title: facts.title }, query) !== null
    || assessOffer(product, { ...offer, title: cardText }, query) !== null;
  if (!confirmsModel) {
    const reasons = [...(offer.assessment?.reasons ?? []), "Карточка товара не подтверждает запрошенную модель"];
    return {
      ...offer,
      assessment: { group: "needs_review", reasons },
      verification: { status: "mismatch", checkedAt, note: "Карточка не подтверждает модель — проверьте вручную" },
    };
  }
  const basis = facts.priceBasis ? ` ${facts.priceBasis}` : "";
  if (facts.price && facts.price > 0 && Math.abs(facts.price - offer.price) / offer.price > PRICE_TOLERANCE) {
    return {
      ...offer,
      price: Math.round(facts.price),
      verification: {
        status: "price_changed",
        checkedAt,
        listedPrice: offer.price,
        note: `Цена на карточке ${money(facts.price)}${basis}; в выдаче была ${money(offer.price)}`,
      },
    };
  }
  return { ...offer, verification: { status: "confirmed", checkedAt, note: `Цена и наличие подтверждены на карточке${basis}` } };
}
