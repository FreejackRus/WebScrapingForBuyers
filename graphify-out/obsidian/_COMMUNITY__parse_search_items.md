---
type: community
cohesion: 0.12
members: 18
---

# _parse_search_items

**Cohesion:** 0.12 - loosely connected
**Members:** 18 nodes

## Members
- [[A missing container and an empty one mean different things. Empty under a known…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[Best-effort extraction of items + total from a jsitems payload. The endpoint…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[Cross-connector contract tests the invariants every parser must hold. These…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[First listing photo. Avito ships each image as a size map ``{208x156 url,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[Multi-alias binding must survive a renamed field without inventing one.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[The coercion contract a range, an empty string, an absent value, a zero and a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[The firewall JSON must not silently yield a plausible empty result.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[_first_image_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_parse_search_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[test_avito_firewall_body_is_not_parsed_as_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[test_avito_pricelss_item_is_none_not_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[test_coerce_price_parses_grouped_display_strings()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[test_coerce_price_refuses_to_guess_on_ambiguous_input()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[test_contract.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[test_first_present_distinguishes_absent_from_null()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[test_megamarket_code7_is_detected_as_a_block_not_data()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[test_megamarket_pricelss_item_is_none_not_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[test_megamarket_reports_whether_an_items_container_existed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_parse_search_items
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_avito_connectorserver.py]]
- 3 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY__sync_curl_get]]
- 2 edges to [[_COMMUNITY_test_live_payload_contract.py]]
- 1 edge to [[_COMMUNITY__posted_at]]
- 1 edge to [[_COMMUNITY_shape_signature]]
- 1 edge to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY_json]]

## Top bridge nodes
- [[_parse_search_items()]] - degree 13, connects to 5 communities
- [[test_contract.py]] - degree 11, connects to 2 communities
- [[_first_image_url()]] - degree 4, connects to 2 communities
- [[test_megamarket_reports_whether_an_items_container_existed()]] - degree 3, connects to 1 community
- [[test_megamarket_code7_is_detected_as_a_block_not_data()]] - degree 2, connects to 1 community