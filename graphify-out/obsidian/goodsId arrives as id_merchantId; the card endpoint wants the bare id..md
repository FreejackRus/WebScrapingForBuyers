---
source_file: "mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py"
type: "rationale"
community: "test_the_merchant_suffix_is_stripped_from_the_goods_id"
location: "L371"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_the_merchant_suffix_is_stripped_from_the_goods_id
---

# goodsId arrives as <id>_<merchantId>; the card endpoint wants the bare id.

## Connections
- [[test_the_merchant_suffix_is_stripped_from_the_goods_id()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_the_merchant_suffix_is_stripped_from_the_goods_id