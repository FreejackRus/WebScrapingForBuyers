---
type: community
cohesion: 0.36
members: 8
---

# .get

**Cohesion:** 0.36 - loosely connected
**Members:** 8 nodes

## Members
- [[dot-get()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-get_or_fetch()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-invalidate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-set()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[Hashable]] - code
- [[Return a live value, or ``None`` on missexpiry.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[Return the cached value or await ``factory`` to produce it. A per-cache lock…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[T]] - code

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/get
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_TTLCache]]

## Top bridge nodes
- [[dot-get()]] - degree 5, connects to 1 community
- [[dot-get_or_fetch()]] - degree 5, connects to 1 community
- [[dot-set()]] - degree 3, connects to 1 community
- [[dot-invalidate()]] - degree 2, connects to 1 community