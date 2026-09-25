import { describe, expect, it } from "vitest";

import {
  SOURCE_UNAVAILABLE,
  hasInfraLeak,
  publicSourceLine,
  sanitizeAnalysisResult,
  sanitizeUserFacingText,
} from "./infra-leak.js";

describe("infra-leak", () => {
  it("detects operator runbooks and connector tool names", () => {
    expect(hasInfraLeak("VNC: ssh -L 5901:127.0.0.1:5901")).toBe(true);
    expect(hasInfraLeak("MCP wb_search вернул пусто")).toBe(true);
    expect(hasInfraLeak("CHROME_CDP 9222 chrome-headed")).toBe(true);
    expect(hasInfraLeak("ru-marketplace-mcp handoff Qrator")).toBe(true);
    expect(hasInfraLeak("VCN и M.C.P недоступны")).toBe(true);
    expect(hasInfraLeak("HTTP 403 на search.wb.ru")).toBe(true);
    expect(hasInfraLeak("C-D-P 9222")).toBe(true);
    expect(hasInfraLeak("Ответила Qwen3 через Ollama hf.co")).toBe(true);
    expect(hasInfraLeak("Лучший вариант: Wildberries, 8 990 ₽.")).toBe(false);
  });

  it("replaces leaky sentences and keeps the purchase text", () => {
    expect(
      sanitizeUserFacingText(
        "Лучший вариант — Wildberries. VNC: ssh -L 5901:127.0.0.1:5901, открыть chrome-headed.",
      ),
    ).toBe("Лучший вариант — Wildberries.");
    expect(sanitizeUserFacingText("MCP wb_search упал, прогрев в VNC.")).toBe(SOURCE_UNAVAILABLE);
    expect(sanitizeUserFacingText("Источник недоступен. HTTP 403 на search.wb.ru.")).toBe("Источник недоступен.");
    expect(sanitizeUserFacingText("Рекомендую Wildberries. Я Qwen3 через Ollama.")).toBe("Рекомендую Wildberries.");
  });

  it("never copies source.message into public source lines", () => {
    expect(
      publicSourceLine({
        source: "Wildberries",
        status: "error",
        message: "VNC: ssh -L 5901… MCP wb_search",
      } as { source: string; status: "error"; message: string }),
    ).toBe(`Wildberries: ${SOURCE_UNAVAILABLE}`);
    expect(publicSourceLine({ source: "Ситилинк", status: "done" })).toBe("Ситилинк: данные получены");
    expect(publicSourceLine({ source: "Ozon", status: "loading" })).toBe("Ozon: сбор идёт");
  });

  it("hides model identity from managers while preserving it for admins", () => {
    const result = {
      summary: "Лучшее предложение найдено.",
      selectedOfferIds: [],
      appliedFilters: [],
      warnings: [],
      provider: "Ollama · hf.co/Qwen3",
    };
    expect(sanitizeAnalysisResult(result, "manager").provider).toBe("Закрытый контур ПЕРЕМЕНА");
    expect(sanitizeAnalysisResult(result).provider).toBe("Закрытый контур ПЕРЕМЕНА");
    expect(sanitizeAnalysisResult(result, "admin").provider).toBe(result.provider);
  });

  it("does not claim a marketplace outage when a model-only answer is suppressed", () => {
    const result = sanitizeAnalysisResult({
      summary: "Я Qwen3 через Ollama.",
      selectedOfferIds: [],
      appliedFilters: [],
      warnings: [],
    }, "manager");
    expect(result.summary).toBe("Не удалось подготовить ответ; проверьте предложения в таблице.");
  });

  it("sanitizes analysis summary, warnings and citation labels", () => {
    const result = sanitizeAnalysisResult({
      summary: "Площадка упала. VNC: ssh -L 5901:127.0.0.1:5901, MCP wb_search.",
      selectedOfferIds: [],
      appliedFilters: ["Фильтр по цене.", "CHROME_CDP 9222 chrome-headed"],
      warnings: ["marketplace-mcp handoff"],
      citations: [
        {
          offerId: "1",
          url: "https://www.wildberries.ru/catalog/1",
          label: "Wildberries, 8 990 ₽ — открыть",
        },
        {
          offerId: "2",
          url: "https://example.com/2",
          label: "Ozon — VNC 5901",
        },
      ],
    });
    expect(result.summary).toBe("Площадка упала.");
    expect(result.summary).not.toMatch(/VNC|ssh|5901|wb_search|MCP/i);
    expect(result.warnings).toEqual([SOURCE_UNAVAILABLE]);
    expect(result.appliedFilters).toEqual(["Фильтр по цене.", SOURCE_UNAVAILABLE]);
    expect(result.citations?.[0]?.label).toBe("Wildberries, 8 990 ₽ — открыть");
    expect(result.citations?.[1]?.label).toBe("Открыть предложение");
  });
});
