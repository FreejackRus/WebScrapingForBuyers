---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py"
type: "rationale"
community: "compare-connector/tests/test_server.py"
location: "L1011"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/compare-connector/tests/test_serverpy
---

# A blank id is unknown, not shared — merging those would lose real offers.

## Connections
- [[test_offers_without_an_id_are_never_merged()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/compare-connector/tests/test_serverpy