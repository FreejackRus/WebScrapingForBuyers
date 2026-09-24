---
type: community
cohesion: 0.18
members: 18
---

# WbCardItem

**Cohesion:** 0.18 - loosely connected
**Members:** 18 nodes

## Members
- [[WbCardItem]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[WbCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/models_output.py
- [[card()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[card()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[card()_7]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[card()_8]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[card()_9]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[card()_10]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[fixture_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity_verification.py
- [[test_detmir_canonical_url_dispatches_requested_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_mcp_rejects_nonfinite_expected_price_before_querying_source()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_missing_requested_wb_row_does_not_use_another_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_wb_fixture_color_survives_card_model_and_mcp_verification()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_identity_verification.py
- [[test_wb_price_and_identity_use_the_same_requested_fixture_row()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_wildberries_adapter_reads_typed_attributes()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_yandex_matching_variant_can_verify_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_yandex_variant_mismatch_is_rejected_before_price_delta()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[wb_search()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/WbCardItem
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 7 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 4 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY_wb-connectorteststest_parser_live.py]]
- 2 edges to [[_COMMUNITY_test_ambiguous_or_wrong_record_never_verifies_price]]
- 1 edge to [[_COMMUNITY__FakeResponse]]
- 1 edge to [[_COMMUNITY_detmir_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_test_wb_verification_uses_requested_row_not_first]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]

## Top bridge nodes
- [[WbCardItem]] - degree 18, connects to 3 communities
- [[card()_8]] - degree 12, connects to 3 communities
- [[WbCardResponse]] - degree 10, connects to 2 communities
- [[test_wb_fixture_color_survives_card_model_and_mcp_verification()]] - degree 5, connects to 2 communities
- [[test_missing_requested_wb_row_does_not_use_another_price()]] - degree 5, connects to 1 community