"""Unit tests for WB storefront (CDP) search transport — no live network."""

from __future__ import annotations

import asyncio
import json
from contextlib import asynccontextmanager
from pathlib import Path

import pytest

from wb_connector import server
from wb_connector.settings import get_settings

FIXTURES = Path(__file__).parent / "fixtures"


def _v18_payload() -> dict:
    return json.loads((FIXTURES / "search_v18_storefront.json").read_text(encoding="utf-8"))


@pytest.fixture
def storefront_transport(monkeypatch):
    monkeypatch.setenv("WB_SEARCH_TRANSPORT", "storefront")
    get_settings.cache_clear()
    monkeypatch.setattr(server, "_settings", get_settings())
    yield
    get_settings.cache_clear()


def test_products_from_search_payload_reads_v18_fixture():
    products, total = server._products_from_search_payload(_v18_payload())
    assert total == 100
    assert len(products) == 3
    item = server._card_item_dict(products[0])
    assert item["nm_id"] == 9200075841
    assert item["price_rub"] == 3899.0
    assert item["in_stock"] is True
    assert "K380" in item["name"]


def test_verify_storefront_capture_rejects_missing_xhr():
    with pytest.raises(Exception) as excinfo:
        server._verify_storefront_capture(
            {"ok": False, "error": "no_catalog_xhr", "status": 0, "path": "", "version": None}
        )
    assert "u-search" in str(excinfo.value).lower() or "storefront" in str(excinfo.value).lower()


def test_verify_storefront_capture_rejects_403():
    with pytest.raises(Exception) as excinfo:
        server._verify_storefront_capture(
            {
                "ok": True,
                "status": 403,
                "path": "/__internal/u-search/exactmatch/ru/common/v18/search",
                "version": "v18",
                "url": "https://www.wildberries.ru/__internal/u-search/exactmatch/ru/common/v18/search",
                "products": [],
            }
        )
    msg = str(excinfo.value).lower()
    assert "403" in msg


def test_wb_search_storefront_uses_captured_v18_products(monkeypatch, storefront_transport):
    payload = _v18_payload()
    capture = {
        "ok": True,
        "status": 200,
        "url": "https://www.wildberries.ru/__internal/u-search/exactmatch/ru/common/v18/search?resultset=catalog",
        "path": "/__internal/u-search/exactmatch/ru/common/v18/search",
        "version": "v18",
        "query": "Logitech K380",
        "dest": "-1257786",
        "total": payload["total"],
        "products": payload["products"],
    }

    async def fake_storefront(query, page, ctx):
        assert "K380" in query or "k380" in query.lower() or query
        return capture["products"], capture["total"], capture

    async def no_wait():
        return None

    async def scenario():
        monkeypatch.setattr(server, "_search_via_storefront", fake_storefront)
        monkeypatch.setattr(server, "_polite_wait", no_wait)
        result = await server.wb_search("Logitech K380")
        data = result.model_dump()
        assert data["count"] == 3
        assert data["total_ids"] == 100
        assert data["items"][0]["price_rub"] == 3899.0
        assert data["items"][0]["nm_id"] == 9200075841
        assert any("K380" in (i["name"] or "") for i in data["items"])

    asyncio.run(scenario())


def test_wb_search_storefront_does_not_fall_back_to_search_goods(monkeypatch, storefront_transport):
    calls: list[str] = []

    async def failing_storefront(query, page, ctx):
        from mcp_core.errors import TransportDownError, raise_tool_error

        raise_tool_error(
            TransportDownError("WB storefront catalog returned HTTP 403 inside Chrome", status_code=403)
        )

    async def legacy(*args, **kwargs):
        calls.append("search_goods")
        return [{"id": 1}], 1

    async def scenario():
        monkeypatch.setattr(server, "_search_via_storefront", failing_storefront)
        monkeypatch.setattr(server, "_search_via_search_goods", legacy)
        with pytest.raises(Exception) as excinfo:
            await server.wb_search("Logitech K380")
        assert "403" in str(excinfo.value)
        assert calls == []

    asyncio.run(scenario())


def test_wb_search_storefront_empty_products_is_no_results(monkeypatch, storefront_transport):
    async def empty_storefront(query, page, ctx):
        return (
            [],
            0,
            {
                "ok": True,
                "status": 200,
                "path": "/__internal/u-search/exactmatch/ru/common/v18/search",
                "version": "v18",
                "products": [],
                "total": 0,
            },
        )

    async def scenario():
        monkeypatch.setattr(server, "_search_via_storefront", empty_storefront)
        result = await server.wb_search("zzznothing")
        data = result.model_dump()
        assert data.get("status") == "no_results" or data.get("count", 1) == 0

    asyncio.run(scenario())


def test_is_storefront_catalog_url():
    assert server._is_storefront_catalog_url(
        "https://www.wildberries.ru/__internal/u-search/exactmatch/ru/common/v18/search?resultset=catalog&query=x"
    )
    assert not server._is_storefront_catalog_url(
        "https://search.wb.ru/exactmatch/ru/common/v9/search?resultset=catalog&query=x"
    )
    assert not server._is_storefront_catalog_url(
        "https://www.wildberries.ru/__internal/u-search/exactmatch/ru/common/v18/search?resultset=suggest"
    )


def test_storefront_live_xhr_capture_via_get_context(monkeypatch, storefront_transport):
    """Live Network.response body is primary (wb-diagnose), not Performance re-fetch."""
    payload = _v18_payload()

    class FakeResponse:
        def __init__(self):
            self.url = (
                "https://www.wildberries.ru/__internal/u-search/exactmatch/ru/common/v18/search"
                "?resultset=catalog&query=Logitech%20K380&dest=-1257786"
            )
            self.status = 200

        async def json(self):
            return payload

    class FakePage:
        def __init__(self):
            self._handlers = []
            self.url = "https://www.wildberries.ru/catalog/0/search.aspx?search=Logitech%20K380"

        def on(self, event, handler):
            assert event == "response"
            self._handlers.append(handler)

        async def goto(self, url, wait_until=None, timeout=None):
            assert "search.aspx" in url
            # Emit catalog XHR as the storefront would.
            for h in self._handlers:
                h(FakeResponse())
            return type("R", (), {"status": 200})()

        async def wait_for_timeout(self, ms):
            return None

        async def close(self):
            return None

    class FakeCtx:
        async def new_page(self):
            return FakePage()

    @asynccontextmanager
    async def fake_get_context():
        yield FakeCtx()

    class FakePermit:
        def ok(self):
            return None

        def refused(self, status=None):
            return None

        def neutral(self):
            return None

        def release(self):
            return None

    class FakeBudget:
        async def acquire(self, host):
            return FakePermit()

    async def no_wait():
        return None

    async def scenario():
        monkeypatch.setattr(server, "get_context", fake_get_context)
        monkeypatch.setattr(server, "navigation_budget", lambda: FakeBudget())
        monkeypatch.setattr(server, "_polite_wait", no_wait)
        products, total, capture = await server._search_via_storefront("Logitech K380", 1, None)
        assert total == 100
        assert len(products) == 3
        assert capture["version"] == "v18"
        assert capture["path"].startswith("/__internal/u-search/")
        assert server._card_item_dict(products[0])["price_rub"] == 3899.0

    asyncio.run(scenario())
