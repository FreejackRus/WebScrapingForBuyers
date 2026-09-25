---
source_file: "mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py"
type: "rationale"
community: "_run"
location: "L706"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/_run
---

# A drifted itemId/products must degrade to None/{}, never crash the tool.

## Connections
- [[test_reviews_tolerate_drifted_item_id_and_products_shapes()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/_run