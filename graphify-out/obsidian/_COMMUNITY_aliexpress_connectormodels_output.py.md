---
type: community
cohesion: 0.36
members: 8
---

# aliexpress_connector/models_output.py

**Cohesion:** 0.36 - loosely connected
**Members:** 8 nodes

## Members
- [[AliCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[AliSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[AliSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[BaseModel_2]] - code
- [[Pydantic output models for the AliExpress MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[aliexpress_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[search()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[test_coupon_warning_keeps_regular_price_and_does_not_claim_failure()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/aliexpress_connector/models_outputpy
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_aliexpress_connectorserver.py]]
- 2 edges to [[_COMMUNITY_models.py]]
- 2 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_pydantic]]

## Top bridge nodes
- [[aliexpress_connectormodels_output.py]] - degree 10, connects to 3 communities
- [[AliSearchItemOut]] - degree 5, connects to 1 community
- [[AliSearchResponse]] - degree 5, connects to 1 community
- [[test_coupon_warning_keeps_regular_price_and_does_not_claim_failure()]] - degree 5, connects to 1 community
- [[AliCardResponse]] - degree 4, connects to 1 community