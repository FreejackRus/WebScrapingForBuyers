---
type: community
cohesion: 0.50
members: 4
---

# yandex_connector/__main__.py

**Cohesion:** 0.50 - moderately connected
**Members:** 4 nodes

## Members
- [[Entry point for the Yandex Market MCP server. Exposed as the ``yandex-mcp``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/__main__.py
- [[Run the server on the transport selected by the environment (stdio default)._13]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/__main__.py
- [[main()_24]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/__main__.py
- [[yandex_connector__main__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/__main__.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/yandex_connector/__main__py
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_run_server]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[main()_24]] - degree 3, connects to 1 community
- [[yandex_connector__main__.py]] - degree 3, connects to 1 community