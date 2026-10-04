---
type: community
members: 21
---

# avito_connector/server.py

**Members:** 21 nodes

## Members
- [[Avito MCP connector. Avito sits behind an IP-reputation firewall. A bare GET of…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[Avito carries the shared envelope unchanged.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[AvitoCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[AvitoSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[AvitoSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[AvitoSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[AvitoSellerOut]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[AvitoSellerResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[BaseModel_11]] - code
- [[In-process TTL cache for idempotent upstream reads. Marketplace catalog data is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[MetaOut_6]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[Pydantic output models for the Avito MCP connector. Every tool returns a typed…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[Reference shape signature for the Avito jsitems search payload. Measured on…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/shape_reference.py
- [[avito_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/models_output.py
- [[avito_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[avito_connectorshape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/shape_reference.py
- [[avito_search()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[cache.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[collections_abc]] - concept
- [[test_avito_adapter_maps_classified_fields()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[typing]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/avito_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 17 edges to [[_COMMUNITY_avito_seller]]
- 10 edges to [[_COMMUNITY__fetch]]
- 10 edges to [[_COMMUNITY_firewall_pow.py]]
- 5 edges to [[_COMMUNITY_models.py]]
- 5 edges to [[_COMMUNITY_test_live_payload_contract.py]]
- 5 edges to [[_COMMUNITY__sync_curl_get]]
- 5 edges to [[_COMMUNITY_pydantic]]
- 5 edges to [[_COMMUNITY_compare_connectorserver.py]]
- 4 edges to [[_COMMUNITY_ozon_connectorserver.py]]
- 4 edges to [[_COMMUNITY_detmir_connectorserver.py]]
- 4 edges to [[_COMMUNITY_sys]]
- 3 edges to [[_COMMUNITY_yandex_connectorserver.py]]
- 3 edges to [[_COMMUNITY_transport__init__.py]]
- 3 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 3 edges to [[_COMMUNITY_StdioProbe]]
- 3 edges to [[_COMMUNITY_TransportDownError]]
- 3 edges to [[_COMMUNITY_chrome_cdp.py]]
- 2 edges to [[_COMMUNITY_avito_selfcheck]]
- 2 edges to [[_COMMUNITY_TTLCache]]
- 2 edges to [[_COMMUNITY_output_schema.py]]
- 2 edges to [[_COMMUNITY_browser_handoff.py]]
- 2 edges to [[_COMMUNITY_aliexpress_connectorserver.py]]
- 2 edges to [[_COMMUNITY_ssr.py]]
- 2 edges to [[_COMMUNITY_resilience.py]]
- 2 edges to [[_COMMUNITY_re]]
- 2 edges to [[_COMMUNITY_megamarket_connectorserver.py]]
- 2 edges to [[_COMMUNITY_cian_connectorserver.py]]
- 2 edges to [[_COMMUNITY_asyncio]]
- 2 edges to [[_COMMUNITY_taobao_connectorserver.py]]
- 2 edges to [[_COMMUNITY_Pacer]]
- 2 edges to [[_COMMUNITY_citilink_connectorserver.py]]
- 2 edges to [[_COMMUNITY_dns_connectorserver.py]]
- 2 edges to [[_COMMUNITY_lamoda_connectorserver.py]]
- 2 edges to [[_COMMUNITY_ProductIdentity]]
- 1 edge to [[_COMMUNITY__FakeResponse_1]]
- 1 edge to [[_COMMUNITY_CacheStats]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_ozon_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_test_model_routing_eval.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_cli.py]]
- 1 edge to [[_COMMUNITY_process.py]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_urllib_parse]]
- 1 edge to [[_COMMUNITY_test_redact.py]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]
- 1 edge to [[_COMMUNITY_missing_required_families]]
- 1 edge to [[_COMMUNITY_domtest.py]]
- 1 edge to [[_COMMUNITY_resolve_image_delivery]]
- 1 edge to [[_COMMUNITY_model_routing_eval.py]]
- 1 edge to [[_COMMUNITY_test_public_contract_snapshot.py]]

## Top bridge nodes
- [[typing]] - degree 41, connects to 34 communities
- [[avito_connectorserver.py]] - degree 65, connects to 21 communities
- [[cache.py]] - degree 24, connects to 18 communities
- [[collections_abc]] - degree 14, connects to 12 communities
- [[avito_connectormodels_output.py]] - degree 13, connects to 3 communities