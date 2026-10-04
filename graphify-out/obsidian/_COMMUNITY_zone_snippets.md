---
type: community
members: 15
---

# zone_snippets

**Members:** 15 nodes

## Members
- [[A zone snippet whose attribute holds a raw '' must still be parsed (review…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[Guards the tag scanner itself quotes must be tracked, not just ''.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[Raw ``data-zone-data`` payloads of the SERP's productSnippet zones. Document…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[The regression an earlier attribute containing '' used to swallow the tag.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[Yield each start tag, honouring quoted attribute values. A regex like…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_iter_tags()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_tag()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[test_a_plain_snippet_is_read()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[test_a_quoted_angle_bracket_inside_the_payload_does_not_split_the_tag()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[test_a_raw_gt_after_the_payload_does_not_hide_the_snippet()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[test_a_raw_gt_before_the_zone_attribute_does_not_hide_the_snippet()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[test_non_product_zones_are_still_ignored()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[test_several_snippets_keep_their_document_order()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[test_zone_tag_scanning.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py
- [[zone_snippets()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/zone_snippets
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_parse_search]]
- 1 edge to [[_COMMUNITY_Any_1]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[zone_snippets()]] - degree 11, connects to 3 communities
- [[test_zone_tag_scanning.py]] - degree 10, connects to 2 communities
- [[_iter_tags()]] - degree 3, connects to 1 community