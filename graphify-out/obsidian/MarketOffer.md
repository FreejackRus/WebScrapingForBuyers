---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py"
type: "code"
community: "Community 24"
location: "L16"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/Community_24
---

# MarketOffer

## Connections
- [[dot-__init__()_16]] - `references` [EXTRACTED]
- [[dot-_mirror_rouble_price_into_native()]] - `method` [EXTRACTED]
- [[BaseModel_3]] - `inherits` [EXTRACTED]
- [[OfferBatch]] - `uses` [INFERRED]
- [[OfferEvidence]] - `uses` [INFERRED]
- [[One offer, normalised across marketplaces so prices are comparable.]] - `rationale_for` [EXTRACTED]
- [[ProductIdentity]] - `uses` [INFERRED]
- [[_dedupe()]] - `uses` [INFERRED]
- [[_ranks_in_rubles()]] - `uses` [INFERRED]
- [[_relevance_warnings()]] - `uses` [INFERRED]
- [[_run_source()]] - `uses` [INFERRED]
- [[_search_aliexpress()]] - `calls` [EXTRACTED]
- [[_search_avito()]] - `calls` [EXTRACTED]
- [[_search_citilink()]] - `calls` [EXTRACTED]
- [[_search_dns()]] - `calls` [EXTRACTED]
- [[_search_lamoda()]] - `calls` [EXTRACTED]
- [[_search_megamarket()]] - `calls` [EXTRACTED]
- [[_search_ozon()]] - `calls` [EXTRACTED]
- [[_search_taobao()]] - `calls` [EXTRACTED]
- [[_search_wildberries()]] - `calls` [EXTRACTED]
- [[_search_yandex()]] - `calls` [EXTRACTED]
- [[compare_connectormodels_output.py]] - `contains` [EXTRACTED]
- [[compare_connectorserver.py]] - `imports` [EXTRACTED]
- [[compare_prices()]] - `uses` [INFERRED]
- [[offer()]] - `uses` [INFERRED]
- [[test_a_display_unit_is_flagged()]] - `uses` [INFERRED]
- [[test_a_foreign_currency_offer_cannot_be_smuggled_into_the_ranking()]] - `uses` [INFERRED]
- [[test_a_genuine_cheapest_is_left_alone()]] - `uses` [INFERRED]
- [[test_a_new_product_carries_no_condition_warning()]] - `uses` [INFERRED]
- [[test_a_price_far_below_the_median_is_flagged()]] - `uses` [INFERRED]
- [[test_a_refurbished_cheapest_is_flagged()]] - `uses` [INFERRED]
- [[test_a_yuan_offer_never_becomes_cheapest()]] - `uses` [INFERRED]
- [[test_an_accessory_as_cheapest_is_flagged()]] - `uses` [INFERRED]
- [[test_asking_for_a_refurbished_phone_is_not_flagged()]] - `uses` [INFERRED]
- [[test_dedupe_keeps_distinct_known_variants_of_same_product()]] - `uses` [INFERRED]
- [[test_dedupe_keeps_source_order()]] - `uses` [INFERRED]
- [[test_duplicate_listings_are_collapsed()]] - `uses` [INFERRED]
- [[test_offers_without_an_id_are_never_merged()]] - `uses` [INFERRED]
- [[test_searching_for_the_accessory_itself_is_not_flagged()]] - `uses` [INFERRED]
- [[test_the_outlier_check_needs_three_offers_to_have_a_median()]] - `uses` [INFERRED]

#graphify/code #graphify/INFERRED #community/Community_24