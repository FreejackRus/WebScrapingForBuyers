import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { OfferReviewItem, OfferTableFilter, ProductCondition } from "@peremena/contracts";
import { downloadOffersCsv, encodeSearchLink, OFFER_PAGE_SIZES, useChannelOffers, useFilteredOffers, useOfferCard, useOfferColumns, useOfferTable } from "features/search";
import { analysisApi, useAnalysisStore } from "entities/analysis";
import { conditionLabels, matchLabels, PRICE_ANOMALY_HINT, PRICE_ANOMALY_LABEL, titleSpecs, verificationLabels } from "entities/offer";
import type { OfferSortColumn } from "entities/offer";
import { useSearchStore } from "entities/search";
import { fetchedTime, money } from "shared/lib";
import { AddToBasketButton, BasketButton } from "widgets/basket";
import { CompareBar, CompareCheckbox } from "widgets/search/compare";

import { SearchNotices, shouldAutoReview } from "./search-notices";

const emptySelected: string[] = [];

function sortMark(active: boolean, direction?: "asc" | "desc") {
  if (!active) return "⇅";
  return direction === "desc" ? "↓" : "↑";
}

/** «1 предложение», «3 предложения», «12 предложений». */
export function offersWord(count: number) {
  const mod10 = count % 10, mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "предложение";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "предложения";
  return "предложений";
}

/** Share above the lowest comparable price, rounded; undefined for the best price itself. */
export function priceGap(price: number, best: number | undefined) {
  if (!best || best <= 0 || price <= best) return undefined;
  const percent = Math.round(((price - best) / best) * 100);
  return percent >= 1 ? percent : undefined;
}

const AI_VERDICT = { fits: "подходит", not_fit: "не подходит", unclear: "неясно" } as const;

