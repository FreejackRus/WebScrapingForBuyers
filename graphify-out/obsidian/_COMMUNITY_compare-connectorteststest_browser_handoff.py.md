---
type: community
cohesion: 0.07
members: 35
---

# compare-connector/tests/test_browser_handoff.py

**Cohesion:** 0.07 - loosely connected
**Members:** 35 nodes

## Members
- [[A real MCP client can recover a source on the same owned browser page.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[Taobao MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/__init__.py
- [[The JS stays dumb transport raw anchor counts and a visible-text snippet, no…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[The capture came from a logged-out profile, trimmed of every scriptstyle block…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[The fix proper with no title to look at, the structural markers —…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[The real extractor against the LIVE login wall captured 2026-09-10. Taobao…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[The real extractor's payload over the captured wall.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[The real wall payload must produce TransportDownError with the log-in fix…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[Tri-state doctrine a session wall is inconclusive(login_wall) — the canary…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[_no_cache()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[_patch_render()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[_tool_error_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[_wall_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[base64]] - concept
- [[capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[capture()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[compare-connectorteststest_browser_handoff.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[fake_render()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[fixture_2]] - code
- [[parametrize]] - code
- [[raise_tool_error serializes a ConnectorError as JSON inside ToolError.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[taobao_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/__init__.py
- [[test_compare_import_does_not_require_browser_extra()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[test_compare_mcp_retains_source_session_and_resumes_without_navigation()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[test_distinct_mcp_sessions_do_not_share_challenge_tabs()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[test_extractor_surfaces_the_structural_wall_markers()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[test_mcp_shutdown_closes_pending_handoff()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[test_search_login_wall_live_dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[test_search_over_the_live_wall_is_transport_down_never_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[test_selfcheck_over_the_live_wall_is_inconclusive_never_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[test_snapshot_mcp_transmits_image_without_ending_or_extending_handoff()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[test_snapshot_rejects_other_session_and_unknown_handle_without_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[test_taobao_tools_resume_the_retained_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_browser_handoff.py
- [[test_the_fixture_carries_no_session_data()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py
- [[test_the_title_less_wall_is_classified_as_a_login_wall()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_login_wall_live_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/compare-connector/tests/test_browser_handoffpy
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_pathlib]]
- 3 edges to [[_COMMUNITY_run_extractor]]
- 3 edges to [[_COMMUNITY_pytest]]
- 3 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY_payload]]
- 1 edge to [[_COMMUNITY_taobao]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_lamoda-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_test_anti_bot_challenge_dom.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_test_card_extractor_live_dom.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp_snapshot.py]]

## Top bridge nodes
- [[compare-connectorteststest_browser_handoff.py]] - degree 22, connects to 7 communities
- [[taobao_connector__init__.py]] - degree 10, connects to 7 communities
- [[test_search_login_wall_live_dom.py]] - degree 16, connects to 4 communities
- [[base64]] - degree 3, connects to 2 communities
- [[_wall_payload()]] - degree 8, connects to 1 community