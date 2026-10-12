import { describe, expect, it } from "vitest";

import { titleSpecs } from "./index";

describe("titleSpecs", () => {
  it.each([
    ["Samsung SSD 2Tb 990 PRO M.2 MZ-V9P2T0BW NVMe", ["2 ТБ", "NVMe"]],
    ["Kingston DDR5 DIMM 32GB 5600 FURY Beast", ["32 ГБ", "DDR5"]],
    ["Игровая память Fury Beast DIMM DDR4 32GB (2*16GB) 3200Mhz", ["2×16 ГБ", "DDR4", "3200 МГц"]],
    ["CPU Intel Core i5-12400F Alder Lake BOX", ["BOX"]],
    ["Картридж TL-5120 Pantum лазерный с чипом 3000 страниц", ["ресурс 3000"]],
    ["Мышь беспроводная Logitech M240 Silent", []],
  ])("%s", (title, specs) => {
    expect(titleSpecs(title)).toEqual(specs);
  });
});
