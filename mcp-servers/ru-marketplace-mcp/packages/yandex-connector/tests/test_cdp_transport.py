"""CDP transport for yandex_search: render in the operator's Chrome, hand off SmartCaptcha.

On a datacenter IP the plain HTTP client gets a silent 302 to /showcaptcha that
no person ever sees (verified 2026-10-01). In the headed Chrome the same search
lands on a visible "Are you not a robot?" page. These tests pin that the CDP
path turns that page into challenge_required with the handoff lease, never
caches it, and parses a real page with the unchanged SSR parser.
"""

from __future__ import annotations

import json
from pathlib import Path

import pytest
from fastmcp.exceptions import ToolError
from yandex_connector import server

FIXTURES = Path(__file__).parent / "fixtures"
CAPTCHA_URL = "https://market.yandex.ru/showcaptcha?retpath=aHR0cHM6Ly9tYXJrZXQ"


@pytest.fixture(autouse=True)
def cdp_mode(monkeypatch):
    monkeypatch.setattr(server._settings, "transport", "cdp")
    server._cache.clear()
    yield
    server._cache.clear()


def fake_handoff(monkeypatch, payload: dict, expires_at: str | None = None) -> list[dict]:
    calls: list[dict] = []

    async def read_with_handoff(**kwargs):
        calls.append(kwargs)
        return dict(payload), expires_at

    monkeypatch.setattr(server, "read_with_handoff", read_with_handoff)
    monkeypatch.setattr(server, "get_handoff_id", lambda **_: "handoff-1")
    return calls


async def test_visible_smartcaptcha_becomes_challenge_required_with_the_lease(monkeypatch):
    calls = fake_handoff(
        monkeypatch,
        {"url": CAPTCHA_URL, "html": "<title>Are you not a robot?</title>"},
        expires_at="2026-10-01T09:00:00+00:00",
    )
    with pytest.raises(ToolError) as exc:
        await server.yandex_search("Logitech K380")
    err = json.loads(str(exc.value))
    assert err["error"] == "challenge_required"
    assert err["requires_user_action"] is True
    assert err["handoff_id"] == "handoff-1"
    assert err["handoff_expires_at"] == "2026-10-01T09:00:00+00:00"
    assert calls[0]["operation"] == "yandex_search"
    assert "market.yandex.ru" in calls[0]["allowed_hosts"]


async def test_a_challenge_page_is_never_cached(monkeypatch):
    calls = fake_handoff(monkeypatch, {"url": CAPTCHA_URL, "html": ""})
    for _ in range(2):
        with pytest.raises(ToolError):
            await server.yandex_search("Logitech K380")
    assert len(calls) == 2, "a cached captcha would block the retry after the operator solves it"


async def test_a_rendered_results_page_goes_through_the_same_ssr_parser(monkeypatch):
    html = (FIXTURES / "search_washer.html").read_text(encoding="utf-8")
    fake_handoff(monkeypatch, {"url": "https://market.yandex.ru/search?text=x", "html": html})
    result = await server.yandex_search("стиральная машина")
    assert result.returned > 0
    assert all(item.product_id for item in result.items)


async def test_http_stays_the_default_transport():
    assert type(server._settings).model_fields["transport"].default == "http"
