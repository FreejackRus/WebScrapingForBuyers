# Блок для запросов к агентам

Вставляйте этот блок **первым** в `prompt` каждого вызова инструмента Agent (правило в `AGENTS.md`, раздел «Жёсткое правило для агентов»). Хук `scripts/hooks/require-agent-preamble.mjs` проверяет маркер `[ОБЯЗАТЕЛЬНЫЕ ИНСТРУМЕНТЫ]` и не запускает агента без него.

```text
[ОБЯЗАТЕЛЬНЫЕ ИНСТРУМЕНТЫ]
Проект: D:\work\WebScrapingForBuyers. Прочитай AGENTS.md (разделы «Жёсткое правило…»). Перед работой:
1. Graphify: `graphify query "<вопрос>"` / `graphify explain "<символ>"` до чтения исходников (если `graphify update` не стартует, запускай через `python -m graphify` из uv tool).
2. Skills: загрузи подходящие задаче через Skill (tdd-workflow; для UI frontend-design-direction, frontend-a11y, emil-design-eng, mobile-native; для безопасности security-review; в конце verification-gate).
3. Serena: activate_project, затем get_symbols_overview / find_symbol вместо чтения больших файлов.
4. Context7: для любой сторонней библиотеки, SDK или API бери актуальную документацию, версию смотри в package.json. Если Context7 недоступен, остановись и сообщи, не отвечай по памяти.
5. Semgrep для безопасности, встроенный браузер для проверки UI.
Недоступный инструмент не повод обойтись молча: сообщи о нём.
Итог оканчивай строкой:
Использовано: skills=[...]; mcp=[...]; graphify=да/нет; не использовано: <что и почему>
[/ОБЯЗАТЕЛЬНЫЕ ИНСТРУМЕНТЫ]
```
