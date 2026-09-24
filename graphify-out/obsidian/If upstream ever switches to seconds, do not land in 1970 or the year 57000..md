---
source_file: "mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py"
type: "rationale"
community: "_parse_search_items"
location: "L107"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/_parse_search_items
---

# If upstream ever switches to seconds, do not land in 1970 or the year 57000.

## Connections
- [[test_posted_at_handles_a_seconds_based_drift()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/_parse_search_items