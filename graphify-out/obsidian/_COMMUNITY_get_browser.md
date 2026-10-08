---
type: community
cohesion: 0.09
members: 25
---

# get_browser

**Cohesion:** 0.09 - loosely connected
**Members:** 25 nodes

## Members
- [[3. Browser-резильентность для MCP (пулы вкладок, ownership, fan-out)]] - document - mcp-servers/ru-marketplace-mcp/work/v23-research/external-approaches.md
- [[Browser]] - code
- [[BrowserContext]] - code
- [[Connect to the operator's Chrome over CDP, auto-starting it if needed.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[Hide scraping-profile Chrome windows (Windows and macOS, best-effort). Only…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[Make sure Chrome is listening on the CDP endpoint, auto-starting if needed.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[Open a tab in ``ctx`` — in the background when stealth is on.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[Open a tab over raw CDP, mirroring open_page's guarantees.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[PIDs of Chrome processes bound to our scraping profile (Windows, macOS). Any…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[Page]] - code
- [[Quick TCP probe is something already listening on the CDP endpoint]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[S3 — final-host redirect  browser SSRF boundary]] - document - mcp-servers/ru-marketplace-mcp/work/v2-research/security.md
- [[The browser websocket URL, rewritten to the host we actually dial.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[Yield the profile's default context, cookies and all.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[_browser_ws_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[_cdp_port_open()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[_ensure_cdp_running()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[_hide_chrome_windows()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[_new_tab()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[_playwright_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[_raw_cdp_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[_scraping_profile_pids()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[callback()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[get_browser()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[get_context()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/get_browser
SORT file.name ASC
```

## Connections to other communities
- 11 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 2 edges to [[_COMMUNITY__RawCdpPage]]
- 2 edges to [[_COMMUNITY_avito_connectorserver.py]]
- 2 edges to [[_COMMUNITY_open_page]]
- 1 edge to [[_COMMUNITY_taobao_connectorserver.py]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_Внешние подходы native vision, challenge UX, browser-резильентность]]
- 1 edge to [[_COMMUNITY_v2.0.0 Security  privacy research]]

## Top bridge nodes
- [[get_browser()]] - degree 9, connects to 4 communities
- [[_raw_cdp_page()]] - degree 8, connects to 4 communities
- [[_playwright_page()]] - degree 8, connects to 3 communities
- [[get_context()]] - degree 7, connects to 3 communities
- [[_cdp_port_open()]] - degree 5, connects to 2 communities