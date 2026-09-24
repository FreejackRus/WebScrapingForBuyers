import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const analysisState = vi.hoisted(() => ({
  prompt: "",
  analysis: undefined,
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
  useUserStore: (selector: (value: { user: { displayName: string } }) => unknown) =>
    selector({ user: { displayName: "Анна Менеджер" } }),
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
    expect(html).toContain("спросите про таблицу");
    expect(html).toContain("Отправить");
    expect(html).not.toContain("Пройти проверку");
  });
});
