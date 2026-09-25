---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py"
type: "rationale"
community: "compare-connector/tests/test_server.py"
location: "L662"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/compare-connector/tests/test_serverpy
---

# The sign guard must cover the unicode minus/en-dash/em-dash, not only ASCII…

## Connections
- [[test_count_coercion_rejects_unicode_signs_and_ranges()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/compare-connector/tests/test_serverpy