---
type: community
cohesion: 0.13
members: 28
---

# mpstats_connector/server.py

**Cohesion:** 0.13 - loosely connected
**Members:** 28 nodes

## Members
- [[Aggregate the per-check dict entries into the typed selfcheck response. Mirrors…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[Aggregated sales totals over the ``days`` window for one SKU. ``sum`` is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[Any_17]] - code
- [[BaseModel_6]] - code
- [[Coerce a graph list to ints, dropping cells that are not clean integers. A non-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[Flatten one MPStats analytics entry into the typed item model. Accepts the dict…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[Flatten one MPStats warehouse entry into the typed stock model. Accepts the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[MPStats MCP connector. Salesstock analytics for Ozon and Wildberries items via…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[MpStatsItem]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[MpStatsItemResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[MpStatsNoResultsResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[MpStatsStocks]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[MpStatsTotals]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[MpStatsWarehousesItem]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[MpStatsWarehousesResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[Per-SKU analytics from the MPStats plugin API. The four ``_graph`` lists are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[Pydantic output models for the MPStats connector. Every tool returns a typed…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[Return the last non-zero cell of a numeric graph, else None. The graphs are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[Structured ``no_results`` payload for SKUs MPStats has no analytics on. Not…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[Warehouse stock split for one SKU. ``fbs`` is the Fulfilled-by-Seller stock…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[_finalize_selfcheck()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[_int_graph()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[_last_nonzero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[_parse_item_entry()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[_parse_warehouses_entry()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[get_settings()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/settings.py
- [[mpstats_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[mpstats_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/mpstats_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 18 edges to [[_COMMUNITY_json]]
- 11 edges to [[_COMMUNITY_BadRequestError]]
- 5 edges to [[_COMMUNITY_pydantic]]
- 4 edges to [[_COMMUNITY__post_json_budgeted]]
- 3 edges to [[_COMMUNITY_ozon_card]]
- 3 edges to [[_COMMUNITY_mpstats-connectorteststest_server.py]]
- 2 edges to [[_COMMUNITY_models.py]]
- 2 edges to [[_COMMUNITY_success]]
- 2 edges to [[_COMMUNITY_TransportDownError]]
- 2 edges to [[_COMMUNITY__client]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]

## Top bridge nodes
- [[mpstats_connectorserver.py]] - degree 47, connects to 10 communities
- [[mpstats_connectormodels_output.py]] - degree 16, connects to 6 communities
- [[Any_17]] - degree 7, connects to 2 communities
- [[_finalize_selfcheck()]] - degree 6, connects to 2 communities
- [[MpStatsItemResponse]] - degree 5, connects to 2 communities