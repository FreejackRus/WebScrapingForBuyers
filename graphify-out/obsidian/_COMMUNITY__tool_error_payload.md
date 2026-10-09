---
type: community
cohesion: 0.06
members: 40
---

# _tool_error_payload

**Cohesion:** 0.06 - loosely connected
**Members:** 40 nodes

## Members
- [[A 429 from v9 must raise, not silently degrade to the stale-id path.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[An empty list would claim the category has no products, which is false.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[The selector is appended to an outbound URL, so it is validated not trusted.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[_tool_error_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[fake_safe_get_text()_21]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[fake_safe_get_text()_22]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[fake_safe_get_text()_23]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[fake_safe_get_text()_24]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[fake_safe_get_text()_25]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[forbidden()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[forbidden()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[forbidden()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[forbidden()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[forbidden_wait()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_23]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_24]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_25]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_26]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_27]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[raise_tool_error serializes a ConnectorError as JSON inside ToolError.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_34]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_35]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_36]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_37]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_38]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_39]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_40]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_41]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_42]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_43]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_category_products_refuses_the_blackhole_shard_without_a_request()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_category_products_rejects_an_unknown_sort()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_category_products_rejects_an_unsafe_selector()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_rejects_an_out_of_range_limit()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_wb_card_rejects_missing_products_container()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_wb_card_rejects_non_object_json()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_wb_card_rejects_non_positive_nm_ids_before_network()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_wb_reviews_rejects_non_list_feedbacks()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_wb_reviews_reports_all_review_host_failures()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_wb_search_rate_limit_is_surfaced_not_masked_by_fallback()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_tool_error_payload
SORT file.name ASC
```

## Connections to other communities
- 11 edges to [[_COMMUNITY_no_wait]]
- 11 edges to [[_COMMUNITY_test_helpers.py]]
- 10 edges to [[_COMMUNITY__patch_questions]]
- 4 edges to [[_COMMUNITY__clear_wb_cache]]
- 1 edge to [[_COMMUNITY__RecordingPacer]]

## Top bridge nodes
- [[_tool_error_payload()]] - degree 22, connects to 5 communities
- [[test_category_products_rejects_an_unsafe_selector()]] - degree 5, connects to 2 communities
- [[forbidden()_4]] - degree 6, connects to 1 community
- [[test_wb_search_rate_limit_is_surfaced_not_masked_by_fallback()]] - degree 5, connects to 1 community
- [[test_category_products_refuses_the_blackhole_shard_without_a_request()]] - degree 4, connects to 1 community