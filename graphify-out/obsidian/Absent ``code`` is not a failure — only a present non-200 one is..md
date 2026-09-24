---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py"
type: "rationale"
community: "payload"
location: "L102"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/payload
---

# Absent ``code`` is not a failure — only a present non-200 one is.

## Connections
- [[test_missing_inner_code_is_accepted()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/payload