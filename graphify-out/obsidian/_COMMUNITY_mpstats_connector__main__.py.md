---
type: community
cohesion: 0.50
members: 4
---

# mpstats_connector/__main__.py

**Cohesion:** 0.50 - moderately connected
**Members:** 4 nodes

## Members
- [[Entry point for the MPStats MCP server. Exposed as the ``mpstats-mcp`` console…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/__main__.py
- [[Run the server on the transport selected by the environment (stdio default)._9]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/__main__.py
- [[main()_20]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/__main__.py
- [[mpstats_connector__main__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/__main__.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/mpstats_connector/__main__py
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_run_server]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[main()_20]] - degree 3, connects to 1 community
- [[mpstats_connector__main__.py]] - degree 3, connects to 1 community