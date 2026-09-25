import { exportApi } from "features/export";
import { useSearchStore } from "entities/search";
import { useUserStore } from "entities/user";
import { Metrics } from "widgets/search/metrics";
import { OfferTable } from "widgets/search/offers";
import { SourceGrid } from "widgets/search/sources";

function useWorkspaceSnapshot() {
  const user = useUserStore((state) => state.user);
  const snapshot = useSearchStore((state) => state.snapshot);
  const error = useSearchStore((state) => state.error);
  const offers = snapshot?.offers ?? [];
  const pricedOffers = offers.filter((offer) => !offer.demo);
  const bestPublic = [...pricedOffers].sort((left, right) => left.price - right.price)[0]?.price;
  const failedSources = snapshot?.sources.filter((source) => source.status === "error").length ?? 0;
  const settledSources = snapshot?.sources.filter((source) => source.status === "done" || source.status === "error").length ?? 0;
  return { user, snapshot, error, offers, bestPublic, failedSources, settledSources };
}

export function SearchWorkspaceLead() {
  const { user, snapshot, error, offers, bestPublic, failedSources, settledSources } = useWorkspaceSnapshot();

  return (
    <>
      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}
      {!snapshot && (
        <section className="panel search-empty-panel" aria-labelledby="search-empty-title">
          <span className="search-empty-mark" aria-hidden="true">⌕</span>
          <p className="eyebrow">Начните с товара</p>
          <h2 id="search-empty-title">Найдите модель — покажем предложения</h2>
          <p>Введите название или артикул в строке поиска. Цены, наличие и условия появятся здесь по мере загрузки источников.</p>
          <div className="search-empty-steps" aria-label="Как пользоваться радаром">
            <span><b>1</b> Укажите товар</span>
            <span><b>2</b> Сравните предложения</span>
            <span><b>3</b> Уточните выбор с копайлотом</span>
          </div>
        </section>
      )}
      {snapshot && (
        <>
          <section className="panel product-panel" aria-labelledby="results-title">
            <div className="product-summary">
              <div>
                <p className="eyebrow">Идентификатор номенклатуры</p>
                <h2 id="results-title">{snapshot.product.model}</h2>
                <p>{snapshot.product.name}</p>
                <div className="chips">
                  {snapshot.product.mpn && <span className="chip mono">MPN {snapshot.product.mpn}</span>}
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
            <Metrics
              offerCount={offers.length}
              bestPublic={bestPublic}
              running={snapshot.status === "running"}
              failedSources={failedSources}
              settledSources={settledSources}
              sourceCount={snapshot.sources.length}
            />
          </section>
          {user?.role === "admin" && <SourceGrid sources={snapshot.sources} role={user.role} />}
          {snapshot.status === "complete" && failedSources > 0 && offers.length > 0 && (
            <div className="data-notice warn" role="status">
              Сбор завершён частично: {failedSources} из {snapshot.sources.length} источников не ответили успешно.
              Показаны полученные предложения; сравнение рынка может быть неполным.
            </div>
          )}
        </>
      )}
    </>
  );
}

export function SearchWorkspaceOffers() {
  const snapshot = useSearchStore((state) => state.snapshot);
  if (!snapshot) return null;
  return <OfferTable />;
}

/** Full workspace block for tests and desktop fallbacks. */
export function SearchWorkspace() {
  return (
    <>
      <SearchWorkspaceLead />
      <SearchWorkspaceOffers />
    </>
  );
}
