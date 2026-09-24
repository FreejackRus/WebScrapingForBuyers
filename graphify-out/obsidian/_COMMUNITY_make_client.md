---
type: community
cohesion: 0.16
members: 17
---

# make_client

**Cohesion:** 0.16 - loosely connected
**Members:** 17 nodes

## Members
- [[After the budget runs out the caller still gets the status, not an exception.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[AsyncClient_1]] - code
- [[handler()_12]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_13]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_14]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_15]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_16]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_17]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_18]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[make_client()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_body_cap_is_enforced()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_client_error_is_not_retried()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_error_bodies_are_truncated_by_default()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_exhausted_gateway_retries_return_the_real_response()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_returns_status_and_body()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_transport_error_is_retried_then_succeeds()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_transport_error_propagates_when_budget_exhausted()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/make_client
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_test_http_tier.py]]
- 7 edges to [[_COMMUNITY_transport__init__.py]]
- 2 edges to [[_COMMUNITY_test_error_body_cap_can_be_disabled]]
- 2 edges to [[_COMMUNITY_test_gateway_statuses_are_retried]]
- 2 edges to [[_COMMUNITY_test_rate_limit_status_is_never_retried]]

## Top bridge nodes
- [[make_client()_1]] - degree 12, connects to 4 communities
- [[handler()_16]] - degree 10, connects to 3 communities
- [[test_exhausted_gateway_retries_return_the_real_response()]] - degree 6, connects to 2 communities
- [[test_body_cap_is_enforced()]] - degree 5, connects to 2 communities
- [[test_client_error_is_not_retried()]] - degree 5, connects to 2 communities