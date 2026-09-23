import ExcelJS from "exceljs";

import type { SearchSnapshot } from "@peremena/contracts";

export async function exportSearch(snapshot: SearchSnapshot): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ПЕРЕМЕНА Price Radar";
  const sheet = workbook.addWorksheet("Предложения");
  sheet.columns = [
    { header: "Источник", key: "source", width: 20 },
    { header: "Продавец", key: "seller", width: 22 },
    { header: "Товар", key: "title", width: 48 },
    { header: "Артикул", key: "mpn", width: 18 },
    { header: "Совпадение", key: "match", width: 15 },
    { header: "Цена, ₽", key: "price", width: 14 },
    { header: "Условие цены", key: "priceCondition", width: 22 },
    { header: "Наличие", key: "availability", width: 16 },
    { header: "Доставка", key: "delivery", width: 28 },
    { header: "Гарантия", key: "warranty", width: 16 },
    { header: "Ссылка", key: "url", width: 45 },
    { header: "Получено", key: "fetchedAt", width: 25 },
    { header: "Демо", key: "demo", width: 10 },
  ];
  sheet.getRow(1).font = { bold: true };
  sheet.autoFilter = "A1:M1";
  sheet.views = [{ state: "frozen", ySplit: 1 }];

  for (const offer of snapshot.offers) {
    sheet.addRow({
      ...offer,
      mpn: offer.mpn ?? "не указан",
      delivery: offer.delivery ?? "неизвестно",
      warranty: offer.warranty ?? "не указана",
      demo: offer.demo ? "Да" : "Нет",
    });
  }

  const data = await workbook.xlsx.writeBuffer();
  return Buffer.from(data);
}
