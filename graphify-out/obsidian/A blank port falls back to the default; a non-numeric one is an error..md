---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py"
type: "rationale"
community: "test_runtime.py"
location: "L143"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_runtimepy
---

# A blank port falls back to the default; a non-numeric one is an error.

## Connections
- [[test_non_integer_port_is_rejected()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_runtimepy