---
type: community
cohesion: 0.13
members: 30
---

# test_stdio_probe.py

**Cohesion:** 0.13 - loosely connected
**Members:** 30 nodes

## Members
- [[End-to-end stdio MCP check through the published OCI package. The local e2e…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/e2e_stdio_check_docker.py
- [[MonkeyPatch]] - code
- [[Path_10]] - code
- [[Popen_1]] - code
- [[Step 7d - MCP server (only if --mcp flag)]] - document - .codex/skills/graphify/references/exports.md
- [[Subprocess regressions for the operational probes (no Dockernetwork needed).]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[_probe()_1]] - code - mcp-servers/ru-marketplace-mcp/scripts/e2e_stdio_check_docker.py
- [[command()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[e2e_stdio_check_docker.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/e2e_stdio_check_docker.py
- [[fixture_17]] - code
- [[main()_26]] - code - mcp-servers/ru-marketplace-mcp/scripts/e2e_stdio_check_docker.py
- [[parametrize_21]] - code
- [[probe()_1]] - code - mcp-servers/ru-marketplace-mcp/scripts/e2e_stdio_check_docker.py
- [[replace_command()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[run()_3]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[run()_4]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[start()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_all_probe_entrypoints_check_protocol()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_all_probe_entrypoints_fail_on_silence()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_cleanup_stops_wrapper_and_its_child()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_docker_probe_rejects_call_errors()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_docker_probe_rejects_wrong_or_missing_versions()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_docker_probe_requires_expected_version_before_starting()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_docker_timeout_attempts_container_removal()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_invalid_results_fail()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_noisy_and_interleaved_child_completes()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_silent_child_obeys_deadline_and_is_reaped()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[test_stdio_probe.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[unrelated_process()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[uuid]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_stdio_probepy
SORT file.name ASC
```

## Connections to other communities
- 16 edges to [[_COMMUNITY_StdioProbe]]
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_subprocess]]
- 2 edges to [[_COMMUNITY_sys]]
- 1 edge to [[_COMMUNITY_graphify reference extra exports and benchmark]]
- 1 edge to [[_COMMUNITY_mcp_wire.py]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[test_stdio_probe.py]] - degree 26, connects to 7 communities
- [[e2e_stdio_check_docker.py]] - degree 12, connects to 4 communities
- [[replace_command()]] - degree 11, connects to 1 community
- [[test_cleanup_stops_wrapper_and_its_child()]] - degree 5, connects to 1 community
- [[test_invalid_results_fail()]] - degree 5, connects to 1 community