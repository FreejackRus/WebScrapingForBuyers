import type { FormEvent } from "react";

import { applyChatResult, localSearchQuery } from "features/analysis";
import { useAnalysisStore } from "entities/analysis";
import { useSearchStore } from "entities/search";
import { useUserStore } from "entities/user";

const presets = [
  "Только REAL",
  "Сравни топ-3",
  "Уточни модель G102",
  "Оставь только реальные WB дешевле 6000",
];

export function AnalysisChat() {
  const user = useUserStore((state) => state.user);
  const prompt = useAnalysisStore((state) => state.prompt);
  const analysis = useAnalysisStore((state) => state.analysis);
  const messages = useAnalysisStore((state) => state.messages);
  const busy = useAnalysisStore((state) => state.busy);
  const setPrompt = useAnalysisStore((state) => state.setPrompt);
  const run = useAnalysisStore((state) => state.run);
  const appendLocal = useAnalysisStore((state) => state.appendLocal);
  const snapshot = useSearchStore((state) => state.snapshot);
  const setQuery = useSearchStore((state) => state.setQuery);
  const suggest = useSearchStore((state) => state.suggest);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (trimmed.length < 2) return;
    setPrompt(trimmed);
    if (!snapshot) {
      const query = localSearchQuery(trimmed);
      setQuery(query.length >= 2 ? query : trimmed);
      appendLocal(
        trimmed,
        "Уточните модель в карточках слева — после выбора начну сбор предложений.",
      );
      await suggest();
      setPrompt("");
      return;
    }
    const result = await run(snapshot.id);
    applyChatResult(result);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await send(prompt);
  };

  if (!user) return null;

  return (
    <section className="chat-panel" aria-labelledby="analysis-title">
      <div className="chat-head">
        <div>
          <p className="eyebrow">Закрытый контур</p>
          <h2 id="analysis-title">AI-копайлот закупок</h2>
          <p>Модель объясняет запрос. Фильтр и отбор строк считает код анализа.</p>
        </div>
        <span className="model-badge">{analysis?.provider ?? "Закрытый контур ПЕРЕМЕНА"}</span>
      </div>
      <div className="chat-thread" role="log" aria-live="polite">
        {messages.length === 0 && (
          <p className="chat-empty">
            Спросите про снимок, попросите отфильтровать таблицу или уточнить модель для нового поиска.
          </p>
        )}
        {messages.map((message) => (
          <article key={message.id} className={`chat-bubble ${message.role}`}>
            <p>{message.text}</p>
            {message.citations.length > 0 && (
              <ul className="chat-citations">
                {message.citations.map((citation) => (
                  <li key={citation.offerId}>
                    <a href={citation.url} target="_blank" rel="noreferrer">
                      {citation.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
      {snapshot?.status === "running" && (
        <p className="copilot-hint">Сбор ещё идёт — ответ смотрит только уже загруженные строки.</p>
      )}
      {analysis?.appliedFilters && analysis.appliedFilters.length > 0 && (
        <ul className="chat-filters">
          {analysis.appliedFilters.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <div className="copilot-presets">
        {presets.map((item) => (
          <button type="button" key={item} onClick={() => void send(item)}>
            {item}
          </button>
        ))}
      </div>
      <form className="chat-composer" onSubmit={(event) => void onSubmit(event)}>
        <label className="sr-only" htmlFor="analysis-prompt">
          Сообщение копайлоту
        </label>
        <input
          id="analysis-prompt"
          className="chat-composer-input"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Спросите про таблицу или попросите отфильтровать…"
          minLength={2}
          required
          autoComplete="off"
        />
        <button type="submit" disabled={busy}>
          {busy ? "Считаем…" : "Отправить"}
        </button>
      </form>
    </section>
  );
}
