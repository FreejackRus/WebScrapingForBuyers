---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py"
type: "rationale"
community: "test_resilience_properties.py"
location: "L116"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_resilience_propertiespy
---

# No digits anywhere means no value — and 'no value' is None, never 0.

## Connections
- [[test_coerce_int_without_digits_is_none_never_zero()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_resilience_propertiespy