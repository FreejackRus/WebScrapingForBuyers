---
source_file: "mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py"
type: "rationale"
community: "test_cache_does_not_remember_a_rate_limit"
location: "L1308"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_cache_does_not_remember_a_rate_limit
---

# A cached 429 would keep reporting rate-limited after the limit lifted.

## Connections
- [[test_cache_does_not_remember_a_rate_limit()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_cache_does_not_remember_a_rate_limit