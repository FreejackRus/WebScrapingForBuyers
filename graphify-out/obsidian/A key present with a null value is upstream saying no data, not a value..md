---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py"
type: "rationale"
community: "test_resilience_properties.py"
location: "L220"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_resilience_propertiespy
---

# A key present with a null value is upstream saying "no data", not a value.

## Connections
- [[test_first_present_treats_none_as_absent()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_resilience_propertiespy