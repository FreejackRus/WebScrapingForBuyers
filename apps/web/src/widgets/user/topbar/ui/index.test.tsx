import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("features/user", () => ({
  logout: vi.fn(),
}));
vi.mock("entities/user", () => ({
  useUserStore: (
    selector: (value: {
      user: { role: string; city: string; displayName: string };
      health: { mode: string };
    }) => unknown,
  ) =>
    selector({
      user: { role: "admin", city: "Воронеж", displayName: "Мария Соколова" },
      health: { mode: "hybrid" },
    }),
}));

import { Topbar } from "./index";

describe("Topbar", () => {
  it("keeps brand, city and profile controls without connectors in the header", () => {
    const html = renderToStaticMarkup(<Topbar view="search" onView={() => undefined} />);
    expect(html).toContain("topbar");
    expect(html).toContain("Price Radar");
    expect(html).toContain("city-label");
    expect(html).toContain("Воронеж");
    expect(html).toContain("Настройки");
    expect(html).toContain("Выйти");
    expect(html).toContain("Профиль, Мария Соколова");
    expect(html).not.toContain("Коннекторы");
    expect(html).not.toContain("Excel");
  });
});
