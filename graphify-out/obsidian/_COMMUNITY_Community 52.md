---
type: community
cohesion: 0.08
members: 32
---

# Community 52

**Cohesion:** 0.08 - loosely connected
**Members:** 32 nodes

## Members
- [[dot-__len__()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-clear()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-enabled()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-purge_expired()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-ttl_s()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[Bounded LRU cache whose entries expire after ``ttl_s`` seconds. ``ttl_s = 0``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[Concurrent misses on one key must produce a single upstream call. This is what…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[TTLCache]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[Tests for the in-process TTL cache. Time is driven through a fake ``monotonic``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[WB_CACHE_TTL=0 means every read goes upstream.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[__aenter__()_11]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[__aexit__()_11]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[aiter_bytes()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[factory()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[factory()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[no_wait()_33]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_83]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[slow_factory()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[stream()_8]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_cache.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_cache_can_be_disabled_by_ttl_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_entry_expires_after_ttl()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_get_or_fetch_bypasses_a_disabled_cache()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_get_or_fetch_calls_factory_once_per_key()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_get_or_fetch_collapses_concurrent_misses()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_invalidate_and_clear()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_lru_eviction_keeps_recently_used()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_miss_then_hit()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_purge_expired_drops_only_stale_entries()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_stats_hit_rate_is_safe_when_empty()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_zero_ttl_disables_caching()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[ttl_s=0 must make the cache inert, not merely fast-expiring.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_52
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_Community 203]]
- 3 edges to [[_COMMUNITY_Community 14]]
- 1 edge to [[_COMMUNITY_Community 243]]
- 1 edge to [[_COMMUNITY_Community 238]]
- 1 edge to [[_COMMUNITY_Community 280]]
- 1 edge to [[_COMMUNITY_Community 259]]
- 1 edge to [[_COMMUNITY_Community 1]]
- 1 edge to [[_COMMUNITY_Community 171]]
- 1 edge to [[_COMMUNITY_Community 39]]
- 1 edge to [[_COMMUNITY_Community 96]]

## Top bridge nodes
- [[TTLCache]] - degree 27, connects to 6 communities
- [[test_cache.py]] - degree 15, connects to 3 communities
- [[test_cache_can_be_disabled_by_ttl_zero()]] - degree 9, connects to 1 community
- [[scenario()_83]] - degree 3, connects to 1 community