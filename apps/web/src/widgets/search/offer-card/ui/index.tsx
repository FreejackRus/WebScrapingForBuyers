import { useEffect } from "react";

import { conditionLabels, matchLabels } from "entities/offer";
import { useOfferCard } from "features/search";
import { fetchedTime, money } from "shared/lib";

export function OfferCard() {
  const { offer, closeOffer } = useOfferCard();

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
    <div className="offer-card-backdrop" onClick={closeOffer}>
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
          <button type="button" className="ghost offer-card-close" onClick={closeOffer}>
            Закрыть
          </button>
        </header>

        <div className="offer-card-price">
          <b className="mono">{money.format(offer.price)}</b>
          {offer.oldPrice ? <del className="mono">{money.format(offer.oldPrice)}</del> : null}
          {offer.demo ? <span className="offer-demo-badge">Демо</span> : null}
        </div>

        <div className="offer-card-photo" role="status">
          <span className="offer-card-photo-mark" aria-hidden="true">◇</span>
          <p>Фото нет в данных предложения</p>
        </div>

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
            <dt>Съём</dt>
            <dd className="mono">{fetchedTime.format(new Date(offer.fetchedAt))}</dd>
          </div>
        </dl>

        <footer className="offer-card-actions">
          <a className="offer-card-shop" href={offer.url} target="_blank" rel="noreferrer">
            Открыть на площадке
          </a>
          <button type="button" className="ghost" onClick={closeOffer}>
            Закрыть
          </button>
        </footer>
      </aside>
    </div>
  );
}
