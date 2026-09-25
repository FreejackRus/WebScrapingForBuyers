"""Local Avito firewallPow for JSON HTTP 439.

Avito's items XHR can return ``{"pow_challenge": "..."}`` instead of HTML.
The browser then POSTs ``/web/3/firewallPow/get``, finds a SHA-256 nonce
for ``id:nonce`` from the JWT, and POSTs ``/web/3/firewallPow/verify``.

This module only does that client-side transform. It does not talk to
GeeTest, QRATOR, paid captcha APIs, or log challenge/JWT/nonce values.
"""

from __future__ import annotations

import base64
import hashlib
import json
from typing import Any

POW_GET_PATH = "/web/3/firewallPow/get"
POW_VERIFY_PATH = "/web/3/firewallPow/verify"
DEFAULT_MAX_NONCE = 5_000_000


def pow_challenge_from_body(body: str) -> str | None:
    """Return the JSON 439 challenge, or None when the body is HTML/other."""
    stripped = body.lstrip()
    if not stripped.startswith("{"):
        return None
    try:
        payload: Any = json.loads(stripped)
    except json.JSONDecodeError:
        return None
    challenge = payload.get("pow_challenge") if isinstance(payload, dict) else None
    if isinstance(challenge, str) and challenge:
        return challenge
    return None


def decode_pow_params(challenge_jwt: str) -> tuple[str, int]:
    """Read ``id`` and ``compl`` from JWT payload segment 2. No signature check."""
    parts = challenge_jwt.split(".")
    if len(parts) < 2:
        raise ValueError("invalid JWT")
    padded = parts[1] + "=" * (-len(parts[1]) % 4)
    raw = base64.urlsafe_b64decode(padded)
    payload = json.loads(raw)
    if not isinstance(payload, dict):
        raise ValueError("invalid JWT payload")
    challenge_id = payload.get("id")
    complexity = payload.get("compl")
    if not isinstance(challenge_id, str) or not isinstance(complexity, int) or isinstance(complexity, bool):
        raise ValueError("invalid JWT payload fields")
    if complexity < 0:
        raise ValueError("invalid complexity")
    return challenge_id, complexity


def find_pow_nonce(challenge_id: str, complexity: int, *, max_nonce: int = DEFAULT_MAX_NONCE) -> int:
    """Return the first nonce whose SHA-256(id:nonce) hex starts with ``compl`` zeros."""
    prefix = "0" * complexity
    nonce = 0
    while nonce <= max_nonce:
        digest = hashlib.sha256(f"{challenge_id}:{nonce}".encode()).hexdigest()
        if digest.startswith(prefix):
            return nonce
        nonce += 1
    raise ValueError("nonce search exhausted")


def build_get_payload(pow_challenge: str) -> dict[str, str]:
    return {"challenge": pow_challenge}


def build_verify_payload(challenge_jwt: str, nonce: int) -> dict[str, str | int]:
    return {"challenge": challenge_jwt, "nonce": nonce}


def challenge_jwt_from_get_body(body: dict[str, Any]) -> str | None:
    result = body.get("success", {})
    if not isinstance(result, dict):
        return None
    inner = result.get("result", {})
    if not isinstance(inner, dict):
        return None
    jwt = inner.get("challenge_jwt")
    return jwt if isinstance(jwt, str) and jwt else None


def verified_from_verify_body(body: dict[str, Any]) -> bool:
    result = body.get("success", {})
    if not isinstance(result, dict):
        return False
    inner = result.get("result", {})
    if not isinstance(inner, dict):
        return False
    return bool(inner.get("verified"))
