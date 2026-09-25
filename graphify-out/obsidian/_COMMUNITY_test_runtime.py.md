---
type: community
cohesion: 0.06
members: 44
---

# test_runtime.py

**Cohesion:** 0.06 - loosely connected
**Members:** 44 nodes

## Members
- [[dot-__init__()_20]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[dot-add_middleware()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[dot-run()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[A blank port falls back to the default; a non-numeric one is an error.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[A client vanishing mid-write on stdio is expected, not a failure.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[A path without a leading slash is normalised rather than rejected.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[A stray MCP_HTTP_PORT must not fail a stdio launch that never uses it.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[A typo'd transport must fail loudly, not silently fall back to stdio. Silent…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[All three HTTP-family transports FastMCP supports are selectable.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[An environment with unrelated keys still defaults to stdio.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[An explicitly blank MCP_TRANSPORT is treated as unset, not an error.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[Binding to 0.0.0.0 must emit a warning — exposure is never silent. The server…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[Ctrl-C is a normal shutdown and must map to the conventional 130.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[HTTP with no hostport set must default to 127.0.0.1 — never 0.0.0.0. Auth is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[Minimal FastMCP stand-in that records the run() call instead of serving.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[No env vars must mean stdio — the backward-compatibility guarantee. Every…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[Tests for ``mcp_core.runtime`` — transport selection for the connectors. These…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[The stdio path must pass transport='stdio' and no hostport kwargs. Passing…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[_FakeMCP]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[parametrize_11]] - code
- [[run()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[run()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_blank_transport_is_stdio()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_default_is_stdio_when_env_is_empty()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_http_defaults_bind_to_loopback()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_http_family_transports_are_accepted()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_http_reads_host_port_path_overrides()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_invalid_transport_is_rejected_with_a_clear_message()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_loopback_hosts_are_recognised()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_missing_transport_key_is_stdio()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_non_integer_port_is_rejected()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_out_of_range_port_is_rejected()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_path_gets_leading_slash()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_run_server_does_not_warn_on_loopback()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_run_server_http_passes_host_port_path()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_run_server_rejects_non_loopback_without_auth()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_run_server_rejects_non_loopback_without_tenant_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_run_server_stdio_calls_run_with_stdio_only()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_run_server_translates_keyboard_interrupt()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_run_server_treats_broken_pipe_as_clean_exit()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_run_server_warns_when_bound_beyond_loopback()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_runtime.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_stdio_ignores_a_bad_http_port()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py
- [[test_transport_is_case_insensitive_and_trimmed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_runtimepy
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[test_runtime.py]] - degree 26, connects to 2 communities