---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_domtest_utf8.py"
type: "rationale"
community: "test_domtest_utf8.py"
location: "L46"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_domtest_utf8py
---

# The regression: cp1251 decoding used to kill jsdom tests on Windows.

## Connections
- [[test_cyrillic_stdout_survives_the_run()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_domtest_utf8py