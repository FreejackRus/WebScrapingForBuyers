---
type: community
cohesion: 0.07
members: 39
---

# test_resilience_properties.py

**Cohesion:** 0.07 - loosely connected
**Members:** 39 nodes

## Members
- [[24 088', '1 057' — thousands separators are unambiguous and must parse to the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[A key present with a null value is upstream saying no data, not a value.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[A letter means a unitmagnitude suffix ('1.2K', '15 тыс.') — digit…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[A parsed price, rendered back to the canonical two-digit display and re-parsed,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[A price and its instalmentdiscount neighbour, kept apart only by anything that…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[Every shape a dead or poisoned listing can present — all of them None.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[Never raises, and the result is either None or a usable display string non-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[No digits anywhere means no value — and 'no value' is None, never 0.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[One poisoned cell degrades a field, never aborts the tool.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[Property tests for the coercion helpers contracts about EVERY input. Example…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[Regression for the hole the properties surfaced but their sampling never hit a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[Return the first alias key whose value is present (not Nonemissing). Multi-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[The answer is always either one of the dict's own values or the default — a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[The first alias with a present value wins — even when it is an empty string,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[The whole contract in one property never raises, and the result is either None…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[True' is not a display value; flattening a bool would put Python literals in…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[first_present()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[given]] - code
- [[hypothesis]] - concept
- [[test_coerce_int_is_total()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_coerce_int_parses_grouped_display_strings()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_coerce_int_passes_ints_through()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_coerce_int_with_letters_is_ambiguous_and_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_coerce_int_without_digits_is_none_never_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_coerce_price_dead_listing_inputs_are_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_coerce_price_is_idempotent_on_its_own_results()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_coerce_price_is_total_and_never_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_coerce_price_is_total_beyond_the_float_ceiling()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_coerce_price_refuses_two_numbers_even_without_a_glyph_between_them()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_first_present_all_absent_or_null_is_default()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_first_present_falls_through_to_a_later_alias()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_first_present_is_total_and_never_invents()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_first_present_returns_the_first_bound_alias()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_first_present_returns_the_first_non_null_alias()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_first_present_treats_none_as_absent()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_first_present_uses_the_default_when_nothing_binds()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_is_total_and_honest()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_flatten_text_refuses_booleans()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_resilience_properties.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_resilience_propertiespy
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_coerce_price]]
- 7 edges to [[_COMMUNITY_test_resilience.py]]
- 2 edges to [[_COMMUNITY_Any]]
- 2 edges to [[_COMMUNITY_shape_signature]]
- 2 edges to [[_COMMUNITY_json]]

## Top bridge nodes
- [[test_resilience_properties.py]] - degree 21, connects to 3 communities
- [[first_present()]] - degree 11, connects to 2 communities
- [[test_coerce_int_is_total()]] - degree 4, connects to 1 community
- [[test_coerce_int_parses_grouped_display_strings()]] - degree 4, connects to 1 community
- [[test_coerce_int_with_letters_is_ambiguous_and_none()]] - degree 4, connects to 1 community