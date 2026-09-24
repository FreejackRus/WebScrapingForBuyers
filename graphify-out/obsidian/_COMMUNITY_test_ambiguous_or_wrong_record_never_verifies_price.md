---
type: community
cohesion: 0.33
members: 6
---

# test_ambiguous_or_wrong_record_never_verifies_price

**Cohesion:** 0.33 - loosely connected
**Members:** 6 nodes

## Members
- [[card()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[card()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[parametrize_18]] - code
- [[test_ambiguous_or_wrong_record_never_verifies_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_invalid_observed_price_stays_unknown()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_numeric_card_identifier_does_not_pick_unrelated_digits()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_ambiguous_or_wrong_record_never_verifies_price
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 2 edges to [[_COMMUNITY_WbCardItem]]
- 1 edge to [[_COMMUNITY_ProductIdentity]]

## Top bridge nodes
- [[test_ambiguous_or_wrong_record_never_verifies_price()]] - degree 5, connects to 3 communities
- [[test_invalid_observed_price_stays_unknown()]] - degree 4, connects to 2 communities
- [[test_numeric_card_identifier_does_not_pick_unrelated_digits()]] - degree 2, connects to 1 community