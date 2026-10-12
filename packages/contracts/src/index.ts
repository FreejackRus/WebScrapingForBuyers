import type { OfferAvailabilityStatus } from "./availability.js";
export { offerAvailabilityStatus, type OfferAvailabilityStatus } from "./availability.js";

export type MatchKind = "exact" | "probable" | "analog" | "doubtful";
export type ProductCondition = "new" | "refurbished" | "used" | "display" | "unknown";
export type SourceStatus = "pending" | "loading" | "done" | "error";

export interface Product {
  id: string;
  brand: string;
  model: string;
  name: string;
  mpn: string;
  category: string;
  characteristics: Record<string, string>;
}

export interface Offer {
  id: string;
  source: string;
  seller: string;
  title: string;
  mpn?: string;
  price: number;
  oldPrice?: number;
  priceCondition: string;
  currency: "RUB";
  availability: string;
  /** Source-reported availability; optional for older snapshots. */
  availabilityStatus?: OfferAvailabilityStatus;
  delivery?: string;
  warranty?: string;
  condition: ProductCondition;
  /** Server-calculated procurement order; lower values are considered first. */
  procurementRank?: number;
  match: MatchKind;
  /** Deterministic query assessment. Seller claims are not authenticity verification. */
  assessment?: {
    group: "match" | "needs_review";
    /** Manager-readable explanations; no connector or model internals. */
    reasons: string[];
  };
  url: string;
  /** Public https product photo from the source listing, when it provides one. */
  imageUrl?: string;
  /**
   * Set by search when the price is implausibly low against the other offers
   * for the same product (typically a parser or shop-side error). Such rows stay
   * visible but never count as the best price.
   */
  priceAnomaly?: "too_low";
  /**
   * Re-check of a top row on the product card itself, after collection.
   * confirmed — price, stock and model hold; price_changed — the card asks another price
   * (now in `price`, the listed one in `listedPrice`); unavailable — the card is out of stock;
   * mismatch — the card does not show the requested model.
   */
  verification?: {
    status: "confirmed" | "price_changed" | "unavailable" | "mismatch";
    checkedAt: string;
    note: string;
    listedPrice?: number;
  };
  fetchedAt: string;
  demo: boolean;
}

export interface SourceState {
  source: string;
  status: SourceStatus;
  /** Admin-only raw transport text. Gateway strips this for managers. */
  message?: string;
}

export interface SearchSnapshot {
  id: string;
  query: string;
  product: Product;
  status: "running" | "complete";
  offers: Offer[];
  sources: SourceState[];
}

/** One remembered search of one user; `product` lets the buyer repeat it exactly. */
export interface SearchHistoryEntry {
  id: string;
  query: string;
  product: Product;
  createdAt: string;
}

export type SearchEvent =
  | { type: "snapshot"; data: SearchSnapshot }
  | { type: "source"; data: SourceState }
  | { type: "offers"; data: Offer[] }
  | { type: "complete"; data: SearchSnapshot };

export interface OfferCitation {
  offerId: string;
  url: string;
  label: string;
}

export interface OfferTableFilter {
  packaging?: "BOX" | "OEM";
  conditions?: ProductCondition[];
  realOnly?: boolean;
  sources?: string[];
  maxPrice?: number;
  /** Keep only rows with source-reported in_stock status (legacy text supported). */
  inStockOnly?: boolean;
  selectedOfferIds?: string[];
  /** Keep rows whose title contains at least one of these tokens (lowercase match). */
  titleIncludeAny?: string[];
  /** Drop rows whose title contains any of these tokens (lowercase match). */
  titleExcludeAny?: string[];
}

export type UserRole = "admin" | "manager";

export type ChatSafetyCategory = "insult" | "bypass" | "offtopic";

export type ChatIntent =
  | "explain"
  | "filter"
  | "search"
  | "help"
  | "export"
  | "sources"
  | "ranking"
  | "demo"
  | "admin"
  | "blocked";

/** One earlier line of the copilot conversation, oldest first. */
export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

export interface AnalysisContext {
  tableFilter?: OfferTableFilter;
  selectedOfferIds?: string[];
}

