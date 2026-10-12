import type { WatchItem } from "@peremena/contracts";

/** Items worth the buyer's attention: the price fell or the product came back. */
export function goodNewsCount(items: WatchItem[]): number {
  return items.filter((item) => item.change === "cheaper" || item.change === "back_in_stock").length;
}

/** Badge text of a check result; undefined before the first check. */
export function changeLabel(item: Pick<WatchItem, "change" | "baseline" | "last">): string | undefined {
  switch (item.change) {
    case "cheaper":
    case "pricier": {
      const percent = item.last && item.baseline.price > 0
        ? Math.round((Math.abs(item.last.price - item.baseline.price) / item.baseline.price) * 100)
        : 0;
      const word = item.change === "cheaper" ? "Подешевело" : "Подорожало";
      return percent > 0 ? `${word} на ${percent}%` : word;
    }
    case "back_in_stock":
      return "Появился в наличии";
    case "out_of_stock":
      return "Нет в наличии";
    case "same":
      return "Без изменений";
    default:
      return undefined;
  }
}

/** The same product and channel as an existing item (to show «уже отслеживается»). */
export function findWatch(items: WatchItem[], productId: string, productName: string, channel: WatchItem["channel"]) {
  return items.find((item) => item.product.id === productId && item.product.name === productName && item.channel === channel);
}
