---
type: community
cohesion: 0.17
members: 13
---

# _parse_search_items

**Cohesion:** 0.17 - loosely connected
**Members:** 13 nodes

## Members
- [[A real date string, when Avito sends one, wins over the epoch field.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[Any_2]] - code
- [[Best-effort extraction of items + total from a jsitems payload. The endpoint…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[If upstream ever switches to seconds, do not land in 1970 or the year 57000.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[Publication time as an ISO-8601 string, or an honest None. The live payload…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_parse_search_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_posted_at()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[json.loads admits InfinityNaN and arbitrary-precision ints, so a poisoned…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_avito_pricelss_item_is_none_not_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[test_posted_at_handles_a_seconds_based_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_never_raises_on_non_finite_or_huge_stamps()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_prefers_an_explicit_string()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_refuses_junk()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_parse_search_items
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_test_live_payload_contract.py]]
- 4 edges to [[_COMMUNITY_avito_seller]]
- 2 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_test_contract.py]]
- 1 edge to [[_COMMUNITY_avito-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_Ключевые изменения выпуска]]

## Top bridge nodes
- [[_parse_search_items()]] - degree 12, connects to 5 communities
- [[_posted_at()]] - degree 11, connects to 4 communities
- [[test_posted_at_handles_a_seconds_based_drift()]] - degree 3, connects to 1 community
- [[test_posted_at_never_raises_on_non_finite_or_huge_stamps()]] - degree 3, connects to 1 community
- [[test_posted_at_prefers_an_explicit_string()]] - degree 3, connects to 1 community