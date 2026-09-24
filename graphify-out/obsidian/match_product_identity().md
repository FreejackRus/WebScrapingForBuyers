---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py"
type: "code"
community: "ProductIdentity"
location: "L114"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/ProductIdentity
---

# match_product_identity()

## Connections
- [[IdentityMatch]] - `calls` [EXTRACTED]
- [[Match identifiers first, then conservatively use modelvariant evidence.]] - `rationale_for` [EXTRACTED]
- [[ProductIdentity]] - `references` [EXTRACTED]
- [[_variants()]] - `calls` [EXTRACTED]
- [[compare_connectorserver.py]] - `imports` [EXTRACTED]
- [[compare_verify_offer()]] - `calls` [EXTRACTED]
- [[identity.py]] - `contains` [EXTRACTED]
- [[normalize_gtin()]] - `calls` [EXTRACTED]
- [[normalize_model()]] - `calls` [EXTRACTED]
- [[normalize_mpn()]] - `calls` [EXTRACTED]
- [[test_colour_alias_and_case_keep_variant_identity()]] - `calls` [EXTRACTED]
- [[test_gtin_mismatch_cannot_be_overruled_by_same_title()]] - `calls` [EXTRACTED]
- [[test_matching_gtin_does_not_override_conflicting_mpn()]] - `calls` [EXTRACTED]
- [[test_matching_gtin_is_exact_but_variant_conflict_is_mismatch()]] - `calls` [EXTRACTED]
- [[test_matching_one_variant_attribute_does_not_prove_the_missing_other()]] - `calls` [EXTRACTED]
- [[test_model_name_does_not_override_brand_conflict()]] - `calls` [EXTRACTED]
- [[test_mpn_and_brand_match_is_exact_without_gtin()]] - `calls` [EXTRACTED]
- [[test_mpn_without_manufacturer_brand_does_not_prove_identity()]] - `calls` [EXTRACTED]
- [[test_no_identity_evidence_explicitly_abstains()]] - `calls` [EXTRACTED]
- [[test_non_latin_variant_conflicts_are_not_erased()]] - `calls` [EXTRACTED]
- [[test_same_model_without_manufacturer_identifier_is_only_likely()]] - `calls` [EXTRACTED]
- [[test_zero_padded_gtin_represents_the_same_trade_item()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/ProductIdentity