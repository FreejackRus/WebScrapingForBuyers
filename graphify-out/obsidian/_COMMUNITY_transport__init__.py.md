---
type: community
cohesion: 0.08
members: 37
---

# transport/__init__.py

**Cohesion:** 0.08 - loosely connected
**Members:** 37 nodes

## Members
- [[dot-__init__()_24]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[dot-wait()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[A response body exceeded the configured byte cap and was abandoned.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[Anonymous HTTP tier polite, bounded, retry-aware reads of public endpoints.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[AsyncClient_2]] - code
- [[BodyTooLargeError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[CDP navigation budget bounded concurrency, per-host serialization, refusals.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Construct an ``AsyncClient`` configured for marketplace catalog reads.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[Diagnostics for the process-wide budget (used by selfcheck-style tools).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Exception]] - code
- [[GET ``url`` and return ``(status_code, body_text)``. Retries genuine transport…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[RateLimiter]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[Response]] - code
- [[Serialises requests so consecutive calls stay ``min_gap_s`` apart.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[Stream ``response`` into text, refusing to buffer past ``max_bytes``. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[The permit covers the navigation, not the page's lifetime.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[The process-wide budget, built from the environment on first use.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Transport tiers shared by every connector. Two tiers, tried in cost order…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/__init__.py
- [[_env_float()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[_env_int()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[both()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_open_page_budget_integration.py
- [[budget_snapshot()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[build_client()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[cdp_budget.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dataclasses]] - concept
- [[get_text_with_retries()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[http_tier.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
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
- 17 edges to [[_COMMUNITY_json]]
- 9 edges to [[_COMMUNITY_pytest]]
- 7 edges to [[_COMMUNITY_make_client]]
- 6 edges to [[_COMMUNITY_test_http_tier.py]]
- 5 edges to [[_COMMUNITY_get_text_budgeted]]
- 5 edges to [[_COMMUNITY_TransportDownError]]
- 4 edges to [[_COMMUNITY_NavigationBudget]]
- 3 edges to [[_COMMUNITY_test_cdp_budget.py]]
- 2 edges to [[_COMMUNITY_HostRefusingError]]
- 2 edges to [[_COMMUNITY_chrome_cdp.py]]
- 2 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_Slot]]
- 1 edge to [[_COMMUNITY_open_page]]
- 1 edge to [[_COMMUNITY_citilink_card]]
- 1 edge to [[_COMMUNITY_test_error_body_cap_can_be_disabled]]
- 1 edge to [[_COMMUNITY_test_gateway_statuses_are_retried]]
- 1 edge to [[_COMMUNITY_test_rate_limit_status_is_never_retried]]
- 1 edge to [[_COMMUNITY_fake_browser]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_ozon_connectorserver.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_stealth.py]]
- 1 edge to [[_COMMUNITY_mpstats_connectorserver.py]]
- 1 edge to [[_COMMUNITY_mcp-coreteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_snapshot.py]]
- 1 edge to [[_COMMUNITY_test_handoff_reporting.py]]
- 1 edge to [[_COMMUNITY_mcp_wire.py]]

## Top bridge nodes
- [[transport__init__.py]] - degree 35, connects to 16 communities
- [[cdp_budget.py]] - degree 21, connects to 8 communities
- [[get_text_with_retries()]] - degree 18, connects to 5 communities
- [[navigation_budget()]] - degree 10, connects to 4 communities
- [[http_tier.py]] - degree 16, connects to 3 communities