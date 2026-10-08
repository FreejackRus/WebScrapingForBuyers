---
source_file: "mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py"
type: "rationale"
community: "check_no_print.py"
location: "L29"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/check_no_printpy
---

# Collects ``print(...)`` and ``sys.stdout.*`` writes with line numbers.

## Connections
- [[StdoutWriteVisitor]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/check_no_printpy