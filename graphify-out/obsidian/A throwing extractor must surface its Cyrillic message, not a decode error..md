---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py"
type: "rationale"
community: "test_domtest_utf8.py"
location: "L53"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_domtest_utf8py
---

# A throwing extractor must surface its Cyrillic message, not a decode error.

## Connections
- [[test_cyrillic_stderr_reaches_the_assertion_intact()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_domtest_utf8py