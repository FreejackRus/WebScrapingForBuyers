---
type: community
cohesion: 0.11
members: 24
---

# Fixed

**Cohesion:** 0.11 - loosely connected
**Members:** 24 nodes

## Members
- [[Adapt ``ozon_search`` results. This adapter was previously written blind — Ozon…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Added_16]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Coerce a marketplace price into a float, or ``None`` when there isn't one.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Coerce a ratingreview count, tolerating 24 086 отзывов-style text. Parity…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Fixed_20]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Other_1]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Parse a Retry-After header into a delay in seconds, or None. The header is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/http.py
- [[Read Ozon's stock hint, e.g. осталось 3 шт. Only a positive statement counts…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Tests for the small HTTP helpers in mcp_core.http.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[The Retry-After header is wire-authored a hostile or drifted ``1e999`` must…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[1.4.0 — 2026-08-08]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[_as_count()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_as_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_ozon()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_stock_from_label()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[parse_retry_after()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/http.py
- [[test_http.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[test_parse_retry_after_absent_or_junk_is_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[test_parse_retry_after_never_returns_a_non_finite_or_negative_delay()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[test_parse_retry_after_reads_seconds()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[Добавлено_15]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Исправлено_15]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Ключевые изменения выпуска]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Прочее_1]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Fixed
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 4 edges to [[_COMMUNITY_json]]
- 3 edges to [[_COMMUNITY_coerce_price]]
- 3 edges to [[_COMMUNITY_resilience.py]]
- 3 edges to [[_COMMUNITY_TransportDownError]]
- 2 edges to [[_COMMUNITY_MarketOffer]]
- 2 edges to [[_COMMUNITY_test_live_payload_contract.py]]
- 1 edge to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_Any]]
- 1 edge to [[_COMMUNITY_Changelog]]
- 1 edge to [[_COMMUNITY_RELEASE NOTES — v1.4.0 (2026-08-08)]]

## Top bridge nodes
- [[Fixed_20]] - degree 11, connects to 6 communities
- [[Ключевые изменения выпуска]] - degree 8, connects to 5 communities
- [[Исправлено_15]] - degree 5, connects to 3 communities
- [[_search_ozon()]] - degree 7, connects to 2 communities
- [[parse_retry_after()]] - degree 9, connects to 1 community