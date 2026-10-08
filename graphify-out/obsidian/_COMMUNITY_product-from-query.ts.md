---
type: community
cohesion: 0.07
members: 68
---

# product-from-query.ts

**Cohesion:** 0.07 - loosely connected
**Members:** 68 nodes

## Members
- [[2026-10-04 — только IT-оборудование и UX поиска]] - document - docs/PROJECT_CONTEXT.md
- [[BRAND_ALIASES]] - code - apps/search/src/domain/product-from-query.ts
- [[BROWSER_HEADERS]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[CATEGORY_HINTS]] - code - apps/search/src/domain/product-from-query.ts
- [[COMPILED_HINTS]] - code - apps/search/src/domain/product-from-query.ts
- [[COUNT_NOISE]] - code - apps/search/src/domain/product-from-query.ts
- [[CategoryHint]] - code - apps/search/src/domain/product-from-query.ts
- [[CompiledHint]] - code - apps/search/src/domain/product-from-query.ts
- [[FULL_TEXT_HINTS]] - code - apps/search/src/domain/product-from-query.ts
- [[IT_CATEGORIES]] - code - apps/search/src/domain/it-scope.ts
- [[KNOWN_BRANDS]] - code - apps/search/src/domain/product-from-query.ts
- [[MODEL_NOISE]] - code - apps/search/src/domain/product-from-query.ts
- [[NON_IT_MARKERS]] - code - apps/search/src/domain/it-scope.ts
- [[ProductLike]] - code - apps/search/src/http/routes.ts
- [[QueryVerdict]] - code - apps/search/src/domain/it-scope.ts
- [[STRONG_HINTS]] - code - apps/search/src/domain/product-from-query.ts
- [[SuggestEngine]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[WEAK_HINTS]] - code - apps/search/src/domain/product-from-query.ts
- [[catalog.ts]] - code - apps/search/src/domain/catalog.ts
- [[categorize()]] - code - apps/search/src/domain/product-from-query.ts
- [[categoryCache]] - code - apps/search/src/domain/product-from-query.ts
- [[classifyQuery()]] - code - apps/search/src/domain/it-scope.ts
- [[cleanModelTokens()]] - code - apps/search/src/domain/product-from-query.ts
- [[collapseWs()_1]] - code - apps/search/src/domain/product-from-query.ts
- [[duckDuckGoSuggestUrl()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[enrichFromIcecat()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[extractMpn()]] - code - apps/search/src/domain/product-from-query.ts
- [[fetchEnginePhrases()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[fetchJson()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[filterItSuggestions()]] - code - apps/search/src/domain/it-scope.ts
- [[findProduct()]] - code - apps/search/src/domain/catalog.ts
- [[googleSuggestUrl()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[hasKnownBrand()]] - code - apps/search/src/domain/product-from-query.ts
- [[hasProductIdentity()]] - code - apps/search/src/domain/it-scope.ts
- [[icecatProductUrl()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[identifierTokens()]] - code - apps/search/src/domain/it-scope.ts
- [[inferCategory()]] - code - apps/search/src/domain/product-from-query.ts
- [[isExplicitlyNonIt()]] - code - apps/search/src/domain/it-scope.ts
- [[isIdentifierToken()]] - code - apps/search/src/domain/it-scope.ts
- [[isItCategoryText()]] - code - apps/search/src/domain/it-scope.ts
- [[isItIdentifier()]] - code - apps/search/src/domain/it-scope.ts
- [[isItOfferForProduct()]] - code - apps/search/src/domain/it-scope.ts
- [[isItProduct()]] - code - apps/search/src/domain/it-scope.ts
- [[isOfferInItScope()]] - code - apps/search/src/domain/it-scope.ts
- [[isProductPayload()]] - code - apps/search/src/domain/product-from-query.ts
- [[it-scope.test.ts]] - code - apps/search/src/domain/it-scope.test.ts
- [[it-scope.ts]] - code - apps/search/src/domain/it-scope.ts
- [[live-suggest.ts]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[looksLikeEquipment()]] - code - apps/search/src/domain/it-scope.ts
- [[matchCategory()]] - code - apps/search/src/domain/product-from-query.ts
- [[normalize()_1]] - code - apps/search/src/domain/catalog.ts
- [[offer()]] - code - apps/search/src/domain/it-scope.test.ts
- [[parseSuggestList()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[parseYandexSuggest()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[product-from-query.test.ts]] - code - apps/search/src/domain/product-from-query.test.ts
- [[product-from-query.ts]] - code - apps/search/src/domain/product-from-query.ts
- [[productFromQuery()]] - code - apps/search/src/domain/product-from-query.ts
- [[products]] - code - apps/search/src/domain/catalog.ts
- [[queryBodySchema]] - code - apps/search/src/http/routes.ts
- [[searchsrchttproutes.ts]] - code - apps/search/src/http/routes.ts
- [[searchRoutes()]] - code - apps/search/src/http/routes.ts
- [[splitBrandModel()]] - code - apps/search/src/domain/product-from-query.ts
- [[suggestLiveProducts()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts
- [[suggestProducts()]] - code - apps/search/src/domain/catalog.ts
- [[textTokens()]] - code - apps/search/src/domain/product-from-query.ts
- [[titleCaseWords()]] - code - apps/search/src/domain/product-from-query.ts
- [[withoutKnownBrands()]] - code - apps/search/src/domain/product-from-query.ts
- [[yandexSuggestUrl()]] - code - apps/search/src/infrastructure/suggest/live-suggest.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/product-from-queryts
SORT file.name ASC
```

## Connections to other communities
- 17 edges to [[_COMMUNITY_packages_contracts_dist_index]]
- 8 edges to [[_COMMUNITY_SourceAdapter]]
- 4 edges to [[_COMMUNITY_SearchService]]
- 2 edges to [[_COMMUNITY_mcp-marketplace-adapter.ts]]
- 2 edges to [[_COMMUNITY_ref_vitest]]
- 1 edge to [[_COMMUNITY_contractssrcindex.ts]]
- 1 edge to [[_COMMUNITY_identitysrchttproutes.ts]]
- 1 edge to [[_COMMUNITY_Итерации]]

## Top bridge nodes
- [[searchsrchttproutes.ts]] - degree 19, connects to 4 communities
- [[product-from-query.ts]] - degree 34, connects to 3 communities
- [[productFromQuery()]] - degree 15, connects to 3 communities
- [[it-scope.ts]] - degree 26, connects to 2 communities
- [[live-suggest.ts]] - degree 22, connects to 2 communities