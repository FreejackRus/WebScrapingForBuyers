---
type: community
cohesion: 0.20
members: 19
---

# identity.py

**Cohesion:** 0.20 - loosely connected
**Members:** 19 nodes

## Members
- [[Any_21]] - code
- [[Build identity evidence from typed upstream fields only. Free-form titles are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[Conservative product and offer identity helpers.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[Return a valid GTIN-8121314, or empty for missinginvalid input.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[_field()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[_text()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[_variants()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[identity.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[identity_from_mapping()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[normalize_gtin()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[normalize_identifier()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[normalize_model()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[normalize_mpn()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/identity.py
- [[test_gtin_is_normalized_and_check_digit_validated()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mapping_discards_invalid_gtin_instead_of_guessing()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mapping_discards_structures_instead_of_stringifying_them()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mapping_does_not_promote_seller_article_to_manufacturer_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[test_mapping_uses_typed_identifiers_and_variants_only()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity.py
- [[unicodedata]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/identitypy
SORT file.name ASC
```

## Connections to other communities
- 14 edges to [[_COMMUNITY_ProductIdentity]]
- 5 edges to [[_COMMUNITY_json]]
- 3 edges to [[_COMMUNITY_compare_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_compare_verify_offer]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_pydantic]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[identity.py]] - degree 23, connects to 6 communities
- [[identity_from_mapping()]] - degree 14, connects to 3 communities
- [[normalize_gtin()]] - degree 8, connects to 1 community
- [[normalize_model()]] - degree 5, connects to 1 community
- [[normalize_mpn()]] - degree 5, connects to 1 community