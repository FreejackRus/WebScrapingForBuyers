#!/bin/bash
set -euo pipefail

export DISPLAY="${DISPLAY:-:99}"
mkdir -p /profile
# Only Chrome singleton sockets. Do not wipe Cookies, Local Storage, or
# the rest of /profile — that volume is the headed warmup session.
rm -f /profile/SingletonLock /profile/SingletonCookie /profile/SingletonSocket

Xvfb "${DISPLAY}" -screen 0 1920x1080x24 -ac +extension RANDR >/tmp/xvfb.log 2>&1 &
sleep 0.4
x11vnc -display "${DISPLAY}" -forever -shared -rfbport 5900 -nopw -listen 0.0.0.0 >/tmp/x11vnc.log 2>&1 &

google-chrome-stable \
  --no-sandbox \
  --disable-dev-shm-usage \
  --disable-gpu \
  --remote-debugging-port=9221 \
  --remote-debugging-address=127.0.0.1 \
  --remote-allow-origins=* \
  --user-data-dir=/profile \
  --no-first-run \
  --no-default-browser-check \
  --disable-features=TranslateUI \
  --disable-background-networking \
  --password-store=basic \
  about:blank &
chrome_pid=$!

for _ in $(seq 1 80); do
  if curl -sf "http://127.0.0.1:9221/json/version" >/dev/null; then
    break
  fi
  sleep 0.25
done

python3 /cdp-proxy.py >/tmp/cdp-proxy.log 2>&1 &
wait "${chrome_pid}"
