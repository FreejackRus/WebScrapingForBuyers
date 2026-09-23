import { money } from "shared/lib";

export function Metrics({
  offerCount,
  realCount,
  bestReal,
  bestAny,
  running,
}: {
  offerCount: number;
  realCount: number;
  bestReal: number | undefined;
  bestAny: number | undefined;
  running: boolean;
}) {
  return (
    <section className="metrics" aria-label="Сводка">
      <Metric label="Предложений" value={String(offerCount)} />
      <Metric label="Реальные" value={String(realCount)} />
      <Metric
        label="Лучшая публичная"
        value={bestReal ? money.format(bestReal) : bestAny ? money.format(bestAny) : "—"}
        accent
      />
      <Metric label="Сбор" value={running ? "Идёт" : "Готово"} />
    </section>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`metric ${accent ? "accent" : ""}`}>
      <span>{label}</span>
      <b className="mono">{value}</b>
    </div>
  );
}
