---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py"
type: "code"
community: "TTLCache"
location: "L1"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/TTLCache
---

# test_cache.py

## Connections
- [[Tests for the in-process TTL cache. Time is driven through a fake ``monotonic``…]] - `rationale_for` [EXTRACTED]
- [[asyncio_2]] - `imports` [EXTRACTED]
- [[cache.py]] - `imports_from` [EXTRACTED]
- [[clock()]] - `contains` [EXTRACTED]
- [[pytest]] - `imports` [EXTRACTED]
- [[test_entry_expires_after_ttl()]] - `contains` [EXTRACTED]
- [[test_get_or_fetch_bypasses_a_disabled_cache()]] - `contains` [EXTRACTED]
- [[test_get_or_fetch_calls_factory_once_per_key()]] - `contains` [EXTRACTED]
- [[test_get_or_fetch_collapses_concurrent_misses()]] - `contains` [EXTRACTED]
- [[test_invalidate_and_clear()]] - `contains` [EXTRACTED]
- [[test_lru_eviction_keeps_recently_used()]] - `contains` [EXTRACTED]
- [[test_miss_then_hit()]] - `contains` [EXTRACTED]
- [[test_purge_expired_drops_only_stale_entries()]] - `contains` [EXTRACTED]
- [[test_stats_hit_rate_is_safe_when_empty()]] - `contains` [EXTRACTED]
- [[test_zero_ttl_disables_caching()]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/TTLCache