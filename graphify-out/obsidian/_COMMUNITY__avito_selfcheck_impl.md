---
type: community
cohesion: 0.20
members: 11
---

# _avito_selfcheck_impl

**Cohesion:** 0.20 - loosely connected
**Members:** 11 nodes

## Members
- [[AvitoSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[Reference shape signature for the Avito jsitems search payload. Measured on…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/shape_reference.py
- [[The required families that have no member present in the signature.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/shape_reference.py
- [[_avito_selfcheck_impl()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_build_search_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_card_smoke()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_check()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_search_smoke()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_seller_smoke()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[avito_connectorshape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/shape_reference.py
- [[missing_required_families()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/shape_reference.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_avito_selfcheck_impl
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_avito_connectorserver.py]]
- 4 edges to [[_COMMUNITY_raise_tool_error]]
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_test_live_payload_contract.py]]

## Top bridge nodes
- [[AvitoSelfcheckResponse]] - degree 5, connects to 3 communities
- [[_avito_selfcheck_impl()]] - degree 9, connects to 2 communities
- [[avito_connectorshape_reference.py]] - degree 4, connects to 2 communities
- [[_build_search_url()]] - degree 3, connects to 2 communities
- [[missing_required_families()]] - degree 5, connects to 1 community