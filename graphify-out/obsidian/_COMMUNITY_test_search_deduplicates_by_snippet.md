---
type: community
cohesion: 1.00
members: 2
---

# test_search_deduplicates_by_snippet

**Cohesion:** 1.00 - tightly connected
**Members:** 2 nodes

## Members
- [[One product can appear as several offers; each visible slot counts once.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_search_deduplicates_by_snippet()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_search_deduplicates_by_snippet
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_test_ssr.py]]

## Top bridge nodes
- [[test_search_deduplicates_by_snippet()]] - degree 2, connects to 1 community