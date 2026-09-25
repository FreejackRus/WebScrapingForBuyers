---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py"
type: "rationale"
community: "test_process.py"
location: "L42"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_processpy
---

# A lowercase 'path' must not slip through the POSIX allowlist. Case-folding is…

## Connections
- [[test_safe_child_env_does_not_case_fold_on_posix()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_processpy