export function OfferTable() {
  const { rows, grouped = {}, reviewRows, total, offerCount = total, page, pageCount, pageSize, setPageSize, sort, setPage, cycleSort, selectSort } = useOfferTable();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const { openOffer } = useOfferCard();
  const { columns, visible, hidden, widthOf, toggle, setWidth, reset } = useOfferColumns();
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useFilteredOffers();
  const offerFilter = useSearchStore((state) => state.offerFilter);
  const setOfferFilter = useSearchStore((state) => state.setOfferFilter);
  const tableFilter = useSearchStore((state) => state.tableFilter);
  const setTableFilter = useSearchStore((state) => state.setTableFilter);
  const snapshot = useSearchStore((state) => state.snapshot);
  const [aiReview, setAiReview] = useState<{ searchId: string; items: Record<string, OfferReviewItem>; provider: string } | undefined>();
  const [aiReviewState, setAiReviewState] = useState<"idle" | "loading" | "error">("idle");
  const reviewFor = (offerId: string) => (aiReview && aiReview.searchId === snapshot?.id ? aiReview.items[offerId] : undefined);
  const runAiReview = async () => {
    if (!snapshot) return;
    setAiReviewState("loading");
    try {
      const result = await analysisApi.review(snapshot.id);
      setAiReview({ searchId: snapshot.id, items: Object.fromEntries(result.items.map((item) => [item.offerId, item])), provider: result.provider });
      setAiReviewState("idle");
    } catch {
      setAiReviewState("error");
    }
  };
  // A short «Требует уточнения» group is reviewed by the AI once the search finishes; the ref
  // remembers searches already tried so a failure or re-render does not call it again.
  const autoReviewed = useRef(new Set<string>());
  useEffect(() => {
    if (!shouldAutoReview(snapshot, reviewRows.length, aiReview?.searchId, autoReviewed.current)) return;
    autoReviewed.current.add(snapshot!.id);
    void runAiReview();
  }, [snapshot?.id, snapshot?.status, reviewRows.length]);
  const [budgetDraft, setBudgetDraft] = useState(tableFilter?.maxPrice?.toString() ?? "");
  const { channel, counts, setChannel, offers: channelOffers } = useChannelOffers();
  const snapshotTotal = channelOffers.length;
  // Lowest price among exact or probable in-stock rows of this tab: the reference the buyer compares against.
  const bestPrice = (() => {
    const prices = channelOffers
      .filter((offer) => !offer.demo && (offer.match === "exact" || offer.match === "probable") && offer.assessment?.group !== "needs_review" && offer.priceAnomaly !== "too_low" && !/нет в наличии|под заказ/iu.test(offer.availability))
      .map((offer) => offer.price);
    return prices.length ? Math.min(...prices) : undefined;
  })();
  const previousAt = snapshot?.previousPricesAt;
  const cheaperCount = channelOffers.filter((offer) => offer.previousPrice && offer.price < offer.previousPrice).length;
  const [linkCopied, setLinkCopied] = useState(false);
  const copySearchLink = async () => {
    if (!snapshot) return;
    try {
      await navigator.clipboard.writeText(encodeSearchLink(window.location.href, snapshot.product, channel));
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      setLinkCopied(false);
    }
  };
  const panelRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLInputElement>(null);
  const goToPage = (next: number) => {
    setPage(next);
    panelRef.current?.querySelector(".offer-channel-tabs")?.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  // «/» focuses the table filter (as on most sites), Esc in it clears the text.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/u.test(target.tagName))) return;
      event.preventDefault();
      filterRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const otherChannel = channel === "marketplace" ? "distributor" : "marketplace";
  const channelNames = { marketplace: "Маркетплейсы", distributor: "Дистрибуторы" } as const;
  const running = snapshot?.status === "running";
  const failedSources = snapshot?.sources.filter((source) => source.status === "error").length ?? 0;
  const selected = useAnalysisStore((state) => state.analysis?.selectedOfferIds ?? emptySelected);
  const recommended = selected[0];
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const suppliers = [...new Set(channelOffers.flatMap((offer) => [offer.source, offer.seller].filter(Boolean) as string[]))]
    .sort((left, right) => left.localeCompare(right, "ru"));
  const budgetValue = Number(budgetDraft.replace(",", "."));
  const budgetInvalid = budgetDraft.trim() !== "" && (!Number.isFinite(budgetValue) || budgetValue <= 0);

  useEffect(() => setBudgetDraft(tableFilter?.maxPrice?.toString() ?? ""), [tableFilter?.maxPrice]);

  const updateFilter = <K extends keyof OfferTableFilter>(key: K, value: OfferTableFilter[K] | undefined) => {
    const next = { ...tableFilter };
    if (value === undefined || value === false || (Array.isArray(value) && value.length === 0)) delete next[key];
    else next[key] = value;
    setTableFilter(Object.keys(next).length > 0 ? next : undefined);
  };

  const applyBudget = () => {
    if (budgetDraft.trim() === "") updateFilter("maxPrice", undefined);
    else if (!budgetInvalid) updateFilter("maxPrice", budgetValue);
  };

  const activeChips: Array<{ key: string; label: string; clear: () => void }> = [];
  if (offerFilter) activeChips.push({ key: "text", label: `Поиск: ${offerFilter}`, clear: () => setOfferFilter("") });
  if (tableFilter?.inStockOnly) activeChips.push({ key: "stock", label: "В наличии", clear: () => updateFilter("inStockOnly", undefined) });
  if (tableFilter?.cheaperOnly) activeChips.push({ key: "cheaper", label: "Подешевели", clear: () => updateFilter("cheaperOnly", undefined) });
  if (tableFilter?.maxPrice != null) activeChips.push({ key: "price", label: `До ${money.format(tableFilter.maxPrice)}`, clear: () => updateFilter("maxPrice", undefined) });
  tableFilter?.conditions?.forEach((condition) => activeChips.push({ key: `condition-${condition}`, label: conditionLabels[condition], clear: () => updateFilter("conditions", tableFilter.conditions?.filter((item) => item !== condition)) }));
  tableFilter?.sources?.forEach((source) => activeChips.push({ key: `source-${source}`, label: `Поставщик: ${source}`, clear: () => updateFilter("sources", tableFilter.sources?.filter((item) => item !== source)) }));
  if (tableFilter?.packaging) activeChips.push({ key: "packaging", label: `Комплектация: ${tableFilter.packaging}`, clear: () => updateFilter("packaging", undefined) });
  if (tableFilter?.realOnly) activeChips.push({ key: "real", label: "Только реальные данные", clear: () => updateFilter("realOnly", undefined) });
  tableFilter?.titleIncludeAny?.forEach((token) => activeChips.push({ key: `include-${token}`, label: `Из чата: содержит «${token}»`, clear: () => updateFilter("titleIncludeAny", tableFilter.titleIncludeAny?.filter((item) => item !== token)) }));
  tableFilter?.titleExcludeAny?.forEach((token) => activeChips.push({ key: `exclude-${token}`, label: `Из чата: без «${token}»`, clear: () => updateFilter("titleExcludeAny", tableFilter.titleExcludeAny?.filter((item) => item !== token)) }));
  if (tableFilter?.selectedOfferIds?.length) activeChips.push({ key: "selection", label: `Выбор из чата: ${tableFilter.selectedOfferIds.length}`, clear: () => updateFilter("selectedOfferIds", undefined) });

  const startResize = (key: OfferSortColumn, event: PointerEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const origin = event.clientX;
    const start = widthOf(key);
    const move = (next: PointerEvent | globalThis.PointerEvent) => {
      setWidth(key, start + next.clientX - origin);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const cell = (key: OfferSortColumn, node: ReactNode, extra?: string) => {
    if (hidden.includes(key)) return null;
    const label = columns.find((column) => column.key === key)?.label;
    return extra ? <td className={extra} data-label={label}>{node}</td> : <td data-label={label}>{node}</td>;
  };

  const renderOfferRow = (offer: (typeof rows)[number], allowRecommendation: boolean, others: (typeof rows) = [], nested = false) => {
    const isBest = allowRecommendation && offer.id === recommended;
    const prices = others.map((other) => other.price);
    // A folded group is judged by its cheapest listing: the lead row is chosen by rank, not price.
    const groupPrice = Math.min(offer.price, ...prices);
    return (
      <tr
        key={offer.id}
        className={`offer-row ${selected.includes(offer.id) && allowRecommendation ? "selected" : ""} ${isBest ? "recommended" : ""} ${nested ? "grouped" : ""}`.trim()}
        onClick={() => openOffer(offer.id)}
      >
        {cell("source", (
          <>
            {isBest && <span className="offer-best-badge">Рекомендуемое</span>}
            <div className="source-name">
              <b>{offer.source}</b>
              {offer.seller && offer.seller !== offer.source ? <span className="offer-seller"> · {offer.seller}</span> : null}
            </div>
            {offer.seller && offer.seller !== offer.source ? <small className="offer-seller-desktop">{offer.seller}</small> : null}
          </>
        ))}
        {cell("title", (
          <>
            <div className="offer-title">{offer.title}</div>
            {titleSpecs(offer.title).length ? (
              <div className="offer-specs" aria-label="Характеристики из названия">
                {titleSpecs(offer.title).map((spec) => <span key={spec}>{spec}</span>)}
              </div>
            ) : null}
            {offer.mpn && <small className="offer-mpn">{offer.mpn}</small>}
            {offer.assessment?.reasons.length ? (
              <small className="offer-assessment-reason">{offer.assessment.reasons.join(" · ")}</small>
            ) : null}
            {others.length > 0 ? (
              <button
                type="button"
                className="linkish offer-group-toggle"
                aria-expanded={expanded[offer.id] === true}
                onClick={(event) => { event.stopPropagation(); setExpanded((state) => ({ ...state, [offer.id]: !state[offer.id] })); }}
              >
                {expanded[offer.id] ? "Скрыть" : "Ещё"} {others.length} {offersWord(others.length)} этого товара
                {expanded[offer.id] ? "" : Math.min(...prices) === Math.max(...prices) ? ` · ${money.format(prices[0]!)}` : ` · ${money.format(Math.min(...prices))}–${money.format(Math.max(...prices))}`}
              </button>
            ) : null}
            {reviewFor(offer.id) ? (
              <small className={`offer-ai-verdict offer-ai-verdict--${reviewFor(offer.id)!.verdict}`}>
                ИИ: {AI_VERDICT[reviewFor(offer.id)!.verdict]} — {reviewFor(offer.id)!.reason}
              </small>
            ) : null}
          </>
        ))}
        {cell("match", (
          <div className="offer-match">
            <span className={`match ${offer.match}`}>{matchLabels[offer.match]}</span>
            <small>{conditionLabels[offer.condition]}</small>
          </div>
        ))}
        {cell("price", (
          <>
            <b className="mono">{money.format(offer.price)}</b>
            {offer.oldPrice && <del className="mono">{money.format(offer.oldPrice)}</del>}
            {offer.previousPrice ? (
              <small
                className={`offer-price-was offer-price-was--${offer.price < offer.previousPrice ? "down" : "up"}`}
                title={previousAt ? `Цена в прошлом поиске этого товара, ${fetchedTime.format(new Date(previousAt))}` : "Цена в прошлом поиске этого товара"}
              >
                {offer.price < offer.previousPrice ? "↓" : "↑"} было {money.format(offer.previousPrice)}
              </small>
            ) : null}
            {bestPrice !== undefined && groupPrice === bestPrice && (offer.match === "exact" || offer.match === "probable") && !nested ? (
              <span className="offer-price-best" title="Самая низкая цена среди подходящих предложений в наличии на этой вкладке">
                {groupPrice < offer.price ? `лучшая цена в группе: ${money.format(groupPrice)}` : "лучшая цена"}
              </span>
            ) : priceGap(offer.price, bestPrice) !== undefined ? (
              <small className="offer-price-gap" title={`Лучшая цена подходящего предложения в наличии: ${money.format(bestPrice!)}`}>+{priceGap(offer.price, bestPrice)}% к лучшей</small>
            ) : null}
            {offer.priceAnomaly ? (
              <span className="price-anomaly" title={PRICE_ANOMALY_HINT}>{PRICE_ANOMALY_LABEL}</span>
            ) : null}
            {offer.verification ? (
              <span className={`offer-verified offer-verified--${offer.verification.status}`} title={`${offer.verification.note} · ${fetchedTime.format(new Date(offer.verification.checkedAt))}`}>
                {verificationLabels[offer.verification.status]}
              </span>
            ) : null}
          </>
        ), "price")}
        {cell("availability", <>{offer.availability}</>)}
        {cell("conditions", (
          <div className="offer-conditions">
            <span>{offer.delivery ?? "Доставка неизвестна"}</span>
            <small>{offer.warranty ?? "Гарантия не указана"}</small>
          </div>
        ))}
        {cell("fetched", <>{fetchedTime.format(new Date(offer.fetchedAt))}</>, "mono")}
        <td className="offer-action">
          <CompareCheckbox offerId={offer.id} />
          <button
            type="button"
            className={`offer-cta${isBest ? " primary" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              openOffer(offer.id);
            }}
          >
            Карточка
          </button>
          <AddToBasketButton offer={offer} compact />
        </td>
      </tr>
    );
  };

  return (
    <section ref={panelRef} className="panel offers-panel" aria-labelledby="offers-title" data-live={running ? "" : undefined}>
      <div className="offers-toolbar">
        <div>
          <p className="eyebrow">Сравнение</p>
          <h2 id="offers-title">Таблица предложений</h2>
        </div>
        <div className="offers-toolbar-actions">
          <label className="offer-search">
            <span className="sr-only">Фильтр предложений</span>
            <input
              ref={filterRef}
              value={offerFilter}
              onKeyDown={(event) => { if (event.key === "Escape") { setOfferFilter(""); event.currentTarget.blur(); } }}
              title="Горячая клавиша «/»; Esc — очистить"
              onChange={(event) => setOfferFilter(event.target.value)}
              placeholder="Источник, продавец, товар…  ( / )"
            />
          </label>
          {snapshot ? (
            <button type="button" className="ghost" onClick={() => void copySearchLink()} title="Ссылка откроет этот же поиск у коллеги (после входа)">
              {linkCopied ? "Ссылка скопирована" : "Ссылка на поиск"}
            </button>
          ) : null}
          {filtered.length > 0 ? (
            <button
              type="button"
              className="ghost"
              title="CSV для Excel: строки текущей вкладки с учётом фильтров"
              onClick={() => downloadOffersCsv(filtered.filter((offer) => offer.assessment?.group !== "needs_review"), (offer) => matchLabels[offer.match], snapshot?.product.name ?? "poisk")}
            >
              Таблица в CSV
            </button>
          ) : null}
          <BasketButton />
          <div className="column-menu-wrap">
            <button
              type="button"
              className="ghost column-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="offer-columns-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              Столбцы
            </button>
            {menuOpen && (
              <div id="offer-columns-menu" className="column-menu" role="group" aria-label="Видимость столбцов">
                {columns.map((column) => (
                  <label key={column.key} className="column-menu-item">
                    <input
                      type="checkbox"
                      checked={!hidden.includes(column.key)}
                      disabled={column.key === "title"}
                      onChange={() => toggle(column.key)}
                    />
                    {column.label}
                  </label>
                ))}
                <button type="button" className="linkish" onClick={reset}>
                  Сбросить ширину
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <SearchNotices />
      <div className="offer-channel-tabs" role="tablist" aria-label="Тип поставщика">
        {(["marketplace", "distributor"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`offer-tab-${key}`}
            aria-selected={channel === key}
            className={channel === key ? "offer-channel-tab active" : "offer-channel-tab"}
            onClick={() => setChannel(key)}
          >
            {channelNames[key]} <span className="offer-channel-count">{counts[key]}</span>
          </button>
        ))}
        <span className="offer-channel-hint">
          {channel === "distributor" ? "Счёт с НДС и закрывающие документы; цены — B2B или публичные цены сайта" : "Розничные цены площадок; оплата и документы — по условиям продавца"}
        </span>
      </div>
      <fieldset className="offer-filter-controls">
        <legend className="sr-only">Фильтры предложений</legend>
        <label className="offer-filter-check"><input type="checkbox" checked={tableFilter?.inStockOnly ?? false} onChange={(event) => updateFilter("inStockOnly", event.target.checked || undefined)} />Только в наличии</label>
        {previousAt || tableFilter?.cheaperOnly ? (
          <label className="offer-filter-check" title={previousAt ? `По сравнению с поиском ${fetchedTime.format(new Date(previousAt))}` : undefined}>
            <input type="checkbox" checked={tableFilter?.cheaperOnly ?? false} onChange={(event) => updateFilter("cheaperOnly", event.target.checked || undefined)} />
            Только подешевевшие{cheaperCount ? ` (${cheaperCount})` : ""}
          </label>
        ) : null}
        <label>Максимальная цена
          <input aria-invalid={budgetInvalid || undefined} inputMode="decimal" value={budgetDraft} onChange={(event) => setBudgetDraft(event.target.value)} onBlur={applyBudget} onKeyDown={(event) => { if (event.key === "Enter") applyBudget(); }} placeholder="Без ограничения" />
        </label>
        <label>Состояние товара
          <select value={tableFilter?.conditions?.[0] ?? ""} onChange={(event) => updateFilter("conditions", event.target.value ? [event.target.value as ProductCondition] : undefined)}>
            <option value="">Любое</option>
            {Object.entries(conditionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label>Поставщик
          <select value={tableFilter?.sources?.[0] ?? ""} onChange={(event) => updateFilter("sources", event.target.value ? [event.target.value] : undefined)}>
            <option value="">Все поставщики</option>
            {suppliers.map((supplier) => <option key={supplier} value={supplier}>{supplier}</option>)}
          </select>
        </label>
        <label>Комплектация
          <select value={tableFilter?.packaging ?? ""} onChange={(event) => updateFilter("packaging", (event.target.value || undefined) as OfferTableFilter["packaging"])}>
            <option value="">Любая</option><option value="BOX">BOX</option><option value="OEM">OEM</option>
          </select>
        </label>
        <small className="offer-packaging-note">BOX — розничная упаковка; OEM — поставка производителя без обещания состава</small>
        {budgetInvalid ? <small className="offer-filter-error" role="alert">Введите положительное число</small> : null}
      </fieldset>
      {activeChips.length > 0 && <div className="offer-filter-chips" aria-label="Активные фильтры">{activeChips.map((chip) => <button type="button" className="offer-filter-chip" key={chip.key} onClick={chip.clear}>{chip.label}<span aria-hidden="true">×</span><span className="sr-only"> — убрать</span></button>)}<button type="button" className="linkish" onClick={() => { setOfferFilter(""); setTableFilter(undefined); }}>Сбросить всё</button></div>}
      <label className="mobile-sort">
        Сортировка предложений
        <select
          value={sort ? `${sort.column}:${sort.direction}` : ""}
          onChange={(event) => {
            const [column, direction] = event.target.value.split(":");
            selectSort(column ? { column: column as OfferSortColumn, direction: direction === "desc" ? "desc" : "asc" } : undefined);
          }}
        >
          <option value="">По соответствию и наличию</option>
          {columns.flatMap((column) => [
            <option key={`${column.key}:asc`} value={`${column.key}:asc`}>{column.label}: по возрастанию</option>,
            <option key={`${column.key}:desc`} value={`${column.key}:desc`}>{column.label}: по убыванию</option>,
          ])}
        </select>
      </label>
      {tableFilter && filtered.length !== snapshotTotal && (
        <div className="data-notice mixed" role="status">
          <span>
            В таблице <strong>{filtered.length} из {snapshotTotal}</strong> строк.
          </span>
        </div>
      )}
      <div className="table-wrap">
        <table style={{ minWidth: visible.reduce((sum, column) => sum + widthOf(column.key), 116) }}>
          <colgroup>
            {visible.map((column) => (
              <col key={column.key} style={{ width: widthOf(column.key) }} />
            ))}
            <col style={{ width: 116 }} />
          </colgroup>
          <thead>
            <tr>
              {visible.map((column) => {
                const active = sort?.column === column.key;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    className={active ? "sorted" : undefined}
                    aria-sort={!active ? "none" : sort?.direction === "desc" ? "descending" : "ascending"}
                  >
                    <button
                      type="button"
                      className="sort-header"
                      onClick={() => cycleSort(column.key)}
                    >
                      <span>{column.label}</span>
                      <span aria-hidden="true">{sortMark(Boolean(active), sort?.direction)}</span>
                    </button>
                    <span
                      className="col-resize"
                      role="separator"
                      aria-orientation="vertical"
                      aria-label={`Ширина столбца «${column.label}»`}
                      onPointerDown={(event) => startResize(column.key, event)}
                    />
                  </th>
                );
              })}
              <th scope="col">
                <span className="sr-only">Карточка</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.flatMap((offer) => [
              renderOfferRow(offer, true, grouped[offer.id] ?? []),
              ...(expanded[offer.id] ? (grouped[offer.id] ?? []).map((other) => renderOfferRow(other, true, [], true)) : []),
            ])}
          </tbody>
        </table>
        {total === 0 && (
          <div className="empty offers-empty" role="status">
            <span className="empty-mark" aria-hidden="true">{snapshotTotal > 0 ? "⌕" : running ? "…" : "—"}</span>
            <h3>{snapshotTotal === 0 && counts[otherChannel] > 0 ? `${channelNames[channel]}: предложений нет` : reviewRows.length > 0 ? "Нет предложений без уточнений" : snapshotTotal > 0 ? "Нет предложений по этому фильтру" : running ? "Собираем предложения" : failedSources > 0 ? "Не удалось получить предложения" : "Предложения не найдены"}</h3>
            <p>
              {snapshotTotal === 0 && counts[otherChannel] > 0
                ? `Найдено во вкладке «${channelNames[otherChannel]}»: ${counts[otherChannel]}.${running ? " Источники ещё отвечают." : ""}`
                : reviewRows.length > 0
                ? "Все найденные предложения требуют проверки. Разверните группу ниже, чтобы увидеть причины."
                : snapshotTotal > 0
                ? "Измените запрос в таблице или сбросьте фильтры — загруженные строки сохранены."
                : running
                  ? "Источники отвечают постепенно. Полученные цены появятся здесь автоматически."
                  : failedSources > 0
                    ? "Часть источников недоступна. Это не означает, что товара нет в продаже. Повторите поиск позже или уточните модель."
                    : "Сбор завершён. Уточните название, бренд или артикул в строке поиска."}
            </p>
            {snapshotTotal === 0 && counts[otherChannel] > 0 && (
              <button type="button" className="ghost" onClick={() => setChannel(otherChannel)}>
                Открыть «{channelNames[otherChannel]}»
              </button>
            )}
            {snapshotTotal > 0 && (offerFilter || tableFilter) && (
              <button type="button" className="ghost" onClick={() => { setOfferFilter(""); setTableFilter(undefined); }}>
                Сбросить все фильтры
              </button>
            )}
          </div>
        )}
      </div>
      <CompareBar />
      {reviewRows.length > 0 && (
        <details className="offer-review-group">
          <summary>Требует уточнения — {reviewRows.length}</summary>
          <div className="offer-ai-review">
            <button type="button" className="ghost" disabled={aiReviewState === "loading" || running} onClick={() => void runAiReview()}>
              {aiReviewState === "loading" ? "ИИ разбирает строки…" : aiReview?.searchId === snapshot?.id ? "Разобрать заново" : "Разобрать с ИИ"}
            </button>
            <small>
              {aiReviewState === "error"
                ? "Не удалось получить разбор. Повторите позже."
                : aiReview && aiReview.searchId === snapshot?.id
                  ? `Подсказка модели (${aiReview.provider}). Решение остаётся за вами — откройте карточку перед закупкой.`
                  : running
                    ? "Дождитесь окончания сбора."
                    : "Модель прочитает названия и скажет, какие строки похожи на нужный товар."}
            </small>
          </div>
          <div className="table-wrap">
            <table
              aria-label="Предложения, требующие уточнения"
              style={{ minWidth: visible.reduce((sum, column) => sum + widthOf(column.key), 116) }}
            >
              <colgroup>
                {visible.map((column) => (
                  <col key={column.key} style={{ width: widthOf(column.key) }} />
                ))}
                <col style={{ width: 116 }} />
              </colgroup>
              <thead>
                <tr>
                  {visible.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
                  <th scope="col"><span className="sr-only">Карточка</span></th>
                </tr>
              </thead>
              <tbody>{reviewRows.map((offer) => renderOfferRow(offer, false))}</tbody>
            </table>
          </div>
        </details>
      )}
      {total > 0 && (
        <div className="offers-pager">
          <span>
            Показано <strong>{from}–{to}</strong> из <strong>{total}</strong>{offerCount > total ? ` товаров (${offerCount} предложений)` : ""}
          </span>
          <label className="pager-size">
            Строк на странице
            <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
              {OFFER_PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </label>
          <div className="pager-buttons">
            <button type="button" className="ghost" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
              Предыдущая
            </button>
            <span className="pager-page">
              {page} / {pageCount}
            </span>
            <button
              type="button"
              className="ghost"
              disabled={page >= pageCount}
              onClick={() => goToPage(page + 1)}
            >
              Следующая
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
