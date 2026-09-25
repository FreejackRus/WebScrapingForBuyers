---
type: community
cohesion: 0.50
members: 4
---

# wb_connector/__main__.py

**Cohesion:** 0.50 - moderately connected
**Members:** 4 nodes

## Members
- [[Entry point for the Wildberries MCP server. Exposed as the ``wb-mcp`` console…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/__main__.py
- [[Run the server on the transport selected by the environment (stdio default)._12]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/__main__.py
- [[main()_23]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/__main__.py
- [[wb_connector__main__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/__main__.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/wb_connector/__main__py
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_run_server]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[main()_23]] - degree 3, connects to 1 community
- [[wb_connector__main__.py]] - degree 3, connects to 1 community