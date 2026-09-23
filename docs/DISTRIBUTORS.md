# Источники: дистрибьюторы и маркетплейсы

Статус интеграций Price Radar. Секреты не хранить — только имена переменных.
Живой сбор: `SourceAdapter` только в `apps/search`. Демо (`demo: true`) —
только при `ALLOW_DEMO_SOURCES=true` (локально); в production compose выключено.

## Матрица

| Источник | Канал | Статус | Env / заметки |
| --- | --- | --- | --- |
| Wildberries | MCP `wb_search` (+ HTTP fallback) | **live** (антибот/429) | `MARKETPLACE_SOURCES` |
| Яндекс Маркет | MCP `yandex_search` | live / antibot | CDP VNC |
| Ozon | MCP `ozon_search` | live / Cloudflare | CDP VNC |
| DNS | MCP `dns_search` | live / Qrator | CDP VNC (публичного B2B API нет) |
| Мегамаркет | MCP `megamarket_search` | live / WAF | CDP VNC |
| Ситилинк | MCP `citilink_search` | live / Qrator | CDP VNC (публичного B2B API нет) |
| Авито | MCP `avito_search` | live / PoW 439 | CDP VNC |
| AliExpress | MCP `aliexpress_search` | **wired** / x5sec CDP | `aliexpress` in `MARKETPLACE_SOURCES` |
| Taobao | MCP `taobao_search` | **wired** / login wall + CNY | `taobao`; `CNY_RUB_RATE` |
| **OCS** | REST Partners Connector | **клиент готов** | `OCS_API_KEY` **и** `OCS_SEARCH_PATH` (оба обязательны для mount); опц. `OCS_API_URL` / `OCS_SHIPMENT_CITY` / `OCS_LOCATION` |
| **MERLION** | SOAP `mlservice3` | **клиент готов** | `MERLION_API_LOGIN` (`…\|API`), `MERLION_API_PASSWORD`, опц. `MERLION_API_TEST=true` |
| **NETLAB** | REST NLDealer | **клиент готов** | `NETLAB_API_LOGIN`, `NETLAB_API_PASSWORD`, опц. `NETLAB_CLIENT_CODE`, `NETLAB_API_URL` |
| Servermall | stub | нет публичного API | `SERVERMALL_API_TOKEN` + запрос менеджеру |
| Онлайнтрейд | stub | нет публичного API | `ONLINETRADE_API_TOKEN` |
| Регард | stub | нет публичного API | `REGARD_API_TOKEN` |
| Хардпрайс | stub | нет публичного API | `HARDPRICE_API_TOKEN` |
| СРВТрейд | stub | нет публичного API | `SRVTRADE_API_TOKEN` |
| ТоргPC | stub | нет публичного API | `TORGPC_API_TOKEN` |
| Demo marketplaces | `DemoSourceAdapter` | local-only | `ALLOW_DEMO_SOURCES=true` |

Дистрибьюторы монтируются только если перечислены в `DISTRIBUTOR_SOURCES`
**и** все required env заполнены. Иначе в collect path их нет (тишина, не
фейковые цены).

Код:

- `apps/search/src/infrastructure/sources/merlion-client.ts`
- `apps/search/src/infrastructure/sources/ocs-client.ts`
- `apps/search/src/infrastructure/sources/netlab-client.ts`
- `apps/search/src/infrastructure/sources/b2b-distributor-adapter.ts`

## Как получить доступ

### MERLION (готово к включению)

