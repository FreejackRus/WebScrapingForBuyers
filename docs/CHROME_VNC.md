# Headed Chrome + VNC (прогрев антибота)

Операторский контур. Коннекторы и сырой `source.message` (IP, SSH, VNC)
видны только администратору (`presentSnapshot` режет `message` у менеджера).
Менеджер панель коннекторов не видит. Прогрев — VNC в headed Chrome, не
ссылка на витрину в локальном браузере.

Капча не решается автоматически. Нет spfa, 2captcha, CapSolver и платных кук.

## Порты

| Куда | Где | Зачем |
|---|---|---|
| Chrome DevTools | контейнер `127.0.0.1:9221` | Chrome 154 слушает только localhost |
| cdp-proxy | `0.0.0.0:9222`, в сети `172.29.0.10:9222` | MCP (`CHROME_CDP_HOST`) |
| VNC | хост `127.0.0.1:5901` → контейнер `:5900` | ручной challenge |

Профиль: том `chrome-headed` → `/profile`. Куки не стирать.
Entrypoint снимает только `SingletonLock` / `SingletonCookie` / `SingletonSocket`,
иначе Chrome 154 не поднимает DevTools после recreate.

`CHROME_CHALLENGE_HANDOFF_S=120` в `marketplace-mcp` держит вкладку челленджа
до двух минут (лимит MCP — 300 с). Это не солвер: пройти проверку нужно в VNC,
затем повторить тот же поиск в той же сессии.

## На самом сервере (Ubuntu 24.04)

VNC слушает только loopback: `127.0.0.1:5901` → контейнер `:5900`.
Нужен графический сеанс (монитор, KVM, локальный GNOME). Подключаться
к **Docker Chrome**, не к Firefox/Chrome хоста.

```bash
sudo apt-get install -y remmina remmina-plugin-vnc
# или: sudo apt-get install -y tigervnc-viewer
# или: sudo apt-get install -y xtightvncviewer
```

Клиентом открыть `127.0.0.1:5901` (без пароля на loopback). Дальше —
те же витрины, что ниже. Без GUI на сервере — путь с ноутбука.

## С рабочего компьютера

Основной путь: сидите за своим Linux, не за консолью GPU-сервера.
Скрипт читает хост/пользователя из локального `.env.server` и не печатает пароль.

```bash
./scripts/chrome-vnc-tunnel.sh
```

После пароля **это окно останется пустым** — так и должно быть: `ssh -N`
держит форвард и ничего не печатает. Не закрывайте его. В **другом**
терминале:

```bash
vncviewer 127.0.0.1:5901
```

Чтобы скрипт не спрашивал пароль (читает `AI_SERVER_PASSWORD` из
`.env.server` через `sshpass -e`, пароль в stdout не попадает):

```bash
sudo apt-get install -y sshpass
```

Если `vncviewer` нет:

```bash
sudo apt-get install -y tigervnc-viewer
# или: sudo apt-get install -y remmina remmina-plugin-vnc
# или: sudo apt-get install -y xtightvncviewer
```

Или вручную (`USER`/`HOST` из `.env.server`, пароль не копировать в историю):

```bash
ssh -N -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 \
  -o ConnectTimeout=15 -L 5901:127.0.0.1:5901 USER@HOST
```

Открыть **VNC** `127.0.0.1:5901` (x11vnc `-nopw`, пароль не спрашивает).
Сайты открывать **в этом удалённом Chrome**, не в локальном Firefox/Chrome —
локальный браузер профиль `chrome-headed` не греет.

По одному разу пройти проверку, если она есть:

- https://www.avito.ru
- https://www.ozon.ru
- https://www.dns-shop.ru
- https://www.citilink.ru
- https://market.yandex.ru
- https://megamarket.ru

Затем один повтор поиска в приложении. Не входить в банки, почту и рабочие
аккаунты — профиль только для витрин.

После прогрева **не** пересоздавать сервис `chrome` (`up --build` без
`--no-deps` раньше сносил сессию через `depends_on`). Сборку search/analysis:

```bash
docker compose --env-file .env.production -f docker-compose.production.yml \
  up -d --no-deps --build search analysis
```

MCP с новым env (handoff), без Chrome:

```bash
docker compose --env-file .env.production -f docker-compose.production.yml \
  up -d --no-deps marketplace-mcp
```

Chrome трогать только если менялся `deploy/chrome`.

## Что не поможет

- Повтор поиска при `429`, `cdp_blocked`, Qrator `401`, ServicePipe, Yandex `302`,
  Мегамаркет `405` nginx (WAF). Avito `439` после уже успешного VNC — не вечный
  блок: адаптер сам повторяет `avito_search` один раз (MCP открывает avito.ru/
  и затем `js/items`). Если снова 439 — в VNC пройти PoW на вкладке, затем
  **один** повтор поиска. Не долбить.
- Жилой RU-IP (`AVITO_PROXY` / `OZON_PROXY` в MCP) — отдельное решение, в compose
  не задан. Без него headed + VNC остаётся основным рычагом.
