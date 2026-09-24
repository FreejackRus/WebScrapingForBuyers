---
type: community
cohesion: 0.25
members: 19
---

# ProductIdentity

**Cohesion:** 0.25 - loosely connected
**Members:** 19 nodes

## Members
- [[Match identifiers first, then conservatively use modelvariant evidence.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[Product-familyvariant evidence, independent of a seller offer.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[ProductIdentity]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[match_product_identity()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[parametrize_17]] - code
- [[test_colour_alias_and_case_keep_variant_identity()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_gtin_mismatch_cannot_be_overruled_by_same_title()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_gtin_rejects_malformed_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_identity.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
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

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/ProductIdentity
SORT file.name ASC
```

## Connections to other communities
- 14 edges to [[_COMMUNITY_identity.py]]
- 4 edges to [[_COMMUNITY_compare_connectormodels_output.py]]
- 2 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_compare_verify_offer]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_ambiguous_or_wrong_record_never_verifies_price]]
- 1 edge to [[_COMMUNITY_detmir_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_test_wb_verification_uses_requested_row_not_first]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[ProductIdentity]] - degree 25, connects to 8 communities
- [[match_product_identity()]] - degree 22, connects to 4 communities
- [[test_identity.py]] - degree 20, connects to 2 communities
- [[test_gtin_rejects_malformed_values()]] - degree 3, connects to 1 community