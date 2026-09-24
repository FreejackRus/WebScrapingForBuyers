---
type: community
cohesion: 0.22
members: 9
---

# run_server

**Cohesion:** 0.22 - loosely connected
**Members:** 9 nodes

## Members
- [[Entry point for the Avito MCP server. Exposed as the ``avito-mcp`` console…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/__main__.py
- [[FastMCP_2]] - code
- [[Release loaded CDP leases without requiring the optional browser extra.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Run ``mcp`` on the transport selected by the environment. Returns a process…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Run the server on the transport selected by the environment (stdio default).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/__main__.py
- [[avito_connector__main__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/__main__.py
- [[browser_handoff_lifespan()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[main()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/__main__.py
- [[run_server()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/run_server
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_compare_connector__main__.py]]
- 1 edge to [[_COMMUNITY_BearerAuthMiddleware]]
- 1 edge to [[_COMMUNITY_resolve_transport]]
- 1 edge to [[_COMMUNITY_TransportConfig]]
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_aliexpress_connector__main__.py]]
- 1 edge to [[_COMMUNITY_cian_connector__main__.py]]
- 1 edge to [[_COMMUNITY_citilink_connector__main__.py]]
- 1 edge to [[_COMMUNITY_detmir_connector__main__.py]]
- 1 edge to [[_COMMUNITY_dns_connector__main__.py]]
- 1 edge to [[_COMMUNITY_lamoda_connector__main__.py]]
- 1 edge to [[_COMMUNITY_test_dsh_bundle.py]]
- 1 edge to [[_COMMUNITY_megamarket_connector__main__.py]]
- 1 edge to [[_COMMUNITY_mpstats_connector__main__.py]]
- 1 edge to [[_COMMUNITY_ozon_connector__main__.py]]
- 1 edge to [[_COMMUNITY_taobao_connector__main__.py]]
- 1 edge to [[_COMMUNITY_wb_connector__main__.py]]
- 1 edge to [[_COMMUNITY_yandex_connector__main__.py]]
- 1 edge to [[_COMMUNITY_v2.0.0 Security  privacy research]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[run_server()]] - degree 24, connects to 20 communities
- [[browser_handoff_lifespan()]] - degree 3, connects to 1 community
- [[avito_connector__main__.py]] - degree 3, connects to 1 community
- [[FastMCP_2]] - degree 3, connects to 1 community