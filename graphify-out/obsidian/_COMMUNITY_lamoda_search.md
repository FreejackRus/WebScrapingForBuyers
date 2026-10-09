---
type: community
cohesion: 0.09
members: 39
---

# lamoda_search

**Cohesion:** 0.09 - loosely connected
**Members:** 39 nodes

## Members
- [[Any_13]] - code
- [[BaseModel_9]] - code
- [[Context_6]] - code
- [[Fetch one Lamoda product card via the anonymous GraphQL endpoint (tier 1). …]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Field_7]] - code
- [[Lamoda carries the shared envelope unchanged.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[LamodaSizeOut]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[Map one extracted tile onto the wire shape, parsing prices in Python. Accepts…_2]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[MetaOut_6]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[Pull a SKU out of a lamoda.ru URL or a bare SKU string. URLs carry the SKU…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Pydantic output models for the Lamoda MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[Return whether an empty rendered page is an anti-bot challenge. ``__BLOCKED__``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Search Lamoda, rendered in the operator's Chrome (discovery is blocked tier 1).…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Space this source's requests out, and back off if it refused us. Reads…_4]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Structural drift canary for Lamoda (tri-state). Probes the GraphQL card path…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Tier-1 POST the SKU-enrichment query over plain HTTPS.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[Tier-2 render the search page in the operator's Chrome, extract tiles.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_anti_bot_challenge()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_cdp_render_search()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_extract_sku()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_graphql_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_lamoda_selfcheck_impl()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_polite_wait()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_proxy()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[_search_item_from_tile()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[description_9]] - code
- [[lamoda_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[lamoda_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[lamoda_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[lamoda_selfcheck()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/server.py
- [[max_length_6]] - code
- [[min_length_6]] - code
- [[tool_8]] - code
- [[Вердикт conditional go]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md
- [[Локальная проверка, точная последовательность]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/lamoda_search
SORT file.name ASC
```

## Connections to other communities
- 20 edges to [[_COMMUNITY_json]]
- 11 edges to [[_COMMUNITY_TransportDownError]]
- 6 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 6 edges to [[_COMMUNITY_avito_connectorserver.py]]
- 5 edges to [[_COMMUNITY_dns_card]]
- 4 edges to [[_COMMUNITY_browser_handoff.py]]
- 3 edges to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_ChallengeRequiredError]]
- 1 edge to [[_COMMUNITY_taobao_connectorserver.py]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_Anti-bot reality, source by source]]
- 1 edge to [[_COMMUNITY_Lamoda Connector]]
- 1 edge to [[_COMMUNITY_Lamoda Connector_1]]
- 1 edge to [[_COMMUNITY_prices_from_tile]]
- 1 edge to [[_COMMUNITY_title_from_tile]]
- 1 edge to [[_COMMUNITY_citilink_selfcheck]]
- 1 edge to [[_COMMUNITY_pydantic]]
- 1 edge to [[_COMMUNITY_Аудит ru-marketplace-mcp v1.2.0 — независимая перепроверка]]

## Top bridge nodes
- [[lamoda_selfcheck()]] - degree 13, connects to 7 communities
- [[lamoda_search()]] - degree 22, connects to 6 communities
- [[Вердикт conditional go]] - degree 8, connects to 6 communities
- [[_cdp_render_search()_1]] - degree 13, connects to 5 communities
- [[lamoda_card()]] - degree 19, connects to 4 communities