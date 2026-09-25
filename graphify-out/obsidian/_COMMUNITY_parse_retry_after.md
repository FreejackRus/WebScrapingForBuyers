---
type: community
cohesion: 0.16
members: 14
---

# parse_retry_after

**Cohesion:** 0.16 - loosely connected
**Members:** 14 nodes

## Members
- [[Added_8]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Other]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Parse a Retry-After header into a delay in seconds, or None. The header is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/http.py
- [[Tests for the small HTTP helpers in mcp_core.http.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[The Retry-After header is wire-authored a hostile or drifted ``1e999`` must…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[1.4.0 — 2026-08-08]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[parse_retry_after()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/http.py
- [[test_http.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[test_parse_retry_after_absent_or_junk_is_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[test_parse_retry_after_never_returns_a_non_finite_or_negative_delay()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[test_parse_retry_after_reads_seconds()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http.py
- [[Добавлено_8]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Исправлено_10]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Прочее]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/parse_retry_after
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_Any]]
- 1 edge to [[_COMMUNITY_Ключевые изменения выпуска]]
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_coerce_price]]
- 1 edge to [[_COMMUNITY_Changelog]]

## Top bridge nodes
- [[parse_retry_after()]] - degree 9, connects to 3 communities
- [[Исправлено_10]] - degree 5, connects to 3 communities
- [[1.4.0 — 2026-08-08]] - degree 7, connects to 2 communities
- [[test_http.py]] - degree 5, connects to 1 community