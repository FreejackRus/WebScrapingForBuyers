---
type: community
members: 4
---

# main

**Members:** 4 nodes

## Members
- [[Run every connector's selfcheck and summarise what works from here. uv run…]] - rationale - mcp-servers/ru-marketplace-mcp/examples/health_check.py
- [[health_check.py]] - code - mcp-servers/ru-marketplace-mcp/examples/health_check.py
- [[main()_7]] - code - mcp-servers/ru-marketplace-mcp/examples/health_check.py
- [[run_one()]] - code - mcp-servers/ru-marketplace-mcp/examples/health_check.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/main
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_yandex_connectorserver.py]]
- 1 edge to [[_COMMUNITY_wb_selfcheck]]
- 1 edge to [[_COMMUNITY_detmir_connectorserver.py]]
- 1 edge to [[_COMMUNITY_ozon_selfcheck]]
- 1 edge to [[_COMMUNITY_asyncio]]
- 1 edge to [[_COMMUNITY_sys]]

## Top bridge nodes
- [[main()_7]] - degree 6, connects to 4 communities
- [[health_check.py]] - degree 5, connects to 2 communities