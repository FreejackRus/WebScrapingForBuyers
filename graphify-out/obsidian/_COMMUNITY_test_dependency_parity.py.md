---
type: community
cohesion: 0.07
members: 42
---

# test_dependency_parity.py

**Cohesion:** 0.07 - loosely connected
**Members:** 42 nodes

## Members
- [[(source name, distribution) pairs from the mounts table inside _mount_all.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[dot-__init__()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[dot-visit_Call()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[Bare distribution names from project.dependencies, specifiers stripped.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[Call]] - code
- [[Collects ``print(...)`` and ``sys.stdout.`` writes with line numbers.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[Declaring the dependency is half the row; tool.uv.sources is the other.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[Every source _mount_all mounts must be a dependency this package declares. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[Fail if a connector server writes to stdout. An MCP stdio server owns stdout…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[Guard the guard a broken extraction would make every check below vacuous. If…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[Keep standalone-install documentation aligned with package metadata.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/test_distribution_contract.py
- [[Path]] - code
- [[Return human-readable violations for one file.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[StdoutWriteVisitor]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[The tool.uv.sources table distribution name - source declaration.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[The bug this file exists for registered in _mount_all, forgotten in pyproject.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[The reverse drift a connector dependency that nothing mounts. Not the disaster…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[_declared_dependencies()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[_is_sys()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[_is_sys_stderr()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[_is_sys_stdout()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[_mounted_distributions()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[_pyproject()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[_workspace_sources()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[ast]] - concept
- [[check_file()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[check_no_print.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[collect_default_paths()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[expr]] - code
- [[main()_1]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_no_print.py
- [[packaging_requirements]] - concept
- [[shlex]] - concept
- [[test_all_comparison_sources_have_a_wheelhouse_dependency()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_distribution_contract.py
- [[test_compare_exposes_aliexpress_as_a_documented_optional_extra()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_distribution_contract.py
- [[test_dependency_parity.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_dependency_parity.py
- [[test_deployment_documents_supported_install_commands()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_distribution_contract.py
- [[test_distribution_contract.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_distribution_contract.py
- [[test_entrypoint_examples_launch_their_declared_console_script()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_distribution_contract.py
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
- 6 edges to [[_COMMUNITY_pathlib]]
- 2 edges to [[_COMMUNITY_json]]

## Top bridge nodes
- [[test_dependency_parity.py]] - degree 13, connects to 2 communities
- [[test_distribution_contract.py]] - degree 11, connects to 2 communities
- [[check_no_print.py]] - degree 11, connects to 1 community