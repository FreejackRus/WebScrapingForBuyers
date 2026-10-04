---
type: community
members: 43
---

# os

**Members:** 43 nodes

## Members
- [[dot-__init__()_38]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[dot-kill()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[dot-poll()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[dot-wait()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[A failed killpg must degrade to proc.kill(), never propagate.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[A lowercase 'path' must not slip through the POSIX allowlist. Case-folding is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[Exercise every Compose service's merged HTTP settings against the runtime. YAML…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_compose_runtime.py
- [[Expose Chrome DevTools on 0.0.0.0 and rewrite advertised websocket hosts.]] - rationale - deploy/chrome/cdp-proxy.py
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
- [[cdp-proxy.py]] - code - deploy/chrome/cdp-proxy.py
- [[fake_run()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py
- [[handle_client()]] - code - deploy/chrome/cdp-proxy.py
- [[main()_17]] - code - deploy/chrome/cdp-proxy.py
- [[os]] - concept
- [[parametrize_33]] - code
- [[pipe()]] - code - deploy/chrome/cdp-proxy.py
- [[read_headers()]] - code - deploy/chrome/cdp-proxy.py
- [[rewrite_payload()]] - code - deploy/chrome/cdp-proxy.py
- [[socket]] - code
- [[split_http()]] - code - deploy/chrome/cdp-proxy.py
- [[test_compose_runtime.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_compose_runtime.py
- [[test_compose_service_passes_http_startup_auth_gate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_compose_runtime.py
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
- [[yaml]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/os
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_StdioProbe]]
- 2 edges to [[_COMMUNITY_transport__init__.py]]
- 2 edges to [[_COMMUNITY_TransportDownError]]
- 2 edges to [[_COMMUNITY_pytest]]
- 2 edges to [[_COMMUNITY_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_yandex_connectorserver.py]]
- 1 edge to [[_COMMUNITY_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_selected]]
- 1 edge to [[_COMMUNITY_megamarket_connectorserver.py]]
- 1 edge to [[_COMMUNITY_compare_connectorserver.py]]
- 1 edge to [[_COMMUNITY_process.py]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_detmir_connectorserver.py]]
- 1 edge to [[_COMMUNITY_domtest.py]]
- 1 edge to [[_COMMUNITY_re]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_test_handoff_liveness_consistency.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_ozon_connectorserver.py]]
- 1 edge to [[_COMMUNITY_sys]]

## Top bridge nodes
- [[os]] - degree 20, connects to 15 communities
- [[test_compose_runtime.py]] - degree 9, connects to 5 communities
- [[test_process.py]] - degree 15, connects to 2 communities
- [[socket]] - degree 6, connects to 2 communities
- [[cdp-proxy.py]] - degree 10, connects to 1 community