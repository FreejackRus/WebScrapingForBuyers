---
type: community
cohesion: 0.16
members: 20
---

# yandex_card

**Cohesion:** 0.16 - loosely connected
**Members:** 20 nodes

## Members
- [[Context_14]] - code
- [[Fetch full detail for a Yandex Market product prices, rating breakdown,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[Field_14]] - code
- [[GET a Yandex Market page and return its HTML, cached and retry-aware.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[MetaOut_12]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/models_output.py
- [[Search Yandex Market and return products with both prices, ratings and sellers.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[Turn a parse status into the right error, or return for usable results.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[Yandex reports which extraction path produced the payload. The SSR widget state…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/models_output.py
- [[_fetch_html()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[_guard_parse_status()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[default_6]] - code
- [[description_16]] - code
- [[ge_6]] - code
- [[le_6]] - code
- [[main()_28]] - code - mcp-servers/ru-marketplace-mcp/examples/rating_breakdown.py
- [[max_length_12]] - code
- [[min_length_12]] - code
- [[tool_15]] - code
- [[yandex_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[yandex_search()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/yandex_card
SORT file.name ASC
```

## Connections to other communities
- 11 edges to [[_COMMUNITY_TransportDownError]]
- 6 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_YandexProduct]]
- 4 edges to [[_COMMUNITY_BadRequestError]]
- 3 edges to [[_COMMUNITY_yandex_selfcheck]]
- 2 edges to [[_COMMUNITY_models.py]]
- 2 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY_ssr.py]]
- 2 edges to [[_COMMUNITY_2.3.0 - 2026-09-13]]
- 1 edge to [[_COMMUNITY_detmir_categories]]
- 1 edge to [[_COMMUNITY_Живая проверка источников]]
- 1 edge to [[_COMMUNITY_2.2.0 — 2026-09-11]]
- 1 edge to [[_COMMUNITY_Yandex Market Connector]]
- 1 edge to [[_COMMUNITY_Yandex Market Connector_1]]

## Top bridge nodes
- [[yandex_card()]] - degree 29, connects to 14 communities
- [[yandex_search()_1]] - degree 24, connects to 7 communities
- [[_fetch_html()]] - degree 9, connects to 3 communities
- [[MetaOut_12]] - degree 6, connects to 3 communities
- [[_guard_parse_status()]] - degree 7, connects to 2 communities