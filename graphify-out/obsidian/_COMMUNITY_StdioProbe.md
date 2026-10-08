---
type: community
cohesion: 0.09
members: 35
---

# StdioProbe

**Cohesion:** 0.09 - loosely connected
**Members:** 35 nodes

## Members
- [[dot-__enter__()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-__exit__()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-__init__()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_close_pipe()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_failure()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_put_line()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_read_stderr()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_read_stdout()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_start_readers()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-close()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-initialize()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-list_tools()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-message()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-response()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-send()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-stderr()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[BinaryIO]] - code
- [[Drain both pipes concurrently; only the queue read waits for a deadline. Each…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[Measure stdio startup initialize + toolslist latency for MCP servers. This is…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py
- [[Path]] - code
- [[ProbeError]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[Return the next valid JSON object, or ``None`` on EOFtimeout.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[RuntimeError]] - code
- [[Small stdlib-only JSON-RPC transport for bounded command-line probes.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[StdioProbe]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[The child exited, timed out, or returned an invaliderror response.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[argparse]] - concept
- [[collections_1]] - concept
- [[main()]] - code - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py
- [[mcp_startup.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py
- [[measure()]] - code - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py
- [[queue]] - concept
- [[stdio_probe.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[test_early_exit_reports_stderr()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py
- [[threading]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/StdioProbe
SORT file.name ASC
```

## Connections to other communities
- 16 edges to [[_COMMUNITY_test_stdio_probe.py]]
- 7 edges to [[_COMMUNITY_mcp_wire.py]]
- 6 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_sys]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_get_text_budgeted]]
- 1 edge to [[_COMMUNITY_process.py]]
- 1 edge to [[_COMMUNITY_subprocess]]
- 1 edge to [[_COMMUNITY_cdp-proxy.py]]
- 1 edge to [[_COMMUNITY_diagnose_drift.py]]
- 1 edge to [[_COMMUNITY_model_routing_eval.py]]

## Top bridge nodes
- [[stdio_probe.py]] - degree 18, connects to 7 communities
- [[mcp_startup.py]] - degree 11, connects to 4 communities
- [[argparse]] - degree 5, connects to 3 communities
- [[StdioProbe]] - degree 32, connects to 2 communities
- [[ProbeError]] - degree 15, connects to 2 communities