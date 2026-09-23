import type { AnalysisResult, ChatSafetyInfo, OfferCitation } from "@peremena/contracts";
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
  run: (searchId: string, promptText?: string) => Promise<AnalysisResult>;
  chat: (promptText: string) => Promise<AnalysisResult>;
}

const emptyMessages: ChatMessage[] = [];

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  prompt: "",
  analysis: undefined,
  messages: emptyMessages,
  busy: false,
  safetyNotice: undefined,
  setPrompt: (prompt) => set({ prompt }),
  reset: () =>
    set({ analysis: undefined, messages: emptyMessages, prompt: "", safetyNotice: undefined }),
  appendLocal: (userText, assistantText) =>
    set((current) => ({
      messages: [
        ...current.messages,
        { id: nextId(), role: "user", text: userText, citations: [] },
        { id: nextId(), role: "assistant", text: assistantText, citations: [] },
      ],
    })),
  run: async (searchId, promptText) => {
    const prompt = (promptText ?? get().prompt).trim();
    if (prompt.length < 2) throw new Error("Пустой запрос");
    set((current) => ({
      busy: true,
      prompt: "",
      messages: [...current.messages, { id: nextId(), role: "user", text: prompt, citations: [] }],
    }));
    try {
      const analysis = await analysisApi.analyze(searchId, prompt);
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
            text: analysis.summary,
            citations: analysis.citations ?? [],
            ...(analysis.safety ? { safety: analysis.safety } : {}),
          },
        ],
      }));
      return analysis;
    } catch {
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
  chat: async (promptText) => {
    const prompt = promptText.trim();
    if (prompt.length < 2) throw new Error("Пустой запрос");
    set((current) => ({
      busy: true,
      prompt: "",
      messages: [...current.messages, { id: nextId(), role: "user", text: prompt, citations: [] }],
    }));
    try {
      const analysis = await analysisApi.chat(prompt);
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
            text: analysis.summary,
            citations: analysis.citations ?? [],
            ...(analysis.safety ? { safety: analysis.safety } : {}),
          },
        ],
      }));
      return analysis;
    } catch {
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
