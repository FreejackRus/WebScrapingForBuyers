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
