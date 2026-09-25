---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py"
type: "code"
community: "ProductIdentity"
location: "L13"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/ProductIdentity
---

# ProductIdentity

## Connections
- [[BaseModel_12]] - `inherits` [EXTRACTED]
- [[MarketOffer]] - `uses` [INFERRED]
- [[Product-familyvariant evidence, independent of a seller offer.]] - `rationale_for` [EXTRACTED]
- [[WP1 — Evidence model]] - `references` [INFERRED]
- [[compare_connectormodels_output.py]] - `imports` [EXTRACTED]
- [[compare_connectorserver.py]] - `imports` [EXTRACTED]
- [[compare_verify_offer()]] - `uses` [INFERRED]
- [[identity.py]] - `contains` [EXTRACTED]
- [[identity_from_mapping()]] - `calls` [EXTRACTED]
- [[match_product_identity()]] - `references` [EXTRACTED]
- [[test_ambiguous_or_wrong_record_never_verifies_price()]] - `uses` [INFERRED]
- [[test_colour_alias_and_case_keep_variant_identity()]] - `uses` [INFERRED]
- [[test_detmir_fixture_product_is_unwrapped_for_price_and_identity()]] - `uses` [INFERRED]
- [[test_gtin_mismatch_cannot_be_overruled_by_same_title()]] - `uses` [INFERRED]
- [[test_matching_gtin_does_not_override_conflicting_mpn()]] - `uses` [INFERRED]
- [[test_matching_gtin_is_exact_but_variant_conflict_is_mismatch()]] - `uses` [INFERRED]
- [[test_matching_one_variant_attribute_does_not_prove_the_missing_other()]] - `uses` [INFERRED]
- [[test_model_name_does_not_override_brand_conflict()]] - `uses` [INFERRED]
- [[test_mpn_and_brand_match_is_exact_without_gtin()]] - `uses` [INFERRED]
- [[test_mpn_without_manufacturer_brand_does_not_prove_identity()]] - `uses` [INFERRED]
- [[test_no_identity_evidence_explicitly_abstains()]] - `uses` [INFERRED]
- [[test_non_latin_variant_conflicts_are_not_erased()]] - `uses` [INFERRED]
- [[test_same_model_without_manufacturer_identifier_is_only_likely()]] - `uses` [INFERRED]
- [[test_wb_verification_uses_requested_row_not_first()]] - `uses` [INFERRED]
- [[test_zero_padded_gtin_represents_the_same_trade_item()]] - `uses` [INFERRED]

#graphify/code #graphify/INFERRED #community/ProductIdentity