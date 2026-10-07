import ExcelJS from "exceljs";
import type { SearchSnapshot } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { exportSearch } from "./export-service.js";

describe("exportSearch", () => {
  it("writes a header, one row per offer and marks doubtful prices", async () => {
    const snapshot = {
      id: "s",
      query: "q",
      status: "complete",
      sources: [],
      product: { name: "X" },
      offers: [
        { id: "1", source: "A", seller: "A", title: "T1", price: 1, priceCondition: "Обычная цена", availability: "В наличии", url: "u", fetchedAt: "t", demo: false, priceAnomaly: "too_low", assessment: { group: "needs_review", reasons: ["Цена требует проверки", "Заявление продавца не является доказательством"] } },
        { id: "2", source: "B", seller: "B", title: "T2", price: 900, priceCondition: "Обычная цена", availability: "В наличии", url: "u", fetchedAt: "t", demo: true, assessment: { group: "match", reasons: ["=SUM(1,1)"] } },
        { id: "3", source: "C", seller: "C", title: "T3", price: 950, priceCondition: "Обычная цена", availability: "В наличии", url: "u", fetchedAt: "t", demo: false },
      ],
    } as unknown as SearchSnapshot;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load((await exportSearch(snapshot)) as unknown as ArrayBuffer);
    const sheet = workbook.getWorksheet("Предложения")!;
    expect(sheet.rowCount).toBe(4);
    expect(sheet.getRow(2).getCell(7).value).toBe("Цена под сомнением");
    expect(sheet.getRow(3).getCell(7).value ?? "").toBe("");
    expect(sheet.getRow(3).getCell(14).value).toBe("Да");
    expect(sheet.getRow(2).getCell(4).value).toBe("не указан");
    expect(sheet.getRow(1).getCell(15).value).toBe("Группа проверки");
    expect(sheet.getRow(1).getCell(16).value).toBe("Причины проверки");
    expect(sheet.getRow(2).getCell(15).value).toBe("Требует уточнения");
    expect(sheet.getRow(2).getCell(16).value).toBe("Цена требует проверки; Заявление продавца не является доказательством");
    expect(sheet.getRow(3).getCell(15).value).toBe("Основная группа");
    expect(sheet.getRow(3).getCell(16).value).toBe("=SUM(1,1)");
    expect(sheet.getRow(3).getCell(16).value).not.toEqual(expect.objectContaining({ formula: expect.anything() }));
    expect(sheet.getRow(4).getCell(15).value ?? "").toBe("");
    expect(sheet.getRow(4).getCell(16).value ?? "").toBe("");
    expect(sheet.autoFilter).toBe("A1:P1");
  });
});
