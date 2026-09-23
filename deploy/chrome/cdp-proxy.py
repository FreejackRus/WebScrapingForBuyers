#!/usr/bin/env python3
"""Expose Chrome DevTools on 0.0.0.0 and rewrite advertised websocket hosts."""

from __future__ import annotations

import os
import socket
import threading

UPSTREAM_HOST = "127.0.0.1"
UPSTREAM_PORT = int(os.environ.get("CDP_UPSTREAM_PORT", "9221"))
LISTEN_PORT = int(os.environ.get("CDP_LISTEN_PORT", "9222"))
ADVERTISE = os.environ.get("CDP_ADVERTISE_HOST", "172.29.0.10")


def pipe(src: socket.socket, dst: socket.socket) -> None:
    try:
        while True:
            chunk = src.recv(65536)
            if not chunk:
                break
            dst.sendall(chunk)
    except OSError:
        pass
    finally:
        try:
            dst.shutdown(socket.SHUT_WR)
        except OSError:
            pass


def read_headers(sock: socket.socket) -> bytes:
    data = b""
    while b"\r\n\r\n" not in data:
        chunk = sock.recv(4096)
        if not chunk:
            break
        data += chunk
        if len(data) > 1024 * 1024:
            break
    return data


def rewrite_payload(payload: bytes) -> bytes:
    text = payload.decode("utf-8", errors="replace")
    text = text.replace(f"ws://127.0.0.1:{UPSTREAM_PORT}", f"ws://{ADVERTISE}:{LISTEN_PORT}")
    text = text.replace(f"ws://localhost:{UPSTREAM_PORT}", f"ws://{ADVERTISE}:{LISTEN_PORT}")
    text = text.replace(f"ws://127.0.0.1:{LISTEN_PORT}", f"ws://{ADVERTISE}:{LISTEN_PORT}")
    return text.encode("utf-8")


def split_http(raw: bytes) -> tuple[bytes, bytes, dict[str, str], bytes]:
    header_blob, _, rest = raw.partition(b"\r\n\r\n")
    lines = header_blob.split(b"\r\n")
    start = lines[0] if lines else b""
    headers: dict[str, str] = {}
    for line in lines[1:]:
        if b":" not in line:
            continue
        key, value = line.split(b":", 1)
        headers[key.decode("latin1").lower()] = value.decode("latin1").strip()
    return start, header_blob, headers, rest


def handle_client(client: socket.socket) -> None:
    try:
        raw = read_headers(client)
        if not raw:
            return
        start, header_blob, headers, rest = split_http(raw)
        length = int(headers.get("content-length", "0") or "0")
        while len(rest) < length:
            chunk = client.recv(length - len(rest))
            if not chunk:
                break
            rest += chunk
        request = header_blob + b"\r\n\r\n" + rest
        request = request.replace(
            f"Host: {ADVERTISE}:{LISTEN_PORT}".encode(),
            f"Host: {UPSTREAM_HOST}:{UPSTREAM_PORT}".encode(),
        )
        request = request.replace(
            f"Host: {ADVERTISE}".encode(),
            f"Host: {UPSTREAM_HOST}:{UPSTREAM_PORT}".encode(),
        )
        upstream = socket.create_connection((UPSTREAM_HOST, UPSTREAM_PORT), timeout=8)
        upstream.sendall(request)
        if headers.get("upgrade", "").lower() == "websocket":
            threading.Thread(target=pipe, args=(client, upstream), daemon=True).start()
            pipe(upstream, client)
            return
        response = read_headers(upstream)
        start_line, resp_headers_blob, resp_headers, body = split_http(response)
        resp_length = int(resp_headers.get("content-length", "0") or "0")
        while len(body) < resp_length:
            chunk = upstream.recv(resp_length - len(body))
            if not chunk:
                break
            body += chunk
        if not resp_length:
            while True:
                chunk = upstream.recv(65536)
                if not chunk:
                    break
                body += chunk
        path = start.decode("latin1", errors="replace")
        content_type = resp_headers.get("content-type", "")
        if "json" in content_type or "/json" in path:
            body = rewrite_payload(body)
        skip = {b"content-length", b"transfer-encoding", b"connection"}
        out_lines = [start_line]
        for line in resp_headers_blob.split(b"\r\n")[1:]:
            if b":" not in line:
                continue
            key = line.split(b":", 1)[0].lower()
            if key in skip:
                continue
            out_lines.append(line)
        out_lines.append(f"Content-Length: {len(body)}".encode())
        out_lines.append(b"Connection: close")
        client.sendall(b"\r\n".join(out_lines) + b"\r\n\r\n" + body)
        upstream.close()
    except OSError:
        pass
    finally:
        try:
            client.close()
        except OSError:
            pass


def main() -> None:
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(("0.0.0.0", LISTEN_PORT))
    server.listen(64)
    print(
        f"cdp-proxy 0.0.0.0:{LISTEN_PORT} -> {UPSTREAM_HOST}:{UPSTREAM_PORT} advertise {ADVERTISE}",
        flush=True,
    )
    while True:
        client, _addr = server.accept()
        threading.Thread(target=handle_client, args=(client,), daemon=True).start()


if __name__ == "__main__":
    main()
