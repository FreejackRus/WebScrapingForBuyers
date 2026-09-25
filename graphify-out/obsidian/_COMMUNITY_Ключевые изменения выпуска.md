---
type: community
cohesion: 0.13
members: 16
---

# Ключевые изменения выпуска

**Cohesion:** 0.13 - loosely connected
**Members:** 16 nodes

## Members
- [[Adapt ``ozon_search`` results. This adapter was previously written blind — Ozon…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Coerce a marketplace price into a float, or ``None`` when there isn't one.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Coerce a ratingreview count, tolerating 24 086 отзывов-style text. Parity…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[RELEASE NOTES — v1.4.0 (2026-08-08)]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[RELEASE_NOTES_v1.4.0]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Read Ozon's stock hint, e.g. осталось 3 шт. Only a positive statement counts…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_as_count()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_as_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_ozon()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_stock_from_label()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Бюджет живых запросов]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Гейт выпуска]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Известные ограничения выпуска]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Ключевые изменения выпуска]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Не проверено живо (честно)]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Проверено живо (doctor + снятия 2026-08-06…08)]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Ключевые_изменения_выпуска
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_OfferBatch]]
- 1 edge to [[_COMMUNITY__parse_search_items]]
- 1 edge to [[_COMMUNITY_Any]]
- 1 edge to [[_COMMUNITY_parse_retry_after]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_coerce_price]]

## Top bridge nodes
- [[Ключевые изменения выпуска]] - degree 8, connects to 5 communities
- [[_search_ozon()]] - degree 7, connects to 3 communities
- [[_as_count()]] - degree 5, connects to 2 communities
- [[_as_price()]] - degree 5, connects to 2 communities
- [[_stock_from_label()]] - degree 3, connects to 1 community