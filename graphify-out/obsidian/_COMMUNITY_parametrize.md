---
type: community
cohesion: 0.15
members: 13
---

# parametrize

**Cohesion:** 0.15 - loosely connected
**Members:** 13 nodes

## Members
- [[Ozon reports prices as text; MarketOffer.price_rub is a float. Passing the raw…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[Rejected either by the tool's own check or by pydantic's min_length. Both are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[fail()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[parametrize_4]] - code
- [[test_count_coercion_handles_russian_review_labels()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_invalid_handoff_expiry_does_not_become_recovery_instructions()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_invalid_handoff_id_does_not_become_a_snapshot_target()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_malformed_error_envelope_does_not_break_comparison()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_price_coercion_handles_ozon_display_strings()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_price_coercion_keeps_coerce_price_parity_on_live_ozon_formats()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_short_queries_are_rejected()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_stock_label_coercion()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_structured_error_code_takes_precedence_over_message()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/parametrize
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_offer]]
- 1 edge to [[_COMMUNITY_taobao]]

## Top bridge nodes
- [[test_short_queries_are_rejected()]] - degree 5, connects to 2 communities
- [[parametrize_4]] - degree 10, connects to 1 community
- [[test_price_coercion_handles_ozon_display_strings()]] - degree 3, connects to 1 community
- [[test_count_coercion_handles_russian_review_labels()]] - degree 2, connects to 1 community
- [[test_invalid_handoff_expiry_does_not_become_recovery_instructions()]] - degree 2, connects to 1 community