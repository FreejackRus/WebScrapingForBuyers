import type { OfferChannel, PriceHistoryPoint } from "@peremena/contracts";

export interface TrendPoint {
  at: string;
  price: number;
}

export interface PriceTrendView {
  points: TrendPoint[];
  first: TrendPoint;
  last: TrendPoint;
  direction: "down" | "up" | "flat";
}

/** Minimum in-stock price of one channel over time; undefined below two points. */
export function priceTrend(history: PriceHistoryPoint[], channel: OfferChannel): PriceTrendView | undefined {
  const points = history.flatMap((point) => {
    const price = point[channel]?.inStockMin;
    return typeof price === "number" ? [{ at: point.at, price }] : [];
  });
  if (points.length < 2) return undefined;
  const first = points[0]!;
  const last = points[points.length - 1]!;
  const direction = last.price < first.price ? "down" : last.price > first.price ? "up" : "flat";
  return { points, first, last, direction };
}

/** SVG polyline coordinates in a width×height box; a flat series sits in the middle. */
export function sparklinePath(points: TrendPoint[], width: number, height: number, pad = 2): string {
  const prices = points.map((point) => point.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const step = points.length > 1 ? (width - pad * 2) / (points.length - 1) : 0;
  return points
    .map((point, index) => {
      const x = pad + index * step;
      const y = max === min ? height / 2 : pad + ((max - point.price) / (max - min)) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
