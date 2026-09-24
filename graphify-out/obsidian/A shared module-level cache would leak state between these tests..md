---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py"
type: "rationale"
community: "test_call_envelope.py"
location: "L40"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_call_envelopepy
---

# A shared module-level cache would leak state between these tests.

## Connections
- [[empty_cache()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_call_envelopepy