---
type: community
cohesion: 0.15
members: 13
---

# test_ssr.py

**Cohesion:** 0.15 - loosely connected
**Members:** 13 nodes

## Members
- [[Every healthy page ships an empty captchaService div — not a challenge.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[Tests for Yandex Market SSR extraction. Fixtures are real pages captured live…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_a_real_card_without_a_rating_is_never_a_shell()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_captcha_placeholder_is_not_a_captcha()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_card_detects_a_real_captcha()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_card_extracts_prices_rating_and_seller()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_card_extracts_reviews_with_pros_cons_and_votes()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_merge_skips_malformed_patches()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_search_builds_absolute_urls()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_search_detects_a_real_captcha()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_search_extracts_products_and_result_metadata()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_ssr.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py
- [[test_synthetic_product_frame_with_empty_collections_is_a_shell()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_ssrpy
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_load]]
- 1 edge to [[_COMMUNITY_2.2.0 — 2026-09-11]]
- 1 edge to [[_COMMUNITY_test_number_coercion]]
- 1 edge to [[_COMMUNITY_test_search_price_rub_ignores_intermediate_seller_prices]]
- 1 edge to [[_COMMUNITY_test_search_row_describes_the_serp_offer_not_the_card_default]]
- 1 edge to [[_COMMUNITY_test_search_rounds_float32_ratings]]
- 1 edge to [[_COMMUNITY_test_search_deduplicates_by_snippet]]
- 1 edge to [[_COMMUNITY_test_search_falls_back_to_ldjson_when_state_is_unreadable]]
- 1 edge to [[_COMMUNITY_test_card_extracts_the_star_distribution]]
- 1 edge to [[_COMMUNITY_test_card_without_ratings_returns_none_not_zero]]
- 1 edge to [[_COMMUNITY_test_card_survives_an_unparseable_page]]
- 1 edge to [[_COMMUNITY_test_shell_verdict_requires_the_product_page_id]]
- 1 edge to [[_COMMUNITY_test_renamed_field_families_are_a_parser_question_not_a_shell]]
- 1 edge to [[_COMMUNITY_test_merge_never_lets_an_empty_patch_clobber_real_data]]
- 1 edge to [[_COMMUNITY_test_search_collections_are_found_by_content_not_path]]
- 1 edge to [[_COMMUNITY_test_search_collections_prefers_the_richest_bundle]]
- 1 edge to [[_COMMUNITY_test_number_coercion_never_returns_or_raises_on_non_finite_values]]
- 1 edge to [[_COMMUNITY_test_zone_search_reads_the_first_screen_when_collections_are_absent]]
- 1 edge to [[_COMMUNITY_test_zone_search_never_quotes_the_plus_price_as_the_everyday_price]]
- 1 edge to [[_COMMUNITY_test_zone_search_takes_the_ids_from_the_offer_not_the_family]]
- 1 edge to [[_COMMUNITY_test_zone_search_reports_the_seller_only_when_the_page_ships_one]]
- 1 edge to [[_COMMUNITY_test_zone_snippets_skip_unparseable_payloads]]
- 1 edge to [[_COMMUNITY_test_zone_row_without_prices_reports_absent_not_zero]]
- 1 edge to [[_COMMUNITY_test_zone_undiscounted_row_treats_the_base_price_as_the_everyday_price]]
- 1 edge to [[_COMMUNITY_test_parse_search_prefers_zone_rows_over_the_plus_only_fallback]]
- 1 edge to [[_COMMUNITY_test_parse_search_still_falls_back_to_schema_org_when_zone_is_missing]]
- 1 edge to [[_COMMUNITY_test_search_reports_both_prices_separately]]
- 1 edge to [[_COMMUNITY_test_search_price_rub_is_the_cart_price_never_the_strike_through]]
- 1 edge to [[_COMMUNITY_test_zone_snippets_ignore_tiles_that_are_not_offers]]
- 1 edge to [[_COMMUNITY_test_search_resolves_brand_and_seller_through_id_references]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[test_ssr.py]] - degree 51, connects to 33 communities