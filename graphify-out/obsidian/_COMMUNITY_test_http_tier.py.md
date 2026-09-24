---
type: community
cohesion: 0.13
members: 17
---

# test_http_tier.py

**Cohesion:** 0.13 - loosely connected
**Members:** 17 nodes

## Members
- [[First non-empty proxy URL among ``env_names``, then the standard vars. Lets a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[Resolve Ozon's tier-1 proxy explicit ``OZON_PROXY`` first, then the standard…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Several RU marketplaces answer datacenter IPs with a self-referential 307.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[Tests for the anonymous HTTP tier. All network is served by an…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[_proxy()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_proxy()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_proxy()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[fail_sleep()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[fake_sleep()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[proxy_from_env()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py
- [[test_build_client_does_not_follow_redirects_by_default()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_http_tier.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_proxy_from_env_falls_back_to_standard_vars()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_proxy_from_env_ignores_blank_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_proxy_from_env_prefers_connector_specific_var()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_rate_limiter_disabled_when_gap_is_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_rate_limiter_spaces_requests()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_http_tierpy
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_make_client]]
- 6 edges to [[_COMMUNITY_transport__init__.py]]
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY__client]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_ozon_connectorserver.py]]
- 1 edge to [[_COMMUNITY_test_gateway_statuses_are_retried]]
- 1 edge to [[_COMMUNITY_test_rate_limit_status_is_never_retried]]
- 1 edge to [[_COMMUNITY_test_error_body_cap_can_be_disabled]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[test_http_tier.py]] - degree 21, connects to 7 communities
- [[proxy_from_env()]] - degree 11, connects to 3 communities
- [[_proxy()_2]] - degree 4, connects to 2 communities
- [[_proxy()_1]] - degree 3, connects to 2 communities
- [[_proxy()_3]] - degree 3, connects to 2 communities