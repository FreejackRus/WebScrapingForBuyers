import { createService } from "@peremena/service-kit";

import { SearchService } from "./application/search-service.js";
import type { SourceAdapter } from "./domain/source-adapter.js";
import { reliabilityRoutes } from "./http/reliability-routes.js";
import { searchRoutes } from "./http/routes.js";
import { PriceHistoryStore } from "./infrastructure/history/price-history-store.js";
import { QualityEvaluator } from "./application/quality-eval.js";
import { SourceMonitor } from "./application/source-monitor.js";
import { productFromQuery } from "./domain/product-from-query.js";
import { createDistributorSourcesFromEnv } from "./infrastructure/sources/b2b-distributor-adapter.js";
import { createDemoSources } from "./infrastructure/sources/demo-source-adapter.js";
import { mergeSourceFallbacks } from "./infrastructure/sources/fallback-source-adapter.js";
import { createCitilinkAgentSources } from "./infrastructure/sources/citilink-agent-adapter.js";
import { createHttpMarketplaceSources } from "./infrastructure/sources/http-marketplace-adapter.js";
import { createCardVerifiersFromEnv } from "./infrastructure/sources/card-verifiers.js";
import { createMarketplaceSourcesFromEnv } from "./infrastructure/sources/mcp-marketplace-adapter.js";

/** Local-only fake prices. Never enable in production/hybrid compose. */
export function allowDemoSources(): boolean {
  const raw = process.env.ALLOW_DEMO_SOURCES?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

export function buildSearchApp(options: { sources?: SourceAdapter[]; logger?: boolean; priceHistory?: PriceHistoryStore } = {}) {
  const app = createService({ logger: options.logger ?? false });
  // PRICE_HISTORY_FILE points at a volume in production; without it the series live in memory only.
  const priceHistory = options.priceHistory ?? new PriceHistoryStore(process.env.PRICE_HISTORY_FILE);
  app.addHook("onClose", async () => {
    await priceHistory.flush();
  });
  // The office agent goes first for Ситилинк: the MCP connector is blocked from the server IP.
  const realSources = mergeSourceFallbacks([
    createCitilinkAgentSources(),
    createMarketplaceSourcesFromEnv(),
    createHttpMarketplaceSources(),
    createDistributorSourcesFromEnv(),
  ]);
  const realNames = new Set(realSources.map((source) => source.name));
  const demoSources = allowDemoSources()
    ? createDemoSources().filter((source) => !realNames.has(source.name))
    : [];
  const sources = options.sources ?? [...realSources, ...demoSources];
  const searchService = new SearchService(sources, undefined, undefined, undefined, options.sources ? [] : createCardVerifiersFromEnv(), undefined, priceHistory);
  void app.register(searchRoutes, {
    searchService,
    priceHistory,
    mode: realSources.length > 0 ? "hybrid" : demoSources.length > 0 ? "demo" : "hybrid",
  });
  registerReliability(app, searchService, options.sources === undefined);
  return app;
}

/**
 * Source canaries + weekly quality eval. Files live on the search-data volume (added to compose by
 * the price-history package). Schedules only run in the real server, not in tests with fake sources.
 */
function registerReliability(app: ReturnType<typeof createService>, searchService: SearchService, schedule: boolean) {
  const monitor = new SourceMonitor(() => searchService.resolveSources(), {
    ...(process.env.SOURCE_MONITOR_FILE ? { file: process.env.SOURCE_MONITOR_FILE } : {}),
  });
  const quality = new QualityEvaluator(
    async (query) => (await searchService.runUncached(query, productFromQuery(query, "query"))).offers,
    undefined,
    process.env.QUALITY_FILE || undefined,
  );
  void app.register(reliabilityRoutes, { monitor, quality });
  if (schedule) {
    monitor.schedule(envNumber("SOURCE_MONITOR_MINUTES", 60));
    void quality.schedule(envNumber("QUALITY_EVAL_DAYS", 7));
  }
  app.addHook("onClose", async () => {
    monitor.stop();
    quality.stop();
  });
}

function envNumber(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  const value = raw ? Number(raw) : NaN;
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}
