---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py"
type: "code"
community: "TTLCache"
location: "L105"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/TTLCache
---

# test_get_or_fetch_collapses_concurrent_misses()

## Connections
- [[Concurrent misses on one key must produce a single upstream call. This is what…]] - `rationale_for` [EXTRACTED]
- [[TTLCache]] - `uses` [INFERRED]
- [[slow_factory()]] - `indirect_call` [INFERRED]
- [[test_cache.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/TTLCache