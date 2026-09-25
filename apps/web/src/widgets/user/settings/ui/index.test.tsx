import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("features/user", () => ({
  logout: vi.fn(),
}));
vi.mock("entities/analysis", () => ({
  useAnalysisStore: (
    selector: (value: { setPrompt: (next: string) => void }) => unknown,
  ) => selector({ setPrompt: vi.fn() }),
}));
vi.mock("entities/user", () => ({
  useUserStore: (
    selector: (value: {
      user: {
        role: "manager";
        city: string;
        displayName: string;
        login: string;
        analysisPrompt: string;
      };
      saveSettings: () => Promise<void>;
    }) => unknown,
  ) =>
    selector({
      user: {
        role: "manager",
        city: "Воронеж",
        displayName: "Мария Соколова",
        login: "m.sokolova",
        analysisPrompt: "Сравни предложения",
      },
      saveSettings: vi.fn(),
    }),
}));

import { UserSettings } from "./index";

describe("UserSettings", () => {
  it("keeps logout on the settings page and stays manager-safe", () => {
    const html = renderToStaticMarkup(<UserSettings onBack={() => undefined} />);
    expect(html).toContain("settings-page");
    expect(html).toContain("settings-title-short");
    expect(html).toContain("Настройки и профиль");
    expect(html).toContain("settings-nav-short");
    expect(html).toContain("settings-logout");
    expect(html).toContain("Выйти");
    expect(html).toContain("Сохранить изменения");
    expect(html).not.toContain("Коннекторы");
    expect(html).not.toContain("Пройти проверку");
  });
});
