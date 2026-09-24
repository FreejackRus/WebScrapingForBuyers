---
type: community
cohesion: 0.07
members: 42
---

# get_text_budgeted

**Cohesion:** 0.07 - loosely connected
**Members:** 42 nodes

## Members
- [[dot-wait()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[A capped body is a value, not an exception callers fall through to the next…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[Anything that can space out requests. Structural, not nominal, so a connector…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[AsyncClient]] - code
- [[Better to report the failure now than sleep past a deadline and report it late.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[Bursting a marketplace right after it faulted is how IPs get banned.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[Detsky Mir answers 404 while rendering a real page, so the body still matters.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[GET ``url`` under a hard wall-clock budget, returning ``(status, text, err)``.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[PoliteGate]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[Protocol]] - code
- [[Retrying a 429 deepens a rate limit; no repeat request changes a 4xx. Gateway-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[The deadline fires mid-request, so a hung upstream cannot outlast the budget.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[_drain()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[_once()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[get_text_budgeted()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[handler()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_7]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_8]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_9]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_10]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[handler()_11]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[make_client()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[parametrize_6]] - code
- [[test_backoff_that_would_outlast_the_budget_is_not_taken()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_body_cap_returns_error_instead_of_raising()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_error_bodies_are_returned_in_full_for_the_caller_to_judge()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_exhausted_budget_short_circuits_before_any_request()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_headers_are_forwarded()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_http_statuses_are_never_retried()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_httpx_timeout_is_classified_as_timeout()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_retry_passes_back_through_the_polite_gate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_returns_status_text_and_no_error()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_transport_error_is_classified_not_raised_when_budget_spent()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_transport_error_is_retried_then_succeeds()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[test_wall_clock_budget_bounds_a_single_slow_attempt()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py
- [[wait()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/get_text_budgeted
SORT file.name ASC
```

## Connections to other communities
- 13 edges to [[_COMMUNITY_pytest]]
- 5 edges to [[_COMMUNITY_transport__init__.py]]
- 2 edges to [[_COMMUNITY_coerce_price]]
- 2 edges to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_StdioProbe]]

## Top bridge nodes
- [[get_text_budgeted()]] - degree 25, connects to 5 communities
- [[make_client()]] - degree 14, connects to 1 community
- [[test_http_statuses_are_never_retried()]] - degree 7, connects to 1 community
- [[test_retry_passes_back_through_the_polite_gate()]] - degree 7, connects to 1 community
- [[PoliteGate]] - degree 6, connects to 1 community