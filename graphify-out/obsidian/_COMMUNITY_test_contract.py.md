---
type: community
cohesion: 0.11
members: 20
---

# test_contract.py

**Cohesion:** 0.11 - loosely connected
**Members:** 20 nodes

## Members
- [[A missing container and an empty one mean different things. Empty under a known…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[Cross-connector contract tests the invariants every parser must hold. These…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[Multi-alias binding must survive a renamed field without inventing one.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[One nested object out of a search item, or an empty dict.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/server.py
- [[Parse the goods array out of a search payload. A search item is not flat. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/server.py
- [[The code-7 VPNIP refusal is a transport verdict, not data.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/server.py
- [[The coercion contract a range, an empty string, an absent value, a zero and a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[The firewall JSON must not silently yield a plausible empty result.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[_is_ip_block()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/server.py
- [[_parse_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/server.py
- [[_scoped()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/server.py
- [[pick()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/src/megamarket_connector/server.py
- [[test_avito_firewall_body_is_not_parsed_as_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
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
- 5 edges to [[_COMMUNITY__post]]
- 4 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY__parse_search_items]]
- 1 edge to [[_COMMUNITY_megamarket_search]]
- 1 edge to [[_COMMUNITY_BadRequestError]]

## Top bridge nodes
- [[test_contract.py]] - degree 11, connects to 3 communities
- [[_parse_items()]] - degree 9, connects to 3 communities
- [[_is_ip_block()]] - degree 5, connects to 2 communities
- [[_scoped()]] - degree 4, connects to 2 communities
- [[test_avito_firewall_body_is_not_parsed_as_items()]] - degree 3, connects to 1 community