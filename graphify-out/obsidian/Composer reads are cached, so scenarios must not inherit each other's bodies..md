---
source_file: "mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py"
type: "rationale"
community: "ozon-connector/tests/test_server.py"
location: "L40"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/ozon-connector/tests/test_serverpy
---

# Composer reads are cached, so scenarios must not inherit each other's bodies.

## Connections
- [[clear_cache()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/ozon-connector/tests/test_serverpy