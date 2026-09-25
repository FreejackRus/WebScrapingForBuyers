---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py"
type: "rationale"
community: "Any"
location: "L58"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Any
---

# `json.loads` returns arbitrary-precision ints, so a rating cell past the float…

## Connections
- [[test_coerce_rating_survives_an_int_past_the_float_ceiling()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Any