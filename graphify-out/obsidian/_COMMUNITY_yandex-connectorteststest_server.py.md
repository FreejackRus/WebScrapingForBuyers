---
type: community
cohesion: 0.13
members: 20
---

# yandex-connector/tests/test_server.py

**Cohesion:** 0.13 - loosely connected
**Members:** 20 nodes

## Members
- [[302 is a transient hiccup here; retrying a 429 would deepen the limit.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[A blank id means unknown, not the same product.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[A duplicate must not eat part of the caller's budget. Slicing first would…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[Callers must know when fields are missing and the price is Plus-only.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[Feed yandex_search a known item list, bypassing HTML and the SSR parser.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[Offline tests for the Yandex Market connector's tool layer. Page fetches are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[One product occupying several snippets must be reported once.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[Yandex's ordering is the result of the search and must survive.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[_stub_parsed_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[fake_parse_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_dedupe_preserves_upstream_ranking_order()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_dedupe_runs_before_the_limit_is_applied()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_limit_still_caps_a_page_without_duplicates()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_products_without_an_id_are_never_collapsed()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_registered_tools_are_stable()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_retry_statuses_include_302_but_not_429()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_search_drops_repeated_product_ids()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_search_flags_a_degraded_ldjson_fallback()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_server_version_matches_pyproject()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[yandex-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/yandex-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 16 edges to [[_COMMUNITY_stub_html]]
- 6 edges to [[_COMMUNITY_error_payload_1]]
- 5 edges to [[_COMMUNITY_fake_get]]
- 3 edges to [[_COMMUNITY__drifted_values_search_html]]
- 2 edges to [[_COMMUNITY_test_card_rejects_non_numeric_ids]]
- 2 edges to [[_COMMUNITY_no_delay]]
- 2 edges to [[_COMMUNITY_capture_1]]
- 2 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_json]]

## Top bridge nodes
- [[yandex-connectorteststest_server.py]] - degree 52, connects to 12 communities
- [[_stub_parsed_items()]] - degree 9, connects to 1 community
- [[test_search_flags_a_degraded_ldjson_fallback()]] - degree 3, connects to 1 community