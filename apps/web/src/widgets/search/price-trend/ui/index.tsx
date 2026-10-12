import type { OfferChannel, PriceHistoryPoint } from "@peremena/contracts";
import { useEffect, useState } from "react";

import { searchApi } from "entities/search";
import { money } from "shared/lib";

import { priceTrend, sparklinePath } from "../lib";

const WIDTH = 120;
const HEIGHT = 32;
const day = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" });

/**
 * Minimum in-stock price of this product across earlier searches. Loaded once the
 * search completes (that is when the current point is recorded); hidden below two points.
 */
export function PriceTrend({ historyKey, complete, channel }: { historyKey: string | undefined; complete: boolean; channel: OfferChannel }) {
  const [history, setHistory] = useState<{ key: string; points: PriceHistoryPoint[] } | undefined>();

  useEffect(() => {
    if (!historyKey || !complete) return;
    let alive = true;
    searchApi
      .priceHistory(historyKey)
      .then((result) => {
        if (alive) setHistory({ key: historyKey, points: result.points });
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [historyKey, complete]);

  const trend = history && history.key === historyKey ? priceTrend(history.points, channel) : undefined;
  if (!trend) return null;
  const arrow = trend.direction === "down" ? "↓" : trend.direction === "up" ? "↑" : "→";
  return (
    <div className={`price-trend price-trend--${trend.direction}`} aria-label="Динамика минимальной цены в наличии">
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-hidden="true">
        <polyline points={sparklinePath(trend.points, WIDTH, HEIGHT)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span>
        мин. цена: было <b className="mono">{money.format(trend.first.price)}</b> ({day.format(new Date(trend.first.at))}) → сейчас{" "}
        <b className="mono">{money.format(trend.last.price)}</b> <span className="price-trend-arrow">{arrow}</span>
      </span>
    </div>
  );
}
