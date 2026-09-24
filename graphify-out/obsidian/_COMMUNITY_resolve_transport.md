---
type: community
cohesion: 0.20
members: 10
---

# resolve_transport

**Cohesion:** 0.20 - loosely connected
**Members:** 10 nodes

## Members
- [[Map the ``MCP_TRANSPORT`` value to a supported transport. Empty or unset means…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Normalise ``MCP_HTTP_PATH`` to a leading-slash endpoint path.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Parse ``MCP_HTTP_PORT`` into a valid TCP port. A non-numeric or out-of-range…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Resolve the transport selection from the environment. Pure and side-effect-free…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Transport]] - code
- [[_parse_host()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[_parse_path()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[_parse_port()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[_parse_transport()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[resolve_transport()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/resolve_transport
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_TransportConfig]]
- 1 edge to [[_COMMUNITY_run_server]]

## Top bridge nodes
- [[resolve_transport()]] - degree 8, connects to 3 communities
- [[_parse_transport()]] - degree 4, connects to 1 community
- [[_parse_path()]] - degree 3, connects to 1 community
- [[_parse_port()]] - degree 3, connects to 1 community
- [[_parse_host()]] - degree 2, connects to 1 community