---
type: community
cohesion: 0.14
members: 16
---

# parse_retry_after

**Cohesion:** 0.14 - loosely connected
**Members:** 16 nodes

## Members
- [[Parse a Retry-After header into a delay in seconds, or None. The header is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/http.py
- [[RELEASE NOTES — v1.4.0 (2026-08-08)]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[RELEASE_NOTES_v1.4.0]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Tests for the small HTTP helpers in mcp_core.http.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[The Retry-After header is wire-authored a hostile or drifted ``1e999`` must…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[parse_retry_after()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/http.py
- [[test_http.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[test_parse_retry_after_absent_or_junk_is_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[test_parse_retry_after_never_returns_a_non_finite_or_negative_delay()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[test_parse_retry_after_reads_seconds()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[Бюджет живых запросов]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Гейт выпуска]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Известные ограничения выпуска]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Ключевые изменения выпуска]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Не проверено живо (честно)]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md
- [[Проверено живо (doctor + снятия 2026-08-06…08)]] - document - mcp-servers/ru-marketplace-mcp/docs/releases/RELEASE_NOTES_v1.4.0.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/parse_retry_after
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_json]]
- 3 edges to [[_COMMUNITY_ssr.py]]
- 2 edges to [[_COMMUNITY_resilience.py]]
- 1 edge to [[_COMMUNITY_coerce_price]]
- 1 edge to [[_COMMUNITY__posted_at]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]

## Top bridge nodes
- [[Ключевые изменения выпуска]] - degree 8, connects to 5 communities
- [[parse_retry_after()]] - degree 9, connects to 3 communities
- [[test_http.py]] - degree 5, connects to 1 community