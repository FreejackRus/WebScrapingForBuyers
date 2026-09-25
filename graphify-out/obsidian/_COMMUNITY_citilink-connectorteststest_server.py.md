---
type: community
cohesion: 0.08
members: 37
---

# citilink-connector/tests/test_server.py

**Cohesion:** 0.08 - loosely connected
**Members:** 37 nodes

## Members
- [[A page that still yields tiles but lost a parser-critical field is structural…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[An available card with no price block is suspicious the buy-block layout most…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[Even for a legitimate URL, we navigate our own construction, not theirs.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[No stock and no price is a normal, expected combination (the buy block is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[Offline tests for the Citilink connector. CDP rendering is monkeypatched out…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[Search and card must read the same id shape. If the JS running in the page…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[The tool docstring promises a product id or a URL; honour both.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[Tiles extracting is not enough the shape must still match the captured…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[_no_cache()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[_patch_render()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[capture()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[capture()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[citilink-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[explode()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[fixture_3]] - code
- [[parametrize_1]] - code
- [[test_a_real_bare_id_is_accepted()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_an_id_never_carries_query_fragment_or_traversal()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_card_accepts_a_bare_product_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_card_flags_drift_when_neither_title_nor_price()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_card_navigates_a_rebuilt_site_base_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_card_parses_the_product()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_card_refuses_off_host_urls()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_card_rejects_a_url_without_a_product_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_card_stays_silent_when_unavailable_and_unpriced()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_card_warns_when_in_stock_but_no_price_matched()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_extract_product_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_extract_product_id_refuses_off_host_urls()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_real_product_urls_yield_their_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_search_a_pricelss_tile_is_none_never_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_search_maps_zero_tiles_to_parser_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_search_parses_tiles()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_selfcheck_healthy_tiles_carry_the_shape_reference()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_selfcheck_healthy_when_tiles_extract()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_selfcheck_reports_shape_drift_when_a_required_path_vanishes()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_selfcheck_zero_tiles_is_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py
- [[test_the_dom_extractor_and_the_python_parser_agree()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/citilink-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_payload]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_test_card_out_of_stock_dom.py]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[citilink-connectorteststest_server.py]] - degree 27, connects to 3 communities
- [[_patch_render()_2]] - degree 13, connects to 1 community