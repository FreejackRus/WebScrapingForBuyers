import { useFilteredOffers, useOfferTable } from "features/search";
import { useAnalysisStore } from "entities/analysis";
import { conditionLabels, matchLabels } from "entities/offer";
import type { OfferSortColumn } from "entities/offer";
import { useSearchStore } from "entities/search";
import { fetchedTime, money } from "shared/lib";

const emptySelected: string[] = [];

const columns: { key: OfferSortColumn; label: string }[] = [
  { key: "source", label: "Источник / продавец" },
  { key: "title", label: "Товар" },
  { key: "match", label: "Совпадение" },
  { key: "price", label: "Цена" },
  { key: "availability", label: "Наличие" },
  { key: "conditions", label: "Условия" },
  { key: "fetched", label: "Съём" },
];

function sortMark(active: boolean, direction?: "asc" | "desc") {
  if (!active) return "⇅";
  return direction === "desc" ? "↓" : "↑";
}

export function OfferTable() {
  const { rows, total, page, pageCount, pageSize, sort, setPage, cycleSort } = useOfferTable();
  const filtered = useFilteredOffers();
  const offerFilter = useSearchStore((state) => state.offerFilter);
  const setOfferFilter = useSearchStore((state) => state.setOfferFilter);
  const tableFilter = useSearchStore((state) => state.tableFilter);
  const setTableFilter = useSearchStore((state) => state.setTableFilter);
  const snapshotTotal = useSearchStore((state) => state.snapshot?.offers.length ?? 0);
  const selected = useAnalysisStore((state) => state.analysis?.selectedOfferIds ?? emptySelected);
  const recommended = selected[0];
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <section className="panel offers-panel" aria-labelledby="offers-title">
      <div className="offers-toolbar">
        <div>
          <p className="eyebrow">Сравнение</p>
          <h2 id="offers-title">Таблица предложений</h2>
        </div>
        <label className="offer-search">
          <span className="sr-only">Фильтр предложений</span>
          <input
            value={offerFilter}
            onChange={(event) => setOfferFilter(event.target.value)}
            placeholder="Источник, продавец, товар…"
          />
        </label>
      </div>
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
        <table>
          <thead>
            <tr>
              {columns.map((column) => {
                const active = sort?.column === column.key;
                return (
                  <th key={column.key} scope="col" className={active ? "sorted" : undefined}>
                    <button
                      type="button"
                      className="sort-header"
                      onClick={() => cycleSort(column.key)}
                      aria-sort={
                        !active ? "none" : sort?.direction === "desc" ? "descending" : "ascending"
                      }
                    >
                      <span>{column.label}</span>
                      <span aria-hidden="true">{sortMark(Boolean(active), sort?.direction)}</span>
                    </button>
                  </th>
                );
              })}
              <th scope="col">
                <span className="sr-only">Ссылка</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((offer) => (
              <tr
                key={offer.id}
                className={`${selected.includes(offer.id) ? "selected" : ""} ${offer.id === recommended ? "recommended" : ""}`.trim()}
              >
                <td data-label="Источник">
                  <div className="source-name">
                    <b>{offer.source}</b>
                    <span className={`truth-badge ${offer.demo ? "demo" : "real"}`}>
                      {offer.demo ? "DEMO" : "REAL"}
                    </span>
                  </div>
                  <small>{offer.seller}</small>
                </td>
                <td data-label="Товар">
                  <div className="offer-title">{offer.title}</div>
                  {offer.mpn && <small className="offer-mpn">{offer.mpn}</small>}
                </td>
                <td data-label="Совпадение">
                  <div className="offer-match">
                    <span className={`match ${offer.match}`}>{matchLabels[offer.match]}</span>
                    <small>{conditionLabels[offer.condition]}</small>
                  </div>
                </td>
                <td className="price" data-label="Цена">
                  <b className="mono">{money.format(offer.price)}</b>
                  {offer.oldPrice && <del className="mono">{money.format(offer.oldPrice)}</del>}
                </td>
                <td data-label="Наличие">{offer.availability}</td>
                <td data-label="Условия">
                  <div className="offer-conditions">
                    <span>{offer.delivery ?? "Доставка неизвестна"}</span>
                    <small>{offer.warranty ?? "Гарантия не указана"}</small>
                  </div>
                </td>
                <td data-label="Съём" className="mono">
                  {fetchedTime.format(new Date(offer.fetchedAt))}
                </td>
                <td>
                  <a href={offer.url} target="_blank" rel="noreferrer">
                    Открыть
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {total === 0 && (
          <div className="empty" role="status">
            {snapshotTotal === 0 ? "Предложения появятся по мере ответа источников." : "Ничего не найдено."}
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
