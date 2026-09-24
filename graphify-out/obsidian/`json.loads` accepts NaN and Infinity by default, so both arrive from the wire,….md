---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py"
type: "rationale"
community: "coerce_price"
location: "L41"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/coerce_price
---

# `json.loads` accepts NaN and Infinity by default, so both arrive from the wire,…

## Connections
- [[test_coerce_int_survives_non_finite_floats()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/coerce_price