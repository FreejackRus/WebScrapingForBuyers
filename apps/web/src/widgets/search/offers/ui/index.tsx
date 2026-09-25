import { useState, type PointerEvent, type ReactNode } from "react";
import { useFilteredOffers, useOfferCard, useOfferColumns, useOfferTable } from "features/search";
import { useAnalysisStore } from "entities/analysis";
import { conditionLabels, matchLabels } from "entities/offer";
import type { OfferSortColumn } from "entities/offer";
import { useSearchStore } from "entities/search";
import { fetchedTime, money } from "shared/lib";

const emptySelected: string[] = [];

function sortMark(active: boolean, direction?: "asc" | "desc") {
  if (!active) return "⇅";
  return direction === "desc" ? "↓" : "↑";
}

export function OfferTable() {
  const { rows, total, page, pageCount, pageSize, sort, setPage, cycleSort, selectSort } = useOfferTable();
  const { openOffer } = useOfferCard();
  const { columns, visible, hidden, widthOf, toggle, setWidth, reset } = useOfferColumns();
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useFilteredOffers();
  const offerFilter = useSearchStore((state) => state.offerFilter);
  const setOfferFilter = useSearchStore((state) => state.setOfferFilter);
  const tableFilter = useSearchStore((state) => state.tableFilter);
  const setTableFilter = useSearchStore((state) => state.setTableFilter);
  const snapshot = useSearchStore((state) => state.snapshot);
  const snapshotTotal = snapshot?.offers.length ?? 0;
  const running = snapshot?.status === "running";
  const failedSources = snapshot?.sources.filter((source) => source.status === "error").length ?? 0;
  const selected = useAnalysisStore((state) => state.analysis?.selectedOfferIds ?? emptySelected);
  const recommended = selected[0];
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

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

  return (
    <section className="panel offers-panel" aria-labelledby="offers-title">
      <div className="offers-toolbar">
        <div>
          <p className="eyebrow">Сравнение</p>
          <h2 id="offers-title">Таблица предложений</h2>
        </div>
        <div className="offers-toolbar-actions">
          <label className="offer-search">
            <span className="sr-only">Фильтр предложений</span>
            <input
              value={offerFilter}
              onChange={(event) => setOfferFilter(event.target.value)}
              placeholder="Источник, продавец, товар…"
            />
          </label>
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
      <label className="mobile-sort">
        Сортировка предложений
        <select
          value={sort ? `${sort.column}:${sort.direction}` : ""}
          onChange={(event) => {
            const [column, direction] = event.target.value.split(":");
            selectSort(column ? { column: column as OfferSortColumn, direction: direction === "desc" ? "desc" : "asc" } : undefined);
          }}
        >
          <option value="">По порядку загрузки</option>
          {columns.flatMap((column) => [
            <option key={`${column.key}:asc`} value={`${column.key}:asc`}>{column.label}: по возрастанию</option>,
            <option key={`${column.key}:desc`} value={`${column.key}:desc`}>{column.label}: по убыванию</option>,
          ])}
        </select>
      </label>
      {tableFilter && (
        <div className="data-notice mixed" role="status">
          <span>
            <strong>Фильтр активен по директиве AI-копайлота.</strong> В таблице{" "}
            {filtered.length} из {snapshotTotal} строк.
          </span>
          <button type="button" className="linkish" onClick={() => setTableFilter(undefined)}>
            Сбросить
          </button>
        </div>
      )}
      <div className="table-wrap">
        <table style={{ minWidth: visible.reduce((sum, column) => sum + widthOf(column.key), 88) }}>
          <colgroup>
            {visible.map((column) => (
              <col key={column.key} style={{ width: widthOf(column.key) }} />
            ))}
            <col style={{ width: 88 }} />
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
            {rows.map((offer) => {
              const isBest = offer.id === recommended;
              return (
              <tr
                key={offer.id}
                className={`offer-row ${selected.includes(offer.id) ? "selected" : ""} ${isBest ? "recommended" : ""}`.trim()}
                onClick={() => openOffer(offer.id)}
              >
                {cell("source", (
                  <>
                    {isBest && <span className="offer-best-badge">Лучший выбор</span>}
                    <div className="source-name">
                      <b>{offer.source}</b>
                      {offer.seller ? <span className="offer-seller"> · {offer.seller}</span> : null}
                    </div>
                    <small className="offer-seller-desktop">{offer.seller}</small>
                  </>
                ))}
                {cell("title", (
                  <>
                    <div className="offer-title">{offer.title}</div>
                    {offer.mpn && <small className="offer-mpn">{offer.mpn}</small>}
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
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
        {total === 0 && (
          <div className="empty offers-empty" role="status">
            <span className="empty-mark" aria-hidden="true">{snapshotTotal > 0 ? "⌕" : running ? "…" : "—"}</span>
            <h3>{snapshotTotal > 0 ? "Нет предложений по этому фильтру" : running ? "Собираем предложения" : failedSources > 0 ? "Не удалось получить предложения" : "Предложения не найдены"}</h3>
            <p>
              {snapshotTotal > 0
                ? "Измените запрос в таблице или сбросьте фильтры — загруженные строки сохранены."
                : running
                  ? "Источники отвечают постепенно. Полученные цены появятся здесь автоматически."
                  : failedSources > 0
                    ? "Часть источников недоступна. Это не означает, что товара нет в продаже. Повторите поиск позже или уточните модель."
                    : "Сбор завершён. Уточните название, бренд или артикул в строке поиска."}
            </p>
            {snapshotTotal > 0 && (offerFilter || tableFilter) && (
              <button type="button" className="ghost" onClick={() => { setOfferFilter(""); setTableFilter(undefined); }}>
                Сбросить все фильтры
              </button>
            )}
          </div>
        )}
      </div>
      {total > 0 && (
        <div className="offers-pager">
          <span>
            Показано <strong>{from}–{to}</strong> из <strong>{total}</strong>
          </span>
          <div className="pager-buttons">
            <button type="button" className="ghost" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Предыдущая
            </button>
            <span className="pager-page">
              {page} / {pageCount}
            </span>
            <button
              type="button"
              className="ghost"
              disabled={page >= pageCount}
              onClick={() => setPage(page + 1)}
            >
              Следующая
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
