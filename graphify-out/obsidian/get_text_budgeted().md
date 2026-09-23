---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py"
type: "code"
community: "Community 13"
location: "L181"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/Community_13
---

# get_text_budgeted()

## Connections
- [[dot-response()]] - `indirect_call` [INFERRED]
- [[AsyncClient_3]] - `references` [EXTRACTED]
- [[GET ``url`` under a hard wall-clock budget, returning ``(status, text, err)``.…]] - `rationale_for` [EXTRACTED]
- [[PoliteGate]] - `references` [EXTRACTED]
- [[_budgeted_get_text()]] - `calls` [INFERRED]
- [[_drain()]] - `contains` [EXTRACTED]
- [[_once()]] - `contains` [EXTRACTED]
- [[http_tier.py]] - `contains` [EXTRACTED]
- [[test_backoff_that_would_outlast_the_budget_is_not_taken()]] - `calls` [INFERRED]
- [[test_body_cap_returns_error_instead_of_raising()]] - `calls` [INFERRED]
- [[test_error_bodies_are_returned_in_full_for_the_caller_to_judge()]] - `calls` [INFERRED]
- [[test_exhausted_budget_short_circuits_before_any_request()]] - `calls` [INFERRED]
- [[test_headers_are_forwarded()]] - `calls` [INFERRED]
- [[test_http_statuses_are_never_retried()]] - `calls` [INFERRED]
- [[test_httpx_timeout_is_classified_as_timeout()]] - `calls` [INFERRED]
- [[test_retry_passes_back_through_the_polite_gate()]] - `calls` [INFERRED]
- [[test_returns_status_text_and_no_error()]] - `calls` [INFERRED]
- [[test_transport_error_is_classified_not_raised_when_budget_spent()]] - `calls` [INFERRED]
- [[test_transport_error_is_retried_then_succeeds()]] - `calls` [INFERRED]
- [[test_wall_clock_budget_bounds_a_single_slow_attempt()]] - `calls` [INFERRED]
- [[transport__init__.py]] - `imports` [EXTRACTED]

#graphify/code #graphify/INFERRED #community/Community_13