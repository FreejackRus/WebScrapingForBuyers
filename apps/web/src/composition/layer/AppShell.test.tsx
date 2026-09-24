import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("widgets/user", () => ({
  Topbar: () => <header>topbar</header>,
}));
vi.mock("entities/user", () => ({
  useUserStore: (selector: (value: { user: { role: string }; health: undefined }) => unknown) =>
    selector({ user: { role: "manager" }, health: undefined }),
}));

import { AppShell } from "./AppShell";

describe("AppShell mobile chat focus", () => {
  it("marks the shell when the copilot tab is active", () => {
    const chat = renderToStaticMarkup(
      <AppShell view="chat" onView={() => undefined}>
        <main>workspace</main>
      </AppShell>,
    );
    expect(chat).toContain("app-chat-focus");
    expect(chat).toContain("AI Копилот");
    expect(chat).not.toContain("Гибридный контур");
    expect(chat).not.toContain("Пройти проверку");

    const search = renderToStaticMarkup(
      <AppShell view="search" onView={() => undefined}>
        <main>workspace</main>
      </AppShell>,
    );
    expect(search).not.toContain("app-chat-focus");
  });
});
