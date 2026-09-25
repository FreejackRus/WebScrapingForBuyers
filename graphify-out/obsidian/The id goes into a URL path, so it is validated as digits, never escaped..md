---
source_file: "mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py"
type: "rationale"
community: "test_card_rejects_non_numeric_ids"
location: "L245"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_card_rejects_non_numeric_ids
---

# The id goes into a URL path, so it is validated as digits, never escaped.

## Connections
- [[test_card_rejects_non_numeric_ids()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_card_rejects_non_numeric_ids