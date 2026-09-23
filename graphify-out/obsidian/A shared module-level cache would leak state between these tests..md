---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py"
type: "rationale"
community: "Community 247"
location: "L40"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_247
---

# A shared module-level cache would leak state between these tests.

## Connections
- [[empty_cache()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_247