---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py"
type: "rationale"
community: "test_root_check_is_true_for_uid_zero"
location: "L341"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_root_check_is_true_for_uid_zero
---

# Chrome refuses --no-sandbox-less startup as root, so this must be detected.

## Connections
- [[test_root_check_is_true_for_uid_zero()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_root_check_is_true_for_uid_zero