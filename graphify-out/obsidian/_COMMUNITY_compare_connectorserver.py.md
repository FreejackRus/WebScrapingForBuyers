---
type: community
members: 43
---

# compare_connector/server.py

**Members:** 43 nodes

## Members
- [[A ranked cross-marketplace price comparison with per-source provenance.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[Accept the source's numeric ID or canonical product path, never a stray digit.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Any_10]] - code
- [[BaseModel_6]] - code
- [[BaseModel_7]] - code
- [[Compare a product across Russian marketplaces and Taobao side by side. uv run…]] - rationale - mcp-servers/ru-marketplace-mcp/examples/compare_with_china.py
- [[Compare a product's price across every available marketplace. uv run python…]] - rationale - mcp-servers/ru-marketplace-mcp/examples/price_check.py
- [[CompareResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[Cross-marketplace price comparison. The other connectors each answer what does…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Dispatch both comparison profiles through the same native card contract.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Drop repeats of the same listing, retaining explicitly distinct variants. A…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Exception]] - code
- [[Flag a cheapest offer that probably answers a different question. Deliberately…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Import each marketplace connector defensively. A missing optional dependency…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[MarketplaceSourcesResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/server.py
- [[Middle-sized DSH profile comparison plus one deliberate card inspector. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/decision_server.py
- [[Preserve typed recovery signals before truncatingredacting error detail. Only…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Query one marketplace, converting any failure into a reported outcome. Never…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[SourceOutcome]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[Unified marketplace MCP server. One config entry instead of twelve. This server…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/server.py
- [[What happened when one marketplace was queried. Reported for every source,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[Whether a title advertises a used, refurbished or display unit. A query that…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Whether a title reads as an accessory the query did not ask for. Asking for a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Whether an offer may enter the cheapest-in-rubles ranking. Both halves matter.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Which connectors mounted, and why the others did not.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/server.py
- [[_available_sources()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_call_card_tool()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_dedupe()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_looks_like_an_accessory()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_looks_like_another_condition()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_numeric_card_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_ranks_in_rubles()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_relevance_warnings()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_run_source()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_source_error()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[compare_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[compare_with_china.py]] - code - mcp-servers/ru-marketplace-mcp/examples/compare_with_china.py
- [[decision_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/decision_server.py
- [[fastmcp_3]] - concept
- [[main()_8]] - code - mcp-servers/ru-marketplace-mcp/examples/compare_with_china.py
- [[marketplace_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/server.py
- [[mcp_types]] - concept
- [[price_check.py]] - code - mcp-servers/ru-marketplace-mcp/examples/price_check.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/compare_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 15 edges to [[_COMMUNITY_compare_prices]]
- 11 edges to [[_COMMUNITY_OfferBatch]]
- 9 edges to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 7 edges to [[_COMMUNITY_TransportDownError]]
- 6 edges to [[_COMMUNITY_compare_verify_offer]]
- 5 edges to [[_COMMUNITY_sys]]
- 5 edges to [[_COMMUNITY_avito_connectorserver.py]]
- 4 edges to [[_COMMUNITY_ProductIdentity]]
- 4 edges to [[_COMMUNITY_Ключевые изменения выпуска]]
- 4 edges to [[_COMMUNITY_output_schema.py]]
- 3 edges to [[_COMMUNITY_selected]]
- 3 edges to [[_COMMUNITY_raise_tool_error]]
- 3 edges to [[_COMMUNITY_resolve_image_delivery]]
- 3 edges to [[_COMMUNITY_asyncio]]
- 3 edges to [[_COMMUNITY_pydantic]]
- 2 edges to [[_COMMUNITY_decision_inspect]]
- 2 edges to [[_COMMUNITY_yandex_connectorserver.py]]
- 2 edges to [[_COMMUNITY_aliexpress_connectorserver.py]]
- 2 edges to [[_COMMUNITY_megamarket_connectorserver.py]]
- 2 edges to [[_COMMUNITY_WbCardItem]]
- 2 edges to [[_COMMUNITY_cian_connectorserver.py]]
- 2 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 2 edges to [[_COMMUNITY_taobao_connectorserver.py]]
- 2 edges to [[_COMMUNITY_lamoda_connectorserver.py]]
- 2 edges to [[_COMMUNITY_detmir_connectorserver.py]]
- 2 edges to [[_COMMUNITY_citilink_connectorserver.py]]
- 2 edges to [[_COMMUNITY_ozon_connectorserver.py]]
- 2 edges to [[_COMMUNITY_dns_connectorserver.py]]
- 1 edge to [[_COMMUNITY_2.2.0 — 2026-09-11]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_math]]
- 1 edge to [[_COMMUNITY_os]]
- 1 edge to [[_COMMUNITY_re]]
- 1 edge to [[_COMMUNITY_StdioProbe]]
- 1 edge to [[_COMMUNITY_urllib_parse]]
- 1 edge to [[_COMMUNITY_fastmcp_exceptions]]
- 1 edge to [[_COMMUNITY_test_redact.py]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_browser_handoff.py]]

## Top bridge nodes
- [[compare_connectorserver.py]] - degree 67, connects to 23 communities
- [[fastmcp_3]] - degree 18, connects to 15 communities
- [[mcp_types]] - degree 15, connects to 12 communities
- [[marketplace_connectorserver.py]] - degree 10, connects to 6 communities
- [[decision_server.py]] - degree 9, connects to 5 communities