export interface AnalyzeRequest {
  /** Untrusted selection hints; facts are resolved from the server snapshot. */
  context?: AnalysisContext;
  prompt: string;
  /** Last turns before `prompt` so «было же наличие» has something to refer to. Untrusted. */
  history?: ChatTurn[];
  /** Display name from session/settings (e.g. «Михаил»). Gateway injects it. */
  userName?: string;
  userRole?: UserRole;
  /** Login for safety incident logs only — never a password. Gateway injects it. */
  userLogin?: string;
}

export interface ChatSafetyInfo {
  category: ChatSafetyCategory;
  warning: string;
  repeatCount: number;
  escalated: boolean;
}

export interface AnalysisResult {
  clarificationQuestion?: string;
  /** Snapshot this answer belongs to; prevents applying stale responses. */
  searchId?: string;
  summary: string;
  selectedOfferIds: string[];
  appliedFilters: string[];
  warnings: string[];
  provider?: string;
  citations?: OfferCitation[];
  tableFilter?: OfferTableFilter;
  intent?: ChatIntent;
  searchQuery?: string;
  safety?: ChatSafetyInfo;
}

export interface SessionUser {
  id: string;
  login: string;
  displayName: string;
  role: UserRole;
  city: string;
  analysisPrompt: string;
}

export interface UserSettings {
  displayName: string;
  city: string;
  analysisPrompt: string;
}

/** Source remains visible while collection is temporarily unavailable. */
export interface DisabledSearchSource {
  name: string;
  reason: string;
}
export interface SearchSourcesResponse {
  sources: string[];
  disabledSources?: DisabledSearchSource[];
}

/** Where a row comes from: a B2B distributor (invoice with VAT) or a retail marketplace. */
export type OfferChannel = "marketplace" | "distributor";

/** Source names of distributors, as adapters report them. Everything else is a marketplace. */
export const DISTRIBUTOR_SOURCES: readonly string[] = [
  "NETLAB", "OCS", "MERLION", "Treolan", "Марвел", "Servermall", "СРВТрейд", "Онлайнтрейд", "Регард", "Хардпрайс", "ТоргPC",
];

export function offerChannel(offer: Pick<Offer, "source">): OfferChannel {
  const source = offer.source.trim().toLocaleLowerCase("ru");
  return DISTRIBUTOR_SOURCES.some((name) => name.toLocaleLowerCase("ru") === source) ? "distributor" : "marketplace";
}

/**
 * What the local AI read from a free-text request. Raw model output: the search service
 * keeps only fields that are literally present in the typed text (see mergeUnderstanding).
 */
export interface QueryUnderstanding {
  productType?: string;
  brand?: string;
  model?: string;
  mpn?: string;
  quantity?: number;
  condition?: ProductCondition;
  origin?: "original" | "compatible";
}

/** AI verdict on a row the deterministic checks sent to «требует уточнения». Advice, not a decision. */
export interface OfferReviewItem {
  offerId: string;
  verdict: "fits" | "not_fit" | "unclear";
  reason: string;
}

export interface OfferReviewResponse {
  items: OfferReviewItem[];
  /** Name of the model, or a note that AI was unavailable. */
  provider: string;
}

/** Purchase justification memo for one chosen row. */
export interface JustificationResponse {
  text: string;
  /** false when AI was unavailable and the memo is the deterministic template. */
  ai: boolean;
  provider: string;
}

// ---------------------------------------------------------------- basket (корзина закупки)

/** Snapshot of the offer fields a basket line needs; the search snapshot may expire. */
export interface BasketOffer {
  source: string;
  seller: string;
  title: string;
  mpn?: string;
  price: number;
  priceCondition: string;
  availability: string;
  condition: ProductCondition;
  url: string;
  verificationNote?: string;
}

export interface BasketItem {
  id: string;
  addedAt: string;
  query: string;
  quantity: number;
  offer: BasketOffer;
}

export interface BasketResponse {
  items: BasketItem[];
}

/** One position of a free-text bulk request («заявка списком»). */
export interface RequestPosition {
  query: string;
  quantity: number;
}

export interface SplitRequestResponse {
  items: RequestPosition[];
  ai: boolean;
}
