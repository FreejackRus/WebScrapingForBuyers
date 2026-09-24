---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py"
type: "rationale"
community: "compare-connector/tests/test_server.py"
location: "L644"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/compare-connector/tests/test_serverpy
---

# json.loads admits NaN/Infinity by default, and int() raises on both. coerce_int…

## Connections
- [[test_count_coercion_never_raises_on_non_finite_floats()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/compare-connector/tests/test_serverpy