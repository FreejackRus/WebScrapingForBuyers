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
| **OCS** | REST Partners Connector | **клиент готов** | `OCS_API_KEY` **и** `OCS_SEARCH_PATH` (оба обязательны для mount); опц. `OCS_API_URL` / `OCS_SHIPMENT_CITY` / `OCS_LOCATION` |
| **MERLION** | SOAP `mlservice3` | **клиент готов** | `MERLION_API_LOGIN` (`…\|API`), `MERLION_API_PASSWORD`, опц. `MERLION_API_TEST=true` |
| **NETLAB** | REST NLDealer | **клиент готов** | `NETLAB_API_LOGIN`, `NETLAB_API_PASSWORD`, опц. `NETLAB_CLIENT_CODE`, `NETLAB_API_URL` |
| **Treolan** | SOAP B2B (`ws/service.asmx`) | документирован, клиент не wired | партнёрский логин; `b2b-info@treolan.ru` (не публичный анонимный API) |
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

### TREOLAN (SOAP есть, клиент не wired)

Широкопрофильный ИТ-дистрибьютор (серверы, СХД, ПК, сеть, ПО, ИБ). Юрлицо
в открытых источниках — ООО «Ланит Трейдинг»; бренд Treolan с 2010
(департамент дистрибуции ЛАНИТ). **Группа ЛАНИТ / Ланит-Холдинг, не Merlion.**
~150 вендоров, ~3500 партнёров РФ/СНГ. Офисы: Москва, Екатеринбург,
Новосибирск, Самара. Склад: Котельники, Яничкин пр. 6. Конечным
заказчикам не продают.

