---
type: community
cohesion: 0.09
members: 33
---

# test_resilience.py

**Cohesion:** 0.09 - loosely connected
**Members:** 33 nodes

## Members
- [[A bare number is a value upstream chose to send unquoted, not a guess.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[A required sub-check the caller forgot to populate must not be silently dropped…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Aggregate per-check tri-state entries into the unified top-level verdict.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Avito's `location` arrived as a string until it became `{name ...}`, and the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Build one normalized selfcheck sub-check entry. state must be 'healthy' …]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[First candidate that parses to a real positive price, else None. DOM extractors…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Reduce a value upstream ships as EITHER a string OR an object to text. Audit…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Tests for the tolerant-reader coercion helpers. These five functions decide…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[The crash that started this helper a nested object must degrade to a name or…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[The tile order that matters badge first, price second.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[flatten_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[ok=True only for healthy; False for drift; None for inconclusive, so a caller…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[price_from_texts()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[selfcheck_entry()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[selfcheck_result()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[test_a_discount_badge_does_not_outrank_the_real_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_gives_none_rather_than_a_guess()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_never_returns_a_container_repr()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_flatten_text_passes_a_plain_string()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_reads_the_named_key_out_of_an_object()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_stringifies_a_scalar()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_tries_keys_in_order()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_price_from_texts_returns_none_when_nothing_parses()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_price_from_texts_skips_zero_and_discount_badges()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_price_from_texts_takes_the_first_real_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_resilience.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_entry_ok_flag_is_tri_state()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_entry_unknown_state_is_inconclusive_never_ok()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_all_healthy_is_success()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_drift_dominates()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_inconclusive_beats_all_healthy()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_missing_required_check_is_injected_inconclusive()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_no_checks_is_inconclusive_not_vacuous_success()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_resiliencepy
SORT file.name ASC
```

## Connections to other communities
- 12 edges to [[_COMMUNITY_coerce_price]]
- 7 edges to [[_COMMUNITY_test_resilience_properties.py]]
- 5 edges to [[_COMMUNITY_Any]]
- 5 edges to [[_COMMUNITY_shape_signature]]
- 1 edge to [[_COMMUNITY_title_from_tile]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_avito_seller]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[flatten_text()]] - degree 16, connects to 6 communities
- [[test_resilience.py]] - degree 35, connects to 5 communities
- [[price_from_texts()]] - degree 8, connects to 3 communities
- [[selfcheck_entry()]] - degree 10, connects to 2 communities
- [[selfcheck_result()]] - degree 8, connects to 1 community