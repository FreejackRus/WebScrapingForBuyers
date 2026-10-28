import type { Product, SearchSnapshot } from "@peremena/contracts";
import { useSearchStore } from "entities/search";

/** Articles a distributor price list knows for this model (colours, kits): the buyer picks one. */
export function variantArticles(product: Product | undefined): string[] {
  if (!product) return [];
  const articles = Object.entries(product.characteristics ?? {})
    .filter(([key]) => key.startsWith("артикулы по прайсу"))
    .flatMap(([, value]) => String(value).split(","))
    .map((article) => article.trim())
    .filter(Boolean);
  return [...new Set(articles)];
}

/**
 * The same product pinned to one article. A non-"typed" source makes the search route take
 * the product as chosen instead of re-reading the typed text.
 */
export function productForVariant(product: Product, article: string): Product {
  const characteristics = { ...product.characteristics };
  if (!characteristics.источник || characteristics.источник === "typed") characteristics.источник = "variant";
  return { ...product, mpn: article, characteristics };
}

/** Sources that have not answered yet, for «Ещё ищут». */
export function pendingSourceNames(snapshot: SearchSnapshot | undefined): string[] {
  if (snapshot?.status !== "running") return [];
  return snapshot.sources.filter((source) => source.status === "pending" || source.status === "loading").map((source) => source.source);
}

/**
 * After the search: sources that brought nothing, and why, in a manager's words.
 * «Servermall — не нашёл такой товар», «Wildberries — нашёл 38, но не та модель».
 */
export function quietSourceNotes(snapshot: SearchSnapshot | undefined): string[] {
  if (snapshot?.status !== "complete") return [];
  return snapshot.sources.flatMap(({ source, outcome, found }) => {
    if (outcome === "nothing_found") return [`${source} — не нашёл такой товар`];
    if (outcome === "filtered_out") return [`${source} — нашёл ${found ?? 0}, но не та модель`];
    if (outcome === "timeout") return [`${source} — не ответил вовремя`];
    if (outcome === "unavailable" || outcome === "error") return [`${source} — временно недоступен`];
    return [];
  });
}

/** «Результаты от 14:05 (12 мин назад)» for a reused search. */
export function cachedNotice(cachedAt: string, now: number = Date.now()): string {
  const at = new Date(cachedAt);
  const minutes = Math.max(0, Math.round((now - at.getTime()) / 60_000));
  const time = at.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  return `Результаты от ${time} (${minutes} мин назад)`;
}

/**
 * One automatic AI pass per search: only after it finished, only for a short «Требует уточнения»
 * group (a long one is slow and costly), and never twice for the same snapshot.
 */
export function shouldAutoReview(
  snapshot: SearchSnapshot | undefined,
  reviewCount: number,
  reviewedSearchId: string | undefined,
  attempted: ReadonlySet<string>,
): boolean {
  if (!snapshot || snapshot.status !== "complete") return false;
  if (reviewCount < 1 || reviewCount > 8) return false;
  return reviewedSearchId !== snapshot.id && !attempted.has(snapshot.id);
}

export function SearchNotices() {
  const snapshot = useSearchStore((state) => state.snapshot);
  const start = useSearchStore((state) => state.start);
  if (!snapshot) return null;
  const variants = variantArticles(snapshot.product);
  const pending = pendingSourceNames(snapshot);
  const quiet = quietSourceNotes(snapshot);
  return (
    <>
      {snapshot.cachedAt ? (
        <div className="data-notice search-cached-notice" role="status">
          <span>{cachedNotice(snapshot.cachedAt)}</span>
          <button type="button" className="ghost" onClick={() => void start(snapshot.product, undefined, { fresh: true })}>
            Обновить
          </button>
        </div>
      ) : null}
      {pending.length > 0 ? (
        <div className="data-notice search-pending-notice" role="status">
          <span>Ещё ищут: {pending.join(", ")}…</span>
          <small>Уже найденные предложения можно смотреть и использовать — новые строки добавятся сами.</small>
        </div>
      ) : null}
      {quiet.length > 0 ? (
        <details className="data-notice search-quiet-notice">
          <summary>Без предложений: {quiet.length} из {snapshot.sources.length} источников</summary>
          <ul>{quiet.map((note) => <li key={note}>{note}</li>)}</ul>
        </details>
      ) : null}
      {variants.length > 1 ? (
        <div className="search-variant-chooser" role="group" aria-label="Варианты товара">
          <span>Уточните вариант:</span>
          {variants.map((article) => (
            <button
              key={article}
              type="button"
              className="offer-filter-chip search-variant-chip"
              onClick={() => void start(productForVariant(snapshot.product, article))}
            >
              {article}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
