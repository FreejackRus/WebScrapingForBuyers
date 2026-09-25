import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const analysisState = vi.hoisted(() => ({
  prompt: "",
  analysis: undefined as { provider?: string; appliedFilters: string[] } | undefined,
  messages: [] as { id: string; role: string; text: string; citations: []; safety?: undefined }[],
  safetyNotice: undefined,
  busy: false,
  setPrompt: vi.fn(),
  run: vi.fn(),
  chat: vi.fn(),
}));

vi.mock("entities/analysis", () => ({
  useAnalysisStore: (selector: (value: typeof analysisState) => unknown) => selector(analysisState),
}));
vi.mock("entities/search", () => ({
  useSearchStore: (selector: (value: { snapshot: undefined }) => unknown) => selector({ snapshot: undefined }),
}));
vi.mock("entities/user", () => ({
  useUserStore: (selector: (value: { user: { displayName: string; role: string } }) => unknown) =>
    selector({ user: { displayName: "Анна Менеджер", role: "manager" } }),
}));
vi.mock("features/analysis", () => ({
  applyChatResult: vi.fn(),
}));

import { AnalysisChat } from "./index";

describe("AnalysisChat composer", () => {
  it("renders a normal input, gray placeholder and send button", () => {
    const html = renderToStaticMarkup(<AnalysisChat />);
    expect(html).toContain("chat-composer");
    expect(html).toContain('id="analysis-prompt"');
    expect(html).toContain("Спросите о товаре или модели");
    expect(html).toContain("Отправить");
    expect(html).toContain("chat-send");
    expect(html).toContain("chat-head-lead");
    expect(html).not.toContain("Пройти проверку");
  });

  it("does not render a model identifier for a manager even with an old API payload", () => {
    analysisState.analysis = { provider: "Ollama · hf.co/Qwen3", appliedFilters: [] };
    const html = renderToStaticMarkup(<AnalysisChat />);
    expect(html).toContain("Закрытый контур ПЕРЕМЕНА");
    expect(html).not.toContain("Ollama");
    expect(html).not.toContain("Qwen3");
    analysisState.analysis = undefined;
  });

  it("does not render applied filters below the conversation", () => {
    analysisState.analysis = {
      provider: "Закрытый контур ПЕРЕМЕНА",
      appliedFilters: ["Справочный ответ: отбор предложений не изменён."],
    };
    const html = renderToStaticMarkup(<AnalysisChat />);
    expect(html).not.toContain("Справочный ответ: отбор предложений не изменён.");
    expect(html).not.toContain("chat-filters");
    analysisState.analysis = undefined;
  });

  it("offers plain-language starter questions without exposing internal ranking details", () => {
    const html = renderToStaticMarkup(<AnalysisChat />);
    expect(html).toContain("Помоги уточнить модель");
    expect(html).toContain("Как сравнить предложения?");
    expect(html).not.toContain("Ранжирование по цене считает код");
  });
});
