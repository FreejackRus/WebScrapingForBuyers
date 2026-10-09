# Контекст проекта ПЕРЕМЕНА Price Radar

Живой журнал итераций. Обновлять после каждой заметной поставки.
Не хранить пароли, токены и содержимое `.env*`.

## Продукт

Внутренний сервис отдела закупок ГК «Перемена» (Воронеж): уточнение модели,
сбор публичных предложений, сравнение, локальный AI-анализ, Excel.

Роли:

- **manager** — поиск, таблица, AI-копайлот, экспорт, личные настройки.
  Коннекторы, `source.message`, IP, SSH и VNC не видит.
- **admin** — то же плюс конвейер источников, статусы и VNC/ssh в
  `source.message`. Прогрев антибота — VNC, не ссылки на витрину в UI.

## Стек

TypeScript-монорепозиторий: `apps/web` (MSD), `apps/gateway`, `apps/identity`,
`apps/search`, `apps/analysis`, `packages/contracts`, `packages/service-kit`.
Источники — `SourceAdapter` только в search. Демо-цены всегда `demo: true`.
Ранжирование по цене детерминированное; релевантность наименования может
уточнять локальная LLM (отсев ID). Объяснение — через Ollama.

## Дизайн

- Stitch-проект `projects/3120249908671992679`.
- DS PEREMENA Digital: `assets/15671525545677379912`, seed `#2569ED`.
- Актуальный desktop: `9a70cf57395b4e5492f1872e167a3fd7`
  («Рабочее место с боковым чатом»). Предыдущий Enterprise:
  `890cda6847ae4327afa807ea830f0231`.
- Вход: `1d4f58b518d54b649cdee88e9c93d02f`. Мобильный менеджер:
  `d028549d8cbe41678a6b44ae609d7d4a`.
- Официальный знак: графический вордмарк
  `screens/6059391154288979469`, не наборные буквы. Правила: `docs/BRAND.md`.
- Снимки: `docs/stitch-screens/`. Токены: `docs/STITCH.md`.

## Сервер

- Хост и реквизиты только в локальном `.env.server`.
- URL развёрнутого экземпляра хранится вне публичного репозитория.
- Каталог на сервере: `/projects/WebScrapingForBuyers`.

## Итерации

### 2026-09-23 — каркас MVP и Stitch

TypeScript-монорепозиторий, SSE-поиск, демо-источники, MCP/Apify fallback
(выключен), локальная Qwen3, первый Stitch-макет, публикация `/price-radar/`.

### 2026-09-23 — роли, авторизация, Enterprise UI

Вход, настройки, роли manager/admin, AI-копайлот. Официальный логотип
ПЕРЕМЕНА в шапке.

### 2026-09-23 — палитра через Stitch

Создана DS `assets/15671525545677379912` (PEREMENA Digital, seed `#2569ED`).
Новые экраны собраны в Stitch с этой системой: Enterprise, вход, мобильный
менеджер. UI собран с этих макетов, не локальной подменой старого emerald.

### 2026-09-23 — официальный знак вместо наборных букв

В Stitch загружен графический вордмарк `6059391154288979469`. Брендбук
запрещает набирать «ПЕРЕМЕНА» шрифтом и квадрат с «П». В шапке и на входе
стоит `logo-peremena.svg`.

### 2026-09-23 — проверка Stitch и выкладка

Макеты Enterprise, вход, мобильный и настройки сверены: палитра Digital,
знак картинкой, копайлот на `#EAF2FF`. SSO, каталог MPN и 44-ФЗ из макета
не реализованы — в продукте нет этих контуров. Обновление выложено на
`/price-radar/`.

### 2026-09-23 — MSD и микросервисы

Фронт переложен на Modular Sliced Design: `app`, `pages`, `widgets`, `features`,
`entities` без UI, `composition`, `shared`. Настройки — отдельная страница.
Бэкенд разрезан на gateway / identity / search / analysis. Публичный `/api/v1`
не менялся. К MCP добавлены megamarket, citilink, avito; для WB есть HTTP-запас.
Яндекс/Ozon/DNS по-прежнему упираются в captcha/Qrator/Cloudflare без прогретой
CDP-сессии.

### 2026-09-23 — MSD по статье СберТеха

Фронт выровнен со статьёй Хабра: слайсы `модуль/действие/ui`, pages собирают
только виджеты, entities без UI, composition держит шеллы и хуки первого
рендера. Описание слоёв — `docs/MSD.md`.

### 2026-09-23 — прод с микросервисами

Код выложен в `/projects/WebScrapingForBuyers`. Compose пересобран: gateway,
identity, search, analysis, web, marketplace-mcp. Старый контейнер `api`
снят. Health: hybrid + Ollama Qwen3. URL хранится вне публичного репозитория.

### 2026-09-23 — белый экран React #185

На проде падал вход: селекторы Zustand `?? []` и подписка на весь стор давали
новый снимок на каждый рендер. Хуки входа и таблицы переведены на стабильные
ссылки. Предупреждение про пароль на HTTP остаётся: контур пока без TLS.

### 2026-09-23 — карточки уточнения модели

На первом поиске бренд/категория и модель слипались (`МышиG102`): в
`.model-card` `span` и `b` были inline, JSX-пробел между ними схлопывался.
Карточка теперь колонка с gap; `span`/`b` блочные. Коннекторы и summary
чипов не менялись.

### 2026-09-23 — MCP search kwargs

Адаптер слал всем `*_search` одно и то же: `query`, `dest`, `limit`, `page`.
Схемы ru-marketplace-mcp 2.4.2 это отвергают (`unexpected_keyword_argument`).
Теперь аргументы по инструменту: WB `query,dest,page`; Yandex `query,page,limit`;
Ozon `query,page`; DNS/Мегамаркет/Ситилинк только `query`; Avito `query,page`.
Демо-источники не подменялись. Выложено: search пересобран, `.env.production`
не трогали. WB отдал живые офферы; pydantic kwargs больше нет.

### 2026-09-23 — склейка Условия и Совпадение в таблице

В таблице предложений `span` + `small` в ячейках «Условия» и «Совпадение»
были inline: `4 дн., стоимость уточняется12 месяцев`, `ТочноеНовый товар`.
Теперь стек `offer-conditions` / `offer-match` (колонка + gap). Карточки
уточнения модели не трогались. Выложено: только web.

### 2026-09-23 — ошибки магазинов: антибот, не kwargs

Прод: Chrome CDP 9222 жив (HeadlessChrome/124). MCP 2.4.2 получает верные
аргументы (WB dest/page, Yandex page/limit, остальные по схеме). WB живой.
Яндекс 302, Ozon 403 Cloudflare, DNS 401 Qrator, Ситилинк 429 Qrator, Avito
IP/captcha, Мегамаркет ServicePipe + «Execution context was destroyed» —
это блоки площадок, не баг адаптера. `megamarket_search` только `query`,
флага retry нет; MCP сам ретраит Yandex 302 и запрещает ретрай HTTP 429 у WB.
Код: админу показываем честный текст (навигация антибота / message из JSON),
менеджеру `presentSnapshot` по-прежнему скрывает `source.message`. Обход
капчи/Qrator не делался. Выложено: search; `.env.production` не трогали.

### 2026-09-23 — копайлот видит живые офферы и шаги отбора

Модель объясняла только top-1 (часто дешёвое демо) без `demo`/`url` в prompt,
а «Фильтры и расчёт» были пустыми. Снимок поиска analysis по-прежнему берёт
с `GET /searches/:id` — offers не режутся. Теперь: демо исключаются из
ранжирования, если есть REAL-строки; в Ollama уходит отранжированная таблица
(source, price, demo, seller, url); `appliedFilters` всегда содержит состав
снимка, исключение демо, сортировку и top-N. Копайлот рисует эти шаги списком
и выбранные строки из таблицы. Выложено: analysis, web; `.env.production`
не трогали.

### 2026-09-23 — Citilink: отсев чужого SKU

Поиск G102 Lightsync помечал Ситилинк «Готово», но URL был холодильник
Indesit ITR 4180 W. `citilink_search` мапится через общий
`McpMarketplaceAdapter.toOffer`: title/name, url/link/product_url, match
по вхождению MPN/модели. Фильтра релевантности не было — любой priced
hit (промо/главная/чужая категория) становился оффером; пустой MPN ещё
и давал `exact` через `includes("")`. Теперь для всех MCP-источников
строка живёт только если title/mpn/url делит identity-токены бренда и
модели (logitech, g102, lightsync, артикул). Нет пересечения — drop;
только бренд — `doubtful`; product URL без токенов не оставляем как
exact/probable. Аргументы MCP и антибот Yandex/Ozon/DNS не менялись.
Демо по-прежнему `demo: true`. Выложено: search; `.env.production` не
трогали. Живой G102: Ситилинк «Готово» без оффера — URL холодильника
больше нет.

### 2026-09-23 — WB Готово без строк в таблице

`wb_search` на проде для G102 отдаёт 20 priced items (`name` + `price_rub`),
статус коннектора done. Строк не было по двум причинам: HTTP-запас ходил в
устаревший v7 (`403`) и читал только `salePriceU`/`priceU` (в v9 они null,
цена в `sizes[].price.product`); фронт после POST подменял SSE-снимок пустым
`created` и терял уже пришедшие WB-офферы. Маппер теперь берёт items из
`items`/`products`/`result`, цену из `price_rub` или sizes/kopecks; WB
catalog URL не режется Citilink-фильтром `/catalog/<id>`; у каждого
маркетплейса свой MCP-клиент; snapshot/complete сливает offers по id.
HTTP 403/429 от search.wb.ru не роняет источник после пустого MCP
(иначе done превращался в error). Демо не подменялись. Выложено:
search, web; `.env.production` не трогали.

### 2026-09-23 — WB пустая таблица и Citilink SSD

На проде `wb_search` для G102 снова отдавал 20 priced items, коннектор
«Готово», а в таблице WB не было; Ситилинк держал Kingston SSD
`…snv3s-1000g…` как «Сомнительное» 17 990 ₽ на поиске мыши. Две причины:
фильтр релевантности резал чужой SKU через `includes("3s")` (MX Master 3S
попадал в SNV3S) и не смотрел категорию, поэтому промо-карточка жила как
doubtful; WB catalog `/catalog/<id>` без модели в title мог обнулить
маппинг, после чего HTTP-запас 403 давал done с []. Теперь: токены по
границам слов; SSD/холодильник для категории «Мыши» drop; бренд из
payload участвует в haystack; priced WB не дропается только из-за URL;
в лог пишется `marketplace_map` items→mapped. Тесты: WB payload после
POST+SSE merge остаётся REAL; Kingston SSD для MX Master/G102 drop.
Демо не подменялись. `marketplaceToolArguments` и селекторы Zustand не
трогались. Выложено: search, web; `.env.production` не трогали.
Живой MX Master: `wb_search` 6→6 REAL мыши; Ситилинк error (CDP после
рестарта chrome), SSD нет. Живой G102: HTTP-запас 12 REAL WB, когда MCP
items=0.

### 2026-09-23 — боковой чат, пагинация и сортировка таблицы

Stitch desktop `9a70cf57395b4e5492f1872e167a3fd7` (PEREMENA Digital, знак
картинкой): рабочее место в две колонки, AI справа, таблица по 8 строк.
Чат ходит в существующий `POST /searches/:id/analyze`. Analysis
детерминированно ставит `intent` / `tableFilter` / `citations` с `offerId`
и URL; стор поиска применяет фильтр к таблице. Сортировка колонок —
трёхсостоятельная (asc/desc/сброс) на уже загруженных строках, затем
страница. Поиск из чата переиспользует suggest/start. Демо по-прежнему
`demo: true`. Настройки — отдельная страница. Выложено: analysis, web
(и связанные образы compose); `.env.production` не трогали.
URL хранится вне публичного репозитория.

### 2026-09-23 — puppeteer-real-browser и CDP

