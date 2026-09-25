---
type: community
cohesion: 0.50
members: 4
---

# test_get_or_fetch_bypasses_a_disabled_cache

**Cohesion:** 0.50 - moderately connected
**Members:** 4 nodes

## Members
- [[factory()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[factory()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_get_or_fetch_bypasses_a_disabled_cache()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_get_or_fetch_calls_factory_once_per_key()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_get_or_fetch_bypasses_a_disabled_cache
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_TTLCache]]

## Top bridge nodes
- [[test_get_or_fetch_bypasses_a_disabled_cache()]] - degree 4, connects to 1 community
- [[test_get_or_fetch_calls_factory_once_per_key()]] - degree 3, connects to 1 community