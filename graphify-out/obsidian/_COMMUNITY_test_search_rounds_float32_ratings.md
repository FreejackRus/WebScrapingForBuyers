---
type: community
cohesion: 1.00
members: 2
---

# test_search_rounds_float32_ratings

**Cohesion:** 1.00 - tightly connected
**Members:** 2 nodes

## Members
- [[Yandex serialises ratings as float32 4.8 arrives as 4.800000190734863.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_search_rounds_float32_ratings()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_search_rounds_float32_ratings
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_test_ssr.py]]

## Top bridge nodes
- [[test_search_rounds_float32_ratings()]] - degree 2, connects to 1 community