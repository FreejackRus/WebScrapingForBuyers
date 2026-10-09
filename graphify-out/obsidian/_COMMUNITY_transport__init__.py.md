---
type: community
cohesion: 0.11
members: 24
---

# transport/__init__.py

**Cohesion:** 0.11 - loosely connected
**Members:** 24 nodes

## Members
- [[dot-__init__()_26]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[A response body exceeded the configured byte cap and was abandoned.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[BodyTooLargeError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[Diagnostics for the process-wide budget (used by selfcheck-style tools).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Exception_3]] - code
- [[Response]] - code
- [[Stream ``response`` into text, refusing to buffer past ``max_bytes``. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[The permit covers the navigation, not the page's lifetime.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[The process-wide budget, built from the environment on first use.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Transport tiers shared by every connector. Two tiers, tried in cost order…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/__init__.py
- [[_env_float()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[_env_int()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[both()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[budget_snapshot()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[navigation_budget()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[open_page and the navigation budget, together — the integration the review…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[read_capped_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[test_a_navigation_that_succeeds_does_not_trip_the_breaker()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[test_a_non_http_url_is_refused_before_any_permit_is_taken()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[test_different_hosts_are_independent()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[test_open_page_budget_integration.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[test_the_host_slot_is_free_while_the_page_is_open()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[test_two_pages_for_one_host_can_be_open_at_the_same_time()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[transport__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/__init__.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/transport/__init__py
SORT file.name ASC
```

## Connections to other communities
- 15 edges to [[_COMMUNITY_json]]
- 3 edges to [[_COMMUNITY_get_text_budgeted]]
- 3 edges to [[_COMMUNITY_test_http_tier.py]]
- 3 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 3 edges to [[_COMMUNITY_TransportDownError]]
- 2 edges to [[_COMMUNITY_NavigationBudget]]
- 2 edges to [[_COMMUNITY_test_cdp_budget.py]]
- 2 edges to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_HostRefusingError]]
- 1 edge to [[_COMMUNITY_open_page]]
- 1 edge to [[_COMMUNITY_fake_browser]]
- 1 edge to [[_COMMUNITY_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_raw_lifecycle.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_stealth.py]]
- 1 edge to [[_COMMUNITY_ozon_connectorserver.py]]
- 1 edge to [[_COMMUNITY_detmir_connectorserver.py]]
- 1 edge to [[_COMMUNITY_mcp-coreteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_snapshot.py]]
- 1 edge to [[_COMMUNITY_test_handoff_reporting.py]]
- 1 edge to [[_COMMUNITY_test_review_regressions.py]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[transport__init__.py]] - degree 34, connects to 19 communities
- [[test_open_page_budget_integration.py]] - degree 13, connects to 4 communities
- [[navigation_budget()]] - degree 11, connects to 4 communities
- [[budget_snapshot()]] - degree 9, connects to 2 communities
- [[read_capped_text()]] - degree 6, connects to 2 communities