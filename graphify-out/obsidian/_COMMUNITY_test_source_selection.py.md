---
type: community
cohesion: 0.11
members: 27
---

# test_source_selection.py

**Cohesion:** 0.11 - loosely connected
**Members:** 27 nodes

## Members
- [[Canonical names the operator asked for, or ``None`` meaning all of them. An…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[MARKETPLACE_SOURCES mounts the operator's subset and nothing else.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[One spelling per source, whichever alias a caller or operator used.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[Re-import the unified server so _mount_all runs under the current env.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[SourceSelectionError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[The selection names a source that this release does not provide.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[ValueError]] - code
- [[Whether this source survives the operator's selection.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[_MOUNTED says yandexdetmir; _CAPABILITIES is keyed canonically.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[_reload_unified()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[_set()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[canonical()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[fixture]] - code
- [[selected()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[test_aliases_and_spacing_are_accepted()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_blank_env_is_treated_as_unset()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_capabilities_flag_survives_the_naming_mismatch()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_compare_queries_only_the_selected_sources()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_deselected_sources_are_reported_not_hidden()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_source_selection.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_subset_drops_unlisted_sources()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_unified_server_rejects_invalid_selection()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_unknown_source_is_rejected_instead_of_silently_dropped()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_unset_env_mounts_everything()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_wanted_defaults_to_keeping_everything()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[unified_env()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[wanted()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_source_selectionpy
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_json]]
- 3 edges to [[_COMMUNITY_compare_prices]]
- 2 edges to [[_COMMUNITY_2.2.0 — 2026-09-11]]
- 1 edge to [[_COMMUNITY_test_dsh_bundle.py]]
- 1 edge to [[_COMMUNITY_compare_verify_offer]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[selected()]] - degree 11, connects to 4 communities
- [[test_source_selection.py]] - degree 17, connects to 3 communities
- [[canonical()]] - degree 7, connects to 3 communities
- [[wanted()]] - degree 5, connects to 2 communities
- [[SourceSelectionError]] - degree 6, connects to 1 community