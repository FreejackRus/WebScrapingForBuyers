---
type: community
cohesion: 0.24
members: 11
---

# megamarket_connector/models_output.py

**Cohesion:** 0.24 - loosely connected
**Members:** 11 nodes

## Members
- [[BaseModel_1]] - code
- [[Every CDP adapter must map its connector's typed model onto MarketOffer.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[MegamarketCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/models_output.py
- [[MegamarketSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/models_output.py
- [[MegamarketSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/models_output.py
- [[MegamarketSelfcheckCheckOut]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/models_output.py
- [[MegamarketSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/models_output.py
- [[Pydantic output models for the Megamarket MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/models_output.py
- [[megamarket_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/models_output.py
- [[megamarket_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_cdp_source_adapters_map_their_fields()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/megamarket_connector/models_outputpy
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_megamarket_search]]
- 2 edges to [[_COMMUNITY_models.py]]
- 1 edge to [[_COMMUNITY__post]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY__FakeResponse]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_pydantic]]

## Top bridge nodes
- [[megamarket_connectormodels_output.py]] - degree 10, connects to 4 communities
- [[MegamarketSelfcheckResponse]] - degree 5, connects to 4 communities
- [[MegamarketSearchItemOut]] - degree 6, connects to 2 communities
- [[MegamarketCardResponse]] - degree 4, connects to 2 communities
- [[MegamarketSearchResponse]] - degree 4, connects to 2 communities