---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_handoff_reporting.py"
type: "rationale"
community: "test_handoff_reporting.py"
location: "L171"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_handoff_reportingpy
---

# Explaining a caller's own expired handle leaks nothing; a foreign one stays…

## Connections
- [[test_an_unknown_handle_stays_opaque_but_an_expired_one_explains()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_handoff_reportingpy