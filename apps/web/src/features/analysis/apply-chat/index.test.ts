import { describe, expect, it } from "vitest";

import { localMetaReply, localSearchQuery, wantsNewSearch } from "./index.js";

describe("wantsNewSearch", () => {
  it("accepts explicit search directives", () => {
    expect(wantsNewSearch("Уточни модель G102")).toBe(true);
    expect(wantsNewSearch("Найди Logitech mouse")).toBe(true);
    expect(wantsNewSearch("Запусти поиск SSD")).toBe(true);
  });

  it("rejects ordinary chat questions", () => {
    expect(wantsNewSearch("Кто ты и чем помогаешь?")).toBe(false);
    expect(wantsNewSearch("Только REAL")).toBe(false);
    expect(wantsNewSearch("Сравни топ-3")).toBe(false);
    expect(wantsNewSearch("Что такое демо-цены?")).toBe(false);
  });
});

describe("localSearchQuery", () => {
  it("strips directive prefixes", () => {
    expect(localSearchQuery("Уточни модель G102")).toBe("G102");
    expect(localSearchQuery("Найди Logitech G102")).toBe("Logitech G102");
  });
});

describe("localMetaReply", () => {
  it("answers help without snapshot", () => {
    const reply = localMetaReply("Кто ты и чем помогаешь?", "Администратор", "admin");
    expect(reply).toMatch(/копайлот закупок/i);
    expect(reply).not.toMatch(/выберите товар/i);
  });

  it("answers demo FAQ", () => {
    expect(localMetaReply("Что такое демо-цены?", "Михаил", "manager")).toMatch(/демо/i);
  });

  it("defers table-bound asks", () => {
    expect(localMetaReply("Сравни топ-3", "Михаил", "manager")).toBeUndefined();
    expect(localMetaReply("Только REAL", "Михаил", "manager")).toBeUndefined();
  });
});
