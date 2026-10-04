---
type: community
members: 15
---

# flatten_text

**Members:** 15 nodes

## Members
- [[2. Три заявленных бага]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md
- [[2.1 avito `location` объектом — подтверждён, исправлен, проверен на живом ответе]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md
- [[2.2 dns 24 ссылки, `title=None`, `price=None` — подтверждён, исправлен, и он был хуже, чем в отчёте]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md
- [[2.3 detmir «цена, которой нет на странице, и не находит h1» — не воспроизводится]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md
- [[A bare number is a value upstream chose to send unquoted, not a guess.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Avito's `location` arrived as a string until it became `{name ...}`, and the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Reduce a value upstream ships as EITHER a string OR an object to text. Audit…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[The crash that started this helper a nested object must degrade to a name or…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[flatten_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[test_flatten_text_gives_none_rather_than_a_guess()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_never_returns_a_container_repr()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_flatten_text_passes_a_plain_string()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_reads_the_named_key_out_of_an_object()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_stringifies_a_scalar()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_tries_keys_in_order()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/flatten_text
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_test_resilience.py]]
- 3 edges to [[_COMMUNITY_test_resilience_properties.py]]
- 2 edges to [[_COMMUNITY_avito_seller]]
- 2 edges to [[_COMMUNITY_resilience.py]]
- 2 edges to [[_COMMUNITY_coerce_price]]
- 1 edge to [[_COMMUNITY_prices_from_tile]]
- 1 edge to [[_COMMUNITY_re]]
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_Аудит ru-marketplace-mcp v1.2.0 — независимая перепроверка]]

## Top bridge nodes
- [[flatten_text()]] - degree 16, connects to 4 communities
- [[2.1 avito `location` объектом — подтверждён, исправлен, проверен на живом ответе]] - degree 5, connects to 2 communities
- [[test_flatten_text_gives_none_rather_than_a_guess()]] - degree 3, connects to 2 communities
- [[2. Три заявленных бага]] - degree 4, connects to 1 community
- [[test_flatten_text_never_returns_a_container_repr()]] - degree 3, connects to 1 community