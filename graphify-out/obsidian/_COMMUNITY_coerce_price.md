---
type: community
cohesion: 0.08
members: 35
---

# coerce_price

**Cohesion:** 0.08 - loosely connected
**Members:** 35 nodes

## Members
- [[A dead listing rendered as 0 must not win a cheapest comparison.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[A sign or a dash-separated range is ambiguous. Digit-concatenation would…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Added_16]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Added_17]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Coerce a price (int rubles, float, or display string like '3u2009983u2009₽')…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Coerce int  float  grouped-string ('24 088', '1u2009057', '(15 374)') to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Fixed_21]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Marketplaces print the discount badge as -500 ₽ next to the real price. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Parse ONE money number from a display string, or None if absentambiguous.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[1.2.1 — 2026-07-28]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[1.3.0 — 2026-07-30]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[1.3.0 — 2026-07-30 (English)]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[1.4.1 — 2026-08-08]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[_parse_money_string()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[`isinstance(True, int)` is True in Python; a flag must not become a count.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[`json.loads` accepts NaN and Infinity by default, so both arrive from the wire,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[coerce_int()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[coerce_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[parametrize_31]] - code
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
- [[Добавлено_18]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Добавлено_19]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Изменено_11]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Исправлено_17]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Исправлено_18]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Исправлено в документации]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/coerce_price
SORT file.name ASC
```

## Connections to other communities
- 12 edges to [[_COMMUNITY_test_resilience.py]]
- 10 edges to [[_COMMUNITY_test_resilience_properties.py]]
- 4 edges to [[_COMMUNITY_Any]]
- 4 edges to [[_COMMUNITY_success]]
- 4 edges to [[_COMMUNITY_Changelog]]
- 3 edges to [[_COMMUNITY_shape_signature]]
- 3 edges to [[_COMMUNITY_Adding a marketplace]]
- 2 edges to [[_COMMUNITY_prices_from_tile]]
- 2 edges to [[_COMMUNITY_get_text_budgeted]]
- 2 edges to [[_COMMUNITY__post_json_budgeted]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 2 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_ru-marketplace-mcpREADME]]
- 2 edges to [[_COMMUNITY_Участие в проекте]]
- 2 edges to [[_COMMUNITY_Architecture]]
- 2 edges to [[_COMMUNITY_RELEASE NOTES — v1.4.1 (2026-08-08)]]
- 2 edges to [[_COMMUNITY_v1.3.0 — MPStats и разбор аудита]]
- 1 edge to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY_Pacer]]
- 1 edge to [[_COMMUNITY_test_search_parser_live.py]]
- 1 edge to [[_COMMUNITY_ssr.py]]
- 1 edge to [[_COMMUNITY_parse_retry_after]]
- 1 edge to [[_COMMUNITY_Ключевые изменения выпуска]]
- 1 edge to [[_COMMUNITY_avito_seller]]

## Top bridge nodes
- [[coerce_price()]] - degree 37, connects to 17 communities
- [[coerce_int()]] - degree 23, connects to 8 communities
- [[Added_16]] - degree 8, connects to 4 communities
- [[Добавлено_18]] - degree 8, connects to 4 communities
- [[Исправлено_17]] - degree 6, connects to 3 communities