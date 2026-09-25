---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py"
type: "rationale"
community: "test_domtest_utf8.py"
location: "L60"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_domtest_utf8py
---

# Non-JSON stdout must raise, never pass a silently-decoded blob.

## Connections
- [[test_broken_json_is_refused_loudly()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_domtest_utf8py