import type { SourceState } from "@peremena/contracts";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SourceGrid } from "./index";

const sources: SourceState[] = [
  { source: "Wildberries", status: "done" },
  { source: "Ozon", status: "error", message: "VNC 127.0.0.1:5901 ssh -L" },
];

describe("SourceGrid RBAC", () => {
  it("hides connectors and telemetry from managers", () => {
    const html = renderToStaticMarkup(<SourceGrid sources={sources} role="manager" />);
    expect(html).toBe("");
    expect(html).not.toContain("Коннекторы");
    expect(html).not.toContain("VNC");
    expect(html).not.toContain("Пройти проверку");
  });

  it("shows admin connector statuses including source messages", () => {
    const html = renderToStaticMarkup(<SourceGrid sources={sources} role="admin" />);
    expect(html).toContain("Коннекторы и агрегаторы");
    expect(html).toContain("Wildberries");
    expect(html).toContain("VNC 127.0.0.1:5901");
    expect(html).not.toContain("Пройти проверку");
  });
});
