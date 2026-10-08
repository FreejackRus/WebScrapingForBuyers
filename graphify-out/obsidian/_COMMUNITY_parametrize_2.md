---
type: community
cohesion: 0.40
members: 5
---

# parametrize

**Cohesion:** 0.40 - moderately connected
**Members:** 5 nodes

## Members
- [[parametrize_23]] - code
- [[test_install_rejects_extra_arguments_and_unknown_flags()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[test_invalid_doctor_arguments_fail_before_any_checks()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[test_run_one_selfcheck_reads_dict_and_model_responses()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[unexpected_call()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/parametrize
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_test_cli.py]]
- 1 edge to [[_COMMUNITY_Аудит ru-marketplace-mcp v1.2.0 — независимая перепроверка]]

## Top bridge nodes
- [[test_run_one_selfcheck_reads_dict_and_model_responses()]] - degree 3, connects to 2 communities
- [[test_invalid_doctor_arguments_fail_before_any_checks()]] - degree 3, connects to 1 community
- [[test_install_rejects_extra_arguments_and_unknown_flags()]] - degree 2, connects to 1 community