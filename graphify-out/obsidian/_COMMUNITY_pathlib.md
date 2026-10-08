---
type: community
cohesion: 0.09
members: 29
---

# pathlib

**Cohesion:** 0.09 - loosely connected
**Members:** 29 nodes

## Members
- [[Detsky Mir MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/__init__.py
- [[Golden shape checks for normalized Detsky Mir fixture payloads.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_shape_reference.py
- [[Golden shape checks for normalized Wildberries fixture payloads.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_shape_reference.py
- [[Golden shape for the captured Megamarket search normalization.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_shape_reference.py
- [[Megamarket MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/__init__.py
- [[The Detsky Mir parser against LIVE captured API bodies.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[The Megamarket search parser against a LIVE captured payload.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_parser_live.py
- [[The doctrine pinned by the audit waves, checked against live bytes.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_parser_live.py
- [[The doctrine pinned by the audit waves, checked against live bytes a Detsky…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[The parser's third return value separates matched nothing from the shape…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_parser_live.py
- [[_load()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_parser_live.py
- [[detmir-connectorteststest_parser_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[detmir-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_shape_reference.py
- [[detmir_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/__init__.py
- [[megamarket-connectorteststest_parser_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_parser_live.py
- [[megamarket-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_shape_reference.py
- [[megamarket_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/__init__.py
- [[pathlib]] - concept
- [[test_card_normalization_matches_shape_golden()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_shape_reference.py
- [[test_live_card_parses_to_the_displayed_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[test_live_category_parses_its_products_and_meta()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[test_live_items_parse_to_the_displayed_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_parser_live.py
- [[test_live_payload_keeps_its_container_and_total()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_parser_live.py
- [[test_live_prices_are_finite_positive_rubles()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[test_live_prices_are_finite_positive_rubles()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_parser_live.py
- [[test_live_search_normalization_matches_shape_golden()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_shape_reference.py
- [[test_search_normalization_matches_shape_golden()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_shape_reference.py
- [[wb-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_shape_reference.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/pathlib
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_json]]
- 5 edges to [[_COMMUNITY_shape_signature]]
- 4 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 3 edges to [[_COMMUNITY_subprocess]]
- 3 edges to [[_COMMUNITY_mcp_wire.py]]
- 3 edges to [[_COMMUNITY_resilience.py]]
- 3 edges to [[_COMMUNITY_domtest.py]]
- 2 edges to [[_COMMUNITY_StdioProbe]]
- 2 edges to [[_COMMUNITY_test_search_parser_live.py]]
- 2 edges to [[_COMMUNITY_cian-connectorteststest_server.py]]
- 2 edges to [[_COMMUNITY_citilink-connectorteststest_card_extractor_dom.py]]
- 2 edges to [[_COMMUNITY_test_card_extractor_live_dom.py]]
- 2 edges to [[_COMMUNITY_check_test_count.py]]
- 2 edges to [[_COMMUNITY_pytest]]
- 2 edges to [[_COMMUNITY_aliexpress-connectorteststest_parser_live.py]]
- 2 edges to [[_COMMUNITY_lamoda-connectorteststest_shape_reference.py]]
- 2 edges to [[_COMMUNITY_detmir-connectorteststest_server.py]]
- 2 edges to [[_COMMUNITY_e2e_stdio_check.py]]
- 1 edge to [[_COMMUNITY_test_dependency_parity.py]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_model_routing_eval.py]]
- 1 edge to [[_COMMUNITY_test_cdp_transport.py]]
- 1 edge to [[_COMMUNITY_test_ssr.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_distribution_contract.py]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_check_no_print.py]]
- 1 edge to [[_COMMUNITY_test_search_login_wall_live_dom.py]]
- 1 edge to [[_COMMUNITY_check_versions.py]]
- 1 edge to [[_COMMUNITY_wb-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_test_storefront_search.py]]
- 1 edge to [[_COMMUNITY_ozon_connectorserver.py]]
- 1 edge to [[_COMMUNITY_process.py]]
- 1 edge to [[_COMMUNITY_test_anti_bot_challenge_dom.py]]
- 1 edge to [[_COMMUNITY_test_stdio_probe.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_megamarket-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]
- 1 edge to [[_COMMUNITY_test_live_payload_contract.py]]
- 1 edge to [[_COMMUNITY_test_dsh_bundle.py]]
- 1 edge to [[_COMMUNITY_test_cli.py]]
- 1 edge to [[_COMMUNITY_test_ci_concurrency.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_citilink-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_skills_parity.py]]
- 1 edge to [[_COMMUNITY_test_model_routing_eval_verdict.py]]
- 1 edge to [[_COMMUNITY_model_routing_eval.py]]
- 1 edge to [[_COMMUNITY_test_public_contract_snapshot.py]]
- 1 edge to [[_COMMUNITY_lamoda-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_yandex-connectorteststest_server.py]]

## Top bridge nodes
- [[pathlib]] - degree 75, connects to 51 communities
- [[wb-connectorteststest_shape_reference.py]] - degree 6, connects to 3 communities
- [[detmir-connectorteststest_shape_reference.py]] - degree 6, connects to 2 communities
- [[megamarket-connectorteststest_shape_reference.py]] - degree 6, connects to 2 communities
- [[detmir_connector__init__.py]] - degree 5, connects to 2 communities