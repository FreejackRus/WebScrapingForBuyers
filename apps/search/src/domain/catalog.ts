import type { Product } from "@peremena/contracts";

export const products: Product[] = [
  {
    id: "logitech-mx-master-3s-graphite",
    brand: "Logitech",
    model: "MX Master 3S",
    name: "Мышь беспроводная Logitech MX Master 3S Graphite",
    mpn: "910-006559",
    category: "Мыши",
    characteristics: {
      цвет: "графит",
      подключение: "Bluetooth / Logi Bolt",
      сенсор: "8000 dpi",
    },
  },
  {
    id: "logitech-mx-master-3s-pale-grey",
    brand: "Logitech",
    model: "MX Master 3S",
    name: "Мышь беспроводная Logitech MX Master 3S Pale Grey",
    mpn: "910-006560",
    category: "Мыши",
    characteristics: {
      цвет: "светло-серый",
      подключение: "Bluetooth / Logi Bolt",
      сенсор: "8000 dpi",
    },
  },
  {
    id: "logitech-m185-grey",
    brand: "Logitech",
    model: "M185",
    name: "Мышь беспроводная Logitech M185 Grey",
    mpn: "910-002238",
    category: "Мыши",
    characteristics: {
      цвет: "серый",
      подключение: "USB",
      сенсор: "1000 dpi",
    },
  },
  {
    id: "logitech-g102-black",
    brand: "Logitech",
    model: "G102 Lightsync",
    name: "Мышь проводная Logitech G102 Lightsync Black",
    mpn: "910-005823",
    category: "Мыши",
    characteristics: {
      цвет: "чёрный",
      подключение: "USB",
      сенсор: "8000 dpi",
    },
  },
  {
    id: "logitech-k380-grey",
    brand: "Logitech",
    model: "K380",
    name: "Клавиатура беспроводная Logitech K380 Grey",
    mpn: "920-007584",
    category: "Клавиатуры",
    characteristics: {
      цвет: "серый",
      подключение: "Bluetooth",
      раскладка: "RU",
    },
  },
];

const normalize = (value: string) =>
  value.toLocaleLowerCase("ru").match(/[a-zа-яё0-9]+/giu)?.join(" ") ?? "";

export function suggestProducts(query: string, limit = 8): Product[] {
  const normalizedQuery = normalize(query);
  const queryTokens = new Set(normalizedQuery.split(" "));

  const score = (product: Product) => {
    const haystack = normalize(
      [
        product.brand,
        product.model,
        product.name,
        product.mpn,
        ...Object.values(product.characteristics),
      ].join(" "),
    );
    const tokens = new Set(haystack.split(" "));
    const overlap = [...queryTokens].filter((token) => tokens.has(token)).length;
    return overlap / Math.max(queryTokens.size, 1) + (haystack.includes(normalizedQuery) ? 1 : 0);
  };

  return products
    .map((product) => ({ product, score: score(product) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((item) => item.product);
}

export const findProduct = (id: string) => products.find((product) => product.id === id);
