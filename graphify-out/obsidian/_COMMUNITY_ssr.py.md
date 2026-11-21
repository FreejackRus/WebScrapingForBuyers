---
type: community
cohesion: 0.16
members: 25
---

# ssr.py

**Cohesion:** 0.16 - loosely connected
**Members:** 25 nodes

## Members
- [[Extract product data from Yandex Market's server-rendered state. Yandex Market…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[Extract the reviews embedded in a product page's state. Only the first ~13…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[First dict value in a collection, or an empty dict. Card collections are keyed…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[Outcomes a parse can have, kept explicit so callers can branch on them.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[Parse a product page into a card, its rating breakdown and its reviews. Three…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[ParseStatus]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[Return ``value`` when it is a dict, else an empty dict. SSR fields drift…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[The productId echoed by pageParams on a product frame, if present.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[True when the page is a product frame carrying no product at all. Live-verified…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[True when the page is an actual captcha challenge, not a normal page.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_as_dict()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_empty_product_shell()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_first_dict()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_iter_ldjson()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_rating_from_snippets()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_shell_product_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_stars_from_distribution()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_stars_from_stats()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[_to_int()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[ldjson_product()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[looks_like_captcha()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[parse_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[parse_reviews()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[schema.org ``Product`` from a card page, used as a degraded fallback. Carries…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py
- [[ssr.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/ssr.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/ssrpy
SORT file.name ASC
```

## Connections to other communities
- 34 edges to [[_COMMUNITY_Any]]
- 6 edges to [[_COMMUNITY_merge_card_collections]]
- 5 edges to [[_COMMUNITY_json]]
- 3 edges to [[_COMMUNITY_zone_snippets]]
- 2 edges to [[_COMMUNITY_yandex_card]]
- 1 edge to [[_COMMUNITY_Fixed]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY_wb-connectorteststest_parser_live.py]]

## Top bridge nodes
- [[ssr.py]] - degree 40, connects to 6 communities
- [[parse_card()]] - degree 17, connects to 3 communities
- [[_as_dict()]] - degree 13, connects to 2 communities
- [[_to_int()]] - degree 11, connects to 2 communities
- [[looks_like_captcha()]] - degree 5, connects to 2 communities