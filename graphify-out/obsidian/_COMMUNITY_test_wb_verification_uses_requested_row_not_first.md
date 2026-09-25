---
type: community
cohesion: 0.50
members: 5
---

# test_wb_verification_uses_requested_row_not_first

**Cohesion:** 0.50 - moderately connected
**Members:** 5 nodes

## Members
- [[fake_card()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity_verification.py
- [[fake_card()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity_verification.py
- [[parametrize_21]] - code
- [[test_identity_is_verified_through_mcp_tool()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity_verification.py
- [[test_wb_verification_uses_requested_row_not_first()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity_verification.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_wb_verification_uses_requested_row_not_first
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_ProductIdentity]]
- 1 edge to [[_COMMUNITY_WbCardItem]]

## Top bridge nodes
- [[test_wb_verification_uses_requested_row_not_first()]] - degree 5, connects to 2 communities
- [[test_identity_is_verified_through_mcp_tool()]] - degree 3, connects to 1 community
- [[parametrize_21]] - degree 3, connects to 1 community