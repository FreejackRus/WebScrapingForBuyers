import type { FormEvent } from "react";

import { useAnalysisStore } from "entities/analysis";
import { useSearchStore } from "entities/search";
import { useUserStore } from "entities/user";
import { money } from "shared/lib";

const presets = [
  "Выбери три лучших предложения с гарантией и объясни риски",
  "Сравни только реальные предложения и укажи разрыв цен",
  "Оцени риски поставщика и сроки доставки в Воронеж",
];

const emptyFilters = [
  "После сбора здесь появятся конкретные шаги: состав снимка, исключение демо, сортировка по цене, top-N.",
];
const emptyWarnings = ["Демо-цены нельзя использовать как основание для счёта или ТКП."];

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
    if (!snapshot) return;
    await run(snapshot.id);
  };

  if (!user) return null;

  return (
    <section className="copilot" aria-labelledby="analysis-title">
      <div className="copilot-head">
        <div>
          <p className="eyebrow">Закрытый контур</p>
          <h2 id="analysis-title">AI-копайлот закупок</h2>
          <p>
            Локальная модель формулирует объяснение. Фильтры и ранжирование остаются детерминированным кодом.
          </p>
        </div>
        <span className="model-badge">{analysis?.provider ?? "Закрытый контур ПЕРЕМЕНА"}</span>
      </div>
      <div className="copilot-presets">
        {presets.map((item) => (
          <button type="button" key={item} onClick={() => setPrompt(item)}>
            {item}
          </button>
        ))}
      </div>
      <form onSubmit={(event) => void onSubmit(event)}>
        <label className="sr-only" htmlFor="analysis-prompt">
          Критерии анализа
        </label>
        <textarea
          id="analysis-prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={`Например: ${user.analysisPrompt}`}
          minLength={2}
          required
        />
        <button disabled={busy || disabled}>{busy ? "Считаем…" : "Запросить расчет"}</button>
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
                  Выбрано: {offer.source}, {money.format(offer.price)}
                  {offer.demo ? " (демо)" : ""}, {offer.seller}
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