Изучен [ZFC-Digital/puppeteer-real-browser](https://github.com/ZFC-Digital/puppeteer-real-browser):
репозиторий помечен как unmaintained. Пакет поднимает обычный Chrome
(`chrome-launcher` + xvfb), коннектит `rebrowser-puppeteer-core` (меньше
следов `Runtime.enable`) и опционально кликает Cloudflare Turnstile.
Это не замена порта 9222 для Playwright в `ru-marketplace-mcp`: MCP уже
ходит в `CHROME_CDP_HOST:9222`. Ближе к нашему контуру — headed Chrome
+ постоянный `/profile` вместо `zenika/alpine-chrome` HeadlessChrome/124.
Qrator/Яндекс 302/Avito с DC-IP одним stealth не снимаются. Капча-солвер
не внедрялся.

### 2026-09-23 — тред Reddit про детект CDP

[Help in bypassing CDP detection](https://www.reddit.com/r/webscraping/comments/1evht3i/help_in_bypassing_cdp_detection/):
типичный совет — не Alpine Headless, а отдельно запущенный Chrome +
подключение по debug-порту; Playwright/Puppeteer палят `Runtime.enable`
(rebrowser-patches / patchright / nodriver). Сам порт 9222 у нас уже так
устроен, слабое место — HeadlessChrome в контейнере и IP сервера, не
отсутствие CDP. Обход капчи по треду не внедрялся.

### 2026-09-23 — каталог GitHub по следам CDP

Открытые варианты: rebrowser-patches / rebrowser-playwright, patchright,
nodriver/zendriver, camoufox, headed Chrome+VNC (docker-chrome-vnc),
browser-bridge. Для нашего MCP ближе headed Chrome на 9222, затем
patchright/rebrowser в образе коннектора. Капча-солверы не подключались.

### 2026-09-23 — headed Chrome вместо Alpine Headless

Сервис `chrome` больше не `zenika/alpine-chrome`. Образ
`deploy/chrome`: Google Chrome + Xvfb + x11vnc, CDP 9222, профиль
`chrome-headed`. VNC только на `127.0.0.1:5901`. Капча не
автоматизируется. MCP по-прежнему ходит на `172.29.0.10:9222`.

### 2026-09-23 — Chrome 154 биндит CDP только на 127.0.0.1

После headed-деплоя MCP не достучался до `172.29.0.10:9222`: Chrome/154
пишет `DevTools listening on ws://127.0.0.1:9222` и игнорирует
`--remote-debugging-address=0.0.0.0`. В контейнере Chrome слушает
`127.0.0.1:9221`, `cdp-proxy.py` открывает `0.0.0.0:9222` и подменяет
`webSocketDebuggerUrl` на `ws://172.29.0.10:9222`. При recreate
entrypoint снимает `SingletonLock` в `/profile`, иначе Chrome 154 не
поднимает DevTools.

### 2026-09-23 — WB-мусор в таблице мыши

На проде поиск «мышь Logitech» давал 15 строк (пагинация 1–8): живые WB
кофе/БАД/кошачий корм/носки/кроссовки с меткой «Сомнительное» плюс демо
MERLION/NETLAB/OCS. Копайлот по «выдай только вб» верно оставлял одну мышь
361 ₽ (ЛИНЗЛАБ), но таблица не менялась. Три причины: (1) HTTP-запас WB
брал первые 12 priced карточек без `assessMarketplaceOfferRelevance` и
копировал MPN мыши на чужой SKU; (2) MCP для WB при нуле токенов бренда/
модели оставлял любую карточку как weak — маркеры чужой категории покрывали
только SSD/холодильник; (3) фраза «выдай только вб» была intent=explain
(`покажи только`, не `выдай`), а `\b` в JS не видит кириллицу, поэтому
источник «вб» не парсился и `tableFilter` не ставился. Сейчас: чужая
категория без сильного identity (модель/MPN) drop; WB без бренда/модели
живёт только если title/entity той же категории (мышь/mouse); HTTP
использует тот же скорер и режет до 12 после фильтра; «выдай только» /
«только вб» — filter с `sources: Wildberries` и `realOnly`. SSE merge-by-id
и демо-ранжирование analysis не виноваты: снимок и так содержал мусор.
Демо не подменялись. Яндекс 302 / Ozon Cloudflare / DNS Qrator / headed CDP
не менялись. Прод не выкладывался — только код и тесты.

### 2026-09-23 — прод: WB-мусор и «выдай только вб»

Выложен уже готовый фильтр чужой категории WB и intent «выдай только вб»:
search и analysis пересобраны, web не трогали — `tableFilter` в текущем
образе уже был. `.env.production` не меняли. Compose по зависимости
пересоздал chrome и marketplace-mcp (профиль headed на томе). CDP снова
отвечает. Антибот Yandex/Ozon/DNS и демо-источники не менялись.

### 2026-09-23 — скилл scraping-avito vs наш MCP/Chrome

Изучен
[evgenygurin/avito-mcp-plugin `skills/scraping-avito`](https://github.com/evgenygurin/avito-mcp-plugin/blob/main/skills/scraping-avito/SKILL.md).
Движок плагина — не CDP: куки (`spfa` / `own` / `playwright`) →
rotate-until-clean по RU-прокси → `curl_cffi` impersonate → SSR JSON
`loaderData.data.catalog.items`. Капчу он сам запрещает решать
(CapSolver/2captcha «инженерно бесполезны»). Это не замена
`avito_search` в `ru-marketplace-mcp` 2.4.2: у нас tier-1 TLS +
tier-2 Playwright на headed Chrome `172.29.0.10:9222`. Дефолт скилла
`POST spfa.ru/api/cookies` и mobileproxy.space не подключались.
Ближайший ops-путь тот же, что уже выбран: VNC-прогрев `avito.ru`
в профиле `chrome-headed`, не долбить `429 cdp_blocked`, жилой RU-IP
для tier-1 (`AVITO_PROXY` уже есть в MCP, в compose не задан).
Прод не менялся.

### 2026-09-23 — Citilink Готово без строки и WB «Сомнительное»

Поиск MX Master 3S Pale Grey (MPN 910-006560): Ситилинк «Готово» без
оффера, хотя карточка есть
(`…grafitovyi-9-1933859/`, графит 910-006565, 7 980 ₽). Статус done, не
error: `citilink_search` отдал плитки или пустой map, а не Qrator.
Причины: запрос шёл как `910-006560 Logitech MX Master 3S` (Pale Grey
Citilink не держит); MCP ходил в `/search/?q=`, сайт ждёт `?text=`;
чужие/промо плитки резались скорером → 0 строк. Графит vs Pale Grey —
та же модель, drop по MPN не нужен.

WB в 17:20 ещё показывал кофе/корм/хобби/ЛИНЗЛАБ 361 ₽ как
«Сомнительное»: либо старый образ до фильтра, либо фильтр оставлял
brand-only «Мышь Logitech» и same-category без mx/master/3s. Сейчас:
Citilink ищет title → brand+model, при zero-tile ретраит, при URL без
цены зовёт `citilink_card`; MCP `?text=`; WB требует сильный identity
(logitech мало, нужны mx/master/3s/g102/MPN), seller участвует в
маркерах хобби/корм/jersey. Живую MX Master не режем. Демо `demo: true`.
Антибот Yandex 302 / Ozon 403 / DNS 401 / MM ServicePipe / Avito 429
не обходился. Выложено: search, marketplace-mcp; analysis/web не
менялись. `.env.production` не трогали.

### 2026-09-23 — исследование mickberrad659-sketch/Avito-Parser

Изучен
[mickberrad659-sketch/Avito-Parser](https://github.com/mickberrad659-sketch/Avito-Parser)
(`master` @ `2d09315`, Python/`uv`, `curl-cffi` + vendored `GeekedTest`).
Это не каталог-адаптер, а E2E-обход Avito firewallPow / QRATOR / GeeTest
против `GET /web/1/js/items` (categoryId=98, locationId=624840, 100
страниц). CDP/Playwright в основном flow нет: Camoufox только для
офлайн-проб полей QRATOR `f`/`s`. Cookies — in-memory jar одной
`curl_cffi.Session` (impersonate `firefox147`). Прокси сознательно
выключены (`trust_env=False`, pop `HTTP(S)_PROXY`). Капча решается
локально: `ddddocr` + OpenCV + `GeekedTest` (GeeTest v4 slide/gobang/icon/ai)
→ `firewallCaptcha/verify`. PoW — SHA-256 nonce по JWT. QRATOR —
синтез fingerprint `f`/`s` (XTEA) и replay `POST /web/2/ft` + pixel
`/web/1/u`. Между страницами 0,05 с.

Не копировать: солверы капчи/PoW, синтез QRATOR-fingerprint, cookie
dumps, второй Avito-парсер, платные прокси, 100-страничный XHR.
Sibling уже закрывает безопасный ops (handoff вкладки, не рестартить
Chrome, не долбить 429, VNC). Из репо сверх этого полезно только
таксономия ответов (439 PoW / 429+dispatcher / QRATOR 302) и
диагностика cookie *имён* после VNC (`buyer_location_id`, `luri`,
`sx`, `v`, `ft`) — без значений. Дельта к evgenygurin
`scraping-avito`: тот же `curl_cffi`, но скилл запрещает решать
капчу и требует RU-прокси + rotate-until-clean + SSR
`loaderData`; Avito-Parser наоборот бьёт защиту в лоб без прокси.
Прод не менялся.

### 2026-09-23 — безопасный ops: handoff, Chrome, 429

Включено `CHROME_CHALLENGE_HANDOFF_S=120` у marketplace-mcp
(имя из ru-marketplace-mcp 2.4.2 `docs/CDP_SETUP.md`; не солвер).
У search и MCP сняты `depends_on` на chrome/друг на друга:
`up --build search` больше не пересоздаёт headed-профиль.
Адаптер не крутит следующий query и не зовёт Apify-fallback
после 429 / cdp_blocked / Qrator / ServicePipe / 302 / Cloudflare;
админу в `source.message` — VNC `ssh -L 5901:127.0.0.1:5901` и хост
витрины. Entrypoint chrome по-прежнему снимает только Singleton*,
не cookies. Runbook: `docs/CHROME_VNC.md`,
`scripts/chrome-vnc-tunnel.sh`. Капча-фермы, spfa и второй Avito MCP
не добавлялись. Фильтры WB/Citilink sibling-агента не откатывались.
Выложено: compose, search, marketplace-mcp (`--no-deps`). Chrome
`e2981815053f` не пересоздавался. `.env.production` не трогали.

### 2026-09-23 — WB rate-limited: MCP + HTTP double-hit

Прод «wb rate-limited»: один collect шёл в `wb_search` (до трёх query
variants), а `FallbackSourceAdapter` сразу бил `search.wb.ru` v9 —
даже после MCP 429 (явное исключение для WB) и при пустом MCP.
HTTP 403/429 глотались как `[]` → коннектор «Готово» без статуса.
Сейчас: после MCP 429/пустого ответа HTTP не зовётся; WB не крутит
второй `wb_search`; HTTP 429/403 и cooldown 45 с дают короткий
`WB rate-limited (429). Подождите N с.` без VNC-стены. HTTP остаётся
только если MCP не сконфигурирован или упал без rate-limit
(connection refused). Citilink `?text=` / `citilink_card`, фильтры
релевантности и web/chat/connectors не трогались. Капча и прокси
не добавлялись. Выложено: только search (`--no-deps --build search`).
Chrome не пересоздавался. `.env.production` не трогали.

### 2026-09-23 — коннекторы менеджеру, чат, last-good WB

Пока любой CDP-магазин в challenge (Yandex 302, Ozon 403, DNS 401,
Мегамаркет ServicePipe, Avito 429, Ситилинк Qrator, `cdp_blocked`),
виджет коннекторов виден всем, включая менеджера: «пройти проверку»
на витрину + короткий VNC `127.0.0.1:5901`. Сырой `source.message`,
SSH и телеметрия — только админу. Без challenge виджет у менеджера
скрыт. WB catalog 429 — не challenge: короткий `WB rate-limited`,
cooldown, HTTP не долбится; если раньше были REAL по той же модели,
они остаются в таблице. Чат: пустое поле, серый placeholder внутри,
отправка, тема `#2569ED`. Фильтры Citilink/WB не откатывались.
Капча и прокси не добавлялись. Выложено: web, gateway, search
(`--no-deps`). Chrome не пересоздавался. `.env.production` не трогали.

### 2026-09-23 — ссылки «Пройти проверку» без VNC у менеджера

Менеджер при антибот-блоке видит только кликабельную ссылку на витрину
(Яндекс Маркет, Ozon, DNS, Мегамаркет, Ситилинк, Авито). После здорового
источника блок скрыт. Админ всегда видит коннекторы, статус и VNC/ssh
в `source.message`. Чат: пустое поле, серый placeholder «Спросите про
таблицу…», читаемый ввод. Менеджеру не показываются IP, compose, ssh -L
и `127.0.0.1:5901`. Капча и прокси не добавлялись. Выложено: web, gateway,
search (`--no-deps`). Chrome `e2981815053f` не пересоздавался.
`.env.production` не трогали. URL хранится вне публичного репозитория.

### 2026-09-23 — «Пройти проверку» и для админа

Та же ссылка на витрину теперь явно у администратора: список над сеткой
коннекторов и ссылка рядом с именем заблокированного CDP-магазина.
Менеджер по-прежнему видит только эти ссылки без телеметрии. VNC/ssh
остаются в admin `source.message`. Капча и прокси не добавлялись.
Выложено: только web (`--no-deps --build web`). Chrome `e2981815053f`
не пересоздавался. `.env.production` не трогали.

### 2026-09-23 — VNC с консоли Ubuntu 24.04

В `docs/CHROME_VNC.md` добавлен путь «на самом сервере»: клиент
(remmina / tigervnc-viewer / xtightvncviewer) на `127.0.0.1:5901`
к headed Chrome в Docker, не к браузеру хоста. Compose по-прежнему
публикует `127.0.0.1:5901:5900`. Ноутбук — `chrome-vnc-tunnel.sh`
или `ssh -L`. Код, compose и прод не менялись.

### 2026-09-23 — VNC с рабочего компьютера

В `docs/CHROME_VNC.md` раздел «С рабочего компьютера» сделан основным:
туннель `./scripts/chrome-vnc-tunnel.sh` (ключи из `.env.server`), VNC
на `127.0.0.1:5901`, витрины только в headed Chrome, не в локальном
браузере. «Пройти проверку» в админке — запасной клик, не прогрев.
Код и прод не менялись.

### 2026-09-23 — убрали ссылки «Пройти проверку»

Ссылки на витрину открывали локальный браузер и не грели headed Chrome
на GPU. Удалены: список менеджера, админский блок «Проверка магазина»
и per-source «Пройти проверку». Поля `challenge` / `challengeUrl` и
`cdpChallengeUrl` сняты с контракта. Менеджер снова не видит коннекторы
вообще (исходный RBAC). Админ видит полную панель и VNC/ssh в
`source.message`. Чат, WB rate-limit и релевантность Citilink/WB не
откатывались. Прогрев — `./scripts/chrome-vnc-tunnel.sh` + VNC
`127.0.0.1:5901`. Капча и прокси не добавлялись.
Выложено: web, gateway, search (`--no-deps --build`). Chrome
`e2981815053f` не пересоздавался. `.env.production` не трогали.
URL хранится вне публичного репозитория.

### 2026-09-23 — UX туннеля VNC: пустой терминал это норма

`ssh -N` после пароля молчит специально — это не зависание, а живой
форвард. Скрипт печатает «Туннель поднят… vncviewer 127.0.0.1:5901»
до блокировки SSH; добавлены `ExitOnForwardFailure`, `ServerAliveInterval`,
`ConnectTimeout`. `sshpass -e` берёт пароль из `.env.server` через
`SSHPASS` (не argv, не stdout). На сервере VNC жив:
`127.0.0.1:5901`, chrome `e2981815053f` не пересоздавался. Прод не
трогали.

### 2026-09-23 — прод после VNC: WB «Готово» без строк, Avito 439

После ручного прогрева headed Chrome (VNC с рабочего ПК) поиск
MX Master 3S Pale Grey (MPN 910-006560): 6 готово · 4 ошибки,
в таблице только DNS (сомнительное 6399–7499 ₽). WB писал «Готово»
без строк, хотя ручной поиск на WB находит MX Master 3S.

Причина WB: первый `wb_search` шёл как `910-006560 Logitech MX Master 3S`;
Pale Grey SKU на части витрин нет (урок Citilink). Живой `items=[]`
глотался как done; второй query и HTTP `search.wb.ru` сознательно
не вызывались (анти-429). Фильтр mx/master/3s здесь ни при чём —
карточек не было. Сейчас: WB ищет title, затем один retry
`Logitech MX Master 3S` без MPN; HTTP по-прежнему не долбится;
пустой живой ответ или полный drop — ошибка, не «Готово»;
`marketplace_map` пишет `dropped_titles`.

Avito `HTTP 439 via cdp` + HTML doctype — firewallPow на `js/items`,
не капча и не «Авито никогда не работает». Тот же headed Chrome уже
отдавал объявления после VNC. В MCP 2.4.2 нет отдельного флага:
`avito_search` сам открывает `avito.ru/` и делает `fetch(js/items)`
с куками профиля; `CHROME_CHALLENGE_HANDOFF_S` держит DOM-челлендж
(Lamoda/Taobao), XHR 439 вкладку обычно закрывает. Адаптер: title
без Pale Grey MPN, один повтор того же `avito_search` после 439,
потом ошибка «срыв прогретой сессии» + VNC, если есть
`handoff_expires_at`. Солвер/прокси/второй парсер нет. Яндекс 302
без окна — тихий IP-редирект, VNC в `source.message`. Мегамаркет
405 — WAF. Ozon 403 не трогали. «Пройти проверку» в коде сняты.
Коннекторы менеджеру скрыты, чат на месте. Chrome не recreate.
`.env.production` не трогали.
Выложено: search, web (`--no-deps --build`). Chrome `e2981815053f`
не пересоздавался. MCP и gateway не трогали.

### 2026-09-23 — K380: WB «28 отсеяны» и Avito 2 строки

Поиск клавиатуры K380 Grey (`logitech-k380-grey`): WB ошибка
`MCP вернул 28 карточек, все отсеяны по модели`; Avito — 2 объявления
против длинной выдачи
`/all/tovary_dlya_kompyutera?q=клавиатура+беспроводная+logitech+k380+grey`.

WB: токены уже брались из выбранного товара, не из хардкода MX Master.
Для K380 strong = `k380` + MPN `920-007584`. Карточки «K-380» / `K380s`
не проходили word-boundary, все 28 уходили в drop, адаптер считал это
чужой моделью. Сейчас SKU с цифрой (≥4) матчится и в компактной форме
(`k-380`, `k380s`). Кофе/корм по-прежнему drop. Pale Grey retry без MPN
и ошибка на пустом живом WB не трогались. «Отсеяны» остаётся только если
страница реально чужая.

Avito: запрос и так был `product.name` (не leftover MX Master). MCP
`avito_search` ходил в js/items с дефолтом Москвы `637640`, без
`categoryId`, `page=1`; лимита 2 в MCP нет — резали либо локация/категория,
либо тот же скорер, либо короткая первая страница. Сейчас: `location_id`
660311 (`/all`), `category_id` 101 (товары для компьютера) для мышей и
клавиатур, query = title, одна доп. страница если первая ≤5 карточек.
439 на page=2 не крутится. Второго парсера Avito нет.

Выложено: только search (`--no-deps --build search`). web/MCP/Chrome не
трогали. `.env.production` не меняли.

### 2026-09-23 — K380: скорер семьи Logitech + клавиатура

Повторный сбор K380 Grey после компактного матчера: снова
`WB: MCP вернул 28 карточек, все отсеяны по модели`. В running image
уже был `identityTokenIn` / `k-380` / `k380s` (контейнер search
пересобран ~15:36 UTC). Query тот же, что живой каталог
`/catalog/0/search.aspx?search=Клавиатура+беспроводная+Logitech+K380+Grey`.

`marketplace_map` (первые 5 из 28): «Подгузники трусики COMFORT CARE…»,
«Кресло складное для рыбалки…», «Аргинин аминокислоты AAKG 1000 мг»,
«Кроссовки спортивные на платформе», «Влажные детские салфетки
ДПантенол Зайка…». MCP: v9 `HTTP 403`, `fallback: true`, `total: 2000`
через search-goods (устаревший id-list), не HTML витрины. Avito тогда
же отбросил «Клавиатура беспроводная logitech» — бренд+категория без
токена `k380`.

Скорер больше не требует литерал `k380` / MPN в заголовке, если это
семья compact-SKU: бренд (в т.ч. «логитек») + своя категория.
Сильные: `K-380`, `K 380`, `K380s`, кириллица `К380`. Чужие SKU
(`K120`), мыши, кофе, подгузники, корм — drop. MX Master по-прежнему
нужен `mx`/`master`/`3s` («Мышь Logitech» не проходит).
`dropped_titles` в логе — до 28 строк.

Выложено: только search (`--no-deps --build search`). Chrome
`e2981815053f` не пересоздавался. MCP/web/gateway не трогали.
`.env.production` не меняли.

Проверка после выкладки: внутренний collect K380. Первая выдача title
— 0 карточек; retry `Logitech K380` — 29, mapped=0. Все 29 — картриджи,
процессоры, SSD, токены ЭЦП, не клавиатуры. Скорер их правильно drop.
Живая витрина WB по тому же query даёт K380; MCP v9 403 + search-goods
отдаёт чужой id-list. Chrome не трогали.

### 2026-09-23 — WB: search-goods fallback ≠ search.aspx

`wb_search` в ru-marketplace-mcp 2.4.2 сначала бьёт `search.wb.ru` v9
(тот же каталог, что `search.aspx`). При 403/пустом ответе MCP сам
уходит в `search-goods.wildberries.ru` — устаревший id-list
(`fallback: true`, `total: 2000`), затем card/v4. Это не SERP
клавиатур: подгузники, кресло, картриджи, Ryzen. Скорер их верно
ронял, но collect писал «28 отсеяны по модели».

Сейчас: `fallback` + заголовки чужой категории (нет «клавиатур» /
«мышь») — транспортный промах, не отсев модели. То же для MCP
`no_results` с `total_ids>=100`: v9 403, затем card/v4 403 на
search-goods id-list — это не пустая витрина. Второй `wb_search`
не зовётся. Один HTTP на `search.wb.ru` v9/v14/v5 с тем же title,
что витрина; dest тот же `-1257786`. На 403 сразу стоп:
«WB каталог недоступен (403), не мусорный fallback». Живой v9 без
флага fallback по-прежнему «отсеяны», если страница реально чужая.
Кофе/корм не принимаем. Dest не крутили — 403 это IP, не регион.

Выложено: только search (`--no-deps --build search`). Chrome
`e2981815053f` не пересоздавался. MCP/web/gateway не трогали.
`.env.production` не меняли.

Проверка K380 после выкладки: MCP v9 403 → search-goods card/v4 403 →
`no_results` (не 28 подгузников). Один HTTP v9 тоже 403. Статус WB:
«каталог MCP недоступен (search-goods fallback)… → fallback: WB каталог
недоступен (403), не мусорный fallback». «Отсеяны по модели» нет.
Клавиатур нет — search.wb.ru с IP сервера закрыт. Chrome не трогали.

### 2026-09-23 — live autocomplete из поисковиков

Подсказки больше не из хардкод-каталога Logitech. `POST /suggestions`
параллельно бьёт Google Suggest, DuckDuckGo `/ac/` и Yandex Suggest;
фразы мапятся в эфемерный `Product` (`productFromQuery`). Icecat
обогащает только при Brand+MPN. Статический `catalog.ts` остаётся
seed для старых `productId` в тестах/демо, не для typeahead.
Фронт: пустой query, debounce 250 мс, dropdown «Подсказки из
каталогов / live», старт поиска передаёт весь `product`. Stitch API
ключ в локальном `.env.server` + `.cursor/mcp.json` (gitignore);
генерация экрана запущена в проект `3120249908671992679` / DS
`15671525545677379912`. Выложено: search, web (`--no-deps --build`).
Chrome не пересоздавался. `.env.production` не трогали.
WB 403 с IP сервера без изменений.

Stitch-экран typeahead: `568b7d9653a244eca3758394b0cf1ef1`
(«ПЕРЕМЕНА · Price Radar | Поисковый интерфейс с автокомплитом»).
Проверка на проде: `POST /suggestions` «ноутбук dell» → 8 фраз с
`источник: google` (dell inspiron / latitude …).

### 2026-09-23 — typeahead UX + короткие WB-статусы

Dropdown закрывается после «Найти» / выбора подсказки; в инпут
пишется `product.name`, авто-suggest не открывается снова до нового
ввода. Ряды typeahead: одна строка названия + muted meta (бренд /
категория / MPN), токены PEREMENA Digital. WB admin: короткое
`WB: лимит запросов. Подождите N с.` / `WB: каталог недоступен…`;
цепочка stale→HTTP больше не склеивается через `→ fallback:`, берётся
последняя actionable строка. Выложено: web + search (`--no-deps
--build`). Chrome не пересоздавался. `.env.production` не трогали.

### 2026-09-23 — копайлот: имя, Q&A, safety

Копайлот ограничен контуром Price Radar (таблица, фильтры, демо vs
реальные, Excel, источники, сравнение; VNC/admin — только admin).
Gateway в `POST …/analyze` подставляет `userName` / `userRole` /
`userLogin` из сессии. Intent-ы: help, export, sources, ranking, demo,
admin + прежние explain/filter/search. LLM только объясняет
структурированным JSON; ранжирование детерминированное.

Safety: оскорбления / jailbreak / offtopic → `intent: blocked`,
вежливый отказ с именем и напоминанием scope; JSON-лог
`chat_safety` (login, category, when, repeatCount) без текста
промпта и без секретов; счётчик повторов в памяти процесса,
эскалация в UI с 3-го раза. Баннер предупреждения в чате.

Выложено: contracts, analysis, gateway, web (`--no-deps --build`).
Chrome не пересоздавался (`Up` ~6h). `.env.production` не трогали.
`graphify update .` на Windows падает access violation у локального
бинарника; `graph.json` сохранён, query работает.

### 2026-09-23 — таблица: колонка «Товар»

В таблицу предложений добавлена колонка **Товар** (`Offer.title` —
наименование из карточки маркетплейса) сразу после «Источник /
продавец», как в Excel-экспорте. Сортировка по названию включена;
под названием показывается MPN, если есть. DEMO/REAL не менялись.
Выложено: только web (`--no-deps --build web`). Chrome не
пересоздавался. `.env.production` не трогали.

### 2026-09-23 — без демо на проде, Ali/Taobao, B2B stubs

Демо-источники больше не подмешиваются в hybrid/production: только
`ALLOW_DEMO_SOURCES=true` (локально). MERLION/NETLAB/OCS убраны из
demo-адаптера (фейковые B2B-цены). Добавлены stub-адаптеры дистрибьюторов
(`DISTRIBUTOR_SOURCES` + ключи; без ключей не монтируются) и матрица
`docs/DISTRIBUTORS.md`. AliExpress и Taobao в `MARKETPLACE_SOURCES`
(search + marketplace-mcp); Taobao→₽ через опциональный `CNY_RUB_RATE`.
Compose: `ALLOW_DEMO_SOURCES=false`, плейсхолдеры B2B env. Chrome headed
не пересоздавался. Выложено + push — см. запись ниже после деплоя.

### 2026-09-24 — typeahead Stitch + AI composer

Подсказки поиска: `.search button` больше не красит `.suggest-row` в brand
blue (белый список + soft highlight `#EAF2FF`, бейдж LIVE). Поле копайлота
очищается при отправке и `disabled`/`readOnly` пока `busy`. Выкладка: web
`--no-deps --build`, chrome не трогали.

### 2026-09-24 — копайлот: чат через Ollama, без фронтовых заготовок

Убран `localMetaReply` из web. Без снимка поиска UI шлёт
`POST /api/v1/copilot/chat` → analysis `POST /chat` → `narrator.answer`
(Ollama). META/приветствия при наличии снимка тоже идут в `answer`,
не в статичный шаблон (шаблон только fallback без модели).

### 2026-09-23 — API Merlion / OCS / NetLab (исследование + клиенты)

Поиск по открытым источникам и подготовка подключения:

- **MERLION** — SOAP `mlservice3` (WSDL prod/test подтверждены), Basic Auth,
  логин `…|API`. Live-клиент: `getShipmentMethods` → `getShipmentDates` →
  `getItems` → `getItemsAvail` → офферы с `PriceClientRUB`, `demo:false`.
- **OCS** — Partners Connector `connector.b2b.ocs.ru`, заголовок `X-API-Key`;
  interactive docs `testconnector.b2b.ocs.ru/docs` (swagger без ключа 404).
  Клиент ждёт `OCS_SEARCH_PATH` из партнёрского OpenAPI + город/локация.
- **NETLAB** — REST NLDealer: `token.json` + `getGoodsSearch` + `goodsByUid`.
  Live-клиент готов; отдельный API-пользователь в NLDealer.
- DNS/Ситилинк/Regard/Servermall/… — публичного B2B API нет; stubs + MCP/CDP.
- Env/compose/docs: `docs/DISTRIBUTORS.md`, `.env.example`, production compose.

### 2026-09-23 — выложено + push (sources / Ali-Taobao / demo off)

На прод `/projects/WebScrapingForBuyers`: залиты код и docs; в
`.env.production` добавлены пустые плейсхолдеры
`ALLOW_DEMO_SOURCES`/`DISTRIBUTOR_*`/`CNY_RUB_RATE` (без секретов).
Пересобраны `--no-deps --build`: search, analysis, gateway, web,
marketplace-mcp. **Chrome не трогали** (`Up` ~7h, started ранее).
Матрица источников: `docs/DISTRIBUTORS.md`. Push в `origin/main`.

### 2026-09-24 — копайлот: searchQuery + hybrid relevance (без Jev)

**Jev / Jev 0 (TypeSafe AI):** System One decision-модель — typed choice/score/noul
с калиброванными вероятностями, ~70–500 ms, closed-weight, только hosted API
(OpenRouter `typesafe/jev-1.13`, jevtypesafeai.com). Весов для Ollama нет;
в репозитории и на GPU-сервере не установлена. Для закрытого контура Price Radar
не подключаем (облако + биллинг). Open-weight NanoJev (0.6B) на HF — отдельно,
в стек не берём. Источники: https://typesafe.ai/blog/introducing-system-one-models-and-jev ,
https://openrouter.ai/blog/tutorials/how-to-use-jev/ , https://huggingface.co/C-Tianyu/NanoJev .

**Выбрано:** hybrid на текущем Ollama Qwen.
1) Жёсткие фильтры + soft-drop `doubtful`/`analog`, если есть `exact`/`probable`.
2) `narrator.filterRelevance` → JSON `{ rejectedOfferIds, warnings }` (cap 40);
пусто = оставить всех; сбой → детерминированный набор.
3) Сортировка по цене кодом; `summarize` объясняет уже отфильтрованное.
Исключение из старого правила «LLM только объясняет» задокументировано:
ранжирование по цене детерминированное; релевантность названия может уточнять LLM.

**Чат:** убраны preset-чипы; нет фронтового shortcut «найди…»;
`answer` JSON опционально `intent`+`searchQuery`; UI всегда шлёт в chat/analyze,
`applyChatResult` ставит query при `intent===search`. Gateway
`POST /api/v1/copilot/chat`.

### 2026-09-24 — выложено (searchQuery + hybrid relevance)

Прод: analysis/gateway/web `--no-cache` build + `up --no-deps`. Chrome не
трогали (`Up` ~56m). Smoke: `/health` → Ollama Qwen3; `POST /chat` «Найди
Logitech G102» → `intent:search`, `searchQuery:Logitech G102`. Push
`115e479`.

### 2026-09-24 — narrator: summary/warnings всегда по-русски

Усилен SYSTEM/CHAT prompt (запрет англ. прозы / «The provided JSON…»);
дешёвый retry при `looksStronglyEnglish`. Ранжирование не трогали.
Прод: analysis `--no-deps --build`; smoke `POST /chat` → summary по-русски.
`ed20a92`.

### 2026-09-24 — WB storefront v18 через CDP (не v9 HTTP)

Причина пустой выдачи K380: коннектор бил `search.wb.ru/.../v9` (и HTTP
fallback v14/v5) → 403 с IP сервера; search-goods давал чужой id-list.
Пробы `local-ops/wb-diagnose.sh` + `wb-storefront-probe.sh`: headed Chrome
на `172.29.0.10:9222` грузит витрину `search.aspx`, каталог идёт как
same-origin `__internal/u-search/exactmatch/ru/common/v18/search`
(~100 карточек с ценами в `sizes[].price`). Голый HTTP на v18 тоже 403.

`wb_search`: `WB_SEARCH_TRANSPORT=storefront` (compose уже выставляет) —
`open_page(search.aspx)` + Performance Timing + re-fetch ответа страницы.
Без fallback на search-goods. Режим `http` оставлен для unit-тестов.
Фикстура v18 + тесты capture/403/no fallback. Chrome не пересоздаём.
Выкладка: sync в `/projects/ru-marketplace-mcp` + `marketplace-mcp`
`--no-deps --build`. Search image не обязателен (MCP URL тот же).

Smoke после выкладки: `wb_search('Logitech K380')` → 100 карточек,
100 с ценами, route `__internal/u-search/.../v18`, `capture_mode=live_xhr`.
Re-fetch того же URL из `page.evaluate` давал 403 — оставлен только как
fallback; primary = тело Network.response при навигации (как diagnose).

### 2026-09-24 — MCP Session not found после restart marketplace-mcp

Симптом: все маркетплейсы в UI падают с
`Streamable HTTP error … Session not found` / JSON-RPC `-32600`.

Причина: search держал Streamable HTTP `mcp-session-id` в
`MarketplaceMcpClient` без переинициализации; после rebuild/restart
`marketplace-mcp` сессии на сервере пустые, клиент продолжал POST со
старым id. На проде: marketplace-mcp `Up ~7m`, search `Up ~10h`.

Исправление в search: при `Session not found`/`-32600` сброс клиента,
новый `initialize`, один retry tool call; один общий MCP-клиент на все
источники (не N независимых сессий). Chrome не трогали.

Выкладка: search `--no-deps --build` (`f9cd471`). Smoke: после
`--force-recreate marketplace-mcp` старый session id даёт `-32600`,
re-initialize + `dns_search`/`citilink_search`/`megamarket_search` без
`Session not found`. Chrome `Up` с 2026-09-23 (не пересоздавался).


### 2026-09-24 — убраны пользовательские упоминания демо-цен

С продуктовой поверхности сняты баннеры «только демонстрационные цены /
закупать нельзя», бейджи DEMO/REAL, метрика «Реальные», подсказки чата и
копайлота про демо vs REAL, FAQ-intent `demo` (вопросы уходят в `help` без
демо-языка), предупреждения analysis про демо в выборке и SYSTEM-промпты
«демо vs REAL». Поле `Offer.demo` и тихий отсев `demo:true` при наличии
живых строк сохранены в контракте/ранжировании. Admin mode badge:
«Локальный контур» вместо «Демо-контур».


### 2026-09-24 — демо убрано из контекста LLM копайлота

Из model-facing payload сняты demo / demoCount / realCount;
в SYSTEM/CHAT prompts — запрет упоминать демо/DEMO/REAL.
Offer.demo и тихий отсев в ранжировании сохранены. Commit ba2f78e.

### 2026-09-24 — chat filter: ноутбуки across all sources

Root cause: (1) «пробегись по всем источникам» матчило intent sources
(подстрока «источник») → canned VNC/антибот вместо фильтра таблицы;
(2) не было детерминированного фильтра по типу в title — «только ноутбуки»
не отсекало Legion Go и не держало Ситилинк; soft-drop на filter сужал
выборку; tableFilter не синхронизировал selectedOfferIds в UI.

Fix: filter intent раньше sources/admin; titleIncludeAny/titleExcludeAny
в contracts + analyze + web applyTableFilter; soft-drop только для explain;
prompts не уводят filter в VNC; applyChatResult подмешивает selectedOfferIds.
Тесты: multi-source Legion + «только ноутбуки». Вошло в ba2f78e.

### 2026-09-24 — Stitch MCP + ключ на проде

Локально: gitignored .env.stitch и .cursor/mcp.json (HTTP MCP
stitch.googleapis.com, header X-Goog-Api-Key). В репозитории только
примеры .env.stitch.example и .cursor/mcp.json.example. На проде
/projects/WebScrapingForBuyers: те же gitignored файлы (chmod 600).
Значения ключей в docs/коммиты не пишем.

### 2026-09-24 — table-filter на прод (analysis+web)

Выложены contracts/analysis/web с titleIncludeAny/titleExcludeAny и
filter-intent priority. Compose --no-deps --build analysis web. Chrome
не трогали. Stamp: notebook-table-filter.

### 2026-09-24 — мобильный UI по Stitch

Stitch MCP в сессии Cursor недоступен как namespace; использован HTTP
REST/MCP с ключом из `.env.stitch` (ключ не логировали).

Экраны: mobile workspace `d028549d8cbe41678a6b44ae609d7d4a`; сгенерированы
mobile login `6f54d513b9174b6fb16efc205d8dbdc8` и settings
`694b41de9c21419a9b720fa3ef0ceac0` (DS PEREMENA Digital). HTML в
`docs/stitch-screens/`.

В `apps/web`: bottom nav, grid lead→chat→offers на узком viewport,
карточки офферов, компактный login/settings. Закупки в nav disabled.
Chrome не трогали.

Прод: SFTP web-файлов + `compose up -d --no-deps --build web`
(на сервере нет `.git`). Stamp: stitch-mobile-ui ab19f78. Chrome Up
без пересоздания.

### 2026-09-24 — локальная копия догнана до GitHub; Taobao снят

Локальный workspace привязан к `origin/main` `7423adf`
(https://github.com/FreejackRus/WebScrapingForBuyers). `.env.server`
не копировали. Taobao убран из контура Price Radar: нет kind/адаптера,
нет `taobao` в `MARKETPLACE_SOURCES`, нет `CNY_RUB_RATE` и конвертации
юаней. AliExpress остаётся. Вендорный `mcp-servers/ru-marketplace-mcp`
не вырезали — это чужой бандл; search его `taobao_search` больше не
вызывает.

### 2026-09-24 — дистрибьюторы без API (повторная проверка)

У Servermall, Онлайнтрейд, Регард, СРВТрейд, ТоргPC публичного
каталожного API нет; Хардпрайс — сравниватель, не поставщик. План без
фейковых цен: сначала партнёрский XLSX/YML в индекс по MPN, иначе
витрина через headed Chrome (`SourceAdapter` в search, розницу помечать
явно). Подробности в `docs/DISTRIBUTORS.md`.

### 2026-09-24 — Taobao снят на проде; регрессии first-party

Локально закрыт контур Taobao: kind/адаптер/`CNY_RUB_RATE` нет; AliExpress
остаётся. Тесты: `MARKETPLACE_SOURCES` с leftover `taobao` не монтирует
источник; `price_cny` не конвертируется в ₽. README больше не обещает
демо-MERLION и явно говорит, что Taobao нет. Дубли OCS в `.env.example`
сняты. Вендорный `mcp-servers/ru-marketplace-mcp` не трогали.

Прод: SFTP compose + search adapter + docs; `up -d --no-deps --build search`
и `--no-deps --force-recreate marketplace-mcp` (env list без taobao).
Chrome `31d4ef9c3dae` не пересоздавался (Up ~11h). После выкладки
`MARKETPLACE_SOURCES` search/MCP: без taobao; `CNY_RUB_RATE` в search нет.
Неиспользуемый ключ в `.env.production` снят без логирования значения.
Дистрибьюторские stubs/фиды не трогали. Stamp: taobao-off-prod.

### 2026-09-24 — UI polish mobile + desktop

Продолжение Stitch/MSD без новой DS: палитра `#2569ED`, вордмарк картинкой.

Desktop/tablet ≥900px: боковой чат `minmax(320px, 32%)` по
`9a70cf57395b4e5492f1872e167a3fd7`, таблица не сжимает колонки
(min-width + скролл `.table-wrap`). Поиск и композер больше не
складываются в одну колонку на 1100px.

Mobile ≤720px: Радар / AI Копилот (фокус скрывает поиск и карточки) /
Профиль; поле поиска + «Найти» в ряд; композер input+кнопка;
карточки офферов; tap ≥44px; `overflow-x: clip`; выход в настройках
(кнопка шапки на узком экране скрыта). Коннекторы и телеметрия —
только admin; «Пройти проверку» нет.

Проверка: typecheck, test, build. Локального `.env` нет, в
`.env.example` только заглушки — в браузере без выдуманных паролей
не логинились. Cursor browser MCP не открыл вкладку; login preview
собирался локально.

Выкладка: только web `--no-deps --build`. Chrome `31d4ef9c3dae` не
пересоздавался (Up ~12h). Stamp: stitch-ui-polish.

### 2026-09-24 — мобильная шапка и настройки

На проде ≤720/390 шапка ломалась: широкий вордмарк (~7:1) + бейдж + город +
«Настройки»/«Выйти»/«Гибридный контур» + Excel в одном ряду с `flex-wrap`.
Страница настроек тащила desktop 2-колоночный сайдбар, длинный h1 и четыре
кнопки savebar над нижней навигацией.

Исправление по Stitch `d028549d8cbe41678a6b44ae609d7d4a` и
`694b41de9c21419a9b720fa3ef0ceac0`, палитра `#2569ED`, знак картинкой:

- topbar `nowrap`, 52px, вордмарк ≤118px (≤96px на 390), город с ellipsis,
  аватар 44px; «Настройки» и «Выйти» скрыты ≤720 (выход в профиле);
- Excel уходит под название с 768, не в ряд с шапкой;
- mode-badge скрыт только ниже 900px; desktop ≥900 без изменений шапки;
- коннекторы по-прежнему только admin и не прячутся на мобилке;
  «Пройти проверку» нет;
- настройки ≤720: короткие вкладки, одна колонка полей 16px/44px,
  короткий заголовок, logout в savebar, не в шапке.

Проверка: typecheck, test, build. Chromium preview 390. Пароли не выдумывали.
Выкладка: только web `--no-deps --build`. Chrome не трогали.
Stamp: mobile-header-settings.

### 2026-09-24 — mobile Stitch: поиск, копайлот, карточки

После шапки: на ≤720 поиск без карточки-обёртки (поле+«Найти»);
копайлот на Радаре без min-height 480px, lead скрыт, композер nowrap;
карточки офферов в порядке источник→цена→товар→условия→CTA, лишние
лейблы сняты. `main` clip по X. Desktop ≥901 не менялся.
Taobao first-party уже снят (вендорный MCP не трогали).
Дистрибьюторские stubs и антибот не открывали.

Проверка: typecheck, test, build. Выкладка: только web `--no-deps --build`.
Chrome не recreate. Stamp: stitch-mobile-workspace.

### 2026-09-24 — копайлот без MCP/VNC в ответах

В analyze/chat менеджер (и админ в LLM) больше не видит транспорт:
`source.message`, VNC, ssh -L, CDP, chrome-headed, MCP/`wb_search`
не уходят в Ollama. Промпт запрещает называть инфраструктуру;
при ошибке площадки — «источник временно недоступен». Выход модели
и цитаты проходят sanitize. Gateway по-прежнему режет `source.message`
для manager; панель коннекторов админа не трогали.

Проверка: typecheck, test, build. Выкладка: только analysis `--no-deps`.
Chrome не recreate. Stamp: copilot-hide-infra.

### 2026-09-24 — Treolan (исследование, без адаптера)

Treolan (treolan.ru) — широкопрофильный ИТ-дистрибьютор группы ЛАНИТ
(не Merlion): кабинет `b2b.treolan.ru`, дилерские цены только после
договора. Публичного анонимного каталога/YML нет. Официальный SOAP
документирован (`api.treolan.ru/ws/service.asmx`, тест `demo-api…`,
методы `GenCatalogV2` / `ProductInfoV2`, доступ `b2b-info@treolan.ru`).
WSDL открывается без ключа; вызовы требуют партнёрский логин. Клиент
и stub в search не добавлялись. Запись: `docs/DISTRIBUTORS.md`.

### 2026-09-24 — локальная синхронизация с продом

Из `/projects/WebScrapingForBuyers` перенесены 30 новых/изменённых файлов
кода, тестов, документации и production compose. Локальный `AGENTS.md`
оставлен основным; правила исключения секретов в `.gitignore` и
`.dockerignore` сохранены. Соседний `ru-marketplace-mcp` уже совпадал.
Секреты и локальные env-файлы не переносились. Проверено локально:
`npm test` (160 тестов), `npm run typecheck`, `npm run build`, Semgrep CE.
Graphify обновлён, временные deploy-файлы исключены из индекса;
Obsidian-vault экспортирован заново.

### 2026-09-24 — копайлот: честный ответ без снимка поиска

Живой smoke продовой модели выявил: фильтр/статус источников иногда давали
невалидный JSON и общий fallback; объяснение «первого предложения» без
таблицы выдумывало свойства; служебный запрос VNC/MCP превращался в
`searchQuery`. Теперь без снимка фильтр и объяснение требуют сначала
выбрать товар, статусы источников остаются неизвестными, admin-вопрос
не становится поиском; вопрос о ранжировании без таблицы получает только
общее правило, без оценки конкретной строки. Для нового поиска модель извлекает только запрос,
а сообщение о результате формирует код; при сбое модели запрос сохраняется.
Фраза «покажи реальные предложения по <модель>» распознаётся как новый поиск.

После выкладки только `analysis --no-deps --build` на проде проверены шесть
запросов `/chat`: поиск K380 и MX Master 3S, фильтр без снимка, статусы
источников без снимка, объяснение без офферов и служебный запрос. WB
отдельно проверен живым `wb_search("Logitech K380")`: 100 карточек, 100 с
ценами, маршрут витрины v18, HTTP 200. Chrome и marketplace-mcp не
пересоздавались. Кодовые проверки: typecheck, test, build, Semgrep CE.

### 2026-09-24 — копайлот: деловые ответы без служебного жаргона

Аудит Qwen показал, что запрет в промпте ненадёжен: модель могла отвечать
про VNC/MCP/HTTP 403. Источником части жаргона были и наши шаблоны
(`done`, `exact/probable`, `top-N`, `LLM`, `searchQuery`), а API показывал
менеджеру идентификатор Ollama/Qwen. Теперь вопросы о статусах и служебных
операциях при открытом поиске отвечаются детерминированно без Qwen; статусы
и пояснения переведены на язык закупки. На границе API имя модели скрыто
для менеджера, в UI есть дополнительная защита; фильтр ответа узнаёт
варианты `VCN`, `M.C.P` и сообщения `HTTP 403` с адресом WB.
Самоназвания Qwen/Ollama в тексте тоже удаляются; если после этого ответ
пуст, показывается просьба проверить таблицу, а не ложное сообщение об
ошибке источника.

Тесты покрывают роль менеджера/админа, обходные написания и вывод UI.
Секреты и сырые сообщения источников в репозиторий не добавлялись.
Проверено: полный `npm test` (171 тест до последнего точечного теста,
затем 56/56 тестов analysis), `npm run typecheck`, `npm run build`,
Semgrep CE без находок. Выкладка: только `analysis` и `web` с
`--no-deps --build`; исходники перед заменой скопированы отдельно от
репозитория. Smoke в новом analysis-контейнере подтвердил четыре ответа
без VCN/MCP/Ollama/Qwen и внутренних статусов; web локально отдаёт HTTP 200.
Playwright не смог открыть предполагаемый публичный URL из-за TLS-ошибки;
авторизованный пользовательский UI-сценарий не проверялся.

### 2026-09-24 — скрыты пояснения под чатом

Отдельный список `appliedFilters` под перепиской вводил в заблуждение:
он показывал шаги только последнего ответа под всей историей. Список
убран из активного `AnalysisChat`, данные отбора в API и сам расчёт
не менялись. Проверено: 18 тестов web, production-сборка web. На прод
выложен только web (`--no-deps --build`); контейнер работает, страница
локально отдаёт HTTP 200. Авторизованный сценарий браузера не проверялся.

### 2026-09-25 — стартовый UI и мобильный чат

По рабочему экрану Stitch улучшено пустое состояние Price Radar: до первого
поиска левая колонка объясняет следующий шаг без вымышленных цен. В пустом
чате — короткое приветствие и примеры вопросов; выбор примера только
заполняет поле ввода. Поиск получил кнопку очистки и корректную для
платформы подпись существующего Ctrl/⌘+K; хоткей выделяет текущий запрос.
Мобильная вкладка копайлота удерживает композер в пределах экрана при длинной
переписке. API и логика отбора не менялись. Проверено: 23 web-теста, сборка,
локальный браузерный smoke с подменённой тестовой сессией (desktop 1440px,
mobile 390px); продовые источники и вход в этом smoke не проверялись.

### 2026-09-25 — фоновые подсказки без ложной ошибки

Пустой ответ или сбой фонового автокомплита больше не превращается в красный
баннер поиска: свободный текст по-прежнему можно отправить кнопкой «Найти».
При отсутствии вариантов под полем показана спокойная подсказка, а текст
кнопки не заменяется многоточием во время загрузки автокомплита. Явный
запрос подсказок из копайлота сохраняет прежнее сообщение об отсутствии
совпадений. Проверено: 27 web-тестов, сборка, локальный browser smoke с
тестовой сессией и пустым ответом автокомплита (desktop/mobile, без ошибок
консоли и сети). Выложен только web с `--no-deps --build`; серверный и
публичный HTTP — 200, новый бандл содержит подсказку. Реальные источники
и авторизованный сценарий на проде не проверялись.

### 2026-09-25 — Avito JSON-439 PoW на DC-IP, DNS нет

Повторная проверка mickberrad659-sketch/Avito-Parser: GeeTest/QRATOR/ddddocr
не копировали. На GPU-сервере (тот же marketplace-mcp, Chrome не трогали)
сработало узкое: `curl_cffi` firefox147 + document warmup +
`X-Source: client-browser` → JSON 439 с `pow_challenge` → один локальный
SHA-256 firewallPow → повтор `js/items` дал 50 объявлений. HTML 439 без
JSON по-прежнему уходит в CDP/VNC.

В существующий `avito-connector`: сессия, прогрев, XHR-заголовки, один
PoW, без второго парсера и без платных API. Адаптер search только уточнил
админский текст. Тот же механизм на DNS: warmup и search — HTTP 401,
`Server: QRATOR`, без `pow_challenge` и без карточек. DNS не меняли.

Проверено: 40 тестов avito-connector. Выкладка: sync avito-connector в
`/projects/ru-marketplace-mcp` + `marketplace-mcp --no-deps --build`.
Chrome не пересоздавали.

### 2026-09-25 — merge local/main + sanitization + Treolan

Локальный `main` смержен с `origin/main` без rebase: оставлены более новые
экраны Price Radar, онбординг, мобильный чат и фоновый автокомплит
(`cd567f5` / `6b7aaf4` / `60cea63`). Старый UI/CSS из stash не возвращали.

Санитизация копайлота уже в дереве (`infra-leak.ts`): MCP, VNC, CDP, ssh,
chrome-headed и порты не попадают в промпт и ответы. Gateway по-прежнему
убирает `source.message` у менеджера. В `docs/DISTRIBUTORS.md` сохранено
исследование Treolan (SOAP есть, клиент не wired, секретов нет).

### 2026-09-25 — Ozon Scrapling throwaway → MCP stealth-tier

Одноразовый `StealthyFetcher` с GPU-сервера (тот же публичный DC-IP, что у
marketplace-mcp; Chrome compose не трогали): `solve_cloudflare=True`, свой
Chrome-for-Testing в `/tmp/scrapling-ozon-probe`. Поиск Logitech K380 —
не interstitial, HTTP 200, 24 `/product/` и composer-api JSON с
`widgetStates`/`tileGridDesktop` за ~3–6 с. Клейм переносится.

В `ozon-connector`: curl_cffi → Scrapling (свой браузер, не :9222) → CDP.
`--no-sandbox` в контейнере давал 403; без extra_flags composer JSON 200.
Образ MCP ставит Chrome-for-Testing с GCS и `scrapling[fetchers]==0.4.15`.
Менеджеру по-прежнему режутся MCP/VNC/`scrapling`. Venv на сервере оставлен
в `/tmp/scrapling-ozon-probe`. В прод без отдельного солвер-флага: пользователь
явно попросил выкладку, если сработает.


### 2026-09-25 — внутренняя карточка предложения

Клик по строке таблицы и мобильной карточке открывает наш drawer, а не
витрину. Ссылка магазина — вторичная «Открыть на площадке». Поля только
из `Offer`: title, price, source, seller, url, demo, availability и уже
известные match/condition/mpn/delivery/warranty/fetchedAt. MCP/VNC/CDP/
`source.message` на карточке нет.

**Фото: нет.** В контракте `Offer` нет `image`/`imageUrl`. Search
`toOffer` не мапит thumbnail/image из MCP. Сырые фикстуры коннекторов
иногда содержат картинки, но в payload карточки их нет. Дополнительно
страницы не скрейпим; proxy не добавляли — нечего проксировать.
Карточка показывает честный блок «Фото нет в данных предложения».

Stitch MCP `generate_screen_from_text` для проекта
`3120249908671992679` / DS `15671525545677379912` вернул `fetch failed`.
Верстка по существующей теме, без фейкового экрана.

Проверка: `npm run typecheck`, web tests 32/32. Браузер MCP не открыл
вкладку; локального логина нет. Выкладка: только web `--no-deps --build`.
Chrome не трогали. Stamp: offer-internal-card.

### 2026-09-25 — DNS Qrator и Яндекс 302: публичные репо не дают карточки

Проверено на GPU-сервере (тот же DC-IP, что у marketplace-mcp). Chrome
`31d4ef9c3dae` не трогали. Пробы в `/tmp/dns-yandex-probes`, без
`:9222`. Запрос как у MCP: Logitech K380. Солвер в коннекторы не
копировали: `count>0` с живыми title/price не было.

Публичные репо (что делают на самом деле):

- [Polodashvili-Iosif/parser-scraper_DNS](https://github.com/Polodashvili-Iosif/parser-scraper_DNS)
  `5a14d8e` (2022): Selenium `webdriver.Chrome` + BeautifulSoup по
  каталогу игровых ноутбуков, паузы 6–10 с, выгрузка xlsx/csv/xml/json/
  PostgreSQL. Нет Qrator/cookies/Playwright/официального API.
- [Alexandr3-7/dns_price_monitor](https://github.com/Alexandr3-7/dns_price_monitor)
  `711eb1d`: Selenium + `undetected-chromedriver`, скролл/мышь, монитор
  уже известных карточек, Telegram/Flask. Солвера Qrator нет.
- [Antiarchitect/spree-yandex-market-scraper](https://github.com/Antiarchitect/spree-yandex-market-scraper)
  `0b1caa6` (v0.4.1): старый Ruby/Spree `open-uri` + Nokogiri. Берёт
  готовую ссылку товара и тащит описание/картинки (`#full-spec-cont`,
  `.bigpic`). Не поиск, не обход 302/SmartCaptcha, не Partner API.
- Avito-Parser `run_qrator_cookie_flow` (`2d09315`): только Avito —
  HTTP 302 `Server: QRATOR`, скрипт `/[0-9a-f]{20}.js`, POST
  `avito.ru/web/2/ft` (fingerprint `f`/`s`) и pixel `/web/1/u`. На DNS
  другой контур: HTTP 401 + `/__qrator/qauth_utm_v2d_v9118.js` и cookie
  `qrator_jsr` без `pow_challenge`. Flow на dns-shop.ru не применяли.

Живые пробы (карточек нет):

- DNS HTTP/`curl_cffi` firefox147: 401 `Server: QRATOR`, body ~6 KB с
  qauth, `Set-Cookie: qrator_jsr` (challenge, Max-Age=300), 0 `/product/`.
  Sitemap 200 (индекс URL, не цены). `/ajax-state/product-buy/` тоже 401.
- DNS Scrapling StealthyFetcher (свой Chrome-for-Testing, не compose):
  401, «No Cloudflare challenge», 0 карточек.
- DNS Playwright и Patchright, тот же Chrome, wait 25 с: title
  `HTTP 403`, 0 `/product/`. JS qauth отработал, витрина не открылась.
- Яндекс HTTP: 200 «Вы не робот?». `curl_cffi`: 302 → `/showcaptcha`.
  Scrapling: 302→200 «Are you not a robot?». Playwright/Patchright:
  тот же SmartCaptcha, 0 product id.

Вывод: с DC-IP нет локального солвера, который даёт DNS `/product/`
или выдачу Маркета. Адаптеры `dns-connector` / `yandex-connector` и
search не меняли. marketplace-mcp/search не выкладывали. Chrome Up
без пересоздания.

### 2026-09-25 — отсев AliExpress «Pro» на запросе Legion Pro 5

Поиск `lenovo legion pro 5` тащил в таблицу пылесосы Roborock, планшеты
XP-Pen и китайские Legion R9000P/R7000P как «Сомнительное». Причина:
маркетинговое `pro` было сильным identity-токеном, URL AliExpress без
модели помечался `rejectUrl` и карточка всё равно оставалась.

`pro`/`plus`/`max`/`ultra` больше не identity. `legion`/`thinkpad` и
линейки ноутбуков дают категорию «Ноутбуки». Чужой SKU (R9000P) режется
по фразе `pro 5` → `pro5`, не расширяя family-карточки K380/MX Master.
Живая карточка «Lenovo Legion Pro 5» остаётся. Проверено: 61 тест search.

### 2026-09-25 — столбцы таблицы, поставщики, без баннера частичного сбора

Столбец «Съём» переименован в «Время запроса». В таблице можно менять
ширину столбцов и скрывать их (кроме «Товар»). Баннер «Сбор завершён
частично…» убран. Перед поиском можно выбрать поставщиков — search
принимает `sources[]`, gateway отдаёт `GET /api/v1/sources`. Chrome не
трогали.

### 2026-09-25 — убраны платные источники

Из продукта сняты платные SaaS: Apify (`apify-client`,
`ApifyMarketplaceAdapter`) и MPStats (`mpstats-connector`, `mpstats-mcp`,
`MPSTATS_MP_AUTH`). Search больше не делает fallback в Apify. Unified MCP
держит 38 инструментов (37 площадок + `marketplace_sources`), без платного
токена аналитики. Исторические release notes/changelog не переписывались.
Оставлены бесплатные контуры: MCP + headed Chrome, HTTP-запас WB, Icecat
Open Catalog, opt-in партнёрские API дистрибьюторов. Капча-фермы и
платные cookie API не добавлялись.

### 2026-09-29 — фото товара во внутренней карточке

Раньше карточка всегда показывала «Фото нет в данных предложения»: в `Offer`
не было поля картинки. Добавлено опциональное `Offer.imageUrl` (только
https). Search (`marketplaceImageUrl`) принимает строку, `{url}`, первый
элемент `images[]` и карту размеров Avito `{"208x156": url, …}` — берёт
самый широкий вариант. `http:`, `data:` и мусор отбрасываются.

Коннекторы MCP: Avito отдаёт `image_url` из первого фото объявления
(`images` по-прежнему считает их количество), Ситилинк — `image_url` из
`<img>` плитки (`currentSrc`/`data-src`/`src`, только https). Эталон формы
`SEARCH_SHAPE_REFERENCE` Ситилинка дополнен `items[].image_url:str`,
ключ не обязательный. Яндекс уже отдавал `image`, но с DC-IP закрыт
капчей. WB, Ozon, DNS, Мегамаркет, AliExpress фото пока не отдают.

Web: карточка грузит фото с `referrerPolicy="no-referrer"`. Если площадка
не отдала картинку — «Фото не загрузилось с площадки». Без фото —
прежняя заглушка.

Проверка: typecheck, npm test (197), build, pytest MCP 1810 passed (DOM-тесты
Ситилинка на сохранённой разметке через jsdom). Падают без этих правок:
`wb-connector test_live` (сеть) и `marketplace-connector
test_dependency_parity`. Semgrep по diff — чисто. В браузере не
проверялось: локально нет marketplace-mcp, а демо-предложения без фото.
Не выкладывалось: нужна пересборка marketplace-mcp, search и web.

Выкладка (2026-09-29, `7b2e47c`): 13 изменённых файлов залиты tar'ом после
сверки md5 серверных копий с `efae95b` (совпали все). Пересобраны
`marketplace-mcp`, `search`, `web` (`--no-deps --build`); Chrome, gateway,
analysis, identity не трогали. Smoke в контейнере: `avito_search('Logitech
K380')` → 50 объявлений, у всех `image_url` на `img.avito.st`.
`citilink_search` → 429 Qrator: профиль Chrome нужно прогреть через VNC,
с фото не связано.

Модель: на сервере Ollama 0.12.3 — Gemma 4 не поддерживает. Кандидат на
замену Qwen3-30B-A3B `IQ4_XS` — `gemma4:26b-a4b-it-q8_0` (MoE 25.2B/3.8B
активных, ~28 GB). Перед переключением: обновить Ollama (установщик
перезаписывает `/etc/systemd/system/ollama.service` — сохранить
`OLLAMA_HOST=0.0.0.0:11434`) и сравнить на реальных запросах.

### 2026-09-29 — деплой из git и фото WB / Ozon / AliExpress

**Деплой.** До этого на прод код заливали вручную: сервер отставал от `main`
(там ещё лежали Apify/MPStats), а `/projects/ru-marketplace-mcp` был клоном
upstream с 20 локальными правками. Теперь `/projects/WebScrapingForBuyers` —
git-клон публичного репо. `marketplace-mcp` собирается из
`./mcp-servers/ru-marketplace-mcp`. Деплой: `./scripts/deploy.sh [ref]
[сервисы]` — останавливается, если на сервере правили отслеживаемые файлы;
Chrome не пересоздаёт; журнал в `.deploy-log`. Секреты (`.env.production`,
`.env.stitch`, `.cursor/*`) перенесены в клон, в git их нет. Перед переходом
пофайлово сверили сервер с историей git: всё, что отличалось, — старые
версии, серверных правок не было. Бэкап:
`/projects/WebScrapingForBuyers-backups/pre-git-2026-09-29/`, старые каталоги —
`/projects/WebScrapingForBuyers.pre-git` и `/projects/ru-marketplace-mcp`
(больше не используется). Первый деплой `73104b9`: пересобраны все сервисы,
кроме Chrome, ошибок в логах нет.

**Фото.** Ozon — `tileImage.items[].image.link`. AliExpress — `<img>` плитки,
как у Ситилинка. WB картинку в выдаче не отдаёт: URL строится из `nm_id`
через `basket-NN.wbbasket.ru`. Таблица хостов в коннекторе кончается на
vol 4997 (basket-27), а на живом «Logitech K380» 24 из 40 SKU новее
(vol 7621 → basket-35, vol 15733 → basket-48; проверено curl с сервера).
Неизвестный vol разрешается HEAD-пробой хостов 28–79 с кэшем на процесс
(все SKU одного vol на одном хосте), семафор 24, бюджет 5 с (позже поднят до 8 с). Не нашли —
фото нет, битого URL не отдаём. `_basket_for_sku` (card.json/отзывы)
теперь тоже берёт найденный хост вместо слепого `basket-28`.

Проверка: pytest MCP 1812 passed (падает старый `test_dependency_parity`),
DOM-тесты Ситилинка и AliExpress на сохранённой разметке через jsdom,
typecheck и npm test зелёные, semgrep по diff без новых находок.

Живая проверка после `./scripts/deploy.sh origin/main marketplace-mcp`
(`3b225f0`), запрос «Logitech K380»: WB — фото у 79 из 100, выборка из 15 URL
открывается без ошибок, найдено 12 новых хостов basket-29…49, холодный
поиск 14 с (≈5 с — проба хостов, дальше кэш). Ozon — 8/8, AliExpress —
16/16, Avito — 50/50. Ситилинк — 429 Qrator, нужен прогрев Chrome через VNC.

### 2026-09-29 — Gemma 4 в проде и битые цены Ozon

Ollama на сервере обновлена до 0.34.4, скачана `gemma4:26b-a4b-it-q8_0`.
Добавлен `apps/analysis/scripts/compare-models.ts`: прогоняет одни и те же
снимки поиска через полный пайплайн analysis разными моделями и меряет
сырые ответы narrator до санитайзера (ошибки/JSON, утечки, язык, задержка),
плюс ответы бок о бок. Итог и таблица — `docs/AI_SERVER.md`. `OLLAMA_MODEL`
переключён на Gemma 4, Qwen оставлена для отката.

**Баг цен Ozon (найден при сравнении).** Все 31 предложение Ozon в 8 снимках
стоили 1–23 ₽: K380 за 1–2 ₽, SSD Kingston за 15 ₽. Ozon группирует разряды
узким пробелом U+2009 (`2 939 ₽`), а `firstPrice` в search нормализовал
только NBSP — регулярка брала первую группу цифр. Код ранжирует по цене,
поэтому эти строки становились «лучшими». Исправлено: `\s` с флагом `u`
вместо одного ` `, регрессионный тест на U+2009, U+202F и NBSP.

Бюджет пробы хостов WB поднят 5 → 8 с (`86aabdf`). Живьём на холодном кэше:
«Logitech K380» — фото 100/100 (было 79/100), «Samsung 990 PRO 2TB» — 97/100,
поиск WB ~17 с. Кэш vol→basket живёт в процессе `marketplace-mcp`, поэтому
повторные поиски быстрее; сбрасывается при перезапуске контейнера.

### 2026-09-29 — защита от битых цен

Чтобы поломка парсера (как с Ozon U+2009) не доходила до менеджера, search
помечает `Offer.priceAnomaly = "too_low"`, если цена ниже 1/10 медианы по
снимку (`apps/search/src/domain/price-anomaly.ts`). Медиана — по точным и
вероятным совпадениям, если их ≥ 4, иначе по всем; при < 4 сравнимых цен
пометок нет; демо не трогаются. Пересчёт при каждом пополнении снимка, итог
приходит во фронт с событием `complete`.

Кто что делает: analysis исключает помеченные строки из выбора «лучших» и
пишет предупреждение; web не берёт их в «Лучшую публичную», показывает
«Цена под сомнением» в таблице и в карточке; Excel — колонка «Проверка цены».
Строки не скрываются: решение за менеджером.

Проверка на 8 живых снимках до фикса парсера: поймано 31 из 31 битой цены
Ozon. Прочие пометки по делу — «990 Pro» за 1 491 ₽ (подделка), ролики и
шлейфы за 167–286 ₽, «Dell P2422H» за 1 029 ₽. K380 за 700 ₽ и
восстановленный ИБП за 9 200 ₽ не помечены.

### 2026-09-30 — ограничение памяти в search

`SearchService` хранил каждый поиск и «последние удачные» предложения источников
в памяти процесса без предела — при долгой работе сервиса это утечка. Теперь
завершённые поиски живут 6 часов и не более 200 штук (сначала уходят самые
старые), незавершённые не удаляются никогда; набор «последних удачных» на
источник+товар ограничен 200 записями (LRU по обновлению). Параметры —
`SearchRetention`, по умолчанию `DEFAULT_RETENTION`. Добавлены тесты
`search-service.test.ts` (TTL, лимит, запущенный поиск, откат на последние
удачные) и `export-service.test.ts` (колонка «Проверка цены», демо, «не указан»).
Проверка: typecheck и npm test зелёные (search: 113 тестов).

### 2026-09-30 — адаптив: таблица предложений на мобильном и десктопе

Проверено Playwright на 390, 820 и 1440 px (демо-поиск «Logitech K380»).
Найдено и исправлено:

- **Десктоп.** Сумма ширин колонок по умолчанию (1192 px) не влезала в панель
  рядом с чатом (~920 px), поэтому «Условия» и кнопка «Карточка» уезжали в
  скрытую прокрутку. Ширины уменьшены, «Время запроса» скрыт по умолчанию
  (оно есть в карточке; сохранённые настройки не трогаются), чат сужен до 28%,
  колонка с кнопкой закреплена справа (`position: sticky`), кнопка без переноса.
- **Мобильный.** Инлайновый `minWidth` таблицы растягивал карточки шире экрана,
  и кнопка «Карточка» обрезалась; теперь `min-width: 0 !important` на ≤720 px.
  Таблица предложений идёт перед чатом (доступ к чату — вкладка «AI Копилот»),
  кнопка «Столбцы» скрыта, поле фильтра на всю ширину.
- **Общее.** Чипы источников не переносят текст («Яндекс Маркет» ломался),
  три метрики остаются в один ряд до 721 px.

Проверка: typecheck, `npm test -w @peremena/web` (35 тестов), сборка web.

Второй проход (те же 390 / 820 / 1024 / 1200 / 1440 px):

- Карточки вместо таблицы теперь до 900 px (было 720), поэтому на планшете
  нет горизонтальной прокрутки.
- AI-копайлот уходит под таблицу до 1359 px: рядом с чатом таблице не хватало
  ~950 px, и «Условия» обрезались на 1024–1300 px.
- Вход на телефоне: карточка тянулась на весь экран и раздвигала поля
  (`align-items: stretch`); теперь прижата к верху.
- Панель сохранения в настройках на телефоне без подсказки, чтобы оставить
  место форме над нижней навигацией.

Не проверялись: реальные шрифты бренда, iOS Safari, роль admin.

### 2026-09-30 — устойчивость сервисов, CI и вынос релевантности

Разбор архитектуры (Graphify в окружении не установлен, читались исходники;
падение шлюза воспроизведено запуском):

- **Шлюз падал, если search рвал SSE-поток**: `void pump()` без обработки
  ошибок → unhandled rejection → выход процесса с кодом 1. Теперь ответ
  корректно закрывается; тест `resilience.test.ts` падает на старом коде.
- **Таймауты.** Раньше их не было ни у одного вызова между сервисами, кроме
  Ollama. Теперь: identity 5 с, JSON-прокси 30 с, analysis 180 с, экспорт 60 с,
  health 3 с, подключение к SSE 10 с, analysis → search 10 с. Ответы 502/503/504
  вместо зависания. Хелпер `fetchWithTimeout` — в `@peremena/service-kit`.
- **Источники поиска.** `SearchService` вызывал `source.search()` без сигнала
  отмены и без дедлайна; один зависший источник держал поиск в «running».
  Теперь дедлайн на источник (`SOURCE_TIMEOUT_MS`, по умолчанию 120 с): источник
  получает ошибку (текст видит только админ), поиск завершается.
- **Кэш пользователя в шлюзе**: ответ identity на 10 с (до 500 сессий),
  сбрасывается при выходе и смене настроек. Недоступный identity → 503, а не 500.
- **Вход.** Не более 5 неудач на логин за 10 минут (429 + `Retry-After`).
  Ключ — логин, а не IP: `X-Forwarded-For` от клиента подделывается, а шлюз
  стоит за nginx. Цена решения: коллега может заблокировать чужой логин на окно.
  `scrypt` теперь асинхронный (раньше блокировал event loop), для неизвестного
  логина считается фиктивный хэш.
- **CI.** Добавлен `.github/workflows/ci.yml` (Node 20: typecheck, test, build).
  Запуск в GitHub ещё не проверялся.
- **Релевантность** (токены, категории, «чужие» SKU) вынесена из
  `mcp-marketplace-adapter.ts` (1215 → 881 строк) в `domain/marketplace-relevance.ts`;
  адаптер реэкспортирует функции, тесты не менялись.

Не сделано: проверка владельца поиска (любой вошедший видит поиск по id),
внутренний токен между сервисами (сейчас безопасно только из-за закрытых
портов), разбиение `analyze.ts` (771 строка), хранение истории в БД.

### 2026-10-01 — Яндекс 302: причина и транспорт через Chrome

Подсказка «Яндекс 302 без окна проверки… Повтор поиска блок не снимает. VNC…»
вводила в заблуждение: `yandex-connector` ходил голым `httpx`, а не через
headed Chrome. Куки прогретого профиля до него не доходили, 302 на
`/showcaptcha` (пустое тело) считался «временным сбоем» и ретраился тем же
голым запросом, а явная капча в HTML превращалась в `rate_limited`
«повторить через 300 с», что тоже не помогало. Живая проба 2026-10-01: в
headed Chrome тот же поиск открывает видимую страницу «Are you not a
robot?» (`/showcaptcha`), парсер видит её как `captcha`.

Сделано: `YANDEX_TRANSPORT=cdp` (по умолчанию `http`, в проде `cdp`).
`yandex_search` рендерит страницу в headed Chrome через `read_with_handoff`
и прогоняет HTML тем же SSR-парсером. Капча →
`challenge_required` с `handoff_expires_at`/`handoff_id`, вкладка остаётся
для VNC, страница с капчей не кэшируется; повтор того же поиска в той же
MCP-сессии продолжает эту вкладку. Search показывает админу время, до
которого держится вкладка, менеджер по-прежнему видит только «источник
временно недоступен». Солвера нет — проверку проходит человек.
`yandex_card`/отзывы остались на HTTP. Порядок для оператора —
`docs/CHROME_VNC.md`. Тесты: 4 новых в yandex-connector (113 всего), search 118.

### 2026-10-02 — единая политика AGENTS.md

Текущие правила проекта и приложенная multi-agent policy сведены в один
практический `AGENTS.md`. Сохранены Graphify-first навигация с подтверждением по
исходникам, version-matched Context7, официальная документация OpenAI,
Playwright, Semgrep и verification gate. Уточнена граница источников:
интеграция идёт через `SourceAdapter` в `apps/search`, а низкоуровневый парсинг
существующих коннекторов может оставаться в `mcp-servers/ru-marketplace-mcp`.

Добавлены роли Astra/Terra/Sol с честным fallback при недоступности модели,
правила ограниченной параллельной работы и владения файлами, пропорциональная
проверка docs-only изменений, запрет на секреты, платные сервисы без нового
решения и неподтверждённые заявления о live/fixture данных. Код, runtime,
конфигурация и граф не менялись.

Проверено: `git diff --check` и существование упомянутых путей. Тесты приложения
не запускались: изменена только документация.

### 2026-10-02 — Serena MCP для работы с кодом

Локально установлена Serena 1.7.0 и зарегистрирована как stdio MCP в
пользовательской конфигурации Codex. Используется бесплатный backend LSP,
контекст `codex`, автоматический выбор проекта по рабочей папке и запуск без
открытия dashboard. Платный JetBrains backend не подключался.

Добавлена `.serena/project.yml`: TypeScript и Python, исключены зависимости,
виртуальные окружения, сборки и `graphify-out`. В `AGENTS.md` закреплён порядок:
Graphify для карты связей, Serena для символов, ссылок и точечных изменений;
при недоступности Serena допустимы обычное чтение и `rg`.

Проверено: Codex видит включённый сервер; отдельный MCP-клиент успешно выполнил
initialize и получил 24 инструмента. `get_symbols_overview` вернул символы
TypeScript SearchService и Python YandexSettings без ошибок. Автоопределение
первоначально выбрало только Python; исправлено явным списком языков.
Проверен `git diff --check`. Код приложения и продакшен не изменялись;
тесты приложения не запускались. Появление MCP в уже открытой сессии Codex
не проверено: может потребоваться перезапуск клиента.

### 2026-10-02 — разделение политики агентов

Единая инструкция разделена на компактный `AGENTS.md` и пять тематических
политик в `.codex/`: маршрутизация моделей, orchestration, инструменты, review и
debugging. Перенесены границы монорепозитория, SourceAdapter/MCP, MSD, честные
demo/live-данные, защита менеджерского интерфейса, безопасная работа с секретами
и git-based production deploy.

Уточнены Serena LSP для TypeScript/Python, Context7/официальная документация,
Graphify, skills и команды root npm/Python `uv`; в корне JavaScript lint-команда
не найдена, что не отменяет ruff для Python MCP. Проверены diff, ссылки и
форматирование; код, runtime-конфигурация и сгенерированный граф не менялись,
поэтому тесты и `graphify update` не запускались.

### 2026-10-04 — только IT-оборудование и UX поиска

Поиск ограничен оборудованием **белым списком**, а не словарём «чужих» товаров
(игрушки, еда, одежда не перечисляются нигде): `apps/search/src/domain/it-scope.ts`
пропускает только то, что распознано как IT-категория, модель-артикул
(буквы+цифры, «1000 деталей» не артикул) или бренд из списка с латинскими
словами. «Пылесос Samsung» ловит единственный чёрный список — коллизия бренда.

- `inferCategory` переписан: побеждает ключевое слово, стоящее в тексте
  **раньше** («SSD для ноутбука» — SSD, «Ноутбук … SSD» — ноутбук); совпадение
  с начала слова; добавлены смартфоны, планшеты, серверы, сеть, комплектующие,
  аксессуары. В JS `\w` не матчит кириллицу — используем `[а-яё]*`.
- Подсказки (`live-suggest`) фильтруются `filterItSuggestions`; `POST /searches`
  отвечает 422 для запроса не про оборудование; `SearchService` отбрасывает
  не-demo предложения вне IT-scope.
- UI: пояснение границ поиска, кликабельные примеры запросов под пустым полем,
  понятный текст вместо «Нажмите Найти» при отсутствии подсказок, фокус-стили и
  `prefers-reduced-motion` для чипов.
- В `AGENTS.md` добавлено «Жёсткое правило» по skills/MCP/Graphify.
- Проверено: typecheck, `npm test` (search 127, web 36), build; в браузере
  «игрушки для детей» → 422-сообщение, «Мышь Logitech G102» → поиск стартует.

Не проверялось: реальные источники локально (marketplace-MCP не запущен),
качество подсказок поисковиков на проде, предложения с кириллическими
артикулами вне адаптера. Локальные незакоммиченные правки до pull лежат в
`git stash` («local changes before pull 2026-10-04»).

### 2026-10-04 — история поиска пользователя

Шлюз запоминает поиски каждого пользователя (`apps/gateway/src/search-history.ts`):
до 30 записей, новые сверху, повтор того же запроса (без учёта регистра и пробелов)
поднимается наверх, а не дублируется. Ключ — `SessionUser.id`, чужую историю
увидеть нельзя. Хранится в памяти и зеркалится в JSON (`HISTORY_FILE`, запись
через tmp+rename; сломанный или недоступный файл = пустая история, поиск не
падает). В проде для этого том `gateway-data:/data`, `HISTORY_FILE=/data/search-history.json`.

- API: `GET /api/v1/history`, `DELETE /api/v1/history/:id`, `DELETE /api/v1/history`;
  запись происходит при успешном `POST /api/v1/searches`. Контракт — `SearchHistoryEntry`.
- UI: под пустым полем «Недавние запросы» (повтор в один клик, удаление записи,
  «Очистить историю»); примеры запросов показываются, только пока истории нет.
- Нашлось по ходу: `DELETE` с `Content-Type: application/json` и пустым телом
  Fastify отвечает 400. `shared/api` теперь ставит заголовок только при наличии тела.
- Окружение: в `AGENTS.md` пункт 0 «сначала окружение, потом работа» и
  `scripts/check-env.sh`. Починено: Serena (typescript в `.serena/project.yml`),
  `graphify update` через `python -m graphify` (кириллица в пути профиля ломает
  обёртку), симлинки `.claude/skills` (`core.symlinks=true`).
- Проверено: typecheck, `npm test` (gateway 14, search 127, web 41), build,
  Semgrep (`p/typescript`, `p/security-audit`) без находок; в браузере запрос
  запоминается и переживает перезагрузку, файл истории пишется.

Не проверялось: поведение тома на проде (первый деплой создаст пустой том),
история при нескольких экземплярах gateway (файл не рассчитан на конкурентную запись).

### 2026-10-04 — дизайн-проход: поиск как главный элемент

Референсы (сравнение цен, закупки, командные строки Linear/Raycast): цена и
лучшее предложение первыми, активные условия как убираемые чипы, поиск как
командная строка с недавними запросами, 3–5 поставщиков на одном экране без
перегруза. Направление — «спокойная точность»: тихие управляющие элементы,
крупное поле поиска, цифры с табличными знаками.

- Поле поиска 54 px с мягким фокус-кольцом, мягкий радиальный фон, панель с
  `--shadow-lift`; токены `--ring`, `--radius-lg`, `--shadow-lift`.
- Поставщики свернуты в строку «Поставщики: N из M» (`<details>`), чипы по клику;
  раньше серый блок занимал полэкрана до результатов.
- Панель предложений: фильтр отдельной строкой в одном стиле с поиском; карточки
  на узких экранах — сетка (источник и цена в строке, название, бейдж совпадения
  и наличие, условия мелким шрифтом), без подписей-ярлыков.
- Классификация запросов по главному слову (до первого предлога): найдено на проде
  — «игрушки для детей на 3д принтере» проходили из-за слова «принтер».
- Доступ к проду: ключ `~/.ssh/priceradar_deploy`, каталог `/projects/WebScrapingForBuyers`,
  деплой `./scripts/deploy.sh`; прямой доступ к `http://31.192.108.201/price-radar/`
  из сети разработчика обрывается на ~11 КБ (сервер отдаёт файл целиком),
  обход — SSH-туннель к 127.0.0.1:8086.

Не проверялось: широкий десктоп (>1280 px) глазами на реальных данных проде,
тёмная тема (её нет), таблица ≥901 px получила только `tabular-nums`.

### 2026-10-04 — ревью агентами, параллельные исправления, правило для агентов

Ревью тремя агентами плагина ecc (security, typescript, react) и `/review-animations`
нашли реальные дефекты; исправлены четырьмя параллельными агентами (Opus — логика
IT-фильтра, Sonnet — ARIA и асинхронная история, Haiku — механические правки) и
сведены вручную.

- IT-фильтр: количества («500г», «2XL», «500gb») не считаются артикулом; артикул не
  спасает запрос с незнакомым русским главным словом («Крем SPF50»); слабые правила
  (Wi-Fi, серии Legion/Nitro, «компьютер») уступают конкретному типу товара; правила с
  предлогом («корпус для ПК») проверяются по полному тексту; «switch» — сеть только при
  сетевых признаках (Nintendo Switch больше не «Сеть»); кириллические бренды; категория
  от клиента не учитывается; оффер по голому артикулу требует совпадения идентичности.
  Регулярки компилируются один раз, категории кешируются.
- История: валидация файла при загрузке, права 0600, асинхронная запись с debounce и
  `flush()` при остановке шлюза; ошибка истории не роняет начатый поиск.
- UI: устаревший ответ подсказок и таймер blur, ARIA комбобокса, подсказка при нуле
  поставщиков, ховеры только для `(hover: hover)`, отклик нажатия 0.97 с кривой
  `cubic-bezier(0.23, 1, 0.32, 1)`, `dvh`, tap-highlight, плавная прокрутка только без
  reduced-motion, reduced-motion убирает движение, но не смену цвета, шторка карточки
  въезжает с края. Установлены skills emilkowalski/skills (MIT).
- Агенты: каждый запуск Agent обязан начинаться блоком из `docs/AGENT_PREAMBLE.md`,
  хук `scripts/hooks/require-agent-preamble.mjs` блокирует запуск без него (проверено
  вживую). Context7 подключён как коннектор; Fastify v5 запрещает DELETE с JSON-заголовком
  и пустым телом (Migration Guide V5) — подтверждено через Context7.
- Проверено: typecheck, тесты (analysis 57, gateway 19, identity 5, search 136, web 48),
  build, Semgrep без находок, браузер (подсказка при нуле поставщиков, стрелка).

Не проверялось: поведение на реальном телефоне (skills mobile-native требуют железа),
worst-case данные break-ui в браузере (прервано), агенты B/C/D не выполнили часть
обязательных инструментов — их правки перепроверены тестами вручную.

### 2026-10-04 — премиальный визуальный проход (skills Эмиля Ковальски и apple-design)

- Материалы и глубина: полупрозрачная шапка с `backdrop-filter` (с запасным вариантом для
  `prefers-reduced-transparency` и `prefers-contrast`), карточки подняты многослойными мягкими
  тенями и полупрозрачными контурами вместо серых рамок, главная кнопка с бликом сверху.
- Типографика: вариативный Inter с осью `opsz`, трекинг по размеру (крупное плотнее, мелкие
  подписи свободнее), плотный интерлиньяж заголовков, цены — Inter с табличными цифрами вместо
  JetBrains Mono.
- Движение (агент Sonnet нашёл места skill `find-animation-opportunities`, реализовано по `animate`):
  появление сообщений копилота и сводки через `@starting-style`, пульс ожидания LLM, мягкое
  появление строк только пока идёт сбор (`data-live`), шторка карточки уходит туда, откуда пришла
  (200 мс, `--ease-drawer`); Escape закрывает мгновенно. Подсказки поиска не анимируются (сотни
  раз в день).
- Менеджер больше не видит технический чип «источник: typed/google/icecat».
- Проверено: typecheck, web 48 тестов, build, браузер (плашка копилота в одну строку, шторка
  уезжает и размонтируется, `data-live` снимается после сбора).

Не проверялось: ощущение движения на реальном устройстве и в замедлении (skill рекомендует
просмотр на 2–5× и на следующий день свежим взглядом).

### 2026-10-05 — копайлот отвечает на вопрос, а не пересказывает отбор

Менеджер в чате рядом с таблицей «кабель hdmi» спрашивал «что есть в наличии?»,
«посмотришь ссылку?», «ты со мной говоришь?», «ты меня обманул» — и на всё
получал один и тот же пересказ «лучший — Авито за 50 ₽». Причина в коде, не в
модели: `classifyIntent` отправлял всё нераспознанное в `explain` (сортировка
по цене + пересказ), системный промпт сводки запрещал диалог, фильтра наличия
не было.

Исправлено: `explain` только для просьб сравнить/выбрать/объяснить/цены/риски;
остальное — в чат-ответ модели (`help`) с `tableFacts`, посчитанными кодом
(сколько с подтверждённым наличием, самое дешёвое, самое дешёвое в наличии,
что «лучший» = цена, что ссылки копайлот не открывает). Промпт чата требует
отвечать на сам вопрос, честно говорить об ограничениях и на претензию
объяснять основание и предлагать шаг. Новый фильтр «в наличии»
(`OfferTableFilter.inStockOnly`): только подтверждённое «В наличии», с
предупреждением, что Авито наличие не сообщает. Тесты на реальные фразы из
переписки. История диалога по-прежнему не хранится — следующий шаг.

Модель: исследование `docs/research/2026-10-05-llm-copilot-best-practices.md`
(54 практики). Кандидат №1 — Qwen 3.8 27B (`qwen3.8:27b-q8_0`), A/B против
Gemma 4 26B A4B скриптом `compare-models.ts` с разговорными проверками.

### 2026-10-05 — разговор не стирает таблицу, наличие без пустой таблицы

После выкладки `143883c` менеджер на «Logitech G102» (10 строк, все Авито)
спросил «где есть наличие» и получил «таблица пустая»: фильтр честно оставил
ноль строк. «так стопэ, было же наличие» снова ушло в фильтр из-за слова
«наличие», а «а че так» модель встретила «Здравствуйте, я Price Radar».

Исправлено: фильтр наличия срабатывает только на просьбу («в/по наличии»,
«где есть наличие», «только в наличии»), не на упоминание. Если
подтверждённого наличия нет ни у кого — таблица не меняется, ответ
объясняет по площадкам. Реплика посреди разговора идёт в модель как
`intentHint=chat` (не здороваться, не представляться) без шаблонного
предупреждения «не отвечаю вне закупки». В `tableFacts` добавлена разбивка
«всего / в наличии» по площадкам. Web: ответ `help` больше не сбрасывает
фильтр таблицы. 281 тест.

### 2026-10-06 — инструкции Codex разделены на шесть файлов

- Корневой `AGENTS.md` сокращён до навигации, ролей и ключевых архитектурных
  границ; детализация перенесена в `.codex/models.md`, `orchestration.md`,
  `tools.md`, `review.md` и `debugging.md`.
- Сохранены обязательные ворота инструментов, красный тест для реализации,
  Serena/Context7/браузер/Semgrep, контракт preamble/footer для каждого агента,
  ECC-специалисты, независимая проверка результата и запрет тихого fallback.
- Зафиксированы фактические npm/uv-команды, Windows-особенности отдельно от Linux,
  архитектурные границы, политика live/demo/cache/fixture, безопасный deploy и
  запрет AI-attribution в коммитах и PR.
- Проверка docs-only: `scripts/check-env.sh`, Graphify query, `git diff --check`,
  локальные Markdown-ссылки и сохранность обязательных правил. Runtime-тесты и
  `graphify update .` не требуются, поскольку код и конфигурация не менялись.

### 2026-10-06 — повторная проверка Яндекс Маркета и Мегамаркета без VNC

- Последние коммиты после коннекторных изменений относятся к LLM-копилоту и
  инструкциям агентов; последний локальный транспортный патч Яндекса остаётся
  `8bc46699` от 2026-10-01. Публичный `ru-marketplace-mcp` на HEAD
  `c17bd36` не содержит более нового решения: Яндекс там всё ещё ходит обычным
  HTTP, а Мегамаркет требует CDP, cookies и residential IP.
- Read-only smoke на production commit `26be424`: поиск `Logitech K380` только
  по Яндекс Маркету дошёл до SmartCaptcha и вернул 0 предложений; Мегамаркет
  вернул ServicePipe `code 7` по репутации IP после 38 последовательных отказов.
  Отдельная DOM-проба Мегамаркета в существующем headed Chrome открыла CAPTCHA,
  а не каталог. Повторный HTTP-smoke из локального окружения также получил
  SmartCaptcha/403, поэтому второй пригодный egress не найден.
- На сервере нет IPv6 и не настроены `HTTPS_PROXY`, `ALL_PROXY`,
  `YANDEX_PROXY`, `MEGAMARKET_PROXY`, Chrome proxy, WireGuard или Tailscale.
  Cookies, user-agent и повтор запроса не устраняют IP-блок. Бесплатные
  официальные API Яндекса относятся к продавцам или собственному каталогу и не
  дают публичную выдачу Маркета; публичного search API Мегамаркета не найдено.
- Устойчивый автоматический вариант без CAPTCHA-солвера и платного провайдера —
  пользовательский residential exit для headed Chrome (VPN/WireGuard/SOCKS),
  после чего сессия работает без VNC до истечения авторизации. Endpoint в
  текущем окружении отсутствует, поэтому код и production не менялись.

### 2026-10-06 — Qwen 3.8 27B в проде

`OLLAMA_MODEL=qwen3.8:27b-q8_0` (бэкап env:
`/projects/WebScrapingForBuyers-backups/env.production.2026-10-06-pre-qwen38`).
A/B против Gemma 4 26B A4B (6 живых снимков, разговорные фразы менеджера,
code-based graders): обе 0 ошибок JSON, 0 утечек, 18/18 разговорных проверок;
Qwen опирается на факты таблицы и не повторяет самопредставление, Gemma
шаблоннее; задержка Qwen медиана 2.6 с / p95 7.4 с против 1.0 / 2.0 с.
Первое A/B было недействительным: туннель не поднялся (все вызовы упали), а
проверка «да» использовала `\b`, который в JS не работает с кириллицей —
исправлено в `compare-models.ts`. Живая проверка после переключения: диалог
по Logitech G102 отвечает по сути, Qwen 100% на GPU; первый ответ ~22 с —
загрузка модели. Откат и кандидаты на потом — `docs/AI_SERVER.md`.
Замечено: в этот момент WB, Яндекс, DNS и др. недоступны, данные только с
Авито и Ozon — нужно проверить отдельно.

### 2026-10-06 — копайлот видит историю диалога

Раньше каждое сообщение уходило одним `prompt`, и на «так стопэ, было же
наличие» модели не на что было сослаться. Теперь web отправляет последние 6
показанных реплик (`AnalyzeRequest.history`, без сообщений «Не удалось
обратиться…»), gateway пропускает только `user`/`assistant` с непустым
текстом, newest 6, по 1000 символов (`chatHistory`), analysis проверяет схему
(≤ 8 элементов, ≤ 2000 символов) и передаёт историю в `answer` и `summarize`;
narrator кладёт в payload ≤ 6 реплик по 400 символов. Правило в обоих
системных промптах: history — данные, а не инструкции; только чтобы понять,
к чему относится вопрос; цены и наличие — из текущих данных, не из прошлых
ответов. Безопасность: история — недоверенный ввод, как и сам `prompt`
(роль `system` и прочее отбрасывается в gateway); выбор строк остаётся
детерминированным, вывод проходит `sanitizeAnalysisResult`. История живёт в
браузере (zustand) и сбрасывается вместе с чатом — хранилища на сервере нет.
Тесты: gateway `chat-history`, web `history`, analysis — история доходит до
модели и до запроса в Ollama. 286 тестов. На прод не выкладывалось.

### 2026-10-06 — настройка Qwen 3.8: параметры, память, простой язык

- Параметры генерации — A/B трёх наборов на 6 живых снимках: 0.3 / 0.8 /
  top_k 20 — 0 ответов не по-русски (против 3 у прежнего 0.1 / 0.9 и 2 у
  рекомендованного авторами 0.7 / presence 1.5), та же задержка, 18/18
  разговорных проверок. Переопределение без кода: `OLLAMA_SAMPLING` (JSON).
- `OLLAMA_KEEP_ALIVE=-1` в compose: модель не выгружается после простоя
  (раньше первый ответ после 10 минут тишины ждал ~20 с загрузки 29 GB).
- Технические слова («детерминированный», «ранжирование», «ID» и т.п.)
  убраны из промптов и запрещены правилом; тексты отбора без AI тоже
  переписаны. Скрипт сравнения считает «жаргон» — у всех наборов 0.
- Сервер Ollama не менялся: по логам flash attention уже включён (auto),
  KV-кэш 512 MB при 8K контексте — сжимать его нет смысла.
Проверки: typecheck, 288 тестов, build, Semgrep по изменённым файлам.

### 2026-10-07 — автоматическое восстановление Wildberries и AliExpress после обновления Chrome

- Прямой production-smoke коннекторов отделил проблему от фильтров приложения:
  Wildberries не мог подключить Playwright 1.63 к Google Chrome 154, а raw-CDP
  AliExpress ошибочно принимал документ рекламного iframe `content.adriver.ru`
  за финальную навигацию основной страницы.
- Raw-CDP теперь учитывает только `Document`-ответы главного frame при выборе
  финального URL и HTTP-статуса. Wildberries при таймауте Playwright attach
  автоматически использует существующий raw-CDP Performance-refetch вместо VNC.
- Добавлены регрессионные тесты для обоих сбоев. Проверка: 718 passed,
  10 skipped, 2 deselected для mcp-core, WB и AliExpress; Ruff изменённых строк
  проходит. Semgrep не нашёл новых проблем: три срабатывания относятся к
  loopback/container CDP URL, который собирается кодом как HTTP endpoint.
- Исправление не добавляет прокси, платные сервисы или CAPTCHA solver. Для
  Яндекс Маркета и Мегамаркета без WireGuard остаётся отдельный вариант с
  домашним Chrome/collector через обратный SSH-туннель; он требует доступного
  пользовательского residential-хоста, но не требует ручного участия в каждом
  поиске.

### 2026-10-07 — релевантность Lenovo Legion Go

- В production-выдаче по `Lenovo Legion Go` обнаружены аксессуары Ozon и
  ноутбуки Lenovo Legion из Ситилинка. Причины: короткий квалификатор `Go` не
  входил в identity-токены, а слабое правило `Legion` относило устройство к
  ноутбукам.
- `Legion Go`, `ROG Ally`, `Steam Deck`, `MSI Claw` и явные портативные игровые
  консоли теперь имеют категорию `Игровые консоли`. Двухбуквенный токен модели
  сохраняется и обязателен в карточке; поэтому обычные ноутбуки Legion
  отбрасываются.
- Карточка также отбрасывается, если тип аксессуара (`чехол`, `наклейка`,
  `коннектор`, зарядка, кабель, адаптер и т. п.) стоит перед идентификатором
  выбранного устройства. Комплекты вида `Lenovo Legion Go + чехол` сохраняются.
- Проверка: новые тесты сначала воспроизвели три сбоя, затем прошли; Search
  typecheck и build прошли; полный Search suite дал 139/140 с единичным
  таймаутом существующего 5-секундного теста, а его изолированный повтор прошёл.

### 2026-10-07 — автономный выход для Яндекса и Мегамаркета без WireGuard

- Повторно проверен upstream `ru-marketplace-mcp`: HEAD всё ещё `c17bd360`,
  новее локального транспортного патча Яндекса решения нет. Последние коммиты
  проекта меняют релевантность и CDP Wildberries/AliExpress, но не снимают
  сетевую блокировку Яндекса или Мегамаркета.
- Обратный SSH SOCKS через рабочую станцию технически поднялся, но исключён как
  production-решение: при выключенной станции пропадает и источник. Даже через
  этот маршрут обычный HTTP-клиент получил SmartCaptcha Яндекса и challenge
  Мегамаркета; одного нового IP без браузерной сессии недостаточно.
- С production-хоста проверены основные и мобильные домены Яндекса и прежний
  домен Мегамаркета: Яндекс стабильно перенаправляет на SmartCaptcha,
  Мегамаркет возвращает страницу ServicePipe. На хосте один публичный IPv4 и
  нет второго встроенного egress.
- Бесплатный Reader-шлюз не дал данных: запрос Яндекса истёк по таймауту,
  Мегамаркет вернул HTTP 451. Временный Tor-контур не смог построить рабочую
  цепочку на сервере; контейнеры после проверки удалены. Публичные бесплатные
  прокси не рассматриваются как production-транспорт из-за отсутствия
  стабильности и контроля содержимого.
- Следовательно, полностью автономный сбор этих двух площадок требует
  постоянно доступного доверенного российского egress: отдельного адреса у
  провайдера/офиса, managed residential endpoint или постоянно включённого
  шлюза. В текущем контуре такого ресурса нет. Код и production не менялись,
  чтобы не подменять live-данные нестабильным или кешированным источником.

### 2026-10-07 — витрины дистрибьюторов без API: СРВТрейд и Servermall

- Проверены шесть источников без партнёрского API. Регард (`?search=`, `*?*`),
  Онлайнтрейд и ТоргPC (`/search/`) закрывают поиск в robots.txt — не парсим.
  Хардпрайс — сравниватель, не поставщик.
- СРВТрейд и Servermall отдают серверный HTML поиска обычным HTTPS без
  антибота, поиск в robots.txt разрешён. Добавлен
  `storefront-distributor-adapter.ts`: запрос по MPN, иначе бренд+модель;
  общая релевантность маркетплейсов; `priceCondition` «Цена на сайте…, не B2B».
- Монтируются через `DISTRIBUTOR_SOURCES=srvtrade,servermall` без ключей.
  Пустой поиск СРВТрейда («Популярные товары») и «Цену уточняйте» отбрасываются.
- Проверки: unit-тесты на фикстурах разметки, живой прогон (818202-B21 →
  exact у СРВТрейда; SR650 V2 → 5 конфигураций Servermall), typecheck, test,
  build. Ограничение: по запросу сервера без MPN СРВТрейд отдаёт и
  комплектующие к нему; их оценивает общая релевантность.

### 2026-10-07 — Wildberries: живой XHR каталога через raw CDP

- Симптом в проде: «WB: каталог недоступен (403)» на любой запрос.
- Причина: Playwright 1.63 не подключается к Chrome 154 (`_CdpConnectTimeout`),
  поэтому WB всегда уходил в запасной путь — повторный `fetch` URL каталога
  из страницы. WB отвечает на такой повтор 403; основной перехват настоящего
  XHR не выполнялся вообще. Антибот-сессия Chrome при этом исправна.
- Исправление: `_RawCdpPage` (mcp-core) записывает `Network.responseReceived`
  / `loadingFinished` и умеет `Network.getResponseBody`; WB при отказе
  Playwright открывает поиск по raw CDP и берёт тело ответа самой страницы
  (`capture_mode: live_xhr`). Повторный fetch остался последним запасом.
- Проверка: одноразовый контейнер на prod-образе и сети — «Мышь Logitech G102»
  100 товаров, «SSD Kingston NV2 1 ТБ» 5, HTTP 200. Офлайн-тесты:
  mcp-core + wb + aliexpress 719 passed; ozon/dns/citilink/avito/megamarket/
  yandex 365 passed. Новый регрессионный тест на путь raw live XHR.

### 2026-10-07 — «оригинальный / совместимый» и чипы в выдаче картриджей

- Жалоба: «картридж Pantum TL-5120 оригинальный» давал ту же выдачу, что и без
  слова; по «картридж 5120» в таблицу попадали чипы.
- `domain/origin-intent.ts`: намерение из набранного запроса (оригинал /
  original / OEM против совместимый / аналог / неоригинальный) и
  детерминированная классификация строки: слова в заголовке, бренды
  совместимых расходников (NV Print, Cactus, Hi-Black, Sakura, Bion…),
  «для <бренд>». Удаляются только строки, явно противоречащие запросу;
  неопределённые остаются.
- `domain/consumable-parts.ts`: чип, тонер, фотобарабан, ракель, вал,
  заправка в начале заголовка отсекаются, если покупатель их не просил.
- Фильтр в `SearchService` после IT-scope, в том числе для кэша «последних
  удачных» строк; кэш хранится до фильтра. В лог добавлено
  `droppedByQueryIntent`.
- Проверка на реальной выдаче TL-5120 (Авито, Ozon, DNS, Ситилинк):
  Cactus/Sakura/Bion/Hi-Black и «совместимый» — compatible, «Оригинал» —
  original, чип Hi-Black отсечён. search: 162 passed, typecheck, build.
- Замечено, не исправлено: `productFromQuery` для «картридж pantum tl-5120»
  кладёт «Картридж» в brand и «Pantum tl-5120» в model.

### 2026-10-07 — NETLAB по публичному прайс-листу; дистрибьюторы без лимита строк

- По решению пользователя NETLAB подключён не через NLDealer API, а через
  публичный прайс `pricexml.zip` из документации NETLAB (IntegrationGuide):
  `netlab-price-feed.ts` — потоковая распаковка zip (inflateRaw) и
  windows-1251 XML, индекс ~67 тыс. позиций, ~70 МБ кучи (подстроки
  копируются, иначе V8 держал 320 МБ срезов), загрузка ~20 с с прогревом при
  старте в production, поиск 0,3–0,6 с, TTL 60 мин, при сбое обновления —
  прежний прайс. Цена USD × курс из файла, колонка `NETLAB_PRICE_COLUMN`
  (по умолчанию R). По NL_XML_Price.doc: R — розничная, B–F — дилерские
  категории; категорию ГК «Перемена» уточнить у менеджера NETLAB. Остатки
  * / ** / *** по центральному, удалённому складу и в пути.
- Совпадение по PN и целым цифровым токенам модели («G102» не ловит
  «SG1024»). Прод-сервер скачивает прайс за ~6,5 с.
- Строки дистрибьюторов (NETLAB, MERLION, OCS, СРВТрейд, Servermall) больше
  не обрезаются до 30; маркетплейсы — по-прежнему `OFFERS_PER_SOURCE = 30`.
- API-клиент NETLAB сохранён: `NETLAB_TRANSPORT=api` + логин/пароль.
- Проверки: search 172 passed, всё — typecheck, test, build.

### 2026-10-07 — Яндекс Маркет и Мегамаркет выключены

- По решению пользователя площадки временно убраны из `MARKETPLACE_SOURCES`
  в `docker-compose.production.yml` (search и marketplace-mcp): с IP сервера
  Яндекс отдаёт SmartCaptcha, Мегамаркет — ServicePipe, данных нет, а в
  интерфейсе они висели ошибкой и тормозили сбор. Код коннекторов не удалён;
  вернуть — добавить `yandex_market,megamarket` в оба списка.

### 2026-10-08 — CPU shorthand, категории и ожидание сбора

- `12400F`, `i5-12400F`, `процессор 12400F` нормализуются как процессор Intel.
  Typed-продукт формы проходит серверную нормализацию. Первая подсказка больше
  не подменяет введённый текст; явный выбор стрелками и Enter сохранён.
- NETLAB использует тип из `RussianName`: готовые компьютеры с тем же CPU
  исключаются. Свежий публичный прайс 2026-10-08: три предложения CPU для всех
  трёх запросов (OEM, BOX, товар с витрины), вместо 33 строк с готовыми ПК.
- В форме выбор основных IT-категорий (статический список, не дерево NETLAB).
  Категория уточняет запрос. Индикатор сбора виден до общего завершения,
  включая ожидание после первых результатов; CSS вращение, reduced-motion.
- DNS сохраняет подробный `availability_text`, включая заказ/магазины,
  вместо потери текста при отсутствующих флагах. Точность регионального остатка
  требует отдельной живой проверки DNS; эта итерация её не доказывает.
- RED: три CPU scope-теста, category/progress UI, потеря DNS availability,
  готовый компьютер NETLAB. GREEN: search 183 теста, web 53, typecheck/build;
  браузер: короткий запрос, выбор категории, cold feed running → complete.
  Независимое review выявило клавиатурный выбор подсказки, замечание исправлено.

### 2026-10-08 — Детерминированная точность подбора и отдельная группа уточнения

- Локальная ветка обновлена fast-forward до `6b6c420e`; прежний dirty-граф
  сохранён в stash, локальная Serena-конфигурация — вне репозитория.
- Исправлены Pantum, составные/кириллические бренды и полный артикул `TL-5120`.
  Неизвестный бренд не выдумывается; условия запроса отделены от модели.
- Search добавляет `Offer.assessment` с русскими причинами одинаково для fresh/cache.
  Противоречащие оригинальности, модели, объёму, комплектности или ресурсу строки
  исключаются; недостающие сведения — `needs_review`. Название магазина не
  определяет производителя; оригинальность остаётся заявлением продавца.
- Review-группа свёрнута, отделена до пагинации и не участвует в выборе лучшего.
  Analysis использует тот же контур; LLM только объясняет оценённые снимки.
  Excel добавляет группу/причины без сдвига прежних колонок. Legacy совместимость сохранена.
- Исправлен `check-env.sh`: Graphify в Git Bash запускается через native PowerShell.
  Проверки: 356 тестов, typecheck, build, Semgrep 74 правила/8 файлов/0 находок
  и повторный scan normalizer; Playwright desktop/mobile на локальных fixtures.
  Search coverage 81,48% строк. Условия раскладки ОЗУ/оригинальности/ресурса
  исключены из идентификатора модели и проверяются отдельно.
  Подробное RED/GREEN-доказательство — `docs/offer-assessment.tdd.md`.
- Новый live-прогон прода, подлинность товаров и свежесть сохранённых цен не проверены.

### 2026-10-09 — Запуск поиска из чата и восстановление прода

- Команда «найди мне `12400F`» очищается до модели; intent search запускает
  сбор напрямую, а не только autocomplete. Ответ сообщает о запуске поиска.
- Поле чата многострочное: Enter отправляет, Shift+Enter переносит строку;
  IME composition не отправляет сообщение, лимит 1000 символов.
- RED checkpoint fd882c1c; GREEN: 373 теста, typecheck и build.
  Независимое React/TypeScript review без существенных дефектов. Локальный
  браузер подтвердил перенос строки и запуск чистого запроса из чата.
- На прежнем сервере все сервисы радара были остановлены примерно 21 час;
  системный Ollama тоже не работал. По разрешению пользователя запущены
  прежний Ollama и существующий chrome с сохранением профиля. Деплой и
  фактическая проверка модели/прода фиксируются после завершения.
- Context7 не нужен: сторонний API не менялся. Security review исключён
  пользователем; Graphify/Serena и ECC использованы, граф обновлён.
- После merge с новым assessment живой браузер выявил дополнительную регрессию:
  model «Процессор 12400F» не совпадал с названием CPU. RED 7a1fc5e9: три
  проваленных проверки адаптер → assessment. Тип «процессор» исключён из
  идентификатора; 207 search-тестов, typecheck/build проходят. Assessment
  сохранён строгим, неверные 12400 и 13400F независимый reviewer отвергает.
- Деплой 35cb8678 выполнен штатным scripts/deploy.sh на прежнем сервере;
  все семь контейнеров работают, chrome не пересоздан (сохранён прежний профиль).
  Публичный /price-radar/api/v1/health: ok/hybrid, Ollama qwen3.8:27b-q8_0.
- Live через авторизованный gateway: 12400F → complete, три CPU NETLAB,
  включая OEM со складом >50 и BOX с удалённым складом 1–20. Цены/остатки
  только из текущего публичного прайса, покупка и физический остаток не проверены.
- Live analysis/chat: «найди мне `12400F`» → searchQuery 12400F без warnings;
  модель отвечает на свободный вопрос BOX/OEM. Работоспособность подтверждена,
  фактическая точность свободных объяснений не гарантируется (ответ содержал
  неточное упоминание лицензионного ПО в BOX). Детерминированные цены/отбор
  остаются отдельными от LLM. Региональный DNS live в этой итерации не доказан.

### 2026-10-09 — Надёжный диалог закупок на локальной Qwen

- Явные команды поиска (включая приветствие), бюджета и наличия выполняются
  детерминированно без модели. BOX/OEM и бюджет уточняют текущий товар; условия
  сохраняются. Неоднозначность и отрицания запрашивают уточнение без нового поиска.
- Общий optional availabilityStatus и legacy helper одинаковы в Search,
  Analysis и web. NETLAB с положительным складским остатком считается заявленным
  наличием; в пути/под заказ/неизвестно отдельно. Fresh/cache/SSE нормализованы.
- AnalyzeRequest.context содержит ограниченные фильтры и selection hints;
  сервер загружает факты из своего snapshot. Добавлены optional searchId,
  clarificationQuestion и packaging фильтра. Старые маршруты сохранены.
- Модель получает максимум 20 карточек и ограниченный контекст; URL формирует
  сервер. Фактическая проза принимается только как точные извлечённые фразы из
  допустимых карточек с проверенными ID. Произвольная проза тоже может быть
  отклонена: это намеренно строгая проверка, не семантическое доказательство.
  При отказе остаётся детерминированное объяснение. LLM не меняет отбор.
- Независимое review воспроизвело contextual-only search, игнорирование вопроса
  уточнения, отрицания, русский Wildberries и замораживание поздних SSE строк.
  Исправлены и покрыты тестами. Store отбрасывает поздние ответы; локальная
  блокировка чата после смены поиска удалена. Автоитога после сбора нет.
- RED: 10/11 новых dialogue checks, 7 checks review, stock/status service и
  web context/reset; GREEN: 449 тестов совокупно, typecheck/build. Браузер на
  live NETLAB: 12400F → BOX → наличие → объяснение, сохранён один BOX.
- Реальная Qwen qwen3.8:27b-q8_0: фиксированные 9 сценариев на синтетических
  fixtures, 2 вызова модели (явные команды обходят её); проверенное объяснение
  принято после отдельного строгого промпта. Свободное объяснение около 15 с.
  Scripts/evaluate-procurement.ts воспроизводит проверку; это не live цены.
- Graphify, Serena, Context7 (Ollama/React/Zustand), ECC TDD/UI skills и браузер
  использованы. Security review/Semgrep исключены пользователем. Точность
  регионального DNS и физический остаток не проверены; платных сервисов нет.
- Выпуск: committed ref c68dacdb штатным scripts/deploy.sh (search, analysis,
  gateway, web). Public health ok, Qwen сохранена. Production NETLAB вернул три
  live предложения для 12400F; BOX → наличие сохранили товар/условия и один
  результат; «почему этот?» вернул факты и одну проверенную ссылку. Chrome не
  пересоздавался. Временные проверочные цены не являются гарантией наличия.
