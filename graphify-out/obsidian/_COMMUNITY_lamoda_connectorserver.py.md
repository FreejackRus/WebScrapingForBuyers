---
type: community
members: 38
---

# lamoda_connector/server.py

**Members:** 38 nodes

## Members
- [[Any_17]] - code
- [[BaseModel_12]] - code
- [[Context_7]] - code
- [[Fetch one Lamoda product card via the anonymous GraphQL endpoint (tier 1). …]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Field_8]] - code
- [[Lamoda MCP connector. Lamoda's anti-bot wall splits the catalog in two. One…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Lamoda carries the shared envelope unchanged.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaSizeOut]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[Map one extracted tile onto the wire shape, parsing prices in Python. Accepts…_1]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[MetaOut_7]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[Pull a SKU out of a lamoda.ru URL or a bare SKU string. URLs carry the SKU…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Pydantic output models for the Lamoda MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[Return whether an empty rendered page is an anti-bot challenge. ``__BLOCKED__``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Search Lamoda, rendered in the operator's Chrome (discovery is blocked tier 1).…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Space this source's requests out, and back off if it refused us. Reads…_5]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Tier-1 POST the SKU-enrichment query over plain HTTPS.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Tier-2 render the search page in the operator's Chrome, extract tiles.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_anti_bot_challenge()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_attempt()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_cdp_render_search()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_extract_sku()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_graphql_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_lamoda_selfcheck_impl()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_polite_wait()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_proxy()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_search_item_from_tile()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[description_10]] - code
- [[lamoda_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[lamoda_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[lamoda_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[lamoda_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[max_length_7]] - code
- [[min_length_7]] - code
- [[tool_9]] - code

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/lamoda_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_raise_tool_error]]
- 9 edges to [[_COMMUNITY_TransportDownError]]
- 8 edges to [[_COMMUNITY_lamoda_selfcheck]]
- 4 edges to [[_COMMUNITY_models.py]]
- 3 edges to [[_COMMUNITY_browser_handoff.py]]
- 3 edges to [[_COMMUNITY_missing_required_families]]
- 2 edges to [[_COMMUNITY_chrome_cdp.py]]
- 2 edges to [[_COMMUNITY_prices_from_tile]]
- 2 edges to [[_COMMUNITY_lamoda_connectorsettings.py]]
- 2 edges to [[_COMMUNITY_taobao_connectorserver.py]]
- 2 edges to [[_COMMUNITY_re]]
- 2 edges to [[_COMMUNITY_transport__init__.py]]
- 2 edges to [[_COMMUNITY_avito_connectorserver.py]]
- 2 edges to [[_COMMUNITY_pydantic]]
- 2 edges to [[_COMMUNITY_compare_connectorserver.py]]
- 2 edges to [[_COMMUNITY_sys]]
- 1 edge to [[_COMMUNITY_test_http_tier.py]]
- 1 edge to [[_COMMUNITY_open_page]]
- 1 edge to [[_COMMUNITY_Аудит ru-marketplace-mcp v1.2.0 — независимая перепроверка]]
- 1 edge to [[_COMMUNITY_output_schema.py]]
- 1 edge to [[_COMMUNITY_asyncio]]
- 1 edge to [[_COMMUNITY_test_redact.py]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_urllib_parse]]
- 1 edge to [[_COMMUNITY_detmir_connectorserver.py]]
- 1 edge to [[_COMMUNITY_Pacer]]

## Top bridge nodes
- [[lamoda_connectorserver.py]] - degree 46, connects to 20 communities
- [[lamoda_search()]] - degree 22, connects to 5 communities
- [[lamoda_card()]] - degree 19, connects to 3 communities
- [[_cdp_render_search()_1]] - degree 13, connects to 3 communities
- [[_graphql_card()]] - degree 13, connects to 3 communities