---
type: community
cohesion: 0.10
members: 27
---

# pathlib

**Cohesion:** 0.10 - loosely connected
**Members:** 27 nodes

## Members
- [[A mismatched pin must fail, and name both hashes.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_check_provenance_gate.py
- [[Ask pytest how many tests the documented selection collects.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[Collection failures must not be converted into a successful documentation gate.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/test_test_count_gate.py
- [[Every (provenance, fixture, declared sha256) triple we can check.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_provenance.py
- [[Fail if the documented offline-test count disagrees with the real one. The…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[Path_8]] - code
- [[The allowlist must not outlive the problem it tolerates.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_check_provenance_gate.py
- [[The provenance gate must catch a pin that no longer describes its file.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_check_provenance_gate.py
- [[Verify every fixture's sha256 pin against the fixture itself. A provenance file…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_provenance.py
- [[_collected()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[check()_1]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_provenance.py
- [[check_provenance.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_provenance.py
- [[check_test_count.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[hashlib]] - concept
- [[main()_21]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_provenance.py
- [[main()_22]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[parametrize_15]] - code
- [[pathlib]] - concept
- [[pins()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_provenance.py
- [[test_a_matching_pin_is_silent()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_check_provenance_gate.py
- [[test_a_quarantined_pin_that_starts_matching_is_reported()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_check_provenance_gate.py
- [[test_a_stale_pin_is_reported()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_check_provenance_gate.py
- [[test_check_provenance_gate.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_check_provenance_gate.py
- [[test_partial_collection_with_errors_is_not_a_valid_count()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_test_count_gate.py
- [[test_successful_collection_returns_selected_count()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_test_count_gate.py
- [[test_test_count_gate.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_test_count_gate.py
- [[test_the_repository_passes_the_gate()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_check_provenance_gate.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/pathlib
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_mcp_wire.py]]
- 4 edges to [[_COMMUNITY_domtest.py]]
- 3 edges to [[_COMMUNITY_resilience.py]]
- 3 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 2 edges to [[_COMMUNITY_test_search_parser_live.py]]
- 2 edges to [[_COMMUNITY_backup-state.py]]
- 2 edges to [[_COMMUNITY_aliexpress-connectorteststest_parser_live.py]]
- 2 edges to [[_COMMUNITY_pytest]]
- 2 edges to [[_COMMUNITY_taobao-connectorteststest_shape_reference.py]]
- 2 edges to [[_COMMUNITY_dom.py]]
- 2 edges to [[_COMMUNITY_e2e_stdio_check.py]]
- 2 edges to [[_COMMUNITY_lamoda-connectorteststest_shape_reference.py]]
- 2 edges to [[_COMMUNITY_shape_signature]]
- 1 edge to [[_COMMUNITY_test_dependency_parity.py]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_firewall_pow.py]]
- 1 edge to [[_COMMUNITY_test_search_login_wall_live_dom.py]]
- 1 edge to [[_COMMUNITY_cian-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_model_routing_eval.py]]
- 1 edge to [[_COMMUNITY_test_ssr.py]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_dsh_bundle.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_megamarket-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_check_no_print.py]]
- 1 edge to [[_COMMUNITY_check_versions.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_stdio_probe.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_wb-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_ozon_connectorserver.py]]
- 1 edge to [[_COMMUNITY_test_anti_bot_challenge_dom.py]]
- 1 edge to [[_COMMUNITY_test_storefront_search.py]]
- 1 edge to [[_COMMUNITY_test_model_routing_eval_verdict.py]]
- 1 edge to [[_COMMUNITY_test_live_payload_contract.py]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_test_distribution_contract.py]]
- 1 edge to [[_COMMUNITY_detmir-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_test_cdp_transport.py]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_check_coverage_floor.py]]
- 1 edge to [[_COMMUNITY_mcp_startup.py]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]
- 1 edge to [[_COMMUNITY_cian-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_detmir-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_cli.py]]
- 1 edge to [[_COMMUNITY_test_ci_concurrency.py]]
- 1 edge to [[_COMMUNITY_process.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_citilink-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_skills_parity.py]]
- 1 edge to [[_COMMUNITY_model_routing_eval.py]]
- 1 edge to [[_COMMUNITY_test_public_contract_snapshot.py]]
- 1 edge to [[_COMMUNITY_lamoda-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_yandex-connectorteststest_server.py]]

## Top bridge nodes
- [[pathlib]] - degree 76, connects to 56 communities
- [[hashlib]] - degree 6, connects to 4 communities
- [[test_test_count_gate.py]] - degree 8, connects to 3 communities
- [[test_check_provenance_gate.py]] - degree 11, connects to 1 community
- [[check_provenance.py]] - degree 8, connects to 1 community