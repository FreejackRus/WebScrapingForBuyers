---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py"
type: "rationale"
community: "test_root_check_handles_platforms_without_geteuid"
location: "L347"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_root_check_handles_platforms_without_geteuid
---

# os.geteuid does not exist on Windows.

## Connections
- [[test_root_check_handles_platforms_without_geteuid()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_root_check_handles_platforms_without_geteuid