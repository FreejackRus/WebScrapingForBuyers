---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py"
type: "rationale"
community: "shape_signature"
location: "L88"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/shape_signature
---

# bool subclasses int in Python; conflating them would hide a real retype.

## Connections
- [[test_bool_is_not_reported_as_int()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/shape_signature