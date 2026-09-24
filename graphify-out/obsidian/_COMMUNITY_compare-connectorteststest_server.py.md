---
type: community
cohesion: 0.05
members: 52
---

# compare-connector/tests/test_server.py

**Cohesion:** 0.05 - loosely connected
**Members:** 52 nodes

## Members
- [[A 0.0 would rank a dead listing as the cheapest option.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[A blank id is unknown, not shared — merging those would lose real offers.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[A negative is not a price. Ranking one would crown it the cheapest offer, so it…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[A signed count is ambiguous dropping the sign and concatenating digits…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[Asking for a case and getting cases is the correct answer.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[Detsky Mir has no working text search, so it must not join a text comparison.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[End-to-end a cheap yuan number must not outrank a dearer rouble one. 9999 ¥ is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[Live-captured Ozon filter strings (rendered search page, 2026-08-07, the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[MarketOffer]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[Offline tests for cross-marketplace comparison. Each marketplace's search is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[One listing must not occupy two ranking slots. A marketplace returning the same…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[One offer, normalised across marketplaces so prices are comparable.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[Only a positive statement counts as in stock. NaN compared  0 is False and inf…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[SEARCHABLE must never name a source that lacks a _SEARCH_IMPLS entry — that is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[Searching for refurbished and getting refurbished is the right answer.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[The sign guard must cover the unicode minusen-dashem-dash, not only ASCII…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[__call__()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[card()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[compare-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[currency is checked independently of price_rub, on purpose. If an adapter…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[inf is not a price either ``10400`` blows up ``float()`` with OverflowError,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[json.loads admits NaNInfinity by default, and int() raises on both. coerce_int…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_a_display_unit_is_flagged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_a_foreign_currency_offer_cannot_be_smuggled_into_the_ranking()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_a_genuine_cheapest_is_left_alone()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_a_new_product_carries_no_condition_warning()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_a_price_far_below_the_median_is_flagged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_a_refurbished_cheapest_is_flagged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_a_yuan_offer_never_becomes_cheapest()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_an_accessory_as_cheapest_is_flagged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_asking_for_a_refurbished_phone_is_not_flagged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_challenge_metadata_does_not_leak_credentials_or_upstream_instructions()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_compare_sources_reports_installed_and_missing()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_compare_verify_offer_dispatches_to_source_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_count_coercion_never_drops_a_sign()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_count_coercion_never_raises_on_non_finite_floats()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_count_coercion_rejects_unicode_signs_and_ranges()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_dedupe_keeps_source_order()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_detsky_mir_is_not_a_comparison_source()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_duplicate_listings_are_collapsed()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_every_searchable_source_has_an_impl_and_a_search_tool()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_megamarket_card_dispatch_uses_native_argument_in_both_profiles()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_offers_without_an_id_are_never_merged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_price_coercion_never_concatenates_a_price_range()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_price_coercion_never_returns_a_negative()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_price_coercion_never_returns_a_non_finite_value()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_price_coercion_never_substitutes_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_registered_tools_are_stable()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_searching_for_the_accessory_itself_is_not_flagged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_server_version_matches_pyproject()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_stock_label_never_claims_stock_from_a_non_finite_value()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_the_outlier_check_needs_three_offers_to_have_a_median()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/compare-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 16 edges to [[_COMMUNITY_offer]]
- 10 edges to [[_COMMUNITY_OfferBatch]]
- 9 edges to [[_COMMUNITY_parametrize]]
- 6 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_compare_connectormodels_output.py]]
- 4 edges to [[_COMMUNITY__FakeResponse]]
- 3 edges to [[_COMMUNITY_compare_prices]]
- 3 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 3 edges to [[_COMMUNITY_test_all_requested_sources_missing_is_an_error]]
- 2 edges to [[_COMMUNITY_search]]
- 2 edges to [[_COMMUNITY_models.py]]
- 2 edges to [[_COMMUNITY_test_a_generic_failure_is_reported_as_error_not_blocked]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 2 edges to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_Ключевые изменения выпуска]]
- 1 edge to [[_COMMUNITY__search_wildberries]]
- 1 edge to [[_COMMUNITY_dot-_mirror_rouble_price_into_native]]
- 1 edge to [[_COMMUNITY_Changelog]]
- 1 edge to [[_COMMUNITY_dns_card]]
- 1 edge to [[_COMMUNITY__relevance_warnings]]
- 1 edge to [[_COMMUNITY_ProductIdentity]]
- 1 edge to [[_COMMUNITY_megamarket_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_YandexProduct]]
- 1 edge to [[_COMMUNITY_taobao]]
- 1 edge to [[_COMMUNITY_test_sources_run_concurrently]]
- 1 edge to [[_COMMUNITY_WbCardItem]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_pydantic]]

## Top bridge nodes
- [[compare-connectorteststest_server.py]] - degree 86, connects to 19 communities
- [[MarketOffer]] - degree 42, connects to 13 communities