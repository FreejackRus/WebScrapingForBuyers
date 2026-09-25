---
type: community
cohesion: 0.23
members: 12
---

# _parse_product

**Cohesion:** 0.23 - loosely connected
**Members:** 12 nodes

## Members
- [[Any_10]] - code
- [[Flatten one raw API product into the connector's output shape.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[Pull a rouble amount out of the several shapes prices arrive in. Upstream uses…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[Return ``value`` when it is a dict, else an empty dict. Upstream fields drift…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[Return ``value`` when it is a list, else an empty list.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[Unwrap the card payload, which nests the product under ``item``.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_as_dict()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_as_list()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_first_brand()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_parse_product()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_price_from()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_product_node()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_parse_product
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_detmir_categories]]
- 6 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_detmir_connectormodels_output.py]]

## Top bridge nodes
- [[_parse_product()]] - degree 10, connects to 3 communities
- [[_as_dict()]] - degree 6, connects to 2 communities
- [[_as_list()]] - degree 6, connects to 2 communities
- [[_product_node()]] - degree 4, connects to 2 communities
- [[Any_10]] - degree 8, connects to 1 community