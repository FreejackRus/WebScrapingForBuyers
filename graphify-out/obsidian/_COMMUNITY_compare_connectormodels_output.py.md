---
type: community
cohesion: 0.25
members: 9
---

# compare_connector/models_output.py

**Cohesion:** 0.25 - loosely connected
**Members:** 9 nodes

## Members
- [[A ranked cross-marketplace price comparison with per-source provenance.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[BaseModel_11]] - code
- [[CompareResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[Query one marketplace, converting any failure into a reported outcome. Never…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[SourceOutcome]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[Typed responses for cross-marketplace comparison. The schema is built around…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[What happened when one marketplace was queried. Reported for every source,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[_run_source()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[compare_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/compare_connector/models_outputpy
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_json]]
- 3 edges to [[_COMMUNITY_MarketOffer]]
- 3 edges to [[_COMMUNITY_compare_prices]]
- 3 edges to [[_COMMUNITY_ProductIdentity]]
- 2 edges to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]

## Top bridge nodes
- [[compare_connectormodels_output.py]] - degree 10, connects to 4 communities
- [[_run_source()]] - degree 7, connects to 4 communities
- [[SourceOutcome]] - degree 6, connects to 2 communities
- [[CompareResponse]] - degree 5, connects to 2 communities
- [[BaseModel_11]] - degree 3, connects to 1 community