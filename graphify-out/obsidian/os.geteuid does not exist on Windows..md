---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py"
type: "rationale"
community: "test_chrome_cdp.py"
location: "L347"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_chrome_cdppy
---

# os.geteuid does not exist on Windows.

## Connections
- [[test_root_check_handles_platforms_without_geteuid()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_chrome_cdppy