import { createService } from "@peremena/service-kit";

import { SearchService } from "./application/search-service.js";
import type { SourceAdapter } from "./domain/source-adapter.js";
import { searchRoutes } from "./http/routes.js";
import { createApifySourcesFromEnv } from "./infrastructure/sources/apify-marketplace-adapter.js";
import { createDemoSources } from "./infrastructure/sources/demo-source-adapter.js";
import { mergeSourceFallbacks } from "./infrastructure/sources/fallback-source-adapter.js";
import { createHttpMarketplaceSources } from "./infrastructure/sources/http-marketplace-adapter.js";
import { createMarketplaceSourcesFromEnv } from "./infrastructure/sources/mcp-marketplace-adapter.js";

export function buildSearchApp(options: { sources?: SourceAdapter[]; logger?: boolean } = {}) {
  const app = createService({ logger: options.logger ?? false });
  const realSources = mergeSourceFallbacks([
    createMarketplaceSourcesFromEnv(),
    createHttpMarketplaceSources(),
    createApifySourcesFromEnv(),
  ]);
  const realNames = new Set(realSources.map((source) => source.name));
  const sources =
    options.sources ??
    [...realSources, ...createDemoSources().filter((source) => !realNames.has(source.name))];
  void app.register(searchRoutes, {
    searchService: new SearchService(sources),
    mode: realSources.length > 0 ? "hybrid" : "demo",
  });
  return app;
}
