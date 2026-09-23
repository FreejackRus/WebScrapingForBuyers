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

function suggestSecondary(product: Product): string {
  const bits = [
    product.brand && product.brand !== "—" ? product.brand : "",
    product.category && product.category !== "Каталог" ? product.category : "",
    product.mpn ? `MPN ${product.mpn}` : "",
  ].filter(Boolean);
  return bits.join(" · ");
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
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const debounceRef = useRef<number | undefined>(undefined);
  const suppressSuggestRef = useRef(false);

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
    debounceRef.current = window.setTimeout(() => {
      void suggest({ quiet: true }).then(() => {
        if (suppressSuggestRef.current) {
          setOpen(false);
          return;
        }
        setOpen(true);
        setActiveIndex(0);
      });
    }, 250);
    return () => window.clearTimeout(debounceRef.current);
  }, [query, activity, suggest]);

  const commitProduct = (product: Product) => {
    suppressSuggestRef.current = true;
    window.clearTimeout(debounceRef.current);
    setOpen(false);
    setQuery(product.name);
    void startSearch(product);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length < 2 || activity === "search") return;
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
      </div>
      <form className="search search-typeahead" onSubmit={onSubmit} role="search">
        <label className="sr-only" htmlFor="procurement-query">
          Товар для поиска
        </label>
        <div className="search-field">
          <input
            id="procurement-query"
            value={query}
            onChange={(event) => {
              suppressSuggestRef.current = false;
              setQuery(event.target.value);
            }}
            onFocus={() => {
              if (
                !suppressSuggestRef.current &&
                suggestions.length > 0 &&
                activity !== "search"
              ) {
                setOpen(true);
              }
            }}
            onBlur={() => {
              window.setTimeout(() => setOpen(false), 120);
            }}
            onKeyDown={onKeyDown}
            placeholder="Ноутбук, монитор, SSD, MPN или бренд…"
            minLength={2}
            required
            aria-describedby={hintId}
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded={open}
            autoComplete="off"
            disabled={activity === "search"}
          />
          {open && suggestions.length > 0 && (
            <ul id={listId} className="suggest-dropdown" role="listbox">
              <li className="suggest-meta" role="presentation">
                <span>Подсказки</span>
                <span className="suggest-live">{suggesting ? "…" : "live"}</span>
              </li>
              {suggestions.map((product, index) => {
                const secondary = suggestSecondary(product);
                return (
                  <li key={product.id} role="option" aria-selected={index === activeIndex}>
                    <button
                      type="button"
                      className={index === activeIndex ? "suggest-row is-active" : "suggest-row"}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => commitProduct(product)}
                      disabled={activity === "search"}
                    >
                      <span className="suggest-primary">{product.name}</span>
                      {secondary ? <span className="suggest-secondary">{secondary}</span> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <span id={hintId} className="kbd">
          ⌘K
        </span>
        <button disabled={activity === "search" || query.trim().length < 2}>
          {activity === "search" ? "Ищем…" : suggesting ? "…" : "Найти"}
        </button>
      </form>
    </section>
  );
}
