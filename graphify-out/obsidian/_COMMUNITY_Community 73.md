---
type: community
cohesion: 0.11
members: 25
---

# Community 73

**Cohesion:** 0.11 - loosely connected
**Members:** 25 nodes

## Members
- [[A typo must not quietly switch image delivery off (or on).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[Accept an operator's policy text, falling back to the default. A typo must not…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/vision_policy.py
- [[An explicit vision hint from the client, or ``None`` when it says nothing.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/vision_policy.py
- [[Decide whether the JPEG goes on the wire, and name the reason when it does not.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/vision_policy.py
- [[Never send pixels to something that just said it cannot read them.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[Offline tests for the snapshot delivery policy (R4). The JPEG is the largest…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[Policy]] - code
- [[Silence must never be read as cannot see images.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[The tool exists to be used absent an explicit signal, pixels flow.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[client_vision_hint()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/vision_policy.py
- [[normalize_policy()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/vision_policy.py
- [[resolve_image_delivery()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/vision_policy.py
- [[test_a_client_refusal_still_outranks_the_deployment()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_review_regressions.py
- [[test_a_client_that_says_nothing_is_unknown_not_visionless()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_always_outranks_a_metadata_only_request()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_review_regressions.py
- [[test_an_explicit_client_refusal_beats_everything()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_an_operator_typo_falls_back_to_the_default()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_client_hint_is_read_from_the_capability_extra_bags()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_default_delivers_the_image()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_deployment_policy_always_delivers()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_deployment_policy_never_keeps_pixels_off_the_wire()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_policy_accepts_the_three_documented_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_the_caller_can_ask_for_metadata_only()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_the_decision_is_reported_in_a_shape_the_caller_can_read()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py
- [[test_vision_policy.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_73
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Community 14]]
- 2 edges to [[_COMMUNITY_Community 55]]
- 2 edges to [[_COMMUNITY_Community 3]]
- 1 edge to [[_COMMUNITY_Community 237]]

## Top bridge nodes
- [[resolve_image_delivery()]] - degree 14, connects to 3 communities
- [[client_vision_hint()]] - degree 6, connects to 2 communities
- [[test_vision_policy.py]] - degree 12, connects to 1 community
- [[normalize_policy()]] - degree 6, connects to 1 community
- [[test_a_client_refusal_still_outranks_the_deployment()]] - degree 2, connects to 1 community