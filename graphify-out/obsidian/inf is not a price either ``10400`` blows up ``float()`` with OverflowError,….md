---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py"
type: "rationale"
community: "compare-connector/tests/test_server.py"
location: "L584"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/compare-connector/tests/test_serverpy
---

# inf is not a price either: ``10**400`` blows up ``float()`` with OverflowError,…

## Connections
- [[test_price_coercion_never_returns_a_non_finite_value()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/compare-connector/tests/test_serverpy