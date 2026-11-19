import { money } from "shared/lib";

export function Metrics({
  offerCount,
  bestPublic,
  running,
  interrupted,
  failedSources,
  settledSources,
  sourceCount,
}: {
  offerCount: number;
  bestPublic: number | undefined;
  running: boolean;
  interrupted?: boolean;
  failedSources: number;
  settledSources: number;
  sourceCount: number;
}) {
  return (
    <>
    {running && <div className="collection-progress" role="status" aria-live="polite">
      <span className="collection-spinner" aria-hidden="true" />
      <div><strong>{offerCount > 0 ? "Ожидаем остальных поставщиков" : "Собираем предложения"}</strong>
        <p>Завершено {settledSources} из {sourceCount}. Предложения появляются по мере загрузки.</p>
      </div>
    </div>}
    <section className="metrics" aria-label="Сводка">
      <Metric label="Предложений" value={String(offerCount)} />
      <Metric
        label="Минимум в наличии"
        value={bestPublic != null ? money.format(bestPublic) : "—"}
        hint={bestPublic == null ? "См. цены по вариантам в таблице" : running ? "Предварительно, сбор идёт" : "Для одного сопоставимого варианта"}
        accent
      />
      <Metric
        label="Сбор"
        value={interrupted ? "Прерван" : running ? "Идёт" : failedSources > 0 ? "Есть ошибки" : "Завершён"}
        hint={`${settledSources} из ${sourceCount} источников завершено${failedSources > 0 ? ` · ошибок: ${failedSources}` : ""}`}
      />
    </section>
    </>
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
