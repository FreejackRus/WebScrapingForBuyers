import { useEffect, useState } from "react";
import type { Offer, RequestPosition } from "@peremena/contracts";

import { basketApi, basketTotal, downloadBasketCsv, lineTotal, productFromQuery, useBasketStore } from "features/basket";
import { startSearch } from "features/search";
import { useSearchStore } from "entities/search";
import { money } from "shared/lib";

/** «В корзину» for one offer; the quantity comes from a bulk request position when there is one. */
export function AddToBasketButton({ offer, compact = false }: { offer: Offer; compact?: boolean }) {
  const add = useBasketStore((state) => state.add);
  const query = useSearchStore((state) => state.snapshot?.query ?? state.query);
  const quantity = useBasketStore((state) => state.quantityFor(query));
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const onClick = async (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setState("busy");
    await add(offer, query);
    setState(useBasketStore.getState().error ? "idle" : "done");
  };
  const label = state === "done" ? "В корзине ✓" : quantity > 1 ? `В корзину (${quantity} шт)` : "В корзину";
  return (
    <button
      type="button"
      className={compact ? "linkish basket-add basket-add--compact" : "ghost basket-add"}
      disabled={state === "busy"}
      title={compact ? "Добавить в корзину закупки" : undefined}
      onClick={(event) => void onClick(event)}
    >
      {compact ? (state === "done" ? "✓ в корзине" : "+ в корзину") : label}
    </button>
  );
}

export function BasketButton() {
  const count = useBasketStore((state) => state.items.length);
  const load = useBasketStore((state) => state.load);
  const setOpen = useBasketStore((state) => state.setOpen);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <>
      <button type="button" className="ghost basket-toggle" onClick={() => setOpen(true)}>
        Корзина ({count})
      </button>
      <BasketDrawer />
    </>
  );
}

