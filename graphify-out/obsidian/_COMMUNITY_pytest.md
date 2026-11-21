---
type: community
cohesion: 0.09
members: 24
---

# pytest

**Cohesion:** 0.09 - loosely connected
**Members:** 24 nodes

## Members
- [[A throwing extractor must surface its Cyrillic message, not a decode error.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py
- [[Guard the UTF-8 decoding between Python and Node in the DOM harness. On a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py
- [[Live smoke tests for the Detsky Mir connector. Excluded from CI; see wb-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_live.py
- [[Live smoke tests for the Wildberries connector. These hit the real endpoint and…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[Live smoke tests for the Yandex Market connector. Excluded from CI; see wb-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_live.py
- [[Marks this directory as its own pytest rootdir package. Several connectors have…_1]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/conftest.py
- [[Non-JSON stdout must raise, never pass a silently-decoded blob.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py
- [[The regression cp1251 decoding used to kill jsdom tests on Windows.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py
- [[_extract()_11]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py
- [[_wb_http_transport_for_unit_tests()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/conftest.py
- [[detmir-connectorteststest_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_live.py
- [[fixture_16]] - code
- [[pytest]] - concept
- [[test_broken_json_is_refused_loudly()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py
- [[test_cyrillic_stderr_reaches_the_assertion_intact()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py
- [[test_cyrillic_stdout_survives_the_run()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py
- [[test_detmir_selfcheck_reaches_a_verdict()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_live.py
- [[test_domtest_utf8.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py
- [[test_wb_search_returns_priced_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[test_wb_selfcheck_reaches_a_verdict()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[test_yandex_selfcheck_reaches_a_verdict()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_live.py
- [[wb-connectortestsconftest.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/conftest.py
- [[wb-connectorteststest_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[yandex-connectorteststest_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_live.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/pytest
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_domtest.py]]
- 6 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 6 edges to [[_COMMUNITY_transport__init__.py]]
- 2 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 2 edges to [[_COMMUNITY_aliexpress-connectorteststest_parser_live.py]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 2 edges to [[_COMMUNITY_taobao-connectorteststest_shape_reference.py]]
- 2 edges to [[_COMMUNITY_dom.py]]
- 2 edges to [[_COMMUNITY_lamoda-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_detmir_categories]]
- 1 edge to [[_COMMUNITY_yandex_card]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_citilink-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_search_login_wall_live_dom.py]]
- 1 edge to [[_COMMUNITY_cian-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_cdp_budget.py]]
- 1 edge to [[_COMMUNITY_get_text_budgeted]]
- 1 edge to [[_COMMUNITY_avito-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_ssr.py]]
- 1 edge to [[_COMMUNITY_mcp_wire.py]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_http_tier.py]]
- 1 edge to [[_COMMUNITY_test_dsh_bundle.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_resilience.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_stealth.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_main.py]]
- 1 edge to [[_COMMUNITY_test_stdio_probe.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_wb-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_test_anti_bot_challenge_dom.py]]
- 1 edge to [[_COMMUNITY_test_storefront_search.py]]
- 1 edge to [[_COMMUNITY_test_runtime.py]]
- 1 edge to [[_COMMUNITY_test_model_routing_eval_verdict.py]]
- 1 edge to [[_COMMUNITY_test_cdp_transport.py]]
- 1 edge to [[_COMMUNITY_test_source_selection.py]]
- 1 edge to [[_COMMUNITY_test_redact.py]]
- 1 edge to [[_COMMUNITY_e2e_stdio_check.py]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]
- 1 edge to [[_COMMUNITY_megamarket-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_aliexpress-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_detmir-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_TTLCache]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_cli.py]]
- 1 edge to [[_COMMUNITY_test_ci_concurrency.py]]
- 1 edge to [[_COMMUNITY_mcp-coreteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_lamoda-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_process.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_snapshot.py]]
- 1 edge to [[_COMMUNITY_citilink-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_skills_parity.py]]
- 1 edge to [[_COMMUNITY_test_handoff_reporting.py]]
- 1 edge to [[_COMMUNITY_ProductIdentity]]
- 1 edge to [[_COMMUNITY_test_pagination_wrap.py]]
- 1 edge to [[_COMMUNITY_test_pacing.py]]
- 1 edge to [[_COMMUNITY_lamoda-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_yandex-connectorteststest_server.py]]

## Top bridge nodes
- [[pytest]] - degree 80, connects to 59 communities
- [[test_domtest_utf8.py]] - degree 8, connects to 2 communities
- [[_extract()_11]] - degree 6, connects to 1 community
- [[_wb_http_transport_for_unit_tests()]] - degree 3, connects to 1 community
- [[test_detmir_selfcheck_reaches_a_verdict()]] - degree 2, connects to 1 community