---
type: community
cohesion: 0.13
members: 15
---

# fake_selfcheck

**Cohesion:** 0.13 - loosely connected
**Members:** 15 nodes

## Members
- [[Drift is the alarm; a blocked source must not mask it.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[fake_selfcheck()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[fake_selfcheck()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[fake_selfcheck()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[fake_selfcheck()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[fake_selfcheck()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[fake_selfcheck()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[fake_selfcheck()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[test_doctor_accepts_install_source_names_and_includes_aliexpress()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[test_doctor_exit_code_prefers_drift_over_inconclusive()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[test_doctor_exits_nonzero_on_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[test_doctor_reports_per_source_status()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[test_doctor_returns_zero_only_when_everything_is_healthy()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[test_doctor_survives_a_selfcheck_that_raises()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[test_doctor_writes_a_status_file()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/fake_selfcheck
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_test_cli.py]]

## Top bridge nodes
- [[test_doctor_exit_code_prefers_drift_over_inconclusive()]] - degree 4, connects to 1 community
- [[test_doctor_accepts_install_source_names_and_includes_aliexpress()]] - degree 3, connects to 1 community
- [[test_doctor_exits_nonzero_on_drift()]] - degree 3, connects to 1 community
- [[test_doctor_returns_zero_only_when_everything_is_healthy()]] - degree 3, connects to 1 community
- [[test_doctor_survives_a_selfcheck_that_raises()]] - degree 3, connects to 1 community