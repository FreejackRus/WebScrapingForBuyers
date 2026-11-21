---
type: community
cohesion: 0.50
members: 5
---

# taobao_connector/settings.py

**Cohesion:** 0.50 - moderately connected
**Members:** 5 nodes

## Members
- [[BaseSettings_11]] - code
- [[Taobao connector runtime settings (env-driven via TAOBAO_ prefix). Env vars…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/settings.py
- [[TaobaoSettings]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/settings.py
- [[get_settings()_11]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/settings.py
- [[taobao_connectorsettings.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/settings.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/taobao_connector/settingspy
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_taobao_connectorserver.py]]
- 2 edges to [[_COMMUNITY_functools]]
- 1 edge to [[_COMMUNITY_json]]

## Top bridge nodes
- [[taobao_connectorsettings.py]] - degree 7, connects to 3 communities
- [[get_settings()_11]] - degree 3, connects to 1 community