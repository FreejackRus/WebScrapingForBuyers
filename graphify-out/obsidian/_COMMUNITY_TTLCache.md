---
type: community
cohesion: 0.16
members: 17
---

# TTLCache

**Cohesion:** 0.16 - loosely connected
**Members:** 17 nodes

## Members
- [[dot-__len__()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-clear()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-enabled()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-purge_expired()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[dot-ttl_s()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[Bounded LRU cache whose entries expire after ``ttl_s`` seconds. ``ttl_s = 0``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[TTLCache]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py
- [[Tests for the in-process TTL cache. Time is driven through a fake ``monotonic``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_cache.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_entry_expires_after_ttl()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_invalidate_and_clear()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_lru_eviction_keeps_recently_used()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_miss_then_hit()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_purge_expired_drops_only_stale_entries()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_stats_hit_rate_is_safe_when_empty()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[test_zero_ttl_disables_caching()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py
- [[ttl_s=0 must make the cache inert, not merely fast-expiring.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/TTLCache
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_dot-get]]
- 4 edges to [[_COMMUNITY_test_get_or_fetch_bypasses_a_disabled_cache]]
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_test_cache_can_be_disabled_by_ttl_zero]]
- 2 edges to [[_COMMUNITY_test_get_or_fetch_collapses_concurrent_misses]]
- 1 edge to [[_COMMUNITY_CacheStats]]
- 1 edge to [[_COMMUNITY_taobao]]
- 1 edge to [[_COMMUNITY_test_challenge_recovery_bypasses_failed_payload_cache]]
- 1 edge to [[_COMMUNITY_test_challenge_recovery_reads_browser_again_and_caches_only_success]]
- 1 edge to [[_COMMUNITY_Clock]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[TTLCache]] - degree 27, connects to 9 communities
- [[test_cache.py]] - degree 15, connects to 5 communities