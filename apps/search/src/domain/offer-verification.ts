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
  /** Replaces the row's price condition once the card price is taken. */
  priceCondition?: string;
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
  // Fields from the search tile do not independently identify the product card.
  const { mpn: _listingMpn, ...listing } = offer;
  const assessed = [...new Set([facts.title, cardText])].flatMap((title) => {
    if (!title) return [];
    const result = assessOffer(product, { ...listing, title }, query);
    return result ? [result] : [];
  });
  const confirmsModel = assessed.some((row) => row.assessment?.group === "match");
  if (facts.title && assessed.length === 0) {
    const reasons = [...(offer.assessment?.reasons ?? []), "Карточка товара не подтверждает запрошенную модель"];
    return {
      ...offer,
      assessment: { group: "needs_review", reasons },
      verification: { status: "mismatch", checkedAt, note: "Карточка не подтверждает модель — проверьте вручную" },
    };
  }
  const basis = facts.priceBasis ? ` ${facts.priceBasis}` : "";
  const price = facts.price !== undefined && Number.isFinite(facts.price) && facts.price > 0
    ? Math.round(facts.price) : undefined;
  const checked: Offer = {
    ...offer,
    ...(facts.available === true ? {
      availability: "В наличии (по карточке)",
      availabilityStatus: "in_stock" as const,
    } : {}),
    ...(price !== undefined ? {
      price,
      ...(facts.priceCondition ? { priceCondition: facts.priceCondition } : {}),
      ...(offer.packQuantity ? { unitPrice: Math.round(price / offer.packQuantity) } : {}),
    } : {}),
  };
  const unconfirmed = [
    ...(price === undefined ? ["цена"] : []),
    ...(facts.available !== true ? ["наличие"] : []),
    ...(!confirmsModel ? ["модель"] : []),
  ];
  if (price !== undefined && Math.abs(price - offer.price) / offer.price > PRICE_TOLERANCE) {
    const missing = unconfirmed.length ? `. Не подтверждены: ${unconfirmed.join(", ")}` : "";
    return {
      ...checked,
      verification: {
        status: "price_changed",
        checkedAt,
        listedPrice: offer.price,
        note: `Цена на карточке ${money(price)}${basis}; в выдаче была ${money(offer.price)}${missing}`,
      },
    };
  }
  if (unconfirmed.length) {
    const note = unconfirmed.map((field) => field === "наличие" ? "наличие не подтверждено" : `${field} не подтверждена`).join(", ");
    return { ...checked, verification: { status: "partial", checkedAt, note } };
  }
  return { ...checked, verification: { status: "confirmed", checkedAt, note: `Цена и наличие подтверждены на карточке${basis}` } };
}
