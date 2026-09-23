import type { AnalysisResult, OfferCitation } from "@peremena/contracts";
import { create } from "zustand";

import { analysisApi } from "../api";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  citations: OfferCitation[];
}

interface AnalysisState {
  prompt: string;
  analysis: AnalysisResult | undefined;
  messages: ChatMessage[];
  busy: boolean;
  setPrompt: (prompt: string) => void;
  reset: () => void;
  appendLocal: (userText: string, assistantText: string) => void;
  run: (searchId: string) => Promise<AnalysisResult>;
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
  setPrompt: (prompt) => set({ prompt }),
  reset: () => set({ analysis: undefined, messages: emptyMessages, prompt: "" }),
  appendLocal: (userText, assistantText) =>
    set((current) => ({
      messages: [
        ...current.messages,
        { id: nextId(), role: "user", text: userText, citations: [] },
        { id: nextId(), role: "assistant", text: assistantText, citations: [] },
      ],
    })),
  run: async (searchId) => {
    const prompt = get().prompt.trim();
    set((current) => ({
      busy: true,
      messages: [...current.messages, { id: nextId(), role: "user", text: prompt, citations: [] }],
    }));
    try {
      const analysis = await analysisApi.analyze(searchId, prompt);
      set((current) => ({
        analysis,
        busy: false,
        prompt: "",
        messages: [
          ...current.messages,
          {
            id: nextId(),
            role: "assistant",
            text: analysis.summary,
            citations: analysis.citations ?? [],
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
}));