export function BasketDrawer() {
  const { items, open, error, setOpen, setQuantity, remove, clear } = useBasketStore();
  const [memo, setMemo] = useState<{ text: string; note: string } | undefined>();
  const [memoState, setMemoState] = useState<"idle" | "loading" | "error" | "copied">("idle");
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);
  if (!open) return null;
  const makeMemo = async () => {
    setMemoState("loading");
    try {
      const result = await basketApi.justify();
      setMemo({ text: result.text, note: result.ai ? `Черновик ИИ (${result.provider}). Проверьте перед отправкой.` : `Шаблон: ${result.provider}.` });
      setMemoState("idle");
    } catch {
      setMemoState("error");
    }
  };
  const copyMemo = async () => {
    if (!memo) return;
    try {
      await navigator.clipboard.writeText(memo.text);
      setMemoState("copied");
    } catch {
      setMemoState("error");
    }
  };
  return (
    <div className="offer-card-backdrop" onClick={() => setOpen(false)}>
      <aside className="offer-card-drawer basket-drawer" role="dialog" aria-modal="true" aria-labelledby="basket-title" onClick={(event) => event.stopPropagation()}>
        <header className="offer-card-head">
          <div>
            <p className="eyebrow">Закупка</p>
            <h2 id="basket-title">Корзина закупки</h2>
          </div>
          <button type="button" className="ghost offer-card-close" onClick={() => setOpen(false)}>Закрыть</button>
        </header>
        {error ? <p className="data-notice warn" role="alert">{error}</p> : null}
        {items.length === 0 ? (
          <p className="basket-empty">Корзина пуста. Добавьте предложения кнопкой «В корзину» в таблице или карточке.</p>
        ) : (
          <>
            <ul className="basket-list">
              {items.map((item) => (
                <li key={item.id} className="basket-line">
                  <div className="basket-line-main">
                    <a href={item.offer.url} target="_blank" rel="noreferrer">{item.offer.title}</a>
                    <small>
                      {item.offer.source}{item.offer.seller && item.offer.seller !== item.offer.source ? ` · ${item.offer.seller}` : ""} · {item.offer.availability}
                      {item.offer.mpn ? ` · арт. ${item.offer.mpn}` : ""}
                    </small>
                  </div>
                  <div className="basket-line-numbers">
                    <span className="mono">{money.format(item.offer.price)}</span>
                    <label>
                      <span className="sr-only">Количество</span>
                      <input
                        type="number"
                        min={1}
                        max={10000}
                        defaultValue={item.quantity}
                        key={item.quantity}
                        aria-label={`Количество: ${item.offer.title}`}
                        onBlur={(event) => {
                          const value = Number(event.target.value);
                          if (Number.isInteger(value) && value >= 1 && value <= 10000 && value !== item.quantity) void setQuantity(item.id, value);
                          else event.target.value = String(item.quantity);
                        }}
                      />
                    </label>
                    <b className="mono">{money.format(lineTotal(item))}</b>
                    <button type="button" className="linkish" onClick={() => void remove(item.id)}>Удалить</button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="basket-total">Итого: <b className="mono">{money.format(basketTotal(items))}</b></p>
            <div className="basket-actions">
              <button type="button" className="ghost" onClick={() => downloadBasketCsv(items)}>Скачать для Excel</button>
              <button type="button" className="ghost" disabled={memoState === "loading"} onClick={() => void makeMemo()}>
                {memoState === "loading" ? "Составляем обоснование…" : "Обоснование заявки"}
              </button>
              <button type="button" className="linkish" onClick={() => { if (window.confirm("Очистить корзину?")) void clear(); }}>Очистить корзину</button>
            </div>
            {memo ? (
              <section className="offer-memo" aria-label="Обоснование заявки">
                <textarea readOnly value={memo.text} rows={12} aria-label="Текст обоснования заявки" />
                <div className="offer-memo-actions">
                  <button type="button" className="ghost" onClick={() => void copyMemo()}>{memoState === "copied" ? "Скопировано" : "Копировать"}</button>
                  <small>{memo.note}</small>
                </div>
              </section>
            ) : null}
            {memoState === "error" ? <small className="offer-filter-error">Не удалось составить или скопировать текст.</small> : null}
          </>
        )}
      </aside>
    </div>
  );
}

/** «Заявка списком»: paste a letter, get positions, search each one. */
export function BulkRequestButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="ghost bulk-request-toggle" onClick={() => setOpen(true)}>Заявка списком</button>
      {open ? <BulkRequestDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}

export function BulkRequestDialog({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState("");
  const [positions, setPositions] = useState<RequestPosition[]>([]);
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const plan = useBasketStore((store) => store.plan);
  const activity = useSearchStore((store) => store.activity);
  const parse = async () => {
    setState("loading");
    try {
      const result = await basketApi.split(text);
      setPositions(result.items);
      setNote(result.items.length === 0 ? "Позиции не найдены — проверьте текст." : result.ai ? "Разобрано с помощью ИИ, проверьте позиции." : "Разобрано по строкам без ИИ.");
      setState("idle");
    } catch {
      setState("error");
    }
  };
  const find = (position: RequestPosition) => {
    plan(position);
    onClose();
    void startSearch(productFromQuery(position.query));
  };
  return (
    <div className="offer-card-backdrop" onClick={onClose}>
      <aside className="offer-card-drawer bulk-request" role="dialog" aria-modal="true" aria-labelledby="bulk-request-title" onClick={(event) => event.stopPropagation()}>
        <header className="offer-card-head">
          <div>
            <p className="eyebrow">Несколько позиций</p>
            <h2 id="bulk-request-title">Заявка списком</h2>
          </div>
          <button type="button" className="ghost offer-card-close" onClick={onClose}>Закрыть</button>
        </header>
        <label className="bulk-request-text">
          Вставьте текст заявки или письма
          <textarea value={text} maxLength={3000} rows={8} onChange={(event) => setText(event.target.value)} placeholder={"1. Мышь Logitech M240 — 5 шт\n2. SSD Samsung 990 PRO 2 ТБ — 2 шт"} />
        </label>
        <div className="basket-actions">
          <button type="button" disabled={state === "loading" || text.trim().length < 2} onClick={() => void parse()}>
            {state === "loading" ? "Разбираем…" : "Разобрать"}
          </button>
          <small>{text.length} / 3000</small>
        </div>
        {state === "error" ? <small className="offer-filter-error" role="alert">Не удалось разобрать заявку. Повторите позже.</small> : null}
        {note ? <p className="bulk-request-note">{note}</p> : null}
        {positions.length > 0 ? (
          <ol className="bulk-request-list">
            {positions.map((position, index) => (
              <li key={`${index}-${position.query}`}>
                <span>{position.query}</span>
                <label>
                  <span className="sr-only">Количество</span>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={position.quantity}
                    aria-label={`Количество: ${position.query}`}
                    onChange={(event) => {
                      const value = Math.max(1, Math.min(10000, Math.trunc(Number(event.target.value)) || 1));
                      setPositions((list) => list.map((item, at) => (at === index ? { ...item, quantity: value } : item)));
                    }}
                  /> шт
                </label>
                <button type="button" className="ghost" disabled={activity === "search"} onClick={() => find(position)}>Найти</button>
              </li>
            ))}
          </ol>
        ) : null}
      </aside>
    </div>
  );
}
