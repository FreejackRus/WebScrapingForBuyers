---
type: community
cohesion: 0.15
members: 21
---

# test_live_payload_contract.py

**Cohesion:** 0.15 - loosely connected
**Members:** 21 nodes

## Members
- [[Contract tests against a REAL ``jsitems`` response.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[Items 1 and 3 have ``location null`` and ``addressDetailed.locationName ``.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[Regression for the ``uriPath``  ``urlPath`` alias miss. A search result with…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[The original bug one nested field took down the entire page of listings.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[There is no top-level ``price`` key in the live response.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[These rows carry no seller object — only ``userLogo``. Reporting None is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[_items()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[_payload()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[``location`` is an object upstream; the wire field is a string.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[``sortTimeStamp`` is epoch ms; a 13-digit number is indistinguishable from an…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[``str(dict)`` would pass validation and show the user Python syntax. Worse than…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_a_place_name_is_never_a_python_repr()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_absent_seller_stays_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_every_item_has_a_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_live_payload_contract.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_live_payload_validates_at_all()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_location_object_becomes_a_place_name()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_missing_place_name_is_none_not_invented()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_is_iso_not_a_bare_epoch()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_price_comes_from_price_detailed_value()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_total_count_is_read_from_the_envelope()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_live_payload_contractpy
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY__parse_search_items]]
- 2 edges to [[_COMMUNITY_models.py]]
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[test_live_payload_contract.py]] - degree 20, connects to 4 communities
- [[_items()_2]] - degree 12, connects to 2 communities
- [[test_total_count_is_read_from_the_envelope()]] - degree 3, connects to 1 community