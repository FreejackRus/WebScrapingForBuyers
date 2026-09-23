---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py"
type: "code"
community: "Community 17"
location: "L114"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/Community_17
---

# get_text_with_retries()

## Connections
- [[AsyncClient_3]] - `references` [EXTRACTED]
- [[GET ``url`` and return ``(status_code, body_text)``. Retries genuine transport…]] - `rationale_for` [EXTRACTED]
- [[RateLimiter]] - `references` [EXTRACTED]
- [[fetch()]] - `calls` [INFERRED]
- [[fetch()_1]] - `calls` [INFERRED]
- [[http_tier.py]] - `contains` [EXTRACTED]
- [[read_capped_text()]] - `calls` [EXTRACTED]
- [[test_body_cap_is_enforced()]] - `calls` [INFERRED]
- [[test_client_error_is_not_retried()]] - `calls` [INFERRED]
- [[test_error_bodies_are_truncated_by_default()]] - `calls` [INFERRED]
- [[test_error_body_cap_can_be_disabled()]] - `calls` [INFERRED]
- [[test_exhausted_gateway_retries_return_the_real_response()]] - `calls` [INFERRED]
- [[test_gateway_statuses_are_retried()]] - `calls` [INFERRED]
- [[test_rate_limit_status_is_never_retried()]] - `calls` [INFERRED]
- [[test_returns_status_and_body()]] - `calls` [INFERRED]
- [[test_transport_error_is_retried_then_succeeds()_2]] - `calls` [INFERRED]
- [[test_transport_error_propagates_when_budget_exhausted()]] - `calls` [INFERRED]
- [[transport__init__.py]] - `imports` [EXTRACTED]

#graphify/code #graphify/INFERRED #community/Community_17