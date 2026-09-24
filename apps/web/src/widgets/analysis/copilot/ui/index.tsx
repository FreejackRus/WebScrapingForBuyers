import type { FormEvent } from "react";

import { useAnalysisStore } from "entities/analysis";
import { useSearchStore } from "entities/search";
import { useUserStore } from "entities/user";
import { money } from "shared/lib";

const emptyFilters = [
  "После сбора здесь появятся конкретные шаги: состав снимка, сортировка по цене, top-N.",
];
const emptyWarnings = ["Проверяйте наличие, доставку и условия продавца перед закупкой."];

export function AnalystPanel() {
  const user = useUserStore((state) => state.user);
  const prompt = useAnalysisStore((state) => state.prompt);
  const analysis = useAnalysisStore((state) => state.analysis);
  const busy = useAnalysisStore((state) => state.busy);
  const setPrompt = useAnalysisStore((state) => state.setPrompt);
  const run = useAnalysisStore((state) => state.run);
  const snapshot = useSearchStore((state) => state.snapshot);
  const disabled = (snapshot?.offers.length ?? 0) === 0;
  const selectedOffers = (snapshot?.offers ?? []).filter((offer) =>
    analysis?.selectedOfferIds.includes(offer.id),
  );
  const filterItems = analysis?.appliedFilters.length ? analysis.appliedFilters : emptyFilters;
  const warningItems = analysis?.warnings.length ? analysis.warnings : emptyWarnings;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!snapshot || busy || disabled) return;
    const text = prompt.trim();
    if (text.length < 2) return;
    await run(snapshot.id, text);
  };

  if (!user) return null;

  return (
    <section className="copilot" aria-labelledby="analysis-title">
      <div className="copilot-head">
        <div>
          <p className="eyebrow">Закрытый контур</p>
          <h2 id="analysis-title">AI-копайлот закупок</h2>
          <p>
            {user.displayName.split(/\s+/)[0]}, локальная модель объясняет таблицу Price Radar — не
            общий чат. Цена ранжируется кодом; релевантность названия может уточнять модель.
          </p>
        </div>
        <span className="model-badge">{analysis?.provider ?? "Закрытый контур ПЕРЕМЕНА"}</span>
      </div>
      <form onSubmit={(event) => void onSubmit(event)}>
        <label className="sr-only" htmlFor="analysis-prompt">
          Критерии анализа
        </label>
        <textarea
          id="analysis-prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={busy ? "Копайлот думает…" : `Например: ${user.analysisPrompt}`}
          minLength={2}
          required
          disabled={busy}
          readOnly={busy}
          aria-busy={busy}
        />
        <button disabled={busy || disabled || prompt.trim().length < 2}>
          {busy ? "Считаем…" : "Запросить расчет"}
        </button>
      </form>
      {snapshot?.status === "running" && (
        <p className="copilot-hint">Сбор ещё идёт — расчёт возьмёт только уже загруженные строки.</p>
      )}
      <div className="copilot-grid">
        <article>
          <h3>Вердикт</h3>
          <p>{analysis?.summary ?? "После сбора предложений здесь появится сжатая рекомендация."}</p>
        </article>
        <article>
          <h3>Фильтры и расчёт</h3>
          <ul>
            {filterItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {selectedOffers.length > 0 && (
            <ul className="copilot-selected">
              {selectedOffers.map((offer) => (
                <li key={offer.id}>
                  Выбрано: {offer.source}, {money.format(offer.price)}, {offer.seller}
                </li>
              ))}
            </ul>
          )}
        </article>
        <article className="risk">
          <h3>Риски и оговорки</h3>
          <ul>
            {warningItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
