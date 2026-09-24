---
source_file: "mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_pagination_wrap.py"
type: "rationale"
community: "test_pagination_wrap.py"
location: "L97"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_pagination_wrappy
---

# The guard must not eat real results — that would be the worse bug.

## Connections
- [[test_a_genuinely_different_page_is_not_flagged()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_pagination_wrappy