---
type: community
cohesion: 0.18
members: 11
---

# Clock

**Cohesion:** 0.18 - loosely connected
**Members:** 11 nodes

## Members
- [[dot-__call__()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[dot-__init__()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[dot-advance()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[Clock]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[Controllable monotonic clock for the cache module.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[Controllable monotonic clock, so cooldowns pass in microseconds.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[__init__()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[advance()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[clock()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[fixture_11]] - code
- [[fixture_12]] - code

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Clock
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_test_cdp_budget.py]]
- 1 edge to [[_COMMUNITY_TTLCache]]

## Top bridge nodes
- [[Clock]] - degree 9, connects to 1 community
- [[clock()]] - degree 6, connects to 1 community