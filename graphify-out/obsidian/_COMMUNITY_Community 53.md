---
type: community
cohesion: 0.11
members: 32
---

# Community 53

**Cohesion:** 0.11 - loosely connected
**Members:** 32 nodes

## Members
- [[A dead listing rendered as 0 must not win a cheapest comparison.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[A sign or a dash-separated range is ambiguous. Digit-concatenation would…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Coerce a price (int rubles, float, or display string like '3u2009983u2009₽')…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Coerce int  float  grouped-string ('24 088', '1u2009057', '(15 374)') to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[First candidate that parses to a real positive price, else None. DOM extractors…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Marketplaces print the discount badge as -500 ₽ next to the real price. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Tests for the tolerant-reader coercion helpers. These five functions decide…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[The tile order that matters badge first, price second.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[_parsed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[`isinstance(True, int)` is True in Python; a flag must not become a count.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[`json.loads` accepts NaN and Infinity by default, so both arrive from the wire,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[coerce_int()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[coerce_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[parametrize_25]] - code
- [[price_from_texts()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[test_a_discount_badge_does_not_outrank_the_real_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_a_leading_minus_means_a_discount_not_a_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_absent_counts_are_none_not_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_bools_are_not_counts()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_coerce_int_survives_non_finite_floats()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_coerce_price_survives_non_finite_floats()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_coerce_rating_survives_non_finite_floats()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_counts_parse()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_counts_with_signs_or_ranges_are_ambiguous_and_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_gives_none_rather_than_a_guess()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_non_prices_are_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_price_from_texts_returns_none_when_nothing_parses()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_price_from_texts_skips_zero_and_discount_badges()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_price_from_texts_takes_the_first_real_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_real_prices_parse()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_resilience.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_zero_and_negative_are_not_prices()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_53
SORT file.name ASC
```

## Connections to other communities
- 11 edges to [[_COMMUNITY_Community 66]]
- 10 edges to [[_COMMUNITY_Community 48]]
- 7 edges to [[_COMMUNITY_Community 150]]
- 5 edges to [[_COMMUNITY_Community 182]]
- 4 edges to [[_COMMUNITY_Community 223]]
- 2 edges to [[_COMMUNITY_Community 18]]
- 1 edge to [[_COMMUNITY_Community 74]]
- 1 edge to [[_COMMUNITY_Community 14]]
- 1 edge to [[_COMMUNITY_Community 96]]

## Top bridge nodes
- [[test_resilience.py]] - degree 35, connects to 5 communities
- [[coerce_price()]] - degree 20, connects to 5 communities
- [[coerce_int()]] - degree 13, connects to 2 communities
- [[price_from_texts()]] - degree 8, connects to 1 community
- [[test_coerce_rating_survives_non_finite_floats()]] - degree 3, connects to 1 community