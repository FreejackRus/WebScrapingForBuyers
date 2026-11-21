---
type: community
cohesion: 0.20
members: 18
---

# cian_connector/server.py

**Cohesion:** 0.20 - loosely connected
**Members:** 18 nodes

## Members
- [[Bare digits or a cian.ru offer URL; anything else is None. Offer ids run 9…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[BaseModel_2]] - code
- [[Cian MCP connector real-estate search and offer cards. Cian (cian.ru) is a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[Cian sub-check entry adds the baseline-comparison fields.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[CianAgentOut]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[CianCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[CianMetroOut]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[CianPriceChangeOut]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[CianSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[CianSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[CianSelfcheckCheckOut]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[CianSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[MetaOut_2]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[Typed responses for the Cian connector. Field descriptions are written for a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[Validation metadata attached to every response.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[_extract_offer_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[cian_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/models_output.py
- [[cian_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/cian_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 19 edges to [[_COMMUNITY_json]]
- 15 edges to [[_COMMUNITY_Any_1]]
- 11 edges to [[_COMMUNITY_TransportDownError]]
- 6 edges to [[_COMMUNITY_cian_search]]
- 6 edges to [[_COMMUNITY__cian_selfcheck_impl]]
- 6 edges to [[_COMMUNITY__fetch_search]]
- 2 edges to [[_COMMUNITY_cian_connectorsettings.py]]
- 1 edge to [[_COMMUNITY_raise_tool_error]]
- 1 edge to [[_COMMUNITY__price_unit]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]

## Top bridge nodes
- [[cian_connectorserver.py]] - degree 63, connects to 11 communities
- [[MetaOut_2]] - degree 6, connects to 3 communities
- [[CianMetroOut]] - degree 5, connects to 2 communities
- [[CianSelfcheckResponse]] - degree 5, connects to 2 communities
- [[cian_connectormodels_output.py]] - degree 13, connects to 1 community