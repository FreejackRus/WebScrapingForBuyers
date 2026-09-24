---
source_file: "mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py"
type: "rationale"
community: "_parse_search_items"
location: "L124"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/_parse_search_items
---

# json.loads admits Infinity/NaN and arbitrary-precision ints, so a poisoned…

## Connections
- [[test_posted_at_never_raises_on_non_finite_or_huge_stamps()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/_parse_search_items