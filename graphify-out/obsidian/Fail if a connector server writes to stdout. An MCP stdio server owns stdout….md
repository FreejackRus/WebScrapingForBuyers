---
source_file: "mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py"
type: "rationale"
community: "test_dependency_parity.py"
location: "L2"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_dependency_paritypy
---

# Fail if a connector server writes to stdout. An MCP stdio server owns stdout:…

## Connections
- [[check_no_print.py]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_dependency_paritypy