---
source_file: "mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py"
type: "rationale"
community: "_parse_search_items"
location: "L113"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/_parse_search_items
---

# A real date string, when Avito sends one, wins over the epoch field.

## Connections
- [[test_posted_at_prefers_an_explicit_string()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/_parse_search_items