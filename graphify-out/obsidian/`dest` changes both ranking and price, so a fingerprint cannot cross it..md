---
source_file: "mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_pagination_wrap.py"
type: "rationale"
community: "test_pagination_wrap.py"
location: "L104"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_pagination_wrappy
---

# `dest` changes both ranking and price, so a fingerprint cannot cross it.

## Connections
- [[test_pages_are_scoped_per_query_and_region()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_pagination_wrappy