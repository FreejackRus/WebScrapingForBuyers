---
type: community
cohesion: 1.00
members: 2
---

# test_zone_search_reports_the_seller_only_when_the_page_ships_one

**Cohesion:** 1.00 - tightly connected
**Members:** 2 nodes

## Members
- [[Rows without a shop signal report an empty seller, never a guessed one.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_zone_search_reports_the_seller_only_when_the_page_ships_one()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_zone_search_reports_the_seller_only_when_the_page_ships_one
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_test_ssr.py]]

## Top bridge nodes
- [[test_zone_search_reports_the_seller_only_when_the_page_ships_one()]] - degree 2, connects to 1 community