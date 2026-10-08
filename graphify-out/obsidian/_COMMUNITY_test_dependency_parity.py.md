---
type: community
cohesion: 0.19
members: 17
---

# test_dependency_parity.py

**Cohesion:** 0.19 - loosely connected
**Members:** 17 nodes

## Members
- [[(source name, distribution) pairs from the mounts table inside _mount_all.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[Bare distribution names from project.dependencies, specifiers stripped.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[Declaring the dependency is half the row; tool.uv.sources is the other.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[Every source _mount_all mounts must be a dependency this package declares. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[Guard the guard a broken extraction would make every check below vacuous. If…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[The tool.uv.sources table distribution name - source declaration.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[The bug this file exists for registered in _mount_all, forgotten in pyproject.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[The reverse drift a connector dependency that nothing mounts. Not the disaster…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[_declared_dependencies()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[_mounted_distributions()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[_pyproject()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[_workspace_sources()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[test_dependency_parity.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[test_every_connector_dependency_is_mounted_or_a_known_profile()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[test_every_mounted_source_is_a_declared_dependency()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[test_every_mounted_source_is_a_workspace_source()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[test_the_mounts_table_was_read()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_dependency_paritypy
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_test_distribution_contract.py]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[test_dependency_parity.py]] - degree 13, connects to 3 communities