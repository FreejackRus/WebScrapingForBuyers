import type { FormEvent } from "react";
import { useId } from "react";

import { startSearch } from "features/search";
import { useSearchStore } from "entities/search";

export function SearchCommand() {
  const query = useSearchStore((state) => state.query);
  const suggestions = useSearchStore((state) => state.suggestions);
  const activity = useSearchStore((state) => state.activity);
  const setQuery = useSearchStore((state) => state.setQuery);
  const suggest = useSearchStore((state) => state.suggest);
  const hintId = useId();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void suggest();
  };

  return (
    <>
      <section className="command panel" aria-labelledby="search-title">
        <div className="command-copy">
          <p className="eyebrow">Поиск закупок</p>
          <h1 id="search-title">Сбор публичных предложений</h1>
        </div>
        <form className="search" onSubmit={onSubmit} role="search">
          <label className="sr-only" htmlFor="procurement-query">
            Товар для поиска
          </label>
          <input
            id="procurement-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="мышь Logitech или 910-006559"
            minLength={2}
            required
            aria-describedby={hintId}
            autoComplete="off"
          />
          <span id={hintId} className="kbd">
            ⌘K
          </span>
          <button disabled={activity !== null || query.trim().length < 2}>
            {activity === "suggest" ? "Уточняем…" : "Найти предложения"}
          </button>
        </form>
      </section>

      {suggestions.length > 0 && (
        <section className="panel" aria-labelledby="models-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Модель</p>
              <h2 id="models-title">Уточните артикул</h2>
            </div>
            <span className="count-badge">{suggestions.length}</span>
          </div>
          <div className="model-grid">
            {suggestions.map((product) => (
              <button
                className="model-card"
                key={product.id}
                type="button"
                onClick={() => void startSearch(product)}
                disabled={activity !== null}
              >
                <span>
                  {product.brand}
                  {" · "}
                  {product.category}
                </span>
                <b>{product.model}</b>
                <p>{product.name}</p>
                <small>MPN {product.mpn}</small>
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
