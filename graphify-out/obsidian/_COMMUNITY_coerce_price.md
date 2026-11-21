---
type: community
cohesion: 0.09
members: 32
---

# coerce_price

**Cohesion:** 0.09 - loosely connected
**Members:** 32 nodes

## Members
- [[A dead listing rendered as 0 must not win a cheapest comparison.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[A sign or a dash-separated range is ambiguous. Digit-concatenation would…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Added]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Added_1]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Coerce a price (int rubles, float, or display string like '3u2009983u2009₽')…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Coerce int  float  grouped-string ('24 088', '1u2009057', '(15 374)') to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Context]] - code - apps/analysis/src/application/procurement-dialogue.ts
- [[Fixed_1]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Marketplaces print the discount badge as -500 ₽ next to the real price. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[What this codebase cares about]] - document - mcp-servers/ru-marketplace-mcp/CONTRIBUTING.md
- [[1.3.0 — 2026-07-30]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[1.4.1 — 2026-08-08]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[_parsed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[`isinstance(True, int)` is True in Python; a flag must not become a count.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[`json.loads` accepts NaN and Infinity by default, so both arrive from the wire,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[coerce_int()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[coerce_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[parametrize]] - code
- [[test_a_leading_minus_means_a_discount_not_a_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_absent_counts_are_none_not_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_bools_are_not_counts()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_coerce_int_survives_non_finite_floats()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_coerce_price_survives_non_finite_floats()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_counts_parse()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_counts_with_signs_or_ranges_are_ambiguous_and_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_non_prices_are_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_real_prices_parse()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_zero_and_negative_are_not_prices()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Добавлено_1]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Добавлено_2]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Исправлено]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Что важно в этой кодовой базе]] - document - mcp-servers/ru-marketplace-mcp/CONTRIBUTING.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/coerce_price
SORT file.name ASC
```

## Connections to other communities
- 12 edges to [[_COMMUNITY_test_resilience.py]]
- 10 edges to [[_COMMUNITY_test_resilience_properties.py]]
- 7 edges to [[_COMMUNITY_resilience.py]]
- 3 edges to [[_COMMUNITY_Architecture]]
- 3 edges to [[_COMMUNITY_Adding a marketplace]]
- 3 edges to [[_COMMUNITY_Fixed]]
- 3 edges to [[_COMMUNITY_Changelog]]
- 2 edges to [[_COMMUNITY_prices_from_tile]]
- 2 edges to [[_COMMUNITY_TransportDownError]]
- 2 edges to [[_COMMUNITY_RELEASE NOTES — v1.4.1 (2026-08-08)]]
- 2 edges to [[_COMMUNITY_v1.3.0 — MPStats и разбор аудита]]
- 2 edges to [[_COMMUNITY_get_text_budgeted]]
- 2 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY_success]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_procurement-dialogue.ts]]
- 1 edge to [[_COMMUNITY_PULL_REQUEST_TEMPLATE]]
- 1 edge to [[_COMMUNITY_test_search_parser_live.py]]
- 1 edge to [[_COMMUNITY_dom.py]]
- 1 edge to [[_COMMUNITY_Аудит ru-marketplace-mcp v1.2.0 — независимая перепроверка]]
- 1 edge to [[_COMMUNITY_Contributing]]
- 1 edge to [[_COMMUNITY_Участие в проекте]]

## Top bridge nodes
- [[coerce_price()]] - degree 37, connects to 13 communities
- [[coerce_int()]] - degree 23, connects to 6 communities
- [[Added]] - degree 6, connects to 4 communities
- [[Добавлено_1]] - degree 6, connects to 3 communities
- [[Context]] - degree 5, connects to 3 communities