Публичный сайт [treolan.ru](https://www.treolan.ru) — новости, вендоры
([/vendor](https://www.treolan.ru/vendor)), дерево каталога
([/catalog](https://www.treolan.ru/catalog)). Дилерские цены и остатки
там нет: «действующая цена отображена в системе b2b», в у.е. (USD) на
условиях «склад Треолан, Москва». Кабинет
[b2b.treolan.ru](https://b2b.treolan.ru/) — логин/пароль. Новый партнёр:
`newpartner@treolan.ru`. Полные прайс-листы в B2B есть, но портал сам
пишет, что они не онлайн (исключение из realtime).

`robots.txt` маркетингового сайта открыт (`User-agent: *` + sitemap;
`sitemap.xml` на проверке отдавал 500). Скрейп витрины бессмысленен:
закупочных цен нет. Ломать кабинет без договора не надо.

Официальный партнёрский SOAP (WSDL без ключа открывается, вызовы —
только с логином партнёра):

1. Страница: [b2b.treolan.ru/info/325/api](https://b2b.treolan.ru/info/325/api)
2. PDF v1.42: [Веб-сервисы v1.x](https://static.treolan.ru/files/api/%D0%92%D0%B5%D0%B1-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B%20v1.42.pdf)
3. Заявка: `b2b-info@treolan.ru` (нужен уже партнёрский договор).
4. WSDL prod: `https://api.treolan.ru/ws/service.asmx?wsdl`  
   тест: `https://demo-api.treolan.ru/ws/service.asmx?wsdl`  
   legacy help: `https://api.treolan.ru/webservice2008/Service.asmx`
5. Auth: логин/пароль **в параметрах SOAP**, не HTTP Basic (не как MERLION).
6. Поиск/цены для Radar: `GetCategories` → `GenCatalogV2` (keywords /
   articul / name, `criterion` 0|1|2, `vendorid`) → при необходимости
   `ProductInfoV2(Articul)`. В XML: `@articul`, `@name`, `@vendor`,
   `@price` / `@dprice`, `@currency`, склад `@freenom`, транзит
   `@freeptrans`, GTIN. Заказы/счета/накладные в WSDL есть — в collect
   не нужны.
7. Анонимного REST/YML/EDI-фида нет. Сторонние 1С-коннекторы бьют тот же SOAP.

Рекомендуемый путь: **партнёрский SOAP** (как MERLION), не витрина CDP
и не капча. Пока нет договора — файл из кабинета (XLSX прайс, не realtime)
по письму менеджеру. Env не резервировать в compose, пока нет учётки:
клиент в `apps/search` не писать без live-логина.

Пересечение каталога с MERLION / OCS / 3Logic / Marvel ожидаемо
(широкий ИТ-опт). Хардпрайс — сравниватель, не поставщик; Treolan
ему не дубль.

### DNS / Ситилинк / остальные витрины

Публичного партнёрского API каталога **не найдено**. Остаются через
`ru-marketplace-mcp` + headed Chrome (Qrator). Не подключать scrape как «B2B API».

### Servermall / Онлайнтрейд / Регард / Хардпрайс / СРВТрейд / ТоргPC

Повторная проверка 2026-09-24: **публичного каталожного API нет**.
В коде это `B2bDistributorStubAdapter` — источник монтируется только с
токеном в env и сразу бросает hint, без фейковых цен.

| Источник | Что есть | Чего нет |
| --- | --- | --- |
| **Servermall** | Витрина `servermall.ru/catalog`, datasheet, партнёрские спеццены через менеджера (`info@servermall.ru`). Сайт сам пишет: цены уточнять у менеджеров, не оферта. | REST/SOAP/YML |
| **Онлайнтрейд** | Розничный каталог `onlinetrade.ru`. `robots.txt` закрывает `/search.html`, `/ajax.php`, пагинацию `?page=`. Сторонние парсеры есть; официального API нет. | Partner OpenAPI |
| **Регард** | Розница `regard.ru`. Есть сторонние мониторы каталога, не партнёрский канал. Контакт `sales@regard.ru`. | B2B API / YML |
| **Хардпрайс** | Это **сравниватель цен**, не дистрибьютор. Цены из выгрузок магазинов-партнёров; своего каталога поставки нет. `partners@hardprice.ru`. | Не B2B-источник |
| **СРВТрейд** | `srv-trade.ru/catalog` — «скачать прайс-лист» + менеджеры (`sale@srv-trade.ru`). Прайс по запросу, не URL API. | Документированный API |
| **ТоргPC** | Розница `torg-pc.ru`, опт `opt@torg-pc.ru` / `info@torg-pc.ru`. | API / фид |

Не путать с Inline i2b (`inline-online.ru`) — это другой поставщик с XML API.

## Если API так и не выдадут — как собирать

Приоритет тот же, что у живых B2B: **официальный файл важнее скрейпа**.

1. **Партнёрский фид (предпочтительно).** Письмо менеджеру: XLSX/CSV/YML
   раз в 1–2 ч, колонки MPN / бренд / цена / склад / URL. Адаптер:
   качать по `HTTPS` + basic/token, индексировать по `mpn` и
   `brand+model`, отдавать `Offer` с `demo: false`. Тот же паттерн, что
   офлайн-прайс NETLAB (`pricexml.zip`), только live search бьёт индекс,
   а не SOAP. Env уже зарезервированы (`SERVERMALL_API_TOKEN` и т.д.) —
   токен тогда = URL фида или basic, не «магический REST».
2. **Витрина через headed Chrome (запас).** Новый `SourceAdapter` в
   `apps/search`, не второй MCP и не Apify. Query = title / brand+model /
   MPN, как Citilink. Тот же профиль `chrome-headed` + VNC. Онлайнтрейд
   и Регард — розничные цены, не закупочные; помечать
   `priceCondition: «витрина, не B2B»`. Не ходить в URL из `robots.txt`
   disallow (у Онлайнтрейда это поиск и ajax).
3. **Не делать.** Хардпрайс как источник (дубль чужих витрин).
   Платные каталог-парсеры. Ломать логин B2B-кабинета без договора.

Порядок внедрения, если решите кодить: СРВТрейд (прайс по письму) →
Онлайнтрейд/Регард (витрина CDP, один адаптер на шаблон поиска) →
Servermall/ТоргPC (менеджер или витрина) → Хардпрайс не подключать.

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
5. Treolan: после договора и логина SOAP — клиент `GenCatalogV2` /
   `ProductInfoV2`; до этого только файл из B2B, не скрейп treolan.ru.
