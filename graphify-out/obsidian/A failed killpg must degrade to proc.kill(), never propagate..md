---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py"
type: "rationale"
community: "test_process.py"
location: "L149"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_processpy
---

# A failed killpg must degrade to proc.kill(), never propagate.

## Connections
- [[test_terminate_worker_tree_falls_back_to_kill_when_killpg_fails()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_processpy