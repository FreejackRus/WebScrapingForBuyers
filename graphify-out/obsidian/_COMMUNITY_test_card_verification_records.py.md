---
type: community
cohesion: 0.07
members: 42
---

# test_card_verification_records.py

**Cohesion:** 0.07 - loosely connected
**Members:** 42 nodes

## Members
- [[BaseModel_17]] - code
- [[Cross-marketplace price comparison MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/__init__.py
- [[Native parsermodel regressions for stock filtering and variant ranking.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[Ozon sub-check entry adds the baseline-comparison fields Ozon reports.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[OzonCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[OzonReviewItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[OzonReviewsResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[OzonSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[OzonSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[OzonSelfcheckCheckOut]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[OzonSellerOut]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[Pydantic output models for the Ozon MCP connector (Stage 2). Every tool returns…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[Search limits apply to distinct sellable variants, not product families.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_search_variants.py
- [[The 2026-09-13 hollow frame, end to end through the real yandex server.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[Verification reads the actual native card shape, rather than synthetic flat…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[Yandex Market MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/__init__.py
- [[card()_12]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[compare_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/__init__.py
- [[fake_fetch()_15]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[fastmcp_exceptions]] - concept
- [[fetch()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[fetch()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_search_variants.py
- [[html]] - concept
- [[ozon_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[parametrize_33]] - code
- [[parametrize_34]] - code
- [[search()_7]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[search()_8]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[search()_9]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[test_card_verification_records.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_dedupe_keeps_distinct_known_variants_of_same_product()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_native_ozon_explicit_absence_survives_both_label_channels()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[test_native_ozon_stock_labels_cannot_fabricate_available_winner()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[test_native_wb_unknown_quantity_stays_unknown_in_comparison()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[test_native_yandex_distinct_sku_reaches_cheapest_comparable()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[test_ozon_verifies_regular_price_not_card_discount()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_search_offer_integrity.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[test_search_variants.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_search_variants.py
- [[test_yandex_empty_shell_never_becomes_a_verified_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_zone_search_keeps_distinct_skus_and_dedupes_repeated_variant_before_limit()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_search_variants.py
- [[tile()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_search_offer_integrity.py
- [[yandex_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/__init__.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_card_verification_recordspy
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_json]]
- 8 edges to [[_COMMUNITY_pytest]]
- 7 edges to [[_COMMUNITY_WbCardItem]]
- 6 edges to [[_COMMUNITY_ozon_card]]
- 5 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 5 edges to [[_COMMUNITY_ozon_connectorserver.py]]
- 3 edges to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 3 edges to [[_COMMUNITY_models.py]]
- 3 edges to [[_COMMUNITY_test_ambiguous_or_wrong_record_never_verifies_price]]
- 3 edges to [[_COMMUNITY_compare-connectorteststest_browser_handoff.py]]
- 2 edges to [[_COMMUNITY_TransportDownError]]
- 2 edges to [[_COMMUNITY_detmir_connectormodels_output.py]]
- 2 edges to [[_COMMUNITY_yandex-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_BadRequestError]]
- 1 edge to [[_COMMUNITY_YandexProduct]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_citilink-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_cian-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_ssr.py]]
- 1 edge to [[_COMMUNITY_avito-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_cian_connectorserver.py]]
- 1 edge to [[_COMMUNITY_test_decision_server.py]]
- 1 edge to [[_COMMUNITY_detmir-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_mpstats_connectorserver.py]]
- 1 edge to [[_COMMUNITY_test_search_parser_live.py]]
- 1 edge to [[_COMMUNITY_identity.py]]
- 1 edge to [[_COMMUNITY_mpstats-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]
- 1 edge to [[_COMMUNITY_megamarket-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_aliexpress-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_detmir-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_shape_signature]]
- 1 edge to [[_COMMUNITY_lamoda-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_pydantic]]

## Top bridge nodes
- [[fastmcp_exceptions]] - degree 23, connects to 20 communities
- [[test_card_verification_records.py]] - degree 30, connects to 11 communities
- [[ozon_connectormodels_output.py]] - degree 16, connects to 6 communities
- [[compare_connector__init__.py]] - degree 9, connects to 6 communities
- [[test_search_offer_integrity.py]] - degree 15, connects to 4 communities