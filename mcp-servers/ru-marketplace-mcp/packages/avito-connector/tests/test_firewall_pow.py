"""Unit tests for the local Avito JSON-439 firewallPow helper.

The nonce vector matches the documented SHA-256(id:nonce) rule. No network.
"""

from __future__ import annotations

import base64
import json

from avito_connector.firewall_pow import (
    build_get_payload,
    build_verify_payload,
    challenge_jwt_from_get_body,
    decode_pow_params,
    find_pow_nonce,
    pow_challenge_from_body,
    verified_from_verify_body,
)

KNOWN_ID = "b360b677-17c2-840d-5758-60e59982ded8"
KNOWN_COMPL = 4
KNOWN_NONCE = 233984


def _unsigned_jwt(payload: dict) -> str:
    header = base64.urlsafe_b64encode(b'{"alg":"none"}').rstrip(b"=").decode()
    body = base64.urlsafe_b64encode(json.dumps(payload).encode()).rstrip(b"=").decode()
    return f"{header}.{body}.sig"


def test_pow_challenge_from_json_439():
    assert pow_challenge_from_body('{"pow_challenge":"abc"}') == "abc"


def test_pow_challenge_from_html_is_none():
    assert pow_challenge_from_body("<!doctype html><html>439</html>") is None
    assert pow_challenge_from_body("{not-json") is None
    assert pow_challenge_from_body('{"error":"nope"}') is None


def test_known_nonce_vector():
    assert find_pow_nonce(KNOWN_ID, KNOWN_COMPL) == KNOWN_NONCE


def test_decode_and_verify_payload_roundtrip():
    jwt = _unsigned_jwt({"id": KNOWN_ID, "compl": KNOWN_COMPL})
    assert decode_pow_params(jwt) == (KNOWN_ID, KNOWN_COMPL)
    assert build_get_payload("tok") == {"challenge": "tok"}
    assert build_verify_payload(jwt, KNOWN_NONCE) == {"challenge": jwt, "nonce": KNOWN_NONCE}


def test_get_and_verify_envelopes():
    jwt = "eyJ.abc.sig"
    assert challenge_jwt_from_get_body({"success": {"result": {"challenge_jwt": jwt}}}) == jwt
    assert challenge_jwt_from_get_body({"success": {"result": {}}}) is None
    assert verified_from_verify_body({"success": {"result": {"verified": True}}}) is True
    assert verified_from_verify_body({"success": {"result": {"verified": False}}}) is False
