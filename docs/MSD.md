# Modular Sliced Design во фронте

Источник: [Был FSD — стал MSD](https://habr.com/ru/companies/sberbank/articles/959400/)
(СберТех, Platform V Kintsugi). Zustand — выбранный стор, как в статье.

## Слои

| Слой | Что здесь | Чего нет |
| --- | --- | --- |
| `app` | `main.tsx`, `App.tsx`, первый рендер | тема, бизнес-UI |
| `pages` | `модуль/действие/ui` — собирают только виджеты | формы, таблицы, сторы |
| `widgets` | крупные блоки экрана (`user/topbar`, `search/workspace`) | расчёт закупки |
| `features` | пользовательские действия без экрана (`login`, `start`) | вёрстка страниц |
| `entities` | `api` / `store` / `types` / `lib`, без UI | компоненты |
| `composition` | `layer` (шеллы), `hooks`, `settings` (вид приложения) | доменные расчёты |
| `shared` | `api`, `lib`, `config`, `theme` — переносимо в другой проект | сущности Price Radar |

## Семантика папок

У `pages`, `widgets`, `features` и `entities` одинаковый каркас: модуль → действие →
публичный `index.ts`. Страница переименовывает UI при экспорте:

```ts
export { Monitor as SearchMonitorPage } from "./ui";
```

Pages не импортируют `entities` и `features` напрямую, кроме редкого исключения
из статьи. Сейчас исключений нет: вход, поиск и настройки собирают только виджеты.

## Связь с бэкендом

MSD описывает только `apps/web`. Бэкенд — отдельные процессы gateway / identity /
search / analysis. Публичный контракт остаётся `/api/v1`.
