---
type: community
cohesion: 0.12
members: 27
---

# StdioProbe

**Cohesion:** 0.12 - loosely connected
**Members:** 27 nodes

## Members
- [[dot-__enter__()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-__exit__()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-__init__()_21]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_close_pipe()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_failure()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_put_line()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_read_stderr()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_read_stdout()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-_start_readers()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-close()_1]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-initialize()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-list_tools()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-message()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-response()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-send()_4]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[dot-stderr()]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[BinaryIO]] - code
- [[Drain both pipes concurrently; only the queue read waits for a deadline. Each…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[Path_7]] - code
- [[ProbeError]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[Return the next valid JSON object, or ``None`` on EOFtimeout.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[RuntimeError_3]] - code
- [[StdioProbe]] - code - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[The child exited, timed out, or returned an invaliderror response.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/stdio_probe.py
- [[main()_10]] - code - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py
- [[measure()]] - code - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py
- [[test_early_exit_reports_stderr()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/StdioProbe
SORT file.name ASC
```

## Connections to other communities
- 12 edges to [[_COMMUNITY_test_stdio_probe.py]]
- 7 edges to [[_COMMUNITY_pathlib]]
- 4 edges to [[_COMMUNITY_mcp_wire.py]]
- 1 edge to [[_COMMUNITY_get_text_budgeted]]
- 1 edge to [[_COMMUNITY__post_json_budgeted]]
- 1 edge to [[_COMMUNITY_Headed Chrome + VNC (прогрев антибота)]]

## Top bridge nodes
- [[StdioProbe]] - degree 32, connects to 3 communities
- [[ProbeError]] - degree 15, connects to 3 communities
- [[dot-response()]] - degree 8, connects to 2 communities
- [[measure()]] - degree 5, connects to 1 community
- [[dot-message()]] - degree 4, connects to 1 community