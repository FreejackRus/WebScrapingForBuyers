---
type: community
cohesion: 0.38
members: 10
---

# cdp-proxy.py

**Cohesion:** 0.38 - loosely connected
**Members:** 10 nodes

## Members
- [[Expose Chrome DevTools on 0.0.0.0 and rewrite advertised websocket hosts.]] - rationale - deploy/chrome/cdp-proxy.py
- [[cdp-proxy.py]] - code - deploy/chrome/cdp-proxy.py
- [[handle_client()]] - code - deploy/chrome/cdp-proxy.py
- [[main()_6]] - code - deploy/chrome/cdp-proxy.py
- [[pipe()]] - code - deploy/chrome/cdp-proxy.py
- [[read_headers()]] - code - deploy/chrome/cdp-proxy.py
- [[rewrite_payload()]] - code - deploy/chrome/cdp-proxy.py
- [[socket]] - code
- [[split_http()]] - code - deploy/chrome/cdp-proxy.py
- [[threading]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/cdp-proxypy
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_test_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[socket]] - degree 6, connects to 2 communities
- [[cdp-proxy.py]] - degree 10, connects to 1 community
- [[threading]] - degree 2, connects to 1 community