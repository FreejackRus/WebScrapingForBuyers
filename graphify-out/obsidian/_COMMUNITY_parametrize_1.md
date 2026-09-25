---
type: community
cohesion: 0.25
members: 8
---

# parametrize

**Cohesion:** 0.25 - loosely connected
**Members:** 8 nodes

## Members
- [[A host with a scheme, port, credentials or path must never reach the dialer.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[A typo'd port must not become a connection attempt to port 0 or 99999.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[parametrize_8]] - code
- [[test_a_malformed_host_falls_back_to_loopback()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_a_nonsense_port_falls_back_to_the_default()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_loopback_hosts_are_recognised()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_setup_hint_names_the_shell_script_elsewhere()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py
- [[test_the_valid_port_range_is_inclusive()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/parametrize
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_test_chrome_cdp.py]]

## Top bridge nodes
- [[test_a_malformed_host_falls_back_to_loopback()]] - degree 3, connects to 1 community
- [[test_a_nonsense_port_falls_back_to_the_default()]] - degree 3, connects to 1 community
- [[test_loopback_hosts_are_recognised()]] - degree 2, connects to 1 community
- [[test_setup_hint_names_the_shell_script_elsewhere()]] - degree 2, connects to 1 community
- [[test_the_valid_port_range_is_inclusive()]] - degree 2, connects to 1 community