---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py"
type: "code"
community: "coerce_price"
location: "L40"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/coerce_price
---

# test_coerce_int_survives_non_finite_floats()

## Connections
- [[`json.loads` accepts NaN and Infinity by default, so both arrive from the wire,…]] - `rationale_for` [EXTRACTED]
- [[coerce_int()]] - `calls` [EXTRACTED]
- [[parametrize_31]] - `references` [EXTRACTED]
- [[test_resilience.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/coerce_price