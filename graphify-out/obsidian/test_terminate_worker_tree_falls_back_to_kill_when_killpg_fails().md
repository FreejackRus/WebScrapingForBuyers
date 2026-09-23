---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py"
type: "code"
community: "Community 62"
location: "L148"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/Community_62
---

# test_terminate_worker_tree_falls_back_to_kill_when_killpg_fails()

## Connections
- [[A failed killpg must degrade to proc.kill(), never propagate.]] - `rationale_for` [EXTRACTED]
- [[_FakeProc]] - `calls` [EXTRACTED]
- [[boom()_2]] - `indirect_call` [INFERRED]
- [[test_process.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/Community_62