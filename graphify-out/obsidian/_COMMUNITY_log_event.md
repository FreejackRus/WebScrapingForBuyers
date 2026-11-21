---
type: community
cohesion: 0.14
members: 20
---

# log_event

**Cohesion:** 0.14 - loosely connected
**Members:** 20 nodes

## Members
- [[2026-10-12 — Проверка верхних карточек]] - document - docs/PROJECT_CONTEXT.md
- [[Added_10]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Any_6]] - code
- [[Fetch Ozon product card data via composer-api.bx. Tier-1 (curl_cffi) tried…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Fetch Ozon product review texts + star distribution via composer-api.bx. Tier-1…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Field_3]] - code
- [[Fixed_13]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Logger]] - code
- [[Search Ozon catalog. curl_cffi → optional Scrapling → CDP. Returns…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[1.6.1 — 2026-09-09]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[default_1]] - code
- [[description_4]] - code
- [[log_event()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/logging.py
- [[make_stderr_logger()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/logging.py
- [[ozon_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[ozon_reviews()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[ozon_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[tool_3]] - code
- [[Добавлено_11]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Исправлено_10]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/log_event
SORT file.name ASC
```

## Connections to other communities
- 16 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 13 edges to [[_COMMUNITY_ozon_connectorserver.py]]
- 11 edges to [[_COMMUNITY_raise_tool_error]]
- 9 edges to [[_COMMUNITY_TransportDownError]]
- 6 edges to [[_COMMUNITY_megamarket_connectorserver.py]]
- 4 edges to [[_COMMUNITY_citilink_card]]
- 4 edges to [[_COMMUNITY_detmir_categories]]
- 3 edges to [[_COMMUNITY_yandex_card]]
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_aliexpress_connectorserver.py]]
- 2 edges to [[_COMMUNITY_taobao_card]]
- 2 edges to [[_COMMUNITY_citilink_selfcheck]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 2 edges to [[_COMMUNITY_dns_card]]
- 2 edges to [[_COMMUNITY_run_server]]
- 2 edges to [[_COMMUNITY_coerce_price]]
- 2 edges to [[_COMMUNITY_Changelog]]
- 1 edge to [[_COMMUNITY_aliexpress_selfcheck]]
- 1 edge to [[_COMMUNITY_cmd_doctor]]
- 1 edge to [[_COMMUNITY_2.2.0 — 2026-09-11]]
- 1 edge to [[_COMMUNITY__sync_curl_get]]
- 1 edge to [[_COMMUNITY_cian_search]]
- 1 edge to [[_COMMUNITY__cian_selfcheck_impl]]
- 1 edge to [[_COMMUNITY_compare_verify_offer]]
- 1 edge to [[_COMMUNITY_dns_selfcheck]]
- 1 edge to [[_COMMUNITY_lamoda_connectorserver.py]]
- 1 edge to [[_COMMUNITY_Architecture]]
- 1 edge to [[_COMMUNITY_PULL_REQUEST_TEMPLATE]]
- 1 edge to [[_COMMUNITY_search-service.ts]]
- 1 edge to [[_COMMUNITY_Итерации]]

## Top bridge nodes
- [[log_event()]] - degree 72, connects to 27 communities
- [[ozon_card()]] - degree 21, connects to 7 communities
- [[2026-10-12 — Проверка верхних карточек]] - degree 5, connects to 4 communities
- [[ozon_reviews()]] - degree 13, connects to 3 communities
- [[ozon_search()]] - degree 11, connects to 3 communities