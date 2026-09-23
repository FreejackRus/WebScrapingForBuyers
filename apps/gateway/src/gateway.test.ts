import { afterEach, describe, expect, it } from "vitest";

import { buildGatewayApp } from "./app.js";
import { presentSnapshot } from "./present.js";

const apps: ReturnType<typeof buildGatewayApp>[] = [];
afterEach(async () => Promise.all(apps.splice(0).map((app) => app.close())));

describe("gateway", () => {
  it("rejects search without a session", async () => {
    const app = buildGatewayApp();
    apps.push(app);
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/suggestions",
      payload: { query: "мышь Logitech" },
    });
    expect(response.statusCode).toBe(401);
  });

  it("hides connector error text from managers", () => {
    const snapshot = presentSnapshot(
      {
        id: "1",
        query: "q",
        product: {
          id: "p",
          brand: "Logitech",
          model: "M185",
          name: "M185",
          mpn: "1",
          category: "Мыши",
          characteristics: {},
        },
        status: "complete",
        offers: [],
        sources: [
          {
            source: "Ozon",
            status: "error",
            message: "HTTP 403 ssh -L 5901:127.0.0.1:5901",
          },
        ],
      },
      {
        id: "u",
        login: "manager",
        displayName: "Менеджер",
        role: "manager",
        city: "Воронеж",
        analysisPrompt: "x",
      },
    );
    expect(snapshot?.sources[0]).toEqual({ source: "Ozon", status: "error" });
    expect(JSON.stringify(snapshot)).not.toMatch(/ssh|5901|HTTP 403/i);
  });

  it("hides WB rate-limit telemetry from managers", () => {
    const snapshot = presentSnapshot(
      {
        id: "2",
        query: "q",
        product: {
          id: "p",
          brand: "Logitech",
          model: "G102",
          name: "G102",
          mpn: "1",
          category: "Мыши",
          characteristics: {},
        },
        status: "complete",
        offers: [],
        sources: [
          {
            source: "Wildberries",
            status: "error",
            message: "WB rate-limited (429). Показаны последние удачные REAL-предложения.",
          },
        ],
      },
      {
        id: "u",
        login: "manager",
        displayName: "Менеджер",
        role: "manager",
        city: "Воронеж",
        analysisPrompt: "x",
      },
    );
    expect(snapshot?.sources[0]).toEqual({ source: "Wildberries", status: "error" });
  });
});
