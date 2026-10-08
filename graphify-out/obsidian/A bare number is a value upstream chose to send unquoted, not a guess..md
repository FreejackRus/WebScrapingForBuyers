---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py"
type: "rationale"
community: "flatten_text"
location: "L180"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/flatten_text
---

# A bare number is a value upstream chose to send unquoted, not a guess.

## Connections
- [[test_flatten_text_stringifies_a_scalar()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/flatten_text