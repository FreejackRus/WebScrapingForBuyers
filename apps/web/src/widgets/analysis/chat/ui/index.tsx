import type { FormEvent } from "react";
import { useRef, useState } from "react";

import {
  applyChatResult,
  localMetaReply,
  localSearchQuery,
  wantsNewSearch,
} from "features/analysis";
import { useAnalysisStore } from "entities/analysis";
import { useSearchStore } from "entities/search";
import { useUserStore } from "entities/user";

const basePresets = [
  "Кто ты и чем помогаешь?",
  "Только REAL",
  "Сравни топ-3",
  "Как выбираешь лучшее?",
  "Что такое демо-цены?",
  "Как выгрузить Excel?",
  "Какие источники в снимке?",
  "Уточни модель G102",
  "Оставь только реальные WB дешевле 6000",
];

const adminPresets = ["Где прогревать антибот по VNC?"];

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
  const appendLocal = useAnalysisStore((state) => state.appendLocal);
  const snapshot = useSearchStore((state) => state.snapshot);
  const setQuery = useSearchStore((state) => state.setQuery);
  const suggest = useSearchStore((state) => state.suggest);
  const sendingRef = useRef(false);
  const [sending, setSending] = useState(false);

  if (!user) return null;

  const name = firstName(user.displayName);
  const presets = user.role === "admin" ? [...basePresets, ...adminPresets] : basePresets;
  const locked = busy || sending;

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (trimmed.length < 2 || busy || sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    setPrompt("");
    try {
      if (!snapshot) {
        if (wantsNewSearch(trimmed)) {
          const query = localSearchQuery(trimmed);
          if (query.length >= 2) {
            setQuery(query);
            appendLocal(
              trimmed,
              "Уточните модель в карточках слева — после выбора начну сбор предложений.",
            );
            await suggest();
            return;
          }
        }
        const meta = localMetaReply(trimmed, name, user.role);
        if (meta) {
          appendLocal(trimmed, meta);
          return;
        }
        appendLocal(
          trimmed,
          `${name}, для фильтра, сравнения и разбора строк нужна таблица слева — выберите товар и дождитесь сбора. ` +
            "Справочные вопросы (кто я, демо, Excel, ранжирование) отвечаю и без снимка. " +
            "Новый сбор: «Уточни модель G102».",
        );
        return;
      }
      const result = await run(snapshot.id, trimmed);
      applyChatResult(result);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const text = prompt;
    setPrompt("");
    await send(text);
  };

  const emptyHint =
    `${name}, я копайлот закупок Price Radar — не общий чат. ` +
    "Спросите про снимок, фильтр таблицы, демо vs реальные цены, Excel, источники или уточните модель. " +
    "Ранжирование считает код; модель только объясняет.";

  return (
    <section className="chat-panel" aria-labelledby="analysis-title">
      <div className="chat-head">
        <div>
          <p className="eyebrow">Закрытый контур</p>
          <h2 id="analysis-title">AI-копайлот закупок</h2>
          <p>
            Для {name}: объясняю таблицу предложений. Фильтр и отбор строк считает код анализа.
          </p>
        </div>
        <span className="model-badge">{analysis?.provider ?? "Закрытый контур ПЕРЕМЕНА"}</span>
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
      </div>
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
      <div className="copilot-presets">
        {presets.map((item) => (
          <button type="button" key={item} disabled={locked} onClick={() => void send(item)}>
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
          placeholder={
            locked ? "Копайлот думает…" : `${name}, спросите про таблицу, фильтр, Excel или источники…`
          }
          autoComplete="off"
          disabled={locked}
          readOnly={locked}
          aria-busy={locked}
        />
        <button type="submit" disabled={locked || prompt.trim().length < 2}>
          {locked ? "Считаем…" : "Отправить"}
        </button>
      </form>
    </section>
  );
}
