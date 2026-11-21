---
type: community
cohesion: 0.14
members: 14
---

# test_contract.py

**Cohesion:** 0.14 - loosely connected
**Members:** 14 nodes

## Members
- [[A missing container and an empty one mean different things. Empty under a known…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[Cross-connector contract tests the invariants every parser must hold. These…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[Multi-alias binding must survive a renamed field without inventing one.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[The coercion contract a range, an empty string, an absent value, a zero and a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[The firewall JSON must not silently yield a plausible empty result.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
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
TABLE source_file, type FROM #community/test_contractpy
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_megamarket_connectorserver.py]]
- 2 edges to [[_COMMUNITY_test_live_payload_contract.py]]
- 2 edges to [[_COMMUNITY_TransportDownError]]

## Top bridge nodes
- [[test_contract.py]] - degree 11, connects to 1 community
- [[test_avito_firewall_body_is_not_parsed_as_items()]] - degree 3, connects to 1 community
- [[test_megamarket_reports_whether_an_items_container_existed()]] - degree 3, connects to 1 community
- [[test_avito_pricelss_item_is_none_not_zero()]] - degree 2, connects to 1 community
- [[test_megamarket_code7_is_detected_as_a_block_not_data()]] - degree 2, connects to 1 community