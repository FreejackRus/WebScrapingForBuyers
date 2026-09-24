# Stitch + бренд PEREMENA

Дизайн-система Stitch **PEREMENA Digital**: `assets/15671525545677379912`.
Сидирующий цвет `#2569ED`, Inter, light, fidelity. Палитра передана в Stitch
через `customColor` / `overridePrimary`, экраны собираются с `designSystem`.

Старый emerald/indigo Enterprise DS `assets/113dc57828514a76a9ff1e05fbf96264`
не использовать.

## MCP (Cursor)

Секрет только в gitignored файлах (не коммитить):

- `.env.stitch` — `STITCH_API_KEY=…` (также дублируется в `.env.server`)
- `.cursor/mcp.json` — HTTP MCP к `https://stitch.googleapis.com/mcp`

Пример (в репозитории):

- `.env.stitch.example`
- `.cursor/mcp.json.example` — header `X-Goog-Api-Key`: `${STITCH_API_KEY}`

После правки `.cursor/mcp.json` перезапустите Cursor / MCP servers.
Ключи в логи, коммиты и `PROJECT_CONTEXT` не писать.

Если Stitch MCP namespace не появляется в Cursor, тот же ключ работает через
HTTP: `GET https://stitch.googleapis.com/v1/projects/{id}/screens` и
JSON-RPC `tools/call` на `https://stitch.googleapis.com/mcp`.

Официальный знак — графический вордмарк, не наборные буквы.
Ассет: `projects/3120249908671992679/screens/6059391154288979469`
(«PEREMENA Official Wordmark»). На экранах только `<img>` этого знака.

Полные правила знака: [`docs/BRAND.md`](BRAND.md).

## Актуальные экраны

Проект: `projects/3120249908671992679`.

| Экран | ID | Viewport |
| --- | --- | --- |
| Официальный вордмарк | `6059391154288979469` | IMAGE |
| Рабочее место с боковым чатом | `9a70cf57395b4e5492f1872e167a3fd7` | DESKTOP |
| Поиск с автокомплитом (live) | `568b7d9653a244eca3758394b0cf1ef1` | DESKTOP |
| Price Radar Enterprise, PEREMENA Digital | `890cda6847ae4327afa807ea830f0231` | DESKTOP |
| Вход в систему | `1d4f58b518d54b649cdee88e9c93d02f` | DESKTOP |
| Мобильный интерфейс менеджера | `d028549d8cbe41678a6b44ae609d7d4a` | MOBILE |
| Мобильный вход | `6f54d513b9174b6fb16efc205d8dbdc8` | MOBILE |
| Мобильные настройки / профиль | `694b41de9c21419a9b720fa3ef0ceac0` | MOBILE |

Снимки и HTML: `docs/stitch-screens/` (`mobile.html`, `mobile-login.html`,
`mobile-settings.html`).

## Принцип

Светлый корпоративный контур: белые карточки на `#F4F6F8`, графитовый текст,
акцент **PEREMENA Blue `#2569ED`**. AI-копайлот сидит на `#EAF2FF` и использует
тот же синий, не indigo.

## Токены из DS

- Шрифты: Inter, JetBrains Mono — только UI, не логотип
- Brand: `#2569ED` / hover `#1D4FC4` / soft `#EAF2FF` / 50 `#F4F8FF` / 200 `#C7DCFE`
- Текст: `#181C24` / вторичный `#6F7782`
- Фон: `#F4F6F8` / поверхности `#FFFFFF`

## Мобильный UI в приложении — 2026-09-24

Реализованы responsive-макеты ≤720px по Stitch MOBILE:

- нижняя навигация Радар / Закупки (disabled MVP) / AI Копилот / Профиль;
- порядок блоков: поиск → номенклатура+метрики → копайлот → карточки офферов;
- карточки предложений с бейджем «Лучший выбор» и CTA «К офферу»;
- компактный topbar (вордмарк, регион-chip, аватар).
- вкладка AI Копилот скрывает поиск и таблицу, оставляя композер;
- поиск: поле + «Найти» в один ряд, 16px input, tap ≥44px;
- боковой чат на desktop/tablet ≥900px (Stitch `9a70cf57395b4e5492f1872e167a3fd7`),
  таблица не сжимается — горизонтальный скролл внутри `.table-wrap`.

Не реализованные в приложении действия из макетов (корзина, 44-ФЗ и протокол
НМЦК) не добавлены.
