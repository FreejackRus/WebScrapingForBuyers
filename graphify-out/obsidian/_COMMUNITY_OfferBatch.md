---
type: community
cohesion: 0.11
members: 19
---

# OfferBatch

**Cohesion:** 0.11 - loosely connected
**Members:** 19 nodes

## Members
- [[dot-__init__()_16]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``aliexpress_search`` results (CDP tier; prices in rubles). The connector…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``avito_search`` results. Avito is classifieds no brand, no star rating…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``citilink_search`` results (CDP tier; electronics).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``dns_search`` results (CDP tier; electronics, no ratings on tiles).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``lamoda_search`` results (CDP tier; Lamoda exposes no ratings).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``megamarket_search`` results (CDP tier; rating present).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``taobao_search`` results, keeping the price in yuan. price_rub stays…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``yandex_search`` results. ``price_rub`` is the everyday price and the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[OfferBatch]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Offers with native diagnostics; no shared state across concurrent sources.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_aliexpress()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_avito()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_citilink()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_dns()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_lamoda()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_megamarket()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_taobao()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_yandex()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/OfferBatch
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 9 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_Ключевые изменения выпуска]]
- 1 edge to [[_COMMUNITY__search_wildberries]]
- 1 edge to [[_COMMUNITY_2.2.0 — 2026-09-11]]

## Top bridge nodes
- [[OfferBatch]] - degree 14, connects to 4 communities
- [[_search_taobao()]] - degree 5, connects to 3 communities
- [[_search_aliexpress()]] - degree 4, connects to 2 communities
- [[_search_avito()]] - degree 4, connects to 2 communities
- [[_search_citilink()]] - degree 4, connects to 2 communities