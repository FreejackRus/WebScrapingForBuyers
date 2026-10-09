import type { AnalyzeRequest, AnalysisResult, ChatSafetyInfo, ChatTurn, OfferCitation } from "@peremena/contracts";
import { create } from "zustand";

import { analysisApi } from "../api";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  citations: OfferCitation[];
  safety?: ChatSafetyInfo;
}

interface AnalysisState {
  prompt: string;
  analysis: AnalysisResult | undefined;
  messages: ChatMessage[];
  busy: boolean;
  safetyNotice: ChatSafetyInfo | undefined;
  setPrompt: (prompt: string) => void;
  reset: () => void;
  appendLocal: (userText: string, assistantText: string) => void;
  run: (searchId: string, promptText?: string, context?: AnalyzeRequest["context"], isCurrent?: () => boolean) => Promise<AnalysisResult | undefined>;
  chat: (promptText: string, isCurrent?: () => boolean) => Promise<AnalysisResult | undefined>;
}

const emptyMessages: ChatMessage[] = [];

/** Turns that never reached the model are not conversation. */
const TRANSPORT_FAILURES = new Set([
  "Не удалось обратиться к анализу. Повторите запрос.",
  "Не удалось обратиться к модели. Повторите запрос.",
]);
const HISTORY_TURNS = 6;

/** The last turns shown in the chat, oldest first, sent so the copilot can follow the thread. */
export function chatHistory(messages: ChatMessage[]): ChatTurn[] {
  return messages
    .filter((message) => !TRANSPORT_FAILURES.has(message.text))
    .slice(-HISTORY_TURNS)
    .map((message) => ({ role: message.role, text: message.text }));
}

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

let requestGeneration = 0;

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  prompt: "",
  analysis: undefined,
  messages: emptyMessages,
  busy: false,
  safetyNotice: undefined,
  setPrompt: (prompt) => set({ prompt }),
  reset: () => {
    requestGeneration += 1;
    set({ analysis: undefined, messages: emptyMessages, prompt: "", safetyNotice: undefined, busy: false });
  },
  appendLocal: (userText, assistantText) =>
    set((current) => ({
      messages: [
        ...current.messages,
        { id: nextId(), role: "user", text: userText, citations: [] },
        { id: nextId(), role: "assistant", text: assistantText, citations: [] },
      ],
    })),
  run: async (searchId, promptText, context, isCurrent = () => true) => {
    const prompt = (promptText ?? get().prompt).trim();
    if (prompt.length < 2) throw new Error("Пустой запрос");
    const generation = ++requestGeneration;
    const current = () => generation === requestGeneration && isCurrent();
    const history = chatHistory(get().messages);
    set((current) => ({
      busy: true,
      prompt: "",
      messages: [...current.messages, { id: nextId(), role: "user", text: prompt, citations: [] }],
    }));
    try {
      const analysis = await analysisApi.analyze(searchId, prompt, history, context);
      if (!current()) {
        if (generation === requestGeneration) set({ busy: false });
        return undefined;
      }
      set((current) => ({
        analysis,
        busy: false,
        prompt: "",
        safetyNotice: analysis.safety,
        messages: [
          ...current.messages,
          {
            id: nextId(),
            role: "assistant",
            text: analysis.clarificationQuestion ?? analysis.summary,
            citations: analysis.citations ?? [],
            ...(analysis.safety ? { safety: analysis.safety } : {}),
          },
        ],
      }));
      return analysis;
    } catch {
      if (!current()) {
        if (generation === requestGeneration) set({ busy: false });
        return undefined;
      }
      set((current) => ({
        busy: false,
        messages: [
          ...current.messages,
          {
            id: nextId(),
            role: "assistant",
            text: "Не удалось обратиться к анализу. Повторите запрос.",
            citations: [],
          },
        ],
      }));
      throw new Error("Ошибка анализа");
    }
  },
  chat: async (promptText, isCurrent = () => true) => {
    const prompt = promptText.trim();
    if (prompt.length < 2) throw new Error("Пустой запрос");
    const generation = ++requestGeneration;
    const current = () => generation === requestGeneration && isCurrent();
    const history = chatHistory(get().messages);
    set((current) => ({
      busy: true,
      prompt: "",
      messages: [...current.messages, { id: nextId(), role: "user", text: prompt, citations: [] }],
    }));
    try {
      const analysis = await analysisApi.chat(prompt, history);
      if (!current()) {
        if (generation === requestGeneration) set({ busy: false });
        return undefined;
      }
      set((current) => ({
        analysis,
        busy: false,
        prompt: "",
        safetyNotice: analysis.safety,
        messages: [
          ...current.messages,
          {
            id: nextId(),
            role: "assistant",
            text: analysis.clarificationQuestion ?? analysis.summary,
            citations: analysis.citations ?? [],
            ...(analysis.safety ? { safety: analysis.safety } : {}),
          },
        ],
      }));
      return analysis;
    } catch {
      if (!current()) {
        if (generation === requestGeneration) set({ busy: false });
        return undefined;
      }
      set((current) => ({
        busy: false,
        messages: [
          ...current.messages,
          {
            id: nextId(),
            role: "assistant",
            text: "Не удалось обратиться к модели. Повторите запрос.",
            citations: [],
          },
        ],
      }));
      throw new Error("Ошибка чата");
    }
  },
}));
