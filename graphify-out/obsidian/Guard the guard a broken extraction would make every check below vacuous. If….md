---
source_file: "mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py"
type: "rationale"
community: "test_dependency_parity.py"
location: "L116"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_dependency_paritypy
---

# Guard the guard: a broken extraction would make every check below vacuous. If…

## Connections
- [[test_the_mounts_table_was_read()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_dependency_paritypy