import type { FormEvent, KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import type { Product } from "@peremena/contracts";

import { startSearch } from "features/search";
import { useSearchStore } from "entities/search";

function productFromTypedQuery(query: string): Product {
  const name = query.trim().replace(/\s+/g, " ");
  return {
    id: `typed-${name.toLocaleLowerCase("ru").slice(0, 48)}`,
    brand: "—",
    model: name,
    name,
    mpn: "",
    category: "Каталог",
    characteristics: { источник: "typed" },
  };
}

const EXAMPLE_QUERIES = ["Мышь Logitech G102", "SSD Kingston NV2 1 ТБ", "Ноутбук Lenovo Legion 5", "Монитор Dell P2422H"];

function suggestSecondary(product: Product): string {
  const bits = [
    product.brand && product.brand !== "—" ? product.brand : "",
    product.category && product.category !== "Каталог" ? product.category : "",
    product.mpn ? `MPN ${product.mpn}` : "",
  ].filter(Boolean);
  return bits.join(" · ");
}

export function suggestOptionId(listId: string, index: number): string {
  return `${listId}-opt-${index}`;
}

export function SuggestionList({
  listId,
  suggestions,
  activeIndex,
  suggesting,
  disabled,
  onHover,
  onPick,
}: {
  listId: string;
  suggestions: Product[];
  activeIndex: number;
  suggesting: boolean;
  disabled: boolean;
  onHover: (index: number) => void;
  onPick: (product: Product) => void;
}) {
  return (
    <ul id={listId} className="suggest-dropdown" role="listbox" aria-label="Подсказки">
      <li className="suggest-meta" role="presentation">
        <span>Подсказки</span>
        <span className="suggest-live">{suggesting ? "…" : "LIVE"}</span>
      </li>
      {suggestions.map((product, index) => {
        const secondary = suggestSecondary(product);
        return (
          <li
            key={product.id}
            id={suggestOptionId(listId, index)}
            role="option"
            aria-selected={index === activeIndex}
          >
            <button
              type="button"
              tabIndex={-1}
              className={index === activeIndex ? "suggest-row is-active" : "suggest-row"}
              onMouseEnter={() => onHover(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onPick(product)}
              disabled={disabled}
            >
              <span className="suggest-primary">{product.name}</span>
              {secondary ? <span className="suggest-secondary">{secondary}</span> : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function SearchCommand() {
  const query = useSearchStore((state) => state.query);
  const suggestions = useSearchStore((state) => state.suggestions);
  const activity = useSearchStore((state) => state.activity);
  const suggesting = useSearchStore((state) => state.suggesting);
  const setQuery = useSearchStore((state) => state.setQuery);
  const suggest = useSearchStore((state) => state.suggest);
  const hintId = useId();
  const listId = useId();
  const noSourcesId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const debounceRef = useRef<number | undefined>(undefined);
  // Bumped whenever the query changes or a product is committed, so a late suggest response is ignored.
  const suggestTokenRef = useRef(0);
  const blurTimerRef = useRef<number | undefined>(undefined);
  const suppressSuggestRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shortcutLabel = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl+K";

  const availableSources = useSearchStore((state) => state.availableSources);
  const selectedSources = useSearchStore((state) => state.selectedSources);
  const setSelectedSources = useSearchStore((state) => state.setSelectedSources);
  const loadSources = useSearchStore((state) => state.loadSources);

  const noSources = selectedSources.length === 0;
  const listOpen = open && suggestions.length > 0;

  const history = useSearchStore((state) => state.history);
  const loadHistory = useSearchStore((state) => state.loadHistory);
  const removeHistoryEntry = useSearchStore((state) => state.removeHistoryEntry);
  const clearHistory = useSearchStore((state) => state.clearHistory);
  const historyId = useId();

  useEffect(() => {
    void loadSources();
    void loadHistory();
  }, [loadSources, loadHistory]);

  useEffect(() => {
    window.clearTimeout(debounceRef.current);
    if (suppressSuggestRef.current) {
      setOpen(false);
      return;
    }
    const trimmed = query.trim();
    if (trimmed.length < 2 || activity === "search") {
      setOpen(false);
      return;
    }
    const token = ++suggestTokenRef.current;
    debounceRef.current = window.setTimeout(() => {
      void suggest({ quiet: true }).then(() => {
        if (token !== suggestTokenRef.current) return;
        if (suppressSuggestRef.current) {
          setOpen(false);
          return;
        }
        setOpen(true);
        setActiveIndex(0);
      });
    }, 250);
    return () => {
      window.clearTimeout(debounceRef.current);
      suggestTokenRef.current += 1;
    };
  }, [query, activity, suggest]);

  useEffect(() => () => window.clearTimeout(blurTimerRef.current), []);

  const commitProduct = (product: Product) => {
    suppressSuggestRef.current = true;
    suggestTokenRef.current += 1;
    window.clearTimeout(debounceRef.current);
    setOpen(false);
    setQuery(product.name);
    void startSearch(product);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length < 2 || activity === "search" || selectedSources.length === 0) return;
    const selected = open && suggestions[activeIndex];
    if (selected) {
      commitProduct(selected);
      return;
    }
    commitProduct(productFromTypedQuery(trimmed));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      if (event.key === "Escape") setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <section className="command panel" aria-labelledby="search-title">
      <div className="command-copy">
        <p className="eyebrow">Поиск закупок</p>
        <h1 id="search-title">Сбор публичных предложений</h1>
        <p className="command-lead">
          Ищем IT-оборудование и комплектующие: введите тип устройства, бренд, модель или артикул.
        </p>
      </div>
      <form className="search search-typeahead" onSubmit={onSubmit} role="search">
        <label className="sr-only" htmlFor="procurement-query">
          Товар для поиска
        </label>
        <div className="search-field">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            ref={inputRef}
            id="procurement-query"
            value={query}
            onChange={(event) => {
              suppressSuggestRef.current = false;
              setOpen(false);
              setQuery(event.target.value);
            }}
            onFocus={() => {
              window.clearTimeout(blurTimerRef.current);
              if (
                !suppressSuggestRef.current &&
                suggestions.length > 0 &&
                activity !== "search"
              ) {
                setOpen(true);
              }
            }}
            onBlur={() => {
              window.clearTimeout(blurTimerRef.current);
              blurTimerRef.current = window.setTimeout(() => setOpen(false), 120);
            }}
            onKeyDown={onKeyDown}
            placeholder="Например: мышь Logitech G102 или SSD Kingston NV2"
            minLength={2}
            required
            role="combobox"
            aria-describedby={hintId}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-controls={listOpen ? listId : undefined}
            aria-expanded={listOpen}
            aria-activedescendant={listOpen ? suggestOptionId(listId, activeIndex) : undefined}
            autoComplete="off"
            disabled={activity === "search"}
          />
          {query && activity !== "search" && (
            <button
              type="button"
              className="search-clear"
              aria-label="Очистить поиск"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                suppressSuggestRef.current = false;
                setQuery("");
                setOpen(false);
                inputRef.current?.focus();
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
          {listOpen && (
            <SuggestionList
              listId={listId}
              suggestions={suggestions}
              activeIndex={activeIndex}
              suggesting={suggesting}
              disabled={activity === "search"}
              onHover={setActiveIndex}
              onPick={commitProduct}
            />
          )}
          {open && suggestions.length === 0 && !suggesting && (
            <p className="suggest-empty" role="status">
              Не похоже на IT-оборудование. Уточните тип устройства, бренд или артикул.
            </p>
          )}
        </div>
        <span id={hintId} className="sr-only">
          Сочетание клавиш Ctrl+K (⌘K на Mac) фокусирует поиск
        </span>
        <span className="kbd" aria-hidden="true">
          {shortcutLabel}
        </span>
        <button
          type="submit"
          aria-describedby={noSources ? noSourcesId : undefined}
          disabled={activity === "search" || query.trim().length < 2 || noSources}
        >
          {activity === "search" ? "Ищем…" : "Найти"}
        </button>
      </form>
      {!query.trim() && activity !== "search" && history.length > 0 && (
        <section className="search-history" aria-labelledby={historyId}>
          <div className="search-history-head">
            <h2 id={historyId}>Недавние запросы</h2>
            <button type="button" className="linkish" onClick={() => void clearHistory()}>
              Очистить историю
            </button>
          </div>
          <ul className="search-history-list">
            {history.slice(0, 8).map((entry) => (
              <li key={entry.id} className="search-history-item">
                <button
                  type="button"
                  className="search-history-run"
                  disabled={selectedSources.length === 0}
                  onClick={() => commitProduct(entry.product)}
                >
                  {entry.query}
                </button>
                <button
                  type="button"
                  className="search-history-remove"
                  aria-label={`Удалить «${entry.query}» из истории`}
                  onClick={() => void removeHistoryEntry(entry.id)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
      {!query.trim() && activity !== "search" && history.length === 0 && (
        <div className="example-queries" role="group" aria-label="Примеры запросов">
          <span className="example-label">Например:</span>
          {EXAMPLE_QUERIES.map((example) => (
            <button
              key={example}
              type="button"
              className="example-chip"
              disabled={selectedSources.length === 0}
              onClick={() => {
                setQuery(example);
                inputRef.current?.focus();
              }}
            >
              {example}
            </button>
          ))}
        </div>
      )}
      {availableSources.length > 0 && (
        <details className="source-picker" open={noSources || undefined}>
          <summary>
            <span>Поставщики: {selectedSources.length} из {availableSources.length}</span>
            <span className="source-picker-chevron" aria-hidden="true" />
          </summary>
          <fieldset disabled={activity === "search"}>
            <legend className="sr-only">Поставщики для запроса</legend>
            <div className="source-picker-actions">
              <button
                type="button"
                className="linkish"
                onClick={() => setSelectedSources(availableSources)}
                disabled={selectedSources.length === availableSources.length}
              >
                Все
              </button>
              <button
                type="button"
                className="linkish"
                onClick={() => setSelectedSources([])}
                disabled={selectedSources.length === 0}
              >
                Снять
              </button>
            </div>
            <div className="source-picker-list">
              {availableSources.map((name) => {
                const checked = selectedSources.includes(name);
                return (
                  <label key={name} className={`source-chip${checked ? " is-on" : ""}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setSelectedSources(
                          checked ? selectedSources.filter((item) => item !== name) : [...selectedSources, name],
                        );
                      }}
                    />
                    {name}
                  </label>
                );
              })}
            </div>
          </fieldset>
          {noSources && (
            <p id={noSourcesId} className="source-picker-hint" role="status">
              Выберите хотя бы одного поставщика
            </p>
          )}
        </details>
      )}
    </section>
  );
}
