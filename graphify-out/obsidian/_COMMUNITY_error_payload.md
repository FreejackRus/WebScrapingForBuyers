---
type: community
cohesion: 0.15
members: 16
---

# error_payload

**Cohesion:** 0.15 - loosely connected
**Members:** 16 nodes

## Members
- [[Case and stray whitespace are user slips, not attacks — normalise them. Slugs…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[The alias is interpolated into a filter expression, so it is validated.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[The region lands in a semicolon-delimited filter, so it is validated.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[The signature Detsky Mir quirk HTTP 200 carrying {status 404}.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[ToolError]] - code
- [[error_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[fail_fetch()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[fail_fetch()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[forbidden()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[parametrize_5]] - code
- [[test_an_invalid_region_is_rejected_before_any_request()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_card_raises_drift_when_no_product_node()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_card_treats_404_in_a_200_body_as_not_found()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_categories_rejects_non_numeric_parent()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_category_normalises_case_and_whitespace()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_category_rejects_non_slug_aliases()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/error_payload
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_detmir-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_capture]]

## Top bridge nodes
- [[test_category_normalises_case_and_whitespace()]] - degree 4, connects to 2 communities
- [[error_payload()]] - degree 7, connects to 1 community
- [[test_an_invalid_region_is_rejected_before_any_request()]] - degree 5, connects to 1 community
- [[test_categories_rejects_non_numeric_parent()]] - degree 5, connects to 1 community
- [[test_category_rejects_non_slug_aliases()]] - degree 5, connects to 1 community