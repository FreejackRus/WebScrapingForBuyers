---
type: community
cohesion: 0.07
members: 36
---

# MarketOffer

**Cohesion:** 0.07 - loosely connected
**Members:** 36 nodes

## Members
- [[dot-__init__()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[dot-_mirror_rouble_price_into_native()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[A blank id is unknown, not shared — merging those would lose real offers.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[Adapt ``aliexpress_search`` results (CDP tier; prices in rubles). The connector…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``avito_search`` results. Avito is classifieds no brand, no star rating…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``citilink_search`` results (CDP tier; electronics).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``dns_search`` results (CDP tier; electronics, no ratings on tiles).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``lamoda_search`` results (CDP tier; Lamoda exposes no ratings).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``megamarket_search`` results (CDP tier; rating present).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``taobao_search`` results, keeping the price in yuan. price_rub stays…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Adapt ``yandex_search`` results. ``price_rub`` is the everyday price and the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Asking for a case and getting cases is the correct answer.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[End-to-end a cheap yuan number must not outrank a dearer rouble one. 9999 ¥ is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[For rouble sources the native price is the rouble price. Filling this here…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[MarketOffer]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[OfferBatch]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Offers with native diagnostics; no shared state across concurrent sources.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[One listing must not occupy two ranking slots. A marketplace returning the same…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[One offer, normalised across marketplaces so prices are comparable.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/models_output.py
- [[Searching for refurbished and getting refurbished is the right answer.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[_search_aliexpress()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_avito()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_citilink()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_dns()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_lamoda()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_megamarket()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_taobao()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_yandex()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[currency is checked independently of price_rub, on purpose. If an adapter…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[model_validator]] - code
- [[test_a_foreign_currency_offer_cannot_be_smuggled_into_the_ranking()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_a_yuan_offer_never_becomes_cheapest()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_asking_for_a_refurbished_phone_is_not_flagged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_duplicate_listings_are_collapsed()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_offers_without_an_id_are_never_merged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_searching_for_the_accessory_itself_is_not_flagged()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/MarketOffer
SORT file.name ASC
```

## Connections to other communities
- 14 edges to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 12 edges to [[_COMMUNITY_json]]
- 3 edges to [[_COMMUNITY_compare_connectormodels_output.py]]
- 3 edges to [[_COMMUNITY_compare_prices]]
- 2 edges to [[_COMMUNITY_Fixed]]
- 2 edges to [[_COMMUNITY_ProductIdentity]]
- 1 edge to [[_COMMUNITY_Changelog]]
- 1 edge to [[_COMMUNITY_Аудит ru-marketplace-mcp v1.2.0 — независимая перепроверка]]
- 1 edge to [[_COMMUNITY__relevance_warnings]]
- 1 edge to [[_COMMUNITY_offer]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY_2.2.0 — 2026-09-11]]

## Top bridge nodes
- [[MarketOffer]] - degree 42, connects to 11 communities
- [[OfferBatch]] - degree 14, connects to 2 communities
- [[_search_taobao()]] - degree 5, connects to 2 communities
- [[_search_aliexpress()]] - degree 4, connects to 1 community
- [[_search_avito()]] - degree 4, connects to 1 community