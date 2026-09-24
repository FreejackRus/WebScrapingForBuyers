---
type: community
cohesion: 0.09
members: 31
---

# responder

**Cohesion:** 0.09 - loosely connected
**Members:** 31 nodes

## Members
- [[A page smaller than the cap means the pool is exhausted.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[Filtering after fetching must not silently shrink the caller's result.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[Seller answers contain literal newlines, which break single-line rendering.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[_question()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[_questions_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[feedbacks.wb.ru answers any questions-ish path with a misleading empty stub.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()_7]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()_8]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()_9]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()_10]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()_11]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_43]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_44]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_45]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_46]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_47]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_48]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_49]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_50]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[take is capped at 30 upstream, so limit=45 must walk two pages.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_answered_only_keeps_filling_across_pages()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_collapses_newlines_in_answers()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_paginates_past_the_upstream_take_cap()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_raises_drift_when_questions_is_not_a_list()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_returns_pairs_and_marks_answered()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_stops_at_a_short_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_uses_the_dedicated_host_not_a_feedbacks_mirror()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_warns_when_nothing_is_answered_yet()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/responder
SORT file.name ASC
```

## Connections to other communities
- 16 edges to [[_COMMUNITY__patch_questions]]
- 10 edges to [[_COMMUNITY_test_helpers.py]]
- 4 edges to [[_COMMUNITY__tool_error_payload]]
- 1 edge to [[_COMMUNITY__healthy_selfcheck_responder]]

## Top bridge nodes
- [[responder()_8]] - degree 23, connects to 3 communities
- [[scenario()_46]] - degree 4, connects to 2 communities
- [[_questions_payload()]] - degree 8, connects to 1 community
- [[_question()]] - degree 7, connects to 1 community
- [[test_questions_answered_only_keeps_filling_across_pages()]] - degree 4, connects to 1 community