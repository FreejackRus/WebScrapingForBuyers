# Диагностика

Поток: `Astra → Terra investigation → Astra hypothesis → Sol fix → verify →
specialist review → Astra`. Не начинайте со спекулятивной правки. Соберите ошибку,
stack trace, релевантные логи, путь исполнения, символы, конфигурацию, версию
зависимости, недавний diff, репродукцию и отличие окружений.

Назовите место отказа, причину, нарушенный инвариант и риск. Исправляйте минимально:
не скрывайте ошибку, не ослабляйте тест, не добавляйте посторонний рефакторинг.
Для dependency behaviour обязателен Context7, символов — Serena, архитектуры —
Graphify, UI — браузер.

## Локальная карта

`npm run dev` запускает gateway `:3001`, identity `:3002`, search `:3003`,
analysis `:3004`, web `:5173`; health gateway — `/api/v1/health`. Хранилище
MVP в памяти: БД и migration reset нет. Точные npm/uv-команды — в `tools.md`.

## Источники и Chrome

Различайте transport/parser failure, отсутствующий опциональный ключ, anti-bot
challenge, cache/stub/demo/fixture и фактический пустой live-ответ. Challenge —
недоступный источник, не отсутствие товара; не закрывайте его fake offers.
Wildberries может иметь direct HTTP fallback при отказе MCP; остальное установите
из кода и тестов.

Headed Chrome, CDP и ручной VNC-flow — в `docs/CHROME_VNC.md`. Обычный deploy
search/MCP не пересоздаёт Chrome и сохраняет `chrome-headed`. Первый запуск/rebuild
только по явному запросу. Captcha solver нет. Менеджер получает безопасное
сообщение, без connector/VNC/CDP деталей и raw logs.

## LLM, сервер и секреты

Для LLM-сбоя прочитайте `docs/AI_SERVER.md` и подтвердите настроенную модель:
старый кандидат мог быть заменён. Проверяйте детерминированный анализ и тесты;
текст LLM не является авторитетом. GPU-сервер по умолчанию исследуется read-only.

Не выводите `.env.server`, реальные ключи или `.cursor/mcp.json`. Не записывайте
адреса, VNC endpoint и credentials в issue, prompt или journal.

## Окружение

`scripts/check-env.sh` не проверяет сеть, авторизацию и пригодность MCP. Проверяйте
обязательный capability вызовом; сломанный сначала восстановите, не начинайте
зависящую правку.

Windows-особенности Serena, Graphify и symlink — в `tools.md`; не переносите
Windows-пути на Linux. Timeout plugin-копии не доказывает отказ `serena-local`.
Не используйте destructive checkout/reset для symlink или graph при local changes.

Прод-диагностика read-only. Изменение идёт через local commit, push и
`scripts/deploy.sh`, который останавливается при tracked local edits. Отчёт
содержит репродукцию, root cause, файлы, команды и непроверенное.

