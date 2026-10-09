---
type: community
cohesion: 0.07
members: 35
---

# pytest

**Cohesion:** 0.07 - loosely connected
**Members:** 35 nodes

## Members
- [[60 630 belongs to a recommendation snippet; it must not surface anywhere in the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[Exercise every Compose service's merged HTTP settings against the runtime. YAML…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_compose_runtime.py
- [[Live smoke tests for the Wildberries connector. These hit the real endpoint and…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[Live smoke tests for the Yandex Market connector. Excluded from CI; see wb-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_live.py
- [[Marks this directory as its own pytest rootdir package. Several connectors have…_1]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/conftest.py
- [[Regression tests for the Citilink card extractor on a captured OUT-OF-STOCK…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[The handle issuer and the handle consumer must agree on what 'live' means.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_handoff_liveness_consistency.py
- [[The product has no price of its own None, never a recommendation's.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[_call()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_handoff_liveness_consistency.py
- [[_extract()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[_wb_http_transport_for_unit_tests()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/conftest.py
- [[blocked()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_handoff_liveness_consistency.py
- [[browser()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_handoff_liveness_consistency.py
- [[fixture_10]] - code
- [[fixture_11]] - code
- [[open_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_handoff_liveness_consistency.py
- [[parametrize_14]] - code
- [[pytest]] - concept
- [[test_a_live_lease_is_still_handed_out()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_handoff_liveness_consistency.py
- [[test_a_recommendation_price_is_never_the_products()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[test_an_idle_expired_lease_is_not_handed_out()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_handoff_liveness_consistency.py
- [[test_card_out_of_stock_dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[test_compose_runtime.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_compose_runtime.py
- [[test_compose_service_passes_http_startup_auth_gate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_compose_runtime.py
- [[test_handoff_liveness_consistency.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_handoff_liveness_consistency.py
- [[test_out_of_stock_card_reports_no_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[test_out_of_stock_is_read_from_the_page_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[test_wb_search_returns_priced_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[test_wb_selfcheck_reaches_a_verdict()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[test_yandex_selfcheck_reaches_a_verdict()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_live.py
- [[unittest_mock]] - concept
- [[wb-connectortestsconftest.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/conftest.py
- [[wb-connectorteststest_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[yaml]] - concept
- [[yandex-connectorteststest_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_live.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/pytest
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 7 edges to [[_COMMUNITY_json]]
- 5 edges to [[_COMMUNITY_domtest.py]]
- 3 edges to [[_COMMUNITY_citilink-connectorteststest_card_extractor_dom.py]]
- 2 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 2 edges to [[_COMMUNITY_test_card_extractor_live_dom.py]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 2 edges to [[_COMMUNITY_transport__init__.py]]
- 2 edges to [[_COMMUNITY_aliexpress-connectorteststest_parser_live.py]]
- 2 edges to [[_COMMUNITY_lamoda-connectorteststest_shape_reference.py]]
- 2 edges to [[_COMMUNITY_mcp-coreteststest_browser_handoff.py]]
- 2 edges to [[_COMMUNITY_test_chrome_cdp_snapshot.py]]
- 2 edges to [[_COMMUNITY_test_review_regressions.py]]
- 2 edges to [[_COMMUNITY_test_handoff_reporting.py]]
- 1 edge to [[_COMMUNITY_prices_from_tile]]
- 1 edge to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_citilink-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_source_selection.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_cian-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_cdp_budget.py]]
- 1 edge to [[_COMMUNITY_get_text_budgeted]]
- 1 edge to [[_COMMUNITY_test_cdp_transport.py]]
- 1 edge to [[_COMMUNITY_avito-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_ssr.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_http_tier.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_raw_lifecycle.py]]
- 1 edge to [[_COMMUNITY_test_search_login_wall_live_dom.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_stealth.py]]
- 1 edge to [[_COMMUNITY_check_test_count.py]]
- 1 edge to [[_COMMUNITY_wb-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_test_storefront_search.py]]
- 1 edge to [[_COMMUNITY_mcp_wire.py]]
- 1 edge to [[_COMMUNITY_test_anti_bot_challenge_dom.py]]
- 1 edge to [[_COMMUNITY_test_runtime.py]]
- 1 edge to [[_COMMUNITY_test_stdio_probe.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_detmir_selfcheck]]
- 1 edge to [[_COMMUNITY_test_redact.py]]
- 1 edge to [[_COMMUNITY_e2e_stdio_check.py]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]
- 1 edge to [[_COMMUNITY_megamarket-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_aliexpress-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_dsh_bundle.py]]
- 1 edge to [[_COMMUNITY_detmir-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_TTLCache]]
- 1 edge to [[_COMMUNITY_test_cli.py]]
- 1 edge to [[_COMMUNITY_test_ci_concurrency.py]]
- 1 edge to [[_COMMUNITY_lamoda-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_process.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_citilink-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_skills_parity.py]]
- 1 edge to [[_COMMUNITY_test_resilience.py]]
- 1 edge to [[_COMMUNITY_test_model_routing_eval_verdict.py]]
- 1 edge to [[_COMMUNITY_ProductIdentity]]
- 1 edge to [[_COMMUNITY_test_pagination_wrap.py]]
- 1 edge to [[_COMMUNITY_test_pacing.py]]
- 1 edge to [[_COMMUNITY_test_public_contract_snapshot.py]]
- 1 edge to [[_COMMUNITY_lamoda-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_yandex-connectorteststest_server.py]]

## Top bridge nodes
- [[pytest]] - degree 80, connects to 64 communities
- [[test_card_out_of_stock_dom.py]] - degree 10, connects to 4 communities
- [[unittest_mock]] - degree 6, connects to 4 communities
- [[test_handoff_liveness_consistency.py]] - degree 12, connects to 3 communities
- [[test_compose_runtime.py]] - degree 9, connects to 2 communities