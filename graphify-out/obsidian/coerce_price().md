---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py"
type: "code"
community: "Community 53"
location: "L122"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/Community_53
---

# coerce_price()

## Connections
- [[Any_25]] - `references` [EXTRACTED]
- [[Coerce a price (int rubles, float, or display string like '3u2009983u2009₽')…]] - `rationale_for` [EXTRACTED]
- [[_parse_money_string()]] - `calls` [EXTRACTED]
- [[_parsed()]] - `calls` [EXTRACTED]
- [[dom.py]] - `imports` [EXTRACTED]
- [[price_from_texts()]] - `calls` [EXTRACTED]
- [[prices_from_tile()]] - `calls` [EXTRACTED]
- [[resilience.py]] - `contains` [EXTRACTED]
- [[test_a_leading_minus_means_a_discount_not_a_price()]] - `calls` [EXTRACTED]
- [[test_coerce_price_dead_listing_inputs_are_none()]] - `calls` [EXTRACTED]
- [[test_coerce_price_is_idempotent_on_its_own_results()]] - `calls` [EXTRACTED]
- [[test_coerce_price_is_total_and_never_zero()]] - `calls` [EXTRACTED]
- [[test_coerce_price_is_total_beyond_the_float_ceiling()]] - `calls` [EXTRACTED]
- [[test_coerce_price_refuses_two_numbers_even_without_a_glyph_between_them()]] - `calls` [EXTRACTED]
- [[test_coerce_price_survives_non_finite_floats()]] - `calls` [EXTRACTED]
- [[test_live_price_strings_parse_to_the_displayed_numbers()]] - `calls` [EXTRACTED]
- [[test_non_prices_are_none()]] - `calls` [EXTRACTED]
- [[test_real_prices_parse()]] - `calls` [EXTRACTED]
- [[test_zero_and_negative_are_not_prices()]] - `calls` [EXTRACTED]
- [[validate_offer()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/Community_53