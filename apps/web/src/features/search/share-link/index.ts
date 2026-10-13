import type { OfferChannel, Product } from "@peremena/contracts";

/**
 * A shareable link to a search: the chosen product (and tab) travel in the URL hash,
 * so opening the link on another machine starts the same search for a signed-in colleague.
 * The hash never reaches the server logs and holds no prices — the search runs anew.
 */
const KEY = "search";

interface SharedSearch {
  product: Product;
  channel?: OfferChannel;
}

const toBase64Url = (text: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(text))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
const fromBase64Url = (value: string) => {
  const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
};

export function encodeSearchLink(base: string, product: Product, channel?: OfferChannel): string {
  const payload: SharedSearch = {
    product: { ...product, characteristics: {} },
    ...(channel ? { channel } : {}),
  };
  return `${base.split("#")[0]}#${KEY}=${toBase64Url(JSON.stringify(payload))}`;
}

export function decodeSearchLink(hash: string): SharedSearch | undefined {
  const match = new RegExp(`(?:^#|&)${KEY}=([A-Za-z0-9_-]+)`, "u").exec(hash);
  if (!match) return undefined;
  try {
    const raw = JSON.parse(fromBase64Url(match[1]!)) as Partial<SharedSearch>;
    const product = raw.product;
    if (!product || typeof product.name !== "string" || !product.name.trim()) return undefined;
    const text = (value: unknown) => (typeof value === "string" ? value.slice(0, 200) : "");
    return {
      product: {
        id: text(product.id) || `shared-${Date.now()}`,
        brand: text(product.brand),
        model: text(product.model),
        name: text(product.name),
        mpn: text(product.mpn),
        category: text(product.category),
        characteristics: {},
      },
      ...(raw.channel === "marketplace" || raw.channel === "distributor" ? { channel: raw.channel } : {}),
    };
  } catch {
    return undefined;
  }
}
