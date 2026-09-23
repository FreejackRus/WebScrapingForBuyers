import { exportApi } from "features/export";
import { useSearchStore } from "entities/search";
import { useUserStore } from "entities/user";
import { Metrics } from "widgets/search/metrics";
import { OfferTable } from "widgets/search/offers";
import { SourceGrid } from "widgets/search/sources";

export function SearchWorkspace() {
  const user = useUserStore((state) => state.user);
  const snapshot = useSearchStore((state) => state.snapshot);
  const error = useSearchStore((state) => state.error);
  const offers = snapshot?.offers ?? [];
  const realOffers = offers.filter((offer) => !offer.demo);
  const bestReal = [...realOffers].sort((left, right) => left.price - right.price)[0]?.price;
  const bestAny = [...offers].sort((left, right) => left.price - right.price)[0]?.price;

  return (
    <>
      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}
      {snapshot && (
        <>
          <section className="panel" aria-labelledby="results-title">
            <div className="product-summary">
              <div>
                <p className="eyebrow">Выбранная позиция</p>
                <h2 id="results-title">{snapshot.product.model}</h2>
                <p>{snapshot.product.name}</p>
                <div className="chips">
                  <span className="chip mono">MPN {snapshot.product.mpn}</span>
                  {Object.entries(snapshot.product.characteristics).map(([key, value]) => (
                    <span className="chip" key={key}>
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
              <a className="export" href={exportApi.exportUrl(snapshot.id)}>
                Excel
              </a>
            </div>
          </section>
          {user?.role === "admin" && <SourceGrid sources={snapshot.sources} role={user.role} />}
          <Metrics
            offerCount={offers.length}
            realCount={realOffers.length}
            bestReal={bestReal}
            bestAny={bestAny}
            running={snapshot.status === "running"}
          />
          <div className={`data-notice ${realOffers.length > 0 ? "mixed" : "demo-only"}`} role="note">
            {realOffers.length > 0
              ? "В таблице есть и реальные, и демо-строки. Для закупки используйте только REAL."
              : "Сейчас только демонстрационные цены. На их основании закупать нельзя."}
          </div>
          <OfferTable />
        </>
      )}
    </>
  );
}