1. Партнёрский B2B: [merlion.com/partners/api](https://merlion.com/partners/api/)
2. Письмо `api@merlion.ru` или тикет в ЛК B2B → логин вида `КОД|API` + пароль.
3. WSDL: `https://api.merlion.com/rl/mlservice3?wsdl`  
   тест: `https://apitest.merlion.com/rl/mlservice3?wsdl`
4. Auth: HTTPS Basic. Операции поиска/цен: `getShipmentMethods` →
   `getShipmentDates` → `getItems` → `getItemsAvail` (цена `PriceClientRUB`).
5. Лимиты (из партнёрских FAQ): каталог 1/с, товары 3/с, справочники отгрузки 1/мин.
6. Env:

```bash
DISTRIBUTOR_SOURCES=merlion
MERLION_API_LOGIN='BRT12345|API'
MERLION_API_PASSWORD='…'
# MERLION_API_TEST=true   # apitest host
# MERLION_API_URL=https://api.merlion.com/rl/mlservice3
```

Клиент ищет по `mpn` / `model` как `item_id` (артикул MERLION или vendor part,
если дистрибьютор так резолвит). Полнотекстового поиска в SOAP нет —
для широкого каталога позже нужен офлайн-индекс `getItems` по категориям.

### OCS (ключ + path из OpenAPI)

1. Документация: [testconnector.b2b.ocs.ru/docs](https://testconnector.b2b.ocs.ru/docs/index.html)
2. Прод-хост: `https://connector.b2b.ocs.ru`
3. Запрос ключа: `api@ocs.ru` / менеджер; часто нужен allowlist IP сервера.
4. Заголовок: `X-API-Key`. Лимит ~200 req/h (интеграторы 1С).
5. Публичный swagger без ключа не отдаётся — после выдачи ключа открыть
   interactive docs и скопировать path поиска каталога в `OCS_SEARCH_PATH`
   (должен начинаться с `/`).
6. Для цен/остатков в B2B обычно нужны город отгрузки и локация:

```bash
DISTRIBUTOR_SOURCES=ocs
OCS_API_KEY='…'
OCS_API_URL=https://connector.b2b.ocs.ru   # или testconnector…
OCS_SEARCH_PATH=/v2/catalog/products        # уточнить в OpenAPI партнёра
OCS_SHIPMENT_CITY=Москва
OCS_LOCATION=МСК
```

### NETLAB (готово к включению)

1. Страница: [netlab.ru/partnyeram/servisy-b2b-i-api](https://www.netlab.ru/partnyeram/servisy-b2b-i-api/)
2. PDF: [how_to_start](https://www.netlab.ru/nldealer/docs/web_services_netlab_how_to_start.pdf),
   [technical](https://www.netlab.ru/nldealer/docs/web_services_netlab_documentation_1.0.pdf)
3. В NLDealer создать **отдельную** учётку с правом web-services (не логин кабинета).
4. REST:
   - токен: `GET http://services.netlab.ru/rest/authentication/token.json?username=&password=`
   - поиск: `GET …/rest/catalogsZip/getGoodsSearch/{brand:model:mpn}.json?oauth_token=`
   - цены по id: `…/goodsByUid/{id}.json?oauth_token=`
5. Альтернатива без поиска — XML/XLSX прайсы раз в 1–2 ч:
   `http://www.netlab.ru/products/pricexml.zip`, `dealerd.zip` (не wired в live search).
6. Env:

```bash
DISTRIBUTOR_SOURCES=netlab
NETLAB_API_LOGIN='…'
NETLAB_API_PASSWORD='…'
# NETLAB_CLIENT_CODE=категория_цены_или_склад   # только метка в priceCondition
# NETLAB_API_URL=http://services.netlab.ru
```

### DNS / Ситилинк / остальные витрины

Публичного партнёрского API каталога **не найдено**. Остаются через
`ru-marketplace-mcp` + headed Chrome (Qrator). Не подключать scrape как «B2B API».

### Servermall / Онлайнтрейд / Регард / Хардпрайс / СРВТрейд / ТоргPC

Публичной стабильной API-документации нет. Следующий шаг — письмо менеджеру
на партнёрский прайс/EDI/API; токены уже зарезервированы в env/compose.
Пока stub честно падает с текстом «partner access».

## Compose

`docker-compose.production.yml` → сервис `search`:

- `ALLOW_DEMO_SOURCES=false`
- `DISTRIBUTOR_SOURCES` + все B2B ключи из `.env.production`
- Chrome headed **не** пересоздавать при выкладке search

## Включение на проде (чеклист)

1. Получить ключи MERLION / OCS / NETLAB.
2. Прописать в `.env.production` (не в git).
3. `DISTRIBUTOR_SOURCES=ocs,merlion,netlab` (что готово).
4. Для OCS — обязательно `OCS_SEARCH_PATH` из их OpenAPI.
5. `docker compose -f docker-compose.production.yml up -d --no-deps --build search`
6. Проверить поиск по известному артикулу; в таблице `demo: false`, seller MERLION/OCS/NETLAB.

## Следующие шаги

1. После выдачи OCS OpenAPI — зафиксировать точный `OCS_SEARCH_PATH` в этом файле.
2. MERLION: при необходимости офлайн-индекс `getCatalog`/`getItems` для полнотекста.
3. NETLAB: при необходимости явный выбор склада/колонки цены через `NETLAB_CLIENT_CODE`.
4. Не включать `ALLOW_DEMO_SOURCES` на проде.
