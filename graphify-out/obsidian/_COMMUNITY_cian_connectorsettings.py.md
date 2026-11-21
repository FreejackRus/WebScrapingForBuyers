---
type: community
cohesion: 0.50
members: 5
---

# cian_connector/settings.py

**Cohesion:** 0.50 - moderately connected
**Members:** 5 nodes

## Members
- [[BaseSettings_10]] - code
- [[Cian connector runtime settings (env-driven via CIAN_ prefix). Env vars (all…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/settings.py
- [[CianSettings]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/settings.py
- [[cian_connectorsettings.py]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/settings.py
- [[get_settings()_10]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/settings.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/cian_connector/settingspy
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_cian_connectorserver.py]]
- 2 edges to [[_COMMUNITY_functools]]
- 1 edge to [[_COMMUNITY_json]]

## Top bridge nodes
- [[cian_connectorsettings.py]] - degree 7, connects to 3 communities
- [[get_settings()_10]] - degree 3, connects to 1 community