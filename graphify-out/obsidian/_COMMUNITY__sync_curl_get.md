---
type: community
members: 10
---

# _sync_curl_get

**Members:** 10 nodes

## Members
- [[dot-close()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[Any_12]] - code
- [[Document GET so the jar gets Avito cookies before the items XHR.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[Read a curl_cffi response with the same body cap as the old one-shot GET.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[Tier-1 warmed session + X-Source XHR; one JSON-439 firewallPow retry.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_open_curl_session()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_read_capped_response()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_session_xhr_get()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_sync_curl_get()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_warmup_avito_session()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_sync_curl_get
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_avito_connectorserver.py]]
- 2 edges to [[_COMMUNITY__RawCdpPage]]
- 2 edges to [[_COMMUNITY_firewall_pow.py]]
- 2 edges to [[_COMMUNITY_test_live_payload_contract.py]]
- 1 edge to [[_COMMUNITY_raise_tool_error]]
- 1 edge to [[_COMMUNITY__fetch]]

## Top bridge nodes
- [[_sync_curl_get()]] - degree 9, connects to 4 communities
- [[Any_12]] - degree 7, connects to 2 communities
- [[_read_capped_response()]] - degree 6, connects to 1 community
- [[_warmup_avito_session()]] - degree 5, connects to 1 community
- [[_session_xhr_get()]] - degree 4, connects to 1 community