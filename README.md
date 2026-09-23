# ПЕРЕМЕНА Price Radar — MVP

Внутренний прототип сервиса сравнения предложений для отдела закупок. Менеджер
вводит свободный запрос, уточняет модель, видит постепенную загрузку источников,
фильтрует результаты текстовым запросом и выгружает таблицу в Excel.

Инвентаризация GPU-сервера и выбор модели: [`docs/AI_SERVER.md`](docs/AI_SERVER.md).
Дизайн-система интерфейса: [`docs/STITCH.md`](docs/STITCH.md).
Слои фронта: [`docs/MSD.md`](docs/MSD.md).

> Все предложения в текущей версии генерируются демонстрационными адаптерами и
> явно помечены как демо. Прототип не выдаёт эти цены за данные магазинов.

## Запуск

Требуется Node.js 20+.

```bash
npm install
npm run dev
```

Интерфейс: http://localhost:5173  
API: http://localhost:3001/api/v1/health

Адрес развёрнутого MVP задаётся отдельно и не хранится в публичном репозитории.

Проверка:

```bash
npm test
npm run typecheck
npm run build
```

## Архитектура

```text
apps/web                    MSD: pages / widgets / features / entities / composition / shared
apps/gateway                публичный /api/v1, cookie, RBAC
apps/identity               вход и настройки пользователя
apps/search                 каталог, SourceAdapter, SSE, Excel
apps/analysis               детерминированный отбор + Ollama
packages/contracts          общие TypeScript-контракты
packages/service-kit        Fastify bootstrap
```

Зависимости направлены внутрь: `apps/search` знает интерфейс `SourceAdapter`,
но не знает, откуда приходят предложения. Парсинг конкретного сайта нельзя
класть в gateway, identity, analysis или web.

Хранилище MVP находится в памяти процесса. Следующий эксплуатационный контур:

- PostgreSQL для каталога, настроек и краткосрочных результатов;
- Redis + BullMQ для распределённого сбора, повторов и лимитов;
- отдельный worker-процесс для адаптеров;
- аутентификация и роли;
- OpenTelemetry, метрики свежести и ошибок источников;
- OpenAI-совместимый gateway к локальной модели.

## Вход

Роли `manager` и `admin`. Менеджер не видит коннекторы и сырые логи источников.
Админ видит панель коннекторов, статусы и VNC/ssh в `source.message`.
Прогрев антибота — только VNC (`docs/CHROME_VNC.md`), не ссылки на витрину в UI.
Учётные записи задаются через `AUTH_USERS` и `AUTH_SECRET`, см. `.env.example`.
Для локального запуска замените безопасные заглушки в `.env.example`; не
используйте демонстрационные значения в production.

## API MVP

- `POST /api/v1/auth/login`, `GET /api/v1/auth/me`, `PATCH /api/v1/auth/settings`
- `POST /api/v1/suggestions` — уточнение модели;
- `POST /api/v1/searches` — запуск сбора;
- `GET /api/v1/searches/:id/events` — поток обновлений SSE;
- `GET /api/v1/searches/:id` — текущий снимок;
- `POST /api/v1/searches/:id/analyze` — программный анализ критериев;
- `GET /api/v1/searches/:id/export.xlsx` — экспорт Excel.

## Подключение реального источника

Реализуйте `SourceAdapter` в `apps/search/src/infrastructure/sources`, преобразуйте
ответ источника в общий `Offer` и передайте экземпляр в `buildSearchApp`. Учётные
данные должны поступать только через переменные окружения или secret manager.
Для партнёрских API сначала нужны выданная поставщиком документация и доступ.

## Текущий серверный MVP

На GPU-сервере проект находится в `/projects/WebScrapingForBuyers`, а
MIT-коннекторы — в `/projects/ru-marketplace-mcp`. Production-контур запускается:

```bash
cd /projects/WebScrapingForBuyers
docker compose --env-file .env.production -f docker-compose.production.yml up -d --build
```

Пересборка search/analysis **без** recreate Chrome (профиль `chrome-headed`):

```bash
docker compose --env-file .env.production -f docker-compose.production.yml \
  up -d --no-deps --build search analysis
```

- Wildberries, Яндекс Маркет, Ozon, DNS, Мегамаркет, Ситилинк и Авито
  подключены через `Vladimir-Human/ru-marketplace-mcp` 2.4.2 по MCP.
  Для Wildberries есть прямой HTTP-запас, если MCP молчит.
- Ozon, DNS, Ситилинк, Авито, Яндекс и Мегамаркет опираются на headed Chrome
  + CDP (`172.29.0.10:9222`, профиль `chrome-headed`). Chrome 154 слушает
  DevTools только на localhost:9221; `cdp-proxy` отдаёт `0.0.0.0:9222`.
  Challenge один раз вручную: `./scripts/chrome-vnc-tunnel.sh` или
  `ssh -L 5901:127.0.0.1:5901`, VNC на `127.0.0.1:5901`, открыть
  avito.ru / ozon.ru / dns-shop.ru / citilink.ru / market.yandex.ru /
  megamarket.ru. Пошагово: [`docs/CHROME_VNC.md`](docs/CHROME_VNC.md).
  `CHROME_CHALLENGE_HANDOFF_S=120` держит вкладку челленджа для VNC,
  капчу не решает. Search не `depends_on` chrome — обычный `--build search`
  больше не пересоздаёт сессию.
- Яндекс Маркет может отклонять серверный IP капчей/редиректом; это ошибка
  источника, а не отсутствие товара.
- Платный Apify-fallback уже прописан, но выключен (`APIFY_ENABLED=false`):
  Ozon — `zen-studio/ozon-scraper-pro`, Яндекс Маркет —
  `zen-studio/yandex-market-scraper-parser`, DNS —
  `crawlerbros/dns-shop-scraper`, Мегамаркет —
  `crawlerbros/megamarket-scraper`. Включается только с `APIFY_TOKEN` и лимитом
  `APIFY_MAX_CHARGE_USD`. Мегамаркет перед постоянным включением нужен пилот.
- MERLION, NETLAB и OCS остаются явно помеченными демонстрационными адаптерами
  до получения API/прайсов.
- Аналитическое объяснение формирует уже установленная локальная Qwen3 через
  Ollama. Фильтрация и выбор строк выполняются детерминированным кодом.
