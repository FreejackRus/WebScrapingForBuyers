---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py"
type: "rationale"
community: "test_chrome_cdp.py"
location: "L151"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_chrome_cdppy
---

# An unset ProgramFiles must not yield a path starting with a bare slash.

## Connections
- [[test_candidates_never_contain_empty_entries()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_chrome_cdppy