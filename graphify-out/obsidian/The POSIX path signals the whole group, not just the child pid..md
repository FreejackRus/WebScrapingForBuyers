---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py"
type: "rationale"
community: "test_process.py"
location: "L164"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_processpy
---

# The POSIX path signals the whole group, not just the child pid.

## Connections
- [[test_kill_process_group_uses_posix_signalling()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_processpy