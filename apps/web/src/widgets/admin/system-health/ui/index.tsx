import type { QualityReport, SourceHealthReport } from "@peremena/contracts";
import { useCallback, useEffect, useState } from "react";

import { useUserStore } from "entities/user";

import { adminAlerts, formatTime, percent, sourceTone, systemHealthApi, trendPoints } from "../lib";

const toneLabel = { ok: "Работает", warn: "Сбой", error: "Не отвечает", unknown: "Нет данных" } as const;

function useSystemHealth(enabled: boolean) {
  const [sources, setSources] = useState<SourceHealthReport>();
  const [quality, setQuality] = useState<QualityReport>();
  const [error, setError] = useState("");
  const reload = useCallback(async () => {
    if (!enabled) return;
    try {
      const [nextSources, nextQuality] = await Promise.all([systemHealthApi.sources(), systemHealthApi.quality()]);
      setSources(nextSources);
      setQuality(nextQuality);
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось получить состояние системы");
    }
  }, [enabled]);
  useEffect(() => {
    void reload();
  }, [reload]);
  return { sources, quality, error, reload, setQuality };
}

/** Admin-only banner on the search workspace when a source is down or search quality dropped. */
export function AdminAlertBanner() {
  const isAdmin = useUserStore((state) => state.user?.role === "admin");
  const { sources, quality } = useSystemHealth(isAdmin);
  const alerts = adminAlerts(sources, quality);
  if (!isAdmin || alerts.length === 0) return null;
  return (
    <div className="alert system-alert" role="alert">
      <strong>Состояние системы</strong>
      <ul>
        {alerts.map((alert) => (
          <li key={alert}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}

/** «Состояние системы» section of the admin settings: source canaries and the weekly quality score. */
export function SystemHealthPanel() {
  const { sources, quality, error, reload, setQuality } = useSystemHealth(true);
  const [starting, setStarting] = useState(false);
  const results = quality?.results ?? [];
  const last = results.at(-1);
  const running = quality?.running === true;

  const runQuality = async () => {
    setStarting(true);
    try {
      setQuality(await systemHealthApi.runQuality());
    } catch {
      // 409: a run is already going — the reload below shows it.
    } finally {
      setStarting(false);
      void reload();
    }
  };

  return (
    <section className="settings-card system-health" aria-labelledby="system-health-title">
      <div className="settings-card-head">
        <div>
          <h2 id="system-health-title">Состояние системы</h2>
          <p>Контрольные запросы к источникам каждый час и еженедельный замер качества поиска.</p>
        </div>
        <button className="ghost" type="button" onClick={() => void reload()}>
          Обновить
        </button>
      </div>
      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}
      {adminAlerts(sources, quality).map((alert) => (
        <div key={alert} className="alert" role="alert">
          {alert}
        </div>
      ))}

      <h3>Источники</h3>
      <div className="system-table-wrap">
        <table className="system-table">
          <thead>
            <tr>
              <th>Источник</th>
              <th>Последняя проверка</th>
              <th>Строк</th>
              <th>Время</th>
              <th>Сбоев подряд</th>
              <th>Ошибка</th>
            </tr>
          </thead>
          <tbody>
            {(sources?.sources ?? []).map((source) => {
              const tone = sourceTone(source);
              return (
                <tr key={source.source}>
                  <td>
                    <span className={`status-dot ${tone}`} title={toneLabel[tone]} aria-label={toneLabel[tone]} /> {source.source}
                  </td>
                  <td>{formatTime(source.last?.checkedAt)}</td>
                  <td>{source.last?.rows ?? "—"}</td>
                  <td>{source.last ? `${(source.last.ms / 1000).toFixed(1)} с` : "—"}</td>
                  <td>{source.consecutiveFailures}</td>
                  <td className="system-error">{source.last?.error ?? ""}</td>
                </tr>
              );
            })}
            {sources && sources.sources.length === 0 && (
              <tr>
                <td colSpan={6}>Нет подключенных источников</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3>Качество поиска</h3>
      {last ? (
        <div className="quality-summary">
          <p>
            Замер от {formatTime(last.at)}: точность маркетплейсов <b>{percent(last.marketplacePrecision)}</b>, дистрибьюторов{" "}
            <b>{percent(last.distributorPrecision)}</b>, без ошибок {last.perfect} из {last.cases}, пустых выдач {last.empty}, в
            наличии {percent(last.inStockShare)}.
          </p>
          {results.length > 1 && (
            <svg className="quality-trend" viewBox="-4 -4 168 48" width="168" height="48" role="img" aria-label="Динамика точности маркетплейсов">
              <polyline points={trendPoints(results, 160, 40)} fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
          <ol className="quality-history">
            {results
              .slice()
              .reverse()
              .map((result) => (
                <li key={result.at}>
                  {formatTime(result.at)} — {percent(result.marketplacePrecision)}
                </li>
              ))}
          </ol>
          {last.failedQueries.length > 0 && (
            <details>
              <summary>Запросы с ошибками в топ-3 ({last.failedQueries.length})</summary>
              <ul className="quality-failed">
                {last.failedQueries.map((query) => (
                  <li key={query.query}>
                    <b>{query.query}</b> — {percent(query.precision)}
                    <ul>
                      {query.top.map((title) => (
                        <li key={title}>{title}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      ) : (
        <p>Замеров еще не было.</p>
      )}
      <div>
        <button type="button" disabled={running || starting} onClick={() => void runQuality()}>
          {running ? "Замер идет…" : "Запустить замер"}
        </button>
      </div>
    </section>
  );
}
