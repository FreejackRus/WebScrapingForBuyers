---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py"
type: "rationale"
community: "TTLCache"
location: "L106"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/TTLCache
---

# Concurrent misses on one key must produce a single upstream call. This is what…

## Connections
- [[test_get_or_fetch_collapses_concurrent_misses()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/TTLCache