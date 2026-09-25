---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cache.py"
type: "rationale"
community: "TTLCache"
location: "L51"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/TTLCache
---

# ttl_s=0 must make the cache inert, not merely fast-expiring.

## Connections
- [[test_zero_ttl_disables_caching()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/TTLCache