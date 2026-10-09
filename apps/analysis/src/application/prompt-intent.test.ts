import { describe, expect, it } from "vitest";
import { extractSearchQuery } from "./prompt-intent.js";
describe("chat product extraction", () => {
  it.each([['найди мне `12400F`', '12400F'], ['пожалуйста, найди мне процессор 12400F', 'процессор 12400F'], ['поищи для меня «i5-12400F»', 'i5-12400F'], ['Logitech G102', 'Logitech G102']])("cleans %s", (prompt, expected) => { expect(extractSearchQuery(prompt)).toBe(expected); });
});
