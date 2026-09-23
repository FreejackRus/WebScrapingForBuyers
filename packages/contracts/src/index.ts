export type MatchKind = "exact" | "probable" | "analog" | "doubtful";
export type ProductCondition = "new" | "refurbished" | "used";
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
  delivery?: string;
  warranty?: string;
  condition: ProductCondition;
  match: MatchKind;
  url: string;
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
  realOnly?: boolean;
  sources?: string[];
  maxPrice?: number;
  selectedOfferIds?: string[];
}

export type ChatIntent = "explain" | "filter" | "search";

export interface AnalysisResult {
  summary: string;
  selectedOfferIds: string[];
  appliedFilters: string[];
  warnings: string[];
  provider?: string;
  citations?: OfferCitation[];
  tableFilter?: OfferTableFilter;
  intent?: ChatIntent;
  searchQuery?: string;
}

export type UserRole = "admin" | "manager";

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
