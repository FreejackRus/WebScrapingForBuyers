---
type: community
cohesion: 0.25
members: 8
---

# TransportConfig

**Cohesion:** 0.25 - loosely connected
**Members:** 8 nodes

## Members
- [[dot-is_http()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[dot-is_loopback()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Log a loud warning when an HTTP server binds beyond loopback. ``run_server``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Resolved transport selection for one server launch. ``host````port````path``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[TransportConfig]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[True when the HTTP bind host is reachable only from this machine.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[True when this selection runs over the network rather than stdio.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[_warn_if_exposed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/TransportConfig
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_resolve_transport]]
- 1 edge to [[_COMMUNITY_run_server]]
- 1 edge to [[_COMMUNITY_log_event]]

## Top bridge nodes
- [[_warn_if_exposed()]] - degree 5, connects to 3 communities
- [[TransportConfig]] - degree 6, connects to 2 communities