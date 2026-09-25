---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py"
type: "rationale"
community: "test_process.py"
location: "L132"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_processpy
---

# On POSIX: SIGKILL the child's process group, never a bare kill().

## Connections
- [[test_terminate_worker_tree_kills_process_group_on_posix()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_processpy