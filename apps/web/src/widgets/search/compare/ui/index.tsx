import { useEffect, type ReactNode } from "react";
import type { Offer } from "@peremena/contracts";

import { MAX_COMPARE, useCompareIds, useCompareStore } from "features/compare";
import { conditionLabels, matchLabels, titleSpecs, verificationLabels } from "entities/offer";
import { useSearchStore } from "entities/search";
import { money } from "shared/lib";

const emptyOffers: Offer[] = [];

/** Row checkbox; stops the click so it never opens the offer card. */
export function CompareCheckbox({ offerId }: { offerId: string }) {
  const searchId = useSearchStore((state) => state.snapshot?.id);
  const ids = useCompareIds(searchId);
  const toggle = useCompareStore((state) => state.toggle);
  const checked = ids.includes(offerId);
  const full = !checked && ids.length >= MAX_COMPARE;
  return (
    <label className="compare-check" title={full ? `Можно сравнить не больше ${MAX_COMPARE} строк` : "Добавить к сравнению"} onClick={(event) => event.stopPropagation()}>
      <input type="checkbox" checked={checked} disabled={full} onChange={() => toggle(searchId, offerId)} />
      <span className="sr-only">Сравнить</span>
    </label>
  );
}

/** Sticky bar under the table when two or more rows are ticked, plus the comparison dialog. */
export function CompareBar() {
  const searchId = useSearchStore((state) => state.snapshot?.id);
  const offers = useSearchStore((state) => state.snapshot?.offers ?? emptyOffers);
  const ids = useCompareIds(searchId);
  const { open, setOpen, reset } = useCompareStore();
  // A new search (or a cleared one) starts with nothing ticked.
  useEffect(() => {
    if (!searchId) reset();
  }, [searchId, reset]);
  const selected = ids.map((id) => offers.find((offer) => offer.id === id)).filter((offer): offer is Offer => Boolean(offer));
  if (selected.length < 2) return null;
  return (
    <>
      <div className="compare-bar" role="region" aria-label="Сравнение строк">
        <span>Выбрано: {selected.length} из {MAX_COMPARE}</span>
        <button type="button" onClick={() => setOpen(true)}>Сравнить ({selected.length})</button>
        <button type="button" className="ghost" onClick={reset}>Сбросить</button>
      </div>
      {open ? <CompareDialog offers={selected} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

export function compareRows(offers: Offer[]): Array<{ label: string; cells: ReactNode[] }> {
  return [
    { label: "Источник / продавец", cells: offers.map((o) => (o.seller && o.seller !== o.source ? `${o.source} · ${o.seller}` : o.source)) },
    { label: "Товар", cells: offers.map((o) => (o.mpn ? `${o.title} (${o.mpn})` : o.title)) },
    { label: "Цена", cells: offers.map((o) => money.format(o.price)) },
    { label: "Условия цены", cells: offers.map((o) => o.priceCondition || "—") },
    { label: "Наличие", cells: offers.map((o) => o.availability || "—") },
    { label: "Состояние", cells: offers.map((o) => conditionLabels[o.condition]) },
    { label: "Совпадение", cells: offers.map((o) => matchLabels[o.match]) },
    { label: "Проверка карточки", cells: offers.map((o) => (o.verification ? `${verificationLabels[o.verification.status]}: ${o.verification.note}` : "Не проверялась")) },
    { label: "Характеристики", cells: offers.map((o) => titleSpecs(o.title).join(", ") || "—") },
    { label: "Ссылка", cells: offers.map((o) => <a href={o.url} target="_blank" rel="noreferrer">Открыть</a>) },
  ];
}

export function CompareDialog({ offers, onClose }: { offers: Offer[]; onClose: () => void }) {
  const lowest = Math.min(...offers.map((offer) => offer.price));
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="offer-card-backdrop" onClick={onClose}>
      <aside className="offer-card-drawer compare-drawer" role="dialog" aria-modal="true" aria-labelledby="compare-title" onClick={(event) => event.stopPropagation()}>
        <header className="offer-card-head">
          <div>
            <p className="eyebrow">Сравнение</p>
            <h2 id="compare-title">Сравнение предложений</h2>
          </div>
          <button type="button" className="ghost offer-card-close" onClick={onClose}>Закрыть</button>
        </header>
        <div className="table-wrap">
          <table className="compare-table">
            <tbody>
              {compareRows(offers).map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.cells.map((cell, index) => (
                    <td key={offers[index]!.id} className={row.label === "Цена" && offers[index]!.price === lowest ? "compare-lowest" : undefined}>
                      {cell}
                      {row.label === "Цена" && offers[index]!.price === lowest ? <small> — самая низкая</small> : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
}
