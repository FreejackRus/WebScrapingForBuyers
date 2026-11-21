---
type: community
cohesion: 0.27
members: 10
---

# taobao_connector/models_output.py

**Cohesion:** 0.27 - loosely connected
**Members:** 10 nodes

## Members
- [[BaseModel_10]] - code
- [[Pydantic output models for the Taobao MCP connector. Prices stay in yuan (CNY)…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/models_output.py
- [[Taobao sub-check entry.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/models_output.py
- [[TaobaoCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/models_output.py
- [[TaobaoSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/models_output.py
- [[TaobaoSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/models_output.py
- [[TaobaoSelfcheckCheckOut]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/models_output.py
- [[taobao_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/models_output.py
- [[taobao_search()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_taobao_adapter_never_ranks_yuan_as_rubles()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/taobao_connector/models_outputpy
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_taobao_connectorserver.py]]
- 3 edges to [[_COMMUNITY_taobao_card]]
- 3 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY__FakeResponse_1]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]

## Top bridge nodes
- [[taobao_connectormodels_output.py]] - degree 10, connects to 3 communities
- [[TaobaoCardResponse]] - degree 4, connects to 2 communities
- [[TaobaoSearchResponse]] - degree 4, connects to 2 communities
- [[TaobaoSearchItemOut]] - degree 6, connects to 1 community
- [[test_taobao_adapter_never_ranks_yuan_as_rubles()]] - degree 3, connects to 1 community