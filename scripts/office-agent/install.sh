#!/usr/bin/env bash
# Installs the Price Radar office agent on an office Linux machine (systemd user services).
#   AGENT_SERVER=root@<server> ./install.sh
# Then add the printed public key on the server (see README.md) — once.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
server="${AGENT_SERVER:?Set AGENT_SERVER=user@host of the Price Radar server}"
key="$HOME/.ssh/price_radar_tunnel"
units="$HOME/.config/systemd/user"

command -v node >/dev/null || { echo "Нужен Node.js 20+"; exit 1; }
[ -x "${AGENT_CHROME:-/usr/bin/google-chrome}" ] || { echo "Нужен Google Chrome (${AGENT_CHROME:-/usr/bin/google-chrome})"; exit 1; }
(cd "$here" && npm install --no-audit --no-fund --omit=dev >/dev/null)

mkdir -p "$HOME/.ssh" "$units"
[ -f "$key" ] || ssh-keygen -q -t ed25519 -N "" -C "price-radar-office-agent@$(hostname)" -f "$key"

cat > "$units/price-radar-agent.service" <<UNIT
[Unit]
Description=Price Radar office agent (Citilink from the office IP)
After=network-online.target

[Service]
WorkingDirectory=$here
ExecStart=$(command -v node) $here/citilink-agent.mjs
Environment=AGENT_PORT=18091
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
UNIT

cat > "$units/price-radar-tunnel.service" <<UNIT
[Unit]
Description=Price Radar reverse tunnel: server 127.0.0.1:18091 -> office agent
After=network-online.target price-radar-agent.service

[Service]
ExecStart=/usr/bin/ssh -N -i $key -o IdentitiesOnly=yes -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=3 -o StrictHostKeyChecking=accept-new -R 127.0.0.1:18091:127.0.0.1:18091 $server
Restart=always
RestartSec=15

[Install]
WantedBy=default.target
UNIT

systemctl --user daemon-reload
systemctl --user enable --now price-radar-agent.service price-radar-tunnel.service
# Keep the services running after logout (may need admin rights; harmless if refused).
loginctl enable-linger "$USER" 2>/dev/null || echo "Не удалось включить linger: агент работает, пока пользователь в системе."

echo
echo "Строка для ~/.ssh/authorized_keys на сервере (только туннель, без shell):"
echo "restrict,port-forwarding,permitlisten=\"127.0.0.1:18091\",command=\"/bin/false\" $(cat "$key.pub")"
