---
type: community
cohesion: 0.21
members: 12
---

# citilink_connector/models_output.py

**Cohesion:** 0.21 - loosely connected
**Members:** 12 nodes

## Members
- [[Any_4]] - code
- [[BaseModel_2]] - code
- [[CitilinkCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/models_output.py
- [[CitilinkSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/models_output.py
- [[CitilinkSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/models_output.py
- [[Keep only a real https photo URL; placeholders are data URIs.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[Map one extracted tile onto the wire shape, parsing prices in Python. Tolerates…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[Pydantic output models for the Citilink MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/models_output.py
- [[_https_image_url()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[_is_qrator_wall()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[_search_item_from_tile()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[citilink_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/models_output.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/citilink_connector/models_outputpy
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_citilink_card]]
- 2 edges to [[_COMMUNITY_dns_card]]
- 2 edges to [[_COMMUNITY_citilink_selfcheck]]
- 1 edge to [[_COMMUNITY_prices_from_tile]]
- 1 edge to [[_COMMUNITY_title_from_tile]]
- 1 edge to [[_COMMUNITY_pydantic]]

## Top bridge nodes
- [[citilink_connectormodels_output.py]] - degree 10, connects to 5 communities
- [[_search_item_from_tile()_1]] - degree 8, connects to 4 communities
- [[CitilinkCardResponse]] - degree 4, connects to 2 communities
- [[CitilinkSearchResponse]] - degree 4, connects to 2 communities
- [[CitilinkSearchItemOut]] - degree 4, connects to 1 community