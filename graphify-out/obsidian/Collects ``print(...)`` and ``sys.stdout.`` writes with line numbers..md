---
source_file: "mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py"
type: "rationale"
community: "test_dependency_parity.py"
location: "L29"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_dependency_paritypy
---

# Collects ``print(...)`` and ``sys.stdout.*`` writes with line numbers.

## Connections
- [[StdoutWriteVisitor]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_dependency_paritypy