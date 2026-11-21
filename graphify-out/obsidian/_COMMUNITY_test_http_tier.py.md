---
type: community
cohesion: 0.07
members: 50
---

# test_http_tier.py

**Cohesion:** 0.07 - loosely connected
**Members:** 50 nodes

## Members
- [[dot-wait()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[502503504 are transient upstream overload — worth one more attempt.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[After the budget runs out the caller still gets the status, not an exception.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[AsyncClient_2]] - code
- [[AsyncClient_3]] - code
- [[Detsky Mir's search route answers 404 with a full page of real content.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[First non-empty proxy URL among ``env_names``, then the standard vars. Lets a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[GET ``url`` and return ``(status_code, body_text)``. Retries genuine transport…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[RateLimiter]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[Resolve Ozon's tier-1 proxy explicit ``OZON_PROXY`` first, then the standard…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Retrying a 429 deepens the rate-limit hole, so it must pass straight through.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[Serialises requests so consecutive calls stay ``min_gap_s`` apart.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[Several RU marketplaces answer datacenter IPs with a self-referential 307.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[Tests for the anonymous HTTP tier. All network is served by an…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[_proxy()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_proxy()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_proxy()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[fail_sleep()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[fake_sleep()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[get_text_with_retries()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[handler()_12]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_13]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_14]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_15]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_16]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_17]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_18]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_19]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_20]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_21]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[make_client()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[parametrize_13]] - code
- [[proxy_from_env()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[test_body_cap_is_enforced()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_build_client_does_not_follow_redirects_by_default()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_client_error_is_not_retried()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_error_bodies_are_truncated_by_default()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_error_body_cap_can_be_disabled()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_exhausted_gateway_retries_return_the_real_response()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_gateway_statuses_are_retried()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_http_tier.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_proxy_from_env_falls_back_to_standard_vars()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_proxy_from_env_ignores_blank_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_proxy_from_env_prefers_connector_specific_var()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_rate_limit_status_is_never_retried()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_rate_limiter_disabled_when_gap_is_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_rate_limiter_spaces_requests()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_returns_status_and_body()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_transport_error_is_retried_then_succeeds()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_transport_error_propagates_when_budget_exhausted()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_http_tierpy
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_json]]
- 6 edges to [[_COMMUNITY_TransportDownError]]
- 5 edges to [[_COMMUNITY_transport__init__.py]]
- 2 edges to [[_COMMUNITY_ozon_connectorserver.py]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_get_text_budgeted]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[test_http_tier.py]] - degree 21, connects to 3 communities
- [[get_text_with_retries()]] - degree 18, connects to 3 communities
- [[proxy_from_env()]] - degree 10, connects to 3 communities
- [[RateLimiter]] - degree 7, connects to 2 communities
- [[_proxy()_1]] - degree 3, connects to 2 communities