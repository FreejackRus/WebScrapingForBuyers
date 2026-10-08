---
type: community
cohesion: 0.14
members: 14
---

# avito-connector/tests/test_server.py

**Cohesion:** 0.14 - loosely connected
**Members:** 14 nodes

## Members
- [[404 means the ad is gone. Slowing down does not bring it back.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[Offline tests for the Avito connector. Every upstream call is monkeypatched, so…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[_unsigned_jwt()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[avito-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[post()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[test_a_block_is_reported_to_the_pacer()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[test_a_not_found_is_not_counted_as_a_refusal()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[test_a_single_block_does_not_cry_wolf()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[test_a_standing_block_tells_the_operator_what_to_change()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[test_extract_item_id_handles_every_accepted_shape()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[test_first_image_url_takes_the_widest_size_variant()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[test_html_439_does_not_start_pow()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[test_search_rejects_a_non_digit_category_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py
- [[test_search_url_carries_query_page_location()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/avito-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 12 edges to [[_COMMUNITY__patch_fetch]]
- 3 edges to [[_COMMUNITY__FakeResponse]]
- 3 edges to [[_COMMUNITY_fake_fetch]]
- 2 edges to [[_COMMUNITY_test_search_rejects_a_malformed_location_id]]
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_test_search_maps_non_json_to_parser_drift]]
- 1 edge to [[_COMMUNITY_test_fetch_debug_never_leaks_tier1_exception_secrets]]
- 1 edge to [[_COMMUNITY__no_cache_1]]
- 1 edge to [[_COMMUNITY_test_selfcheck_maps_a_block_to_inconclusive_never_drift]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_shape_signature]]

## Top bridge nodes
- [[avito-connectorteststest_server.py]] - degree 39, connects to 11 communities