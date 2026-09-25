import { createService } from "@peremena/service-kit";

import { SearchService } from "./application/search-service.js";
import type { SourceAdapter } from "./domain/source-adapter.js";
import { searchRoutes } from "./http/routes.js";
import { createDistributorSourcesFromEnv } from "./infrastructure/sources/b2b-distributor-adapter.js";
import { createDemoSources } from "./infrastructure/sources/demo-source-adapter.js";
import { mergeSourceFallbacks } from "./infrastructure/sources/fallback-source-adapter.js";
import { createHttpMarketplaceSources } from "./infrastructure/sources/http-marketplace-adapter.js";
import { createMarketplaceSourcesFromEnv } from "./infrastructure/sources/mcp-marketplace-adapter.js";

/** Local-only fake prices. Never enable in production/hybrid compose. */
export function allowDemoSources(): boolean {
  const raw = process.env.ALLOW_DEMO_SOURCES?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

export function buildSearchApp(options: { sources?: SourceAdapter[]; logger?: boolean } = {}) {
  const app = createService({ logger: options.logger ?? false });
  const realSources = mergeSourceFallbacks([
    createMarketplaceSourcesFromEnv(),
    createHttpMarketplaceSources(),
    createDistributorSourcesFromEnv(),
  ]);
  const realNames = new Set(realSources.map((source) => source.name));
  const demoSources = allowDemoSources()
    ? createDemoSources().filter((source) => !realNames.has(source.name))
    : [];
  const sources = options.sources ?? [...realSources, ...demoSources];
  void app.register(searchRoutes, {
    searchService: new SearchService(sources),
    mode: realSources.length > 0 ? "hybrid" : demoSources.length > 0 ? "demo" : "hybrid",
  });
  return app;
}
