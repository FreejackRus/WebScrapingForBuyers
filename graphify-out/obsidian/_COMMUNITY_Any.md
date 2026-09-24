---
type: community
cohesion: 0.15
members: 14
---

# Any

**Cohesion:** 0.15 - loosely connected
**Members:** 14 nodes

## Members
- [[Any_7]] - code
- [[Coerce a rating like '4,9'  '4.9'  4.9 to float in 0..5. None if unparseable,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Invariant checks on a reviews response (ozon_reviews  wb_reviews shape).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Invariant checks on one normalized offer (search item or card). These encode…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[JSONPath-shield find the first occurrence of any key in key_names at any…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[_type_tag()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[_walk_shape()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[`json.loads` returns arbitrary-precision ints, so a rating cell past the float…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[coerce_rating()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[deep_first()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[test_coerce_rating_survives_an_int_past_the_float_ceiling()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_coerce_rating_survives_non_finite_floats()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[validate_offer()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[validate_review_block()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Any
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_shape_signature]]
- 5 edges to [[_COMMUNITY_test_resilience.py]]
- 4 edges to [[_COMMUNITY_coerce_price]]
- 2 edges to [[_COMMUNITY_test_resilience_properties.py]]
- 1 edge to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_Ключевые изменения выпуска]]
- 1 edge to [[_COMMUNITY_parse_retry_after]]

## Top bridge nodes
- [[Any_7]] - degree 11, connects to 4 communities
- [[coerce_rating()]] - degree 10, connects to 4 communities
- [[validate_offer()]] - degree 4, connects to 2 communities
- [[validate_review_block()]] - degree 4, connects to 2 communities
- [[test_coerce_rating_survives_non_finite_floats()]] - degree 3, connects to 2 communities