"""Marks this directory as its own pytest rootdir package.

Several connectors have a ``test_server.py``; without a conftest per directory
pytest cannot tell the identically-named modules apart during collection.

Unit tests exercise the legacy HTTP v9 path; production defaults to the
storefront CDP transport (see WB_SEARCH_TRANSPORT / docker-compose).
"""

from __future__ import annotations

import pytest


@pytest.fixture(autouse=True)
def _wb_http_transport_for_unit_tests(monkeypatch):
    monkeypatch.setenv("WB_SEARCH_TRANSPORT", "http")
    from wb_connector.settings import get_settings

    get_settings.cache_clear()
    # Re-bind module-level settings snapshot used for dest/timeouts.
    import wb_connector.server as server

    monkeypatch.setattr(server, "_settings", get_settings())
    yield
    get_settings.cache_clear()
