---
type: community
cohesion: 0.04
members: 74
---

# wb_connector/server.py

**Cohesion:** 0.04 - loosely connected
**Members:** 74 nodes

## Members
- [[dot-wait()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[A canary read that cannot be answered from the cache. Every probe uses a fixed…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[A page of products from one catalog category. ``items`` uses the same shape as…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[A slice of the WB catalog tree. The full menu is ~800 KB, which is far too…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[Adapter exposing WB's module-level polite gate as a ``RateLimiter``. Core's…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[AsyncClient_4]] - code
- [[BaseModel_15]] - code
- [[Build the storefront capture dict from a live Network response.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Candidate URLs for a seller record, one per static CDN mirror.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Candidate URLs for the catalog menu, one per static CDN mirror.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Collapse runs of whitespace into single spaces. Seller answers to buyer…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Convert one raw menu entry into a bounded WbCategoryNode. ``budget`` is a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Decode a streamed body the way curl_cffi's ``resp.text`` would have. Streaming…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Fetch via curl_cffi, honouring ``_safe_get_text``'s (status, text, err)…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Legal identity behind a WB supplier id. WB publishes the registered entity for…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[One buyer question, with the seller's answer when there is one.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[One node of the WB catalog tree. ``shard`` and ``query`` together form the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[Parse WB ISO createdDate to a unix ts for tiebreak sorting (0 if absent or non-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Pull products + total from a search.wb.ru  storefront catalog JSON body.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Pydantic output models for the WB connector (Stage 2). Every tool returns a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[Resolve WB's proxy explicit ``WB_PROXY`` first, then the standard vars.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[The shared path body cap, wall-clock budget, polite gate, bounded retries.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[True for a real read HTTP 200, a body, and not the edge's wall page.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[True for hosts that refuse the default client's TLS fingerprint.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[True when a JSON endpoint answered with an HTML page instead. WB's edge serves…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[WB integer kopecks - float rubles, tolerant of a number-string drift. Returns…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[WbCategoriesResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbCategoryNode]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbCategoryProductsResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbNoResultsResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbQuestionItem]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbQuestionsResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbReviewItem]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbReviewsResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbRootInfoResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbSelfCheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbSellerResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[Wildberries MCP connector. Public WB catalog APIs (not Seller API). No…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_PoliteGate]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_budgeted_get_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_capture_from_catalog_response()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_decode_body()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_fetch()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_fresh_get_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_impersonated_get_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_is_edge_wall()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_is_usable()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_kopeck_to_rub()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_menu_node()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_needs_impersonation()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_normalise_ws()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_products_from_search_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_proxy()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_static_menu_urls()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_static_seller_urls()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_wb_review_date_ts()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[importlib]] - concept
- [[parametrize_22]] - code
- [[search()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[search()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[search()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[string]] - concept
- [[test_every_native_adapter_preserves_warnings()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[test_no_results_without_meta_is_not_invented_degradation()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[test_source_warnings.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[test_unhealthy_without_reason_gets_explicit_diagnostic()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[test_warning_does_not_drop_valid_offer_and_is_isolated_per_request()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[test_warnings_are_bounded_normalized_deduplicated_and_redacted()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[test_wildberries_adapter_tolerates_a_no_results_response()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[wb_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[wb_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[wb_search can return a distinct no-results model with no items at all.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[wb_search()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/wb_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 69 edges to [[_COMMUNITY_log_event]]
- 21 edges to [[_COMMUNITY_json]]
- 8 edges to [[_COMMUNITY_WbCardItem]]
- 5 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 4 edges to [[_COMMUNITY_citilink_card]]
- 3 edges to [[_COMMUNITY_pytest]]
- 3 edges to [[_COMMUNITY_pydantic]]
- 2 edges to [[_COMMUNITY_models.py]]
- 2 edges to [[_COMMUNITY_dns_card]]
- 2 edges to [[_COMMUNITY_aliexpress_connectormodels_output.py]]
- 2 edges to [[_COMMUNITY_get_settings]]
- 2 edges to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_get_text_budgeted]]
- 1 edge to [[_COMMUNITY_test_http_tier.py]]
- 1 edge to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_Ключевые изменения выпуска]]
- 1 edge to [[_COMMUNITY_test_source_selection.py]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_wb-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_ozon_connectorserver.py]]

## Top bridge nodes
- [[wb_connectorserver.py]] - degree 97, connects to 12 communities
- [[wb_connectormodels_output.py]] - degree 26, connects to 8 communities
- [[test_source_warnings.py]] - degree 12, connects to 4 communities
- [[_kopeck_to_rub()]] - degree 5, connects to 3 communities
- [[WbNoResultsResponse]] - degree 12, connects to 2 communities