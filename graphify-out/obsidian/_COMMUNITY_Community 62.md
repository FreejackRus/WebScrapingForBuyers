---
type: community
cohesion: 0.08
members: 28
---

# Community 62

**Cohesion:** 0.08 - loosely connected
**Members:** 28 nodes

## Members
- [[dot-__init__()_35]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[dot-kill()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[dot-poll()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[dot-wait()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[A failed killpg must degrade to proc.kill(), never propagate.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[A lowercase 'path' must not slip through the POSIX allowlist. Case-folding is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[Minimal Popen stand-in that records how it was torn down.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[On POSIX SIGKILL the child's process group, never a bare kill().]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[On Windows os.killpg simply does not exist, so this must raise cleanly.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[On Windows kill the whole tree via an absolute, un-hijackable taskkill. Runs…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[Tests for ``mcp_core.process`` — worker isolation and process-tree teardown.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[The POSIX path signals the whole group, not just the child pid.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[The child env allowlist must not leak proxy configuration.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[Under the Windows rule, a differently-cased allowlist key still passes. Windows…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[_FakeProc]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[boom()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[fake_run()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_kill_process_group_refuses_where_process_groups_do_not_exist()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_kill_process_group_uses_posix_signalling()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_process.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_proxy_env_vars_are_excluded_from_the_worker_environment()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_safe_child_env_case_folds_on_windows()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_safe_child_env_does_not_case_fold_on_posix()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_safe_child_env_excludes_secrets_on_every_platform()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_terminate_worker_tree_falls_back_to_kill_when_killpg_fails()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_terminate_worker_tree_kills_process_group_on_posix()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_terminate_worker_tree_uses_absolute_taskkill_and_sanitized_env()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[test_worker_process_kwargs_per_platform()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_62
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_Community 4]]
- 1 edge to [[_COMMUNITY_Community 3]]
- 1 edge to [[_COMMUNITY_Community 96]]

## Top bridge nodes
- [[test_process.py]] - degree 15, connects to 3 communities