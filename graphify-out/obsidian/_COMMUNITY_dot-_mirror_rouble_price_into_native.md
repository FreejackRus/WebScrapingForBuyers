---
type: community
cohesion: 0.67
members: 3
---

# ._mirror_rouble_price_into_native

**Cohesion:** 0.67 - moderately connected
**Members:** 3 nodes

## Members
- [[dot-_mirror_rouble_price_into_native()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[For rouble sources the native price is the rouble price. Filling this here…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[model_validator]] - code

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_mirror_rouble_price_into_native
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]

## Top bridge nodes
- [[dot-_mirror_rouble_price_into_native()]] - degree 3, connects to 1 community