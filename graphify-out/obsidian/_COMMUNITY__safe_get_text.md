---
type: community
members: 20
---

# _safe_get_text

**Members:** 20 nodes

## Members
- [[A canary read that cannot be answered from the cache. Every probe uses a fixed…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[AsyncClient_3]] - code
- [[Decode a streamed body the way curl_cffi's ``resp.text`` would have. Streaming…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Fetch via curl_cffi, honouring ``_safe_get_text``'s (status, text, err)…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[GET with body cap, wall-clock budget, and bounded transient-network retry. Thin…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Resolve WB's proxy explicit ``WB_PROXY`` first, then the standard vars.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[The shared path body cap, wall-clock budget, polite gate, bounded retries.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[True for a real read HTTP 200, a body, and not the edge's wall page.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[True for hosts that refuse the default client's TLS fingerprint.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[True when a JSON endpoint answered with an HTML page instead. WB's edge serves…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_budgeted_get_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_decode_body()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_fetch()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_fresh_get_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_impersonated_get_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_is_edge_wall()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_is_usable()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_needs_impersonation()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_proxy()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_safe_get_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_safe_get_text
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 5 edges to [[_COMMUNITY_raise_tool_error]]
- 4 edges to [[_COMMUNITY_Any]]
- 1 edge to [[_COMMUNITY__polite_wait]]
- 1 edge to [[_COMMUNITY_get_text_budgeted]]
- 1 edge to [[_COMMUNITY_test_http_tier.py]]
- 1 edge to [[_COMMUNITY_wb_selfcheck]]
- 1 edge to [[_COMMUNITY_wb_card]]

## Top bridge nodes
- [[_safe_get_text()]] - degree 17, connects to 4 communities
- [[_budgeted_get_text()]] - degree 6, connects to 3 communities
- [[_proxy()_4]] - degree 5, connects to 3 communities
- [[_fresh_get_text()]] - degree 5, connects to 2 communities
- [[_impersonated_get_text()]] - degree 4, connects to 1 community