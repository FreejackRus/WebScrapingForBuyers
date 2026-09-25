---
source_file: "mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py"
type: "rationale"
community: "_tool_error_payload"
location: "L575"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/_tool_error_payload
---

# A 429 from v9 must raise, not silently degrade to the stale-id path.

## Connections
- [[test_wb_search_rate_limit_is_surfaced_not_masked_by_fallback()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/_tool_error_payload