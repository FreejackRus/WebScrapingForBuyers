---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/cache.py"
type: "code"
community: "TTLCache"
location: "L53"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/TTLCache
---

# TTLCache

## Connections
- [[dot-__init__()_17]] - `method` [EXTRACTED]
- [[dot-__len__()]] - `method` [EXTRACTED]
- [[dot-clear()]] - `method` [EXTRACTED]
- [[dot-enabled()]] - `method` [EXTRACTED]
- [[dot-get()]] - `method` [EXTRACTED]
- [[dot-get_or_fetch()]] - `method` [EXTRACTED]
- [[dot-invalidate()]] - `method` [EXTRACTED]
- [[dot-purge_expired()]] - `method` [EXTRACTED]
- [[dot-set()]] - `method` [EXTRACTED]
- [[dot-ttl_s()]] - `method` [EXTRACTED]
- [[Bounded LRU cache whose entries expire after ``ttl_s`` seconds. ``ttl_s = 0``…]] - `rationale_for` [EXTRACTED]
- [[browser()]] - `uses` [INFERRED]
- [[cache.py]] - `contains` [EXTRACTED]
- [[scenario()_82]] - `calls` [EXTRACTED]
- [[test_cache_can_be_disabled_by_ttl_zero()]] - `uses` [INFERRED]
- [[test_challenge_recovery_bypasses_failed_payload_cache()]] - `uses` [INFERRED]
- [[test_challenge_recovery_reads_browser_again_and_caches_only_success()]] - `uses` [INFERRED]
- [[test_entry_expires_after_ttl()]] - `uses` [INFERRED]
- [[test_get_or_fetch_bypasses_a_disabled_cache()]] - `uses` [INFERRED]
- [[test_get_or_fetch_calls_factory_once_per_key()]] - `uses` [INFERRED]
- [[test_get_or_fetch_collapses_concurrent_misses()]] - `uses` [INFERRED]
- [[test_invalidate_and_clear()]] - `uses` [INFERRED]
- [[test_lru_eviction_keeps_recently_used()]] - `uses` [INFERRED]
- [[test_miss_then_hit()]] - `uses` [INFERRED]
- [[test_purge_expired_drops_only_stale_entries()]] - `uses` [INFERRED]
- [[test_stats_hit_rate_is_safe_when_empty()]] - `uses` [INFERRED]
- [[test_zero_ttl_disables_caching()]] - `uses` [INFERRED]

#graphify/code #graphify/INFERRED #community/TTLCache