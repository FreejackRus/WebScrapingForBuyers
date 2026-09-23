---
type: community
cohesion: 0.09
members: 33
---

# Community 47

**Cohesion:** 0.09 - loosely connected
**Members:** 33 nodes

## Members
- [[A real date string, when Avito sends one, wins over the epoch field.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[Any_19]] - code
- [[Best-effort extraction of items + total from a jsitems payload. The endpoint…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[Contract tests against a REAL ``jsitems`` response.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[If upstream ever switches to seconds, do not land in 1970 or the year 57000.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[Items 1 and 3 have ``location null`` and ``addressDetailed.locationName ``.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[Publication time as an ISO-8601 string, or an honest None. The live payload…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[Regression for the ``uriPath``  ``urlPath`` alias miss. A search result with…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[The original bug one nested field took down the entire page of listings.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[There is no top-level ``price`` key in the live response.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[These rows carry no seller object — only ``userLogo``. Reporting None is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[_items()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[_parse_search_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[_payload()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[_posted_at()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py
- [[``location`` is an object upstream; the wire field is a string.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[``sortTimeStamp`` is epoch ms; a 13-digit number is indistinguishable from an…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[``str(dict)`` would pass validation and show the user Python syntax. Worse than…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[json.loads admits InfinityNaN and arbitrary-precision ints, so a poisoned…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_a_place_name_is_never_a_python_repr()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_absent_seller_stays_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_every_item_has_a_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_live_payload_contract.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_live_payload_validates_at_all()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_location_object_becomes_a_place_name()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_missing_place_name_is_none_not_invented()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_handles_a_seconds_based_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_is_iso_not_a_bare_epoch()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_never_raises_on_non_finite_or_huge_stamps()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_prefers_an_explicit_string()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_posted_at_refuses_junk()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_price_comes_from_price_detailed_value()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py
- [[test_total_count_is_read_from_the_envelope()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_live_payload_contract.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_47
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_Community 10]]
- 2 edges to [[_COMMUNITY_Community 147]]
- 1 edge to [[_COMMUNITY_Community 179]]
- 1 edge to [[_COMMUNITY_Community 82]]
- 1 edge to [[_COMMUNITY_Community 74]]

## Top bridge nodes
- [[test_live_payload_contract.py]] - degree 20, connects to 3 communities
- [[_parse_search_items()]] - degree 12, connects to 3 communities
- [[_items()_2]] - degree 12, connects to 1 community
- [[_posted_at()]] - degree 9, connects to 1 community