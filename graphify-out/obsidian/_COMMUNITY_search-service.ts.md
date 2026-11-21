---
type: community
cohesion: 0.06
members: 71
---

# search-service.ts

**Cohesion:** 0.06 - loosely connected
**Members:** 71 nodes

## Members
- [[dot-articlesFor()_1]] - code - apps/search/src/domain/source-adapter.ts
- [[dot-attachHistoryKey()]] - code - apps/search/src/application/search-service.ts
- [[dot-collect()_1]] - code - apps/search/src/application/search-service.ts
- [[dot-emit()]] - code - apps/search/src/application/search-service.ts
- [[dot-forget()]] - code - apps/search/src/application/search-service.ts
- [[dot-get()_5]] - code - apps/search/src/application/search-service.ts
- [[dot-latestPrices()]] - code - apps/search/src/infrastructure/history/price-history-store.ts
- [[dot-listSources()]] - code - apps/search/src/application/search-service.ts
- [[dot-matchingQuery()]] - code - apps/search/src/application/search-service.ts
- [[dot-prune()]] - code - apps/search/src/application/search-service.ts
- [[dot-recentComplete()]] - code - apps/search/src/application/search-service.ts
- [[dot-recordPriceHistory()]] - code - apps/search/src/application/search-service.ts
- [[dot-rememberLastGood()]] - code - apps/search/src/application/search-service.ts
- [[dot-resolveArticles()]] - code - apps/search/src/application/search-service.ts
- [[dot-resolveSources()]] - code - apps/search/src/application/search-service.ts
- [[dot-runUncached()]] - code - apps/search/src/application/search-service.ts
- [[dot-start()]] - code - apps/search/src/application/search-service.ts
- [[dot-subscribe()]] - code - apps/search/src/application/search-service.ts
- [[dot-updateSource()]] - code - apps/search/src/application/search-service.ts
- [[dot-verifyTop()]] - code - apps/search/src/application/search-service.ts
- [[2026-09-30 — ограничение памяти в search]] - document - docs/PROJECT_CONTEXT.md
- [[2026-10-12 — v0.0.3 артикулы из прайса, группировка, проверка карточек дистрибуторов, характеристики]] - document - docs/PROJECT_CONTEXT.md
- [[@peremenacontracts_10]] - code - @peremena/contracts
- [[AssessmentRejection]] - code - apps/search/src/domain/offer-assessment.ts
- [[DEFAULT_RETENTION]] - code - apps/search/src/application/search-service.ts
- [[DEFAULT_SOURCE_TIMEOUT_MS]] - code - apps/search/src/application/search-service.ts
- [[Listener]] - code - apps/search/src/application/search-service.ts
- [[SearchRetention]] - code - apps/search/src/application/search-service.ts
- [[SearchService]] - code - apps/search/src/application/search-service.ts
- [[StartOptions]] - code - apps/search/src/application/search-service.ts
- [[VERIFY_BUDGET_MS]] - code - apps/search/src/application/search-service.ts
- [[VERIFY_TOP]] - code - apps/search/src/application/search-service.ts
- [[applicationdisabled-sources.test.ts]] - code - apps/search/src/application/disabled-sources.test.ts
- [[apps_8]] - code - apps/search/src/application/disabled-sources.test.ts
- [[assessmentRejectionLabels]] - code - apps/search/src/domain/offer-assessment.ts
- [[catalog-article.test.ts]] - code - apps/search/src/domain/catalog-article.test.ts
- [[catalog-article.ts]] - code - apps/search/src/domain/catalog-article.ts
- [[channelStats()]] - code - apps/search/src/domain/price-history.ts
- [[compact()_3]] - code - apps/search/src/domain/catalog-article.ts
- [[compact()_4]] - code - apps/search/src/domain/price-history.ts
- [[finish()]] - code - apps/search/src/application/disabled-sources.test.ts
- [[finish()_1]] - code - apps/search/src/application/search-service.test.ts
- [[flagPriceAnomalies()]] - code - apps/search/src/domain/price-anomaly.ts
- [[hasRealArticle()]] - code - apps/search/src/domain/catalog-article.ts
- [[isHistoryRow()]] - code - apps/search/src/domain/price-history.ts
- [[isRealArticle()]] - code - apps/search/src/domain/price-history.ts
- [[lastGoodKey()]] - code - apps/search/src/application/search-service.ts
- [[markPreviousPrices()]] - code - apps/search/src/domain/price-history.ts
- [[median()]] - code - apps/search/src/domain/price-anomaly.ts
- [[offer()_13]] - code - apps/search/src/application/search-service.test.ts
- [[offer()_14]] - code - apps/search/src/domain/price-history.test.ts
- [[offerPriceKey()]] - code - apps/search/src/domain/price-history.ts
- [[packages_contracts_dist_index_pricechannelstats]] - concept
- [[price-history.test.ts]] - code - apps/search/src/domain/price-history.test.ts
- [[price-history.ts]] - code - apps/search/src/domain/price-history.ts
- [[priceHistoryKey()]] - code - apps/search/src/domain/price-history.ts
- [[priceHistoryPoint()]] - code - apps/search/src/domain/price-history.ts
- [[product_13]] - code - apps/search/src/application/disabled-sources.test.ts
- [[product_14]] - code - apps/search/src/application/search-service.test.ts
- [[rankState()]] - code - apps/search/src/application/search-service.ts
- [[rankStateChanged()]] - code - apps/search/src/application/search-service.ts
- [[retention]] - code - apps/search/src/application/search-service.test.ts
- [[search-service.test.ts]] - code - apps/search/src/application/search-service.test.ts
- [[search-service.ts]] - code - apps/search/src/application/search-service.ts
- [[searchCacheKey()]] - code - apps/search/src/application/search-service.ts
- [[setup()]] - code - apps/search/src/application/disabled-sources.test.ts
- [[setup()_1]] - code - apps/search/src/application/search-service.test.ts
- [[source()]] - code - apps/search/src/application/search-service.test.ts
- [[titles()]] - code - apps/search/src/application/search-service.test.ts
- [[withCatalogArticles()]] - code - apps/search/src/domain/catalog-article.ts
- [[withDeadline()]] - code - apps/search/src/application/search-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/search-servicets
SORT file.name ASC
```

## Connections to other communities
- 31 edges to [[_COMMUNITY_packages_contracts_dist_index]]
- 19 edges to [[_COMMUNITY_SourceAdapter]]
- 13 edges to [[_COMMUNITY_packages_contracts_dist_index_product]]
- 11 edges to [[_COMMUNITY_product-from-query.ts]]
- 6 edges to [[_COMMUNITY_card-verifiers.ts]]
- 5 edges to [[_COMMUNITY_watchlist-checker.ts]]
- 4 edges to [[_COMMUNITY_Итерации]]
- 3 edges to [[_COMMUNITY_netlab-price-feed.ts]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_service-kitsrcindex.ts]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_offersuiindex.tsx]]
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_basket-tools.ts]]
- 1 edge to [[_COMMUNITY_validateGroundedNarration]]
- 1 edge to [[_COMMUNITY_useSearchStore]]
- 1 edge to [[_COMMUNITY_analysis-narrator.ts]]
- 1 edge to [[_COMMUNITY_workspaceuiindex.tsx]]
- 1 edge to [[_COMMUNITY_price-trenduiindex.tsx]]

## Top bridge nodes
- [[search-service.ts]] - degree 58, connects to 10 communities
- [[SearchService]] - degree 32, connects to 5 communities
- [[2026-10-12 — v0.0.3 артикулы из прайса, группировка, проверка карточек дистрибуторов, характеристики]] - degree 7, connects to 5 communities
- [[price-history.ts]] - degree 18, connects to 3 communities
- [[dot-collect()_1]] - degree 17, connects to 3 communities