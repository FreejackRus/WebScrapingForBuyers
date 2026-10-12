import { useEffect, useRef, useState } from "react";

/** Mirrors the drawer exit transition in the theme (200ms --ease-drawer). */
const CLOSE_MS = 200;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

import { conditionLabels, matchLabels, PRICE_ANOMALY_HINT, PRICE_ANOMALY_LABEL, verificationLabels } from "entities/offer";
import { analysisApi } from "entities/analysis";
import { useSearchStore } from "entities/search";
import { useOfferCard } from "features/search";
import { fetchedTime, money } from "shared/lib";
import { AddToBasketButton } from "widgets/basket";

export function OfferCard() {
  const { offer, closeOffer } = useOfferCard();
  const [closing, setClosing] = useState(false);
  const searchId = useSearchStore((state) => state.snapshot?.id);
  const [memo, setMemo] = useState<{ offerId: string; text: string; note: string } | undefined>();
  const [memoState, setMemoState] = useState<"idle" | "loading" | "error" | "copied">("idle");
  const makeMemo = async () => {
    if (!offer || !searchId) return;
    setMemoState("loading");
    try {
      const result = await analysisApi.justify(searchId, offer.id);
      setMemo({ offerId: offer.id, text: result.text, note: result.ai ? `Черновик ИИ (${result.provider}). Проверьте перед отправкой.` : `Шаблон: ${result.provider}.` });
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
  const closeTimerRef = useRef<number | undefined>(undefined);

  // The drawer leaves the way it came in. Escape is a keyboard action and closes instantly.
  const requestClose = () => {
    if (prefersReducedMotion()) {
      closeOffer();
      return;
    }
    setClosing(true);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(closeOffer, CLOSE_MS);
  };

  useEffect(() => {
    setClosing(false);
    window.clearTimeout(closeTimerRef.current);
  }, [offer?.id]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  useEffect(() => {
    if (!offer) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOffer();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("offer-card-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("offer-card-open");
    };
  }, [offer, closeOffer]);

  if (!offer) return null;

  return (
    <div className={`offer-card-backdrop${closing ? " is-closing" : ""}`} onClick={requestClose}>
      <aside
        className="offer-card-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-card-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="offer-card-head">
          <div>
            <p className="eyebrow">Внутренняя карточка</p>
            <h2 id="offer-card-title">{offer.title}</h2>
          </div>
          <button type="button" className="ghost offer-card-close" onClick={requestClose}>
            Закрыть
          </button>
        </header>

        <div className="offer-card-price">
          <b className="mono">{money.format(offer.price)}</b>
          {offer.oldPrice ? <del className="mono">{money.format(offer.oldPrice)}</del> : null}
          {offer.demo ? <span className="offer-demo-badge">Демо</span> : null}
        </div>
        {offer.priceAnomaly ? (
          <p className="data-notice warn" role="note">
            <b>{PRICE_ANOMALY_LABEL}.</b> {PRICE_ANOMALY_HINT}
          </p>
        ) : null}
        {offer.verification ? (
          <p className={`data-notice${offer.verification.status === "confirmed" ? "" : " warn"}`} role="note">
            <b>{verificationLabels[offer.verification.status]}.</b> {offer.verification.note}.
          </p>
        ) : null}

        <OfferPhoto key={offer.id} src={offer.imageUrl} title={offer.title} />

        <dl className="offer-card-facts">
          <div>
            <dt>Источник</dt>
            <dd>{offer.source}</dd>
          </div>
          {offer.seller ? (
            <div>
              <dt>Продавец</dt>
              <dd>{offer.seller}</dd>
            </div>
          ) : null}
          {offer.availability ? (
            <div>
              <dt>Наличие</dt>
              <dd>{offer.availability}</dd>
            </div>
          ) : null}
          <div>
            <dt>Совпадение</dt>
            <dd>{matchLabels[offer.match]}</dd>
          </div>
          <div>
            <dt>Состояние</dt>
            <dd>{conditionLabels[offer.condition]}</dd>
          </div>
          {offer.mpn ? (
            <div>
              <dt>MPN</dt>
              <dd className="mono">{offer.mpn}</dd>
            </div>
          ) : null}
          {offer.delivery ? (
            <div>
              <dt>Доставка</dt>
              <dd>{offer.delivery}</dd>
            </div>
          ) : null}
          {offer.warranty ? (
            <div>
              <dt>Гарантия</dt>
              <dd>{offer.warranty}</dd>
            </div>
          ) : null}
          <div>
            <dt>Время запроса</dt>
            <dd className="mono">{fetchedTime.format(new Date(offer.fetchedAt))}</dd>
          </div>
        </dl>

        <section className="offer-memo" aria-label="Обоснование закупки">
          {memo?.offerId === offer.id ? (
            <>
              <textarea readOnly value={memo.text} rows={10} aria-label="Текст обоснования" />
              <div className="offer-memo-actions">
                <button type="button" className="ghost" onClick={() => void copyMemo()}>
                  {memoState === "copied" ? "Скопировано" : "Копировать"}
                </button>
                <small>{memo.note}</small>
              </div>
            </>
          ) : (
            <button type="button" className="ghost" disabled={memoState === "loading" || !searchId} onClick={() => void makeMemo()}>
              {memoState === "loading" ? "Составляем обоснование…" : "Обоснование закупки"}
            </button>
          )}
          {memoState === "error" ? <small className="offer-filter-error">Не удалось составить или скопировать текст.</small> : null}
        </section>

        <footer className="offer-card-actions">
          <a className="offer-card-shop" href={offer.url} target="_blank" rel="noreferrer">
            Открыть на площадке
          </a>
          <AddToBasketButton offer={offer} />
          <button type="button" className="ghost" onClick={closeOffer}>
            Закрыть
          </button>
        </footer>
      </aside>
    </div>
  );
}

function OfferPhoto({ src, title }: { src: string | undefined; title: string }) {
  const [broken, setBroken] = useState(false);

  if (src && !broken) {
    return (
      <div className="offer-card-photo offer-card-photo--image">
        <img
          src={src}
          alt={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setBroken(true)}
        />
      </div>
    );
  }

  return (
    <div className="offer-card-photo" role="status">
      <span className="offer-card-photo-mark" aria-hidden="true">◇</span>
      <p>{src ? "Фото не загрузилось с площадки" : "Фото нет в данных предложения"}</p>
    </div>
  );
}
