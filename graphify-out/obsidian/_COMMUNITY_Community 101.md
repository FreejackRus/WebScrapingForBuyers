---
type: community
cohesion: 0.14
members: 19
---

# Community 101

**Cohesion:** 0.14 - loosely connected
**Members:** 19 nodes

## Members
- [[Canonical names the operator asked for, or ``None`` meaning all of them. An…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[Import each connector defensively and mount it. A connector that fails to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/server.py
- [[Import each marketplace connector defensively. A missing optional dependency…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[One spelling per source, whichever alias a caller or operator used.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[Operator-chosen subset of marketplace sources. Every advertised tool costs its…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[SourceSelectionError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[The selection names a source that this release does not provide.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[ValueError]] - code
- [[Whether this source survives the operator's selection.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[_available_sources()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_mount_all()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/server.py
- [[canonical()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[selected()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[source_selection.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py
- [[test_aliases_and_spacing_are_accepted()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_blank_env_is_treated_as_unset()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_unknown_source_is_rejected_instead_of_silently_dropped()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[test_wanted_defaults_to_keeping_everything()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_source_selection.py
- [[wanted()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/source_selection.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_101
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Community 146]]
- 4 edges to [[_COMMUNITY_Community 14]]
- 3 edges to [[_COMMUNITY_Community 55]]
- 2 edges to [[_COMMUNITY_Community 22]]
- 2 edges to [[_COMMUNITY_Community 54]]
- 1 edge to [[_COMMUNITY_Community 242]]
- 1 edge to [[_COMMUNITY_Community 3]]

## Top bridge nodes
- [[source_selection.py]] - degree 10, connects to 4 communities
- [[_available_sources()]] - degree 5, connects to 3 communities
- [[canonical()]] - degree 7, connects to 2 communities
- [[_mount_all()]] - degree 5, connects to 2 communities
- [[selected()]] - degree 11, connects to 1 community