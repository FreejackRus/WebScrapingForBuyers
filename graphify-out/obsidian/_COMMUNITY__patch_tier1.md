---
type: community
cohesion: 0.17
members: 15
---

# _patch_tier1

**Cohesion:** 0.17 - loosely connected
**Members:** 15 nodes

## Members
- [[A cache hit skips a Cloudflare challenge and a whole CDP round-trip.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[A cached 403 would keep reporting a block after the challenge cleared.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[Route tier-1 through ``impl`` directly. ``_run_sync_bounded`` executes its…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[Two spellings of the same product must share one cache entry.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[_patch_tier1()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[blocked_then_ok()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[counting_get()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[counting_get()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[failing_cdp()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[scenario()_29]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[scenario()_30]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[scenario()_31]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_cache_is_keyed_by_canonical_path_not_raw_input()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_fetch_composer_does_not_cache_a_block()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_fetch_composer_serves_a_repeat_read_from_cache()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_patch_tier1
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 3 edges to [[_COMMUNITY__run]]
- 1 edge to [[_COMMUNITY_test_fetch_composer_caches_a_successful_cdp_body]]
- 1 edge to [[_COMMUNITY_test_tier1_proxy_is_passed_as_an_argument_not_an_env_var]]
- 1 edge to [[_COMMUNITY_test_sources_run_concurrently]]

## Top bridge nodes
- [[_patch_tier1()]] - degree 8, connects to 4 communities
- [[test_fetch_composer_does_not_cache_a_block()]] - degree 6, connects to 2 communities
- [[test_cache_is_keyed_by_canonical_path_not_raw_input()]] - degree 5, connects to 2 communities
- [[test_fetch_composer_serves_a_repeat_read_from_cache()]] - degree 5, connects to 2 communities