---
type: community
cohesion: 0.11
members: 42
---

# ProductIdentity

**Cohesion:** 0.11 - loosely connected
**Members:** 42 nodes

## Members
- [[Any_27]] - code
- [[BaseModel_16]] - code
- [[Build identity evidence from typed upstream fields only. Free-form titles are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[Conservative product and offer identity helpers.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[IdentityMatch]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[Match identifiers first, then conservatively use modelvariant evidence.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[OfferEvidence]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[Product-familyvariant evidence, independent of a seller offer.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[ProductIdentity]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[Provenance for a time-varying marketplace offer.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[Return a valid GTIN-8121314, or empty for missinginvalid input.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[_field()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[_text()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[_variants()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[identity.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[identity_from_mapping()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[match_product_identity()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[normalize_gtin()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[normalize_identifier()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[normalize_model()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[normalize_mpn()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[parametrize_38]] - code
- [[test_colour_alias_and_case_keep_variant_identity()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_gtin_is_normalized_and_check_digit_validated()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_gtin_mismatch_cannot_be_overruled_by_same_title()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_gtin_rejects_malformed_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_identity.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mapping_discards_invalid_gtin_instead_of_guessing()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mapping_discards_structures_instead_of_stringifying_them()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mapping_does_not_promote_seller_article_to_manufacturer_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mapping_uses_typed_identifiers_and_variants_only()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_matching_gtin_does_not_override_conflicting_mpn()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_matching_gtin_is_exact_but_variant_conflict_is_mismatch()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_matching_one_variant_attribute_does_not_prove_the_missing_other()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_model_name_does_not_override_brand_conflict()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mpn_and_brand_match_is_exact_without_gtin()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mpn_without_manufacturer_brand_does_not_prove_identity()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_no_identity_evidence_explicitly_abstains()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_non_latin_variant_conflicts_are_not_erased()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_same_model_without_manufacturer_identifier_is_only_likely()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_zero_padded_gtin_represents_the_same_trade_item()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[unicodedata]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/ProductIdentity
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_json]]
- 5 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 3 edges to [[_COMMUNITY_compare_connectormodels_output.py]]
- 3 edges to [[_COMMUNITY_compare_verify_offer]]
- 2 edges to [[_COMMUNITY_MarketOffer]]
- 2 edges to [[_COMMUNITY_v2.0 work packages]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[ProductIdentity]] - degree 25, connects to 6 communities
- [[identity.py]] - degree 23, connects to 3 communities
- [[OfferEvidence]] - degree 6, connects to 3 communities
- [[match_product_identity()]] - degree 22, connects to 2 communities
- [[identity_from_mapping()]] - degree 14, connects to 2 communities