---
type: community
cohesion: 0.67
members: 3
---

# test_get_or_fetch_collapses_concurrent_misses

**Cohesion:** 0.67 - moderately connected
**Members:** 3 nodes

## Members
- [[Concurrent misses on one key must produce a single upstream call. This is what…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[slow_factory()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_get_or_fetch_collapses_concurrent_misses()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_get_or_fetch_collapses_concurrent_misses
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_TTLCache]]

## Top bridge nodes
- [[test_get_or_fetch_collapses_concurrent_misses()]] - degree 4, connects to 1 community