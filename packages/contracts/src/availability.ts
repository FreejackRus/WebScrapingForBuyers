import type { Offer } from "./index.js";

export type OfferAvailabilityStatus = "in_stock" | "out_of_stock" | "on_order" | "unknown";

/** Source claims, not a physical inventory guarantee. Explicit status takes precedence. */
export function offerAvailabilityStatus(
  offer: Pick<Offer, "availability" | "availabilityStatus">,
): OfferAvailabilityStatus {
  if (offer.availabilityStatus) return offer.availabilityStatus;
  const text = offer.availability.toLocaleLowerCase("ru").replace(/\s+/gu, " ").trim();
  if (!text || /неизвест|уточн|провер|не подтвержд|нет информации/u.test(text)) return "unknown";
  if (/нет в наличии|не в наличии|отсутств|распродан|закончился|out of stock/u.test(text)) return "out_of_stock";
  // NETLAB labels distinguish actual warehouses from goods still in transit.
  if (/(?:^|;\s*)(?:удалённый |удаленный )?склад:\s*(?:более\s+)?[1-9]\d*(?:[–-]\d+)?\s*шт\./u.test(text)) return "in_stock";
  if (/под заказ|в пути|ожидается|предзаказ|on order/u.test(text)) return "on_order";
  if (/^в наличии(?:[.: ]|$)|^in stock(?:[.: ]|$)/u.test(text)) {
    if (/^в наличии\s*:\s*0(?:\D|$)/u.test(text)) return "out_of_stock";
    return "in_stock";
  }
  return "unknown";
}
