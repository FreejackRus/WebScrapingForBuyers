---
type: community
cohesion: 1.00
members: 2
---

# test_the_merchant_suffix_is_stripped_from_the_goods_id

**Cohesion:** 1.00 - tightly connected
**Members:** 2 nodes

## Members
- [[goodsId arrives as id_merchantId; the card endpoint wants the bare id.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_the_merchant_suffix_is_stripped_from_the_goods_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_the_merchant_suffix_is_stripped_from_the_goods_id
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_megamarket-connectorteststest_server.py]]

## Top bridge nodes
- [[test_the_merchant_suffix_is_stripped_from_the_goods_id()]] - degree 2, connects to 1 community