import { money } from "shared/lib";

export function Metrics({
  offerCount,
  bestPublic,
  running,
  failedSources,
  settledSources,
  sourceCount,
}: {
  offerCount: number;
  bestPublic: number | undefined;
  running: boolean;
  failedSources: number;
  settledSources: number;
  sourceCount: number;
}) {
  return (
    <section className="metrics" aria-label="Сводка">
      <Metric label="Предложений" value={String(offerCount)} />
      <Metric
        label="Лучшая публичная"
        value={bestPublic != null ? money.format(bestPublic) : "—"}
        hint={bestPublic == null ? "Цены пока не получены" : "Минимум среди загруженных"}
        accent
      />
      <Metric
        label="Сбор"
        value={running ? "Идёт" : failedSources > 0 ? "Есть ошибки" : "Завершён"}
        hint={`${settledSources} из ${sourceCount} источников завершено${failedSources > 0 ? ` · ошибок: ${failedSources}` : ""}`}
      />
    </section>
  );
}

function Metric({ label, value, hint, accent = false }: { label: string; value: string; hint?: string; accent?: boolean }) {
  return (
    <div className={`metric ${accent ? "accent" : ""}`}>
      <span>{label}</span>
      <b className="mono">{value}</b>
      {hint && <small>{hint}</small>}
    </div>
  );
}
