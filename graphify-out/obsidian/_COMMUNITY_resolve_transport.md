---
type: community
cohesion: 0.11
members: 18
---

# resolve_transport

**Cohesion:** 0.11 - loosely connected
**Members:** 18 nodes

## Members
- [[dot-is_http()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[dot-is_loopback()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Log a loud warning when an HTTP server binds beyond loopback. ``run_server``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Map the ``MCP_TRANSPORT`` value to a supported transport. Empty or unset means…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Normalise ``MCP_HTTP_PATH`` to a leading-slash endpoint path.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Parse ``MCP_HTTP_PORT`` into a valid TCP port. A non-numeric or out-of-range…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Resolve the transport selection from the environment. Pure and side-effect-free…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Resolved transport selection for one server launch. ``host````port````path``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Transport]] - code
- [[TransportConfig]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[True when the HTTP bind host is reachable only from this machine.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[True when this selection runs over the network rather than stdio.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[_parse_host()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[_parse_path()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[_parse_port()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[_parse_transport()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[_warn_if_exposed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[resolve_transport()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/resolve_transport
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_sys]]
- 1 edge to [[_COMMUNITY_log_event]]

## Top bridge nodes
- [[_warn_if_exposed()]] - degree 5, connects to 3 communities
- [[resolve_transport()]] - degree 8, connects to 2 communities
- [[TransportConfig]] - degree 6, connects to 1 community
- [[_parse_transport()]] - degree 4, connects to 1 community
- [[_parse_path()]] - degree 3, connects to 1 community