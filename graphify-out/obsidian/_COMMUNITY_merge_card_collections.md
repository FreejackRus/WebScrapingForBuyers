---
type: community
cohesion: 0.33
members: 6
---

# merge_card_collections

**Cohesion:** 0.33 - loosely connected
**Members:** 6 nodes

## Members
- [[Locate the collection bundle on a search page. Found by scoring candidates on…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[Merge every top-level collection patch on a product page. A populated entry is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_is_empty()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_iter_patches()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[find_search_collections()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[merge_card_collections()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/merge_card_collections
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_ssr.py]]
- 5 edges to [[_COMMUNITY_Any]]

## Top bridge nodes
- [[merge_card_collections()]] - degree 7, connects to 2 communities
- [[find_search_collections()]] - degree 6, connects to 2 communities
- [[_is_empty()]] - degree 3, connects to 2 communities
- [[_iter_patches()]] - degree 3, connects to 1 community