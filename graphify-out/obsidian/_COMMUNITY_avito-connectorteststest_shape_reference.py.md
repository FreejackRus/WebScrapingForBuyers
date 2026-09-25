---
type: community
cohesion: 0.20
members: 10
---

# avito-connector/tests/test_shape_reference.py

**Cohesion:** 0.20 - loosely connected
**Members:** 10 nodes

## Members
- [[A rename WITHIN an alias family is tolerated; the loss of a whole family is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[Avito moved listings into catalog.items, but the parser binds both shapes and…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[Reference shape signature of the REAL Avito ``jsitems`` payload.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[The fields the parser actually binds to must stay in the reference. A fixture…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[avito-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[avito_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/__init__.py
- [[test_live_payload_shape_matches_the_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[test_missing_required_families_reports_only_absent_families()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[test_the_parser_bindings_survive_in_the_reference_shape()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[test_the_pre_2026_08_top_level_envelope_still_passes_the_families()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/avito-connector/tests/test_shape_referencepy
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_shape_signature]]
- 1 edge to [[_COMMUNITY__parse_search_items]]
- 1 edge to [[_COMMUNITY_avito-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[avito-connectorteststest_shape_reference.py]] - degree 9, connects to 3 communities
- [[test_missing_required_families_reports_only_absent_families()]] - degree 3, connects to 1 community
- [[test_the_parser_bindings_survive_in_the_reference_shape()]] - degree 3, connects to 1 community
- [[test_the_pre_2026_08_top_level_envelope_still_passes_the_families()]] - degree 3, connects to 1 community
- [[test_live_payload_shape_matches_the_capture()]] - degree 2, connects to 1 community