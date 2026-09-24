---
type: community
cohesion: 0.08
members: 26
---

# test_chrome_cdp.py

**Cohesion:** 0.08 - loosely connected
**Members:** 26 nodes

## Members
- [[An unset ProgramFiles must not yield a path starting with a bare slash.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[Tests for the pure helpers in ``mcp_core.transport.chrome_cdp``. The CDP tier…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[refuse()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_an_explicit_binary_override_is_tried_first()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_an_ipv6_host_with_colons_is_kept()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_candidates_never_contain_empty_entries()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_cdp_url_is_loopback()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_chrome_cdp.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_find_chrome_returns_none_when_nothing_is_installed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_find_chrome_returns_the_first_existing_candidate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_host_defaults_to_loopback_when_unset()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_host_reads_the_environment()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_linux_profile_dir_defaults_to_local_share()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_linux_profile_dir_honours_xdg_data_home()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_macos_candidates_include_a_per_user_install()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_macos_profile_dir_uses_application_support()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_nav_blocked_carries_the_status_and_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_port_defaults_to_9222_when_unset()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_port_probe_reports_false_when_nothing_listens()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_port_reads_the_environment()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_probe_session_reports_unreachable_when_port_closed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_root_check_is_false_for_an_ordinary_user()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_setup_hint_names_the_powershell_script_on_windows()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_windows_candidates_cover_chrome_and_edge()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_windows_profile_dir_falls_back_to_home_without_localappdata()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_windows_profile_dir_uses_localappdata()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_chrome_cdppy
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY__FakeWs]]
- 6 edges to [[_COMMUNITY__run_js_expression]]
- 5 edges to [[_COMMUNITY_parametrize_1]]
- 1 edge to [[_COMMUNITY_test_port_probe_targets_loopback_only]]
- 1 edge to [[_COMMUNITY_test_probe_session_never_raises]]
- 1 edge to [[_COMMUNITY_test_probe_session_reports_reachable_when_only_the_playwright_attach_fails]]
- 1 edge to [[_COMMUNITY_test_port_probe_treats_an_os_error_as_closed]]
- 1 edge to [[_COMMUNITY_test_port_probe_reports_true_and_closes_its_socket]]
- 1 edge to [[_COMMUNITY_test_windows_candidates_survive_missing_program_files_vars]]
- 1 edge to [[_COMMUNITY_test_setup_hint_points_at_a_script_that_exists]]
- 1 edge to [[_COMMUNITY_test_root_check_is_true_for_uid_zero]]
- 1 edge to [[_COMMUNITY_test_root_check_handles_platforms_without_geteuid]]
- 1 edge to [[_COMMUNITY_test_nav_fail_statuses_cover_blocks_and_gateway_errors]]
- 1 edge to [[_COMMUNITY_test_socket_module_is_the_real_one]]
- 1 edge to [[_COMMUNITY_test_cdp_url_uses_the_configured_host]]
- 1 edge to [[_COMMUNITY_test_port_probe_treats_a_timeout_as_closed]]
- 1 edge to [[_COMMUNITY_test_linux_candidates_prefer_a_resolved_path_over_a_guess]]
- 1 edge to [[_COMMUNITY_cdp-proxy.py]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[test_chrome_cdp.py]] - degree 58, connects to 21 communities