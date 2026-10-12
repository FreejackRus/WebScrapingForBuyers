import type { WatchItem } from "@peremena/contracts";
import { useEffect, useState } from "react";

import { changeLabel, goodNewsCount, useWatchlistStore } from "entities/watchlist";
import { startSearch } from "features/search";
import { fetchedTime, money } from "shared/lib";

const channelNames = { marketplace: "Маркетплейсы", distributor: "Дистрибьюторы" } as const;

/** Toolbar button «Слежу (N)» with a drawer of watched prices; the badge counts good news. */
export function WatchlistButton({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const items = useWatchlistStore((state) => state.items);
  const loaded = useWatchlistStore((state) => state.loaded);
  const load = useWatchlistStore((state) => state.load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loaded) void load();
  }, [loaded, load]);

  // Scheduled checks happen on the server: refresh when the drawer opens.
  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  const news = goodNewsCount(items);
  return (
    <>
      <button
        type="button"
        className="ghost watchlist-toggle"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        title="Товары, цену которых вы отслеживаете"
      >
        Слежу ({items.length})
        {news > 0 ? <span className="watchlist-badge" aria-label={`Хороших новостей: ${news}`}>{news}</span> : null}
      </button>
      {open ? <WatchlistDrawer onClose={() => setOpen(false)} onOpenSearch={onOpenSearch} /> : null}
    </>
  );
}

function WatchlistDrawer({ onClose, onOpenSearch }: { onClose: () => void; onOpenSearch: (() => void) | undefined }) {
  const items = useWatchlistStore((state) => state.items);
  const error = useWatchlistStore((state) => state.error);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="offer-card-backdrop" onClick={onClose}>
      <aside
        className="offer-card-drawer watchlist-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="watchlist-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="offer-card-head">
          <div>
            <p className="eyebrow">Отслеживание цены</p>
            <h2 id="watchlist-title">Слежу за ценами</h2>
          </div>
          <button type="button" className="ghost offer-card-close" onClick={onClose}>
            Закрыть
          </button>
        </header>
        {error ? <p className="data-notice warn" role="alert">{error}</p> : null}
        {items.length === 0 ? (
          <p className="watchlist-empty">
            Пока ничего не отслеживается. Откройте карточку предложения и нажмите «Следить за ценой» — радар будет
            проверять цену по расписанию.
          </p>
        ) : (
          <ul className="watchlist-list">
            {items.map((item) => (
              <WatchRow
                key={item.id}
                item={item}
                onOpenSearch={() => {
                  onClose();
                  onOpenSearch?.();
                  void startSearch(item.product);
                }}
              />
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}

function WatchRow({ item, onOpenSearch }: { item: WatchItem; onOpenSearch: () => void }) {
  const checking = useWatchlistStore((state) => state.checking.includes(item.id));
  const check = useWatchlistStore((state) => state.check);
  const remove = useWatchlistStore((state) => state.remove);
  const label = changeLabel(item);
  return (
    <li className="watchlist-item">
      <div className="watchlist-item-head">
        <b>{item.product.model || item.product.name}</b>
        <small>{channelNames[item.channel]}</small>
      </div>
      <p className="watchlist-prices">
        <span>
          Было: <b className="mono">{money.format(item.baseline.price)}</b>
          {item.baseline.inStock ? "" : " (не в наличии)"} · {fetchedTime.format(new Date(item.baseline.at))}
        </span>
        <span>
          Сейчас:{" "}
          {item.last ? (
            <>
              <b className="mono">{money.format(item.last.price)}</b>
              {item.last.inStock ? "" : " (не в наличии)"} · {fetchedTime.format(new Date(item.last.at))}
            </>
          ) : (
            "ещё не проверялось"
          )}
        </span>
      </p>
      {label ? <span className={`watch-change watch-change--${item.change}`}>{label}</span> : null}
      {item.checkError ? <small className="offer-filter-error">Последняя проверка: {item.checkError}</small> : null}
      <div className="watchlist-actions">
        <button type="button" className="ghost" disabled={checking} onClick={() => void check(item.id)}>
          {checking ? "Проверяем…" : "Проверить сейчас"}
        </button>
        <button type="button" className="ghost" onClick={onOpenSearch}>
          Открыть поиск
        </button>
        <button type="button" className="ghost" onClick={() => void remove(item.id)}>
          Удалить
        </button>
      </div>
    </li>
  );
}
