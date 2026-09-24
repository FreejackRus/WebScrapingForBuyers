import type { FormEvent } from "react";
import { useRef, useState } from "react";

import { applyChatResult } from "features/analysis";
import { useAnalysisStore } from "entities/analysis";
import { useSearchStore } from "entities/search";
import { useUserStore } from "entities/user";

function firstName(displayName: string) {
  return displayName.trim().split(/\s+/)[0] || displayName;
}

export function AnalysisChat() {
  const user = useUserStore((state) => state.user);
  const prompt = useAnalysisStore((state) => state.prompt);
  const analysis = useAnalysisStore((state) => state.analysis);
  const messages = useAnalysisStore((state) => state.messages);
  const safetyNotice = useAnalysisStore((state) => state.safetyNotice);
  const busy = useAnalysisStore((state) => state.busy);
  const setPrompt = useAnalysisStore((state) => state.setPrompt);
  const run = useAnalysisStore((state) => state.run);
  const chat = useAnalysisStore((state) => state.chat);
  const snapshot = useSearchStore((state) => state.snapshot);
  const sendingRef = useRef(false);
  const [sending, setSending] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);

  if (!user) return null;

  const name = firstName(user.displayName);
  const locked = busy || sending;

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (trimmed.length < 2 || busy || sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    setSendFailed(false);
    setPrompt("");
    try {
      // Always send to analysis — model returns searchQuery / filters; client applies via applyChatResult.
      if (!snapshot) {
        const result = await chat(trimmed);
        applyChatResult(result);
        return;
      }
      const result = await run(snapshot.id, trimmed);
      applyChatResult(result);
    } catch {
      // The store adds the error to the conversation; retain the request for retry.
      setPrompt(trimmed);
      setSendFailed(true);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const text = prompt;
    await send(text);
  };

  const emptyHint =
    `${name}, я копайлот закупок Price Radar — не общий чат. ` +
    "Спросите про снимок, фильтр таблицы, Excel, источники или уточните модель. " +
    "Ранжирование по цене считает код; релевантность названия может уточнять модель.";

  return (
    <section className="chat-panel" aria-labelledby="analysis-title">
      <div className="chat-head">
        <div>
          <p className="eyebrow">Закрытый контур</p>
          <h2 id="analysis-title">AI-копайлот закупок</h2>
          <p className="chat-head-lead">
            Для {name}: объясняю таблицу предложений. Фильтр и отбор строк считает код анализа.
          </p>
        </div>
        <span className="model-badge">{user.role === "admin" ? (analysis?.provider ?? "Закрытый контур ПЕРЕМЕНА") : "Закрытый контур ПЕРЕМЕНА"}</span>
      </div>
      <div className="chat-thread" role="log" aria-live="polite">
        {messages.length === 0 && <p className="chat-empty">{emptyHint}</p>}
        {messages.map((message) => (
          <article
            key={message.id}
            className={`chat-bubble ${message.role}${message.safety ? " blocked" : ""}`}
          >
            <p>{message.text}</p>
            {message.safety && (
              <p className={`chat-safety${message.safety.escalated ? " escalated" : ""}`}>
                {message.safety.warning}
              </p>
            )}
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
        {locked && (
          <div className="chat-pending" role="status">
            <span className="pending-dot" aria-hidden="true" />
            Копайлот готовит ответ…
          </div>
        )}
      </div>
      {sendFailed && <p className="copilot-hint" role="status">Запрос сохранён в поле ввода. Его можно отправить ещё раз.</p>}
      {safetyNotice && (
        <p
          className={`chat-safety-banner${safetyNotice.escalated ? " escalated" : ""}`}
          role="status"
        >
          {safetyNotice.escalated
            ? `Повторное нарушение (${safetyNotice.repeatCount}): ${safetyNotice.warning}`
            : safetyNotice.warning}
        </p>
      )}
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
      <form className="chat-composer" onSubmit={(event) => void onSubmit(event)}>
        <label className="sr-only" htmlFor="analysis-prompt">
          Сообщение копайлоту
        </label>
        <input
          id="analysis-prompt"
          className="chat-composer-input"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={
            locked ? "Копайлот думает…" : `${name}, спросите про таблицу, фильтр, Excel или источники…`
          }
          autoComplete="off"
          disabled={locked}
          readOnly={locked}
          aria-busy={locked}
        />
        <button className="chat-send" type="submit" disabled={locked || prompt.trim().length < 2}>
          {locked ? "…" : "Отправить"}
        </button>
      </form>
    </section>
  );
}
