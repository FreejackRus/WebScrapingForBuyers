---
type: community
cohesion: 0.22
members: 9
---

# _posted_at

**Cohesion:** 0.22 - loosely connected
**Members:** 9 nodes

## Members
- [[A real date string, when Avito sends one, wins over the epoch field.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[If upstream ever switches to seconds, do not land in 1970 or the year 57000.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[Publication time as an ISO-8601 string, or an honest None. The live payload…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_posted_at()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[json.loads admits InfinityNaN and arbitrary-precision ints, so a poisoned…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_handles_a_seconds_based_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_never_raises_on_non_finite_or_huge_stamps()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_prefers_an_explicit_string()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_refuses_junk()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_posted_at
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_test_live_payload_contract.py]]
- 2 edges to [[_COMMUNITY_avito_connectorserver.py]]
- 1 edge to [[_COMMUNITY__parse_search_items]]
- 1 edge to [[_COMMUNITY__sync_curl_get]]
- 1 edge to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_parse_retry_after]]

## Top bridge nodes
- [[_posted_at()]] - degree 11, connects to 5 communities
- [[test_posted_at_handles_a_seconds_based_drift()]] - degree 3, connects to 1 community
- [[test_posted_at_never_raises_on_non_finite_or_huge_stamps()]] - degree 3, connects to 1 community
- [[test_posted_at_prefers_an_explicit_string()]] - degree 3, connects to 1 community
- [[test_posted_at_refuses_junk()]] - degree 2, connects to 1 community