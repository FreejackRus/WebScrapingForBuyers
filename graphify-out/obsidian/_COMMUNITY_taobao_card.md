---
type: community
cohesion: 0.16
members: 17
---

# taobao_card

**Cohesion:** 0.16 - loosely connected
**Members:** 17 nodes

## Members
- [[Fetch one Taobao item card.  Return Format TaobaoCardResponse {status,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/server.py
- [[Field_2]] - code
- [[MetaOut_3]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/models_output.py
- [[Pull the item id out of an item.taobao.com URL or a bare numeric id. Host-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/server.py
- [[Resolve direct and mounted tool calls; CLI probes have no MCP session.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[Search Taobao listings, rendered in the operator's Chrome.  Return Format…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/server.py
- [[Taobao carries the shared envelope unchanged.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/models_output.py
- [[_extract_item_id()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/server.py
- [[current_mcp_session_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py
- [[description_2]] - code
- [[ge_1]] - code
- [[le_1]] - code
- [[max_length_2]] - code
- [[min_length_2]] - code
- [[taobao_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/server.py
- [[taobao_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/server.py
- [[tool_2]] - code

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/taobao_card
SORT file.name ASC
```

## Connections to other communities
- 12 edges to [[_COMMUNITY_taobao_connectorserver.py]]
- 9 edges to [[_COMMUNITY_TransportDownError]]
- 4 edges to [[_COMMUNITY_raise_tool_error]]
- 3 edges to [[_COMMUNITY_taobao_connectormodels_output.py]]
- 2 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_citilink_card]]
- 2 edges to [[_COMMUNITY_browser_handoff.py]]
- 2 edges to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_compare_verify_offer]]
- 1 edge to [[_COMMUNITY_lamoda_connectorserver.py]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_prices_from_tile]]

## Top bridge nodes
- [[taobao_card()]] - degree 26, connects to 8 communities
- [[taobao_search()]] - degree 23, connects to 7 communities
- [[current_mcp_session_id()]] - degree 9, connects to 6 communities
- [[MetaOut_3]] - degree 6, connects to 3 communities
- [[_extract_item_id()_1]] - degree 3, connects to 1 community