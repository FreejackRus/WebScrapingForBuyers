---
type: community
cohesion: 0.21
members: 12
---

# taobao-connector/tests/test_shape_reference.py

**Cohesion:** 0.21 - loosely connected
**Members:** 12 nodes

## Members
- [[Path_1]] - code
- [[Reference shape signatures for the Taobao extractors, pinned to the capture.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[The 2026-09-10 regression inverted if a future extractor stops emitting the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[The drift the wiring exists to catch every price shape gone at once. Red…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[The selfcheck compares live payloads against SEARCH_SHAPE_REFERENCE; the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[_extract()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[taobao-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[test_card_payload_shape_matches_the_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[test_live_search_shape_matches_the_selfcheck_registry()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[test_missing_required_families_sees_a_lost_price_family()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[test_missing_required_families_sees_lost_wall_markers()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[test_search_payload_shape_matches_the_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/taobao-connector/tests/test_shape_referencepy
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_shape_signature]]
- 4 edges to [[_COMMUNITY_missing_required_families_1]]
- 2 edges to [[_COMMUNITY_run_extractor]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_browser_handoff.py]]

## Top bridge nodes
- [[taobao-connectorteststest_shape_reference.py]] - degree 13, connects to 5 communities
- [[test_live_search_shape_matches_the_selfcheck_registry()]] - degree 5, connects to 2 communities
- [[_extract()]] - degree 7, connects to 1 community
- [[test_card_payload_shape_matches_the_capture()]] - degree 3, connects to 1 community
- [[test_missing_required_families_sees_a_lost_price_family()]] - degree 3, connects to 1 community