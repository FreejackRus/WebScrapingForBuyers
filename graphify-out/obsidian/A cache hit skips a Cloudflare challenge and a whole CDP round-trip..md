---
source_file: "mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py"
type: "rationale"
community: "test_cache_is_keyed_by_canonical_path_not_raw_input"
location: "L796"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_cache_is_keyed_by_canonical_path_not_raw_input
---

# A cache hit skips a Cloudflare challenge and a whole CDP round-trip.

## Connections
- [[test_fetch_composer_serves_a_repeat_read_from_cache()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_cache_is_keyed_by_canonical_path_not_raw_input