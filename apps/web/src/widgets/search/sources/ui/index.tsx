import type { SourceState, UserRole } from "@peremena/contracts";

const sourceLabels: Record<SourceState["status"], string> = {
  pending: "В очереди",
  loading: "Собираем",
  done: "Готово",
  error: "Ошибка",
};

function outcomeNote({ outcome, found, kept }: SourceState): string | undefined {
  if (outcome === "nothing_found") return "Ничего не нашёл";
  if (outcome === "filtered_out") return `Найдено ${found ?? 0}, не подошли по модели`;
  if (outcome === "offers" && found !== undefined && kept !== undefined && found > kept) return `Найдено ${found}, подошло ${kept}`;
  if (outcome === "timeout") return "Не ответил вовремя";
  if (outcome === "unavailable") return "Временно недоступен";
  return undefined;
}

export function SourceGrid({ sources, role }: { sources: SourceState[]; role: UserRole }) {
  if (role !== "admin") return null;

  const completed = sources.filter(({ status }) => status === "done").length;
  const failed = sources.filter(({ status }) => status === "error").length;
  return (
    <section className="panel sources-panel" aria-labelledby="sources-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Администратор</p>
          <h2 id="sources-title">Коннекторы и агрегаторы</h2>
          <p>
            {completed} готово · {failed} ошибок · {sources.length} всего
          </p>
        </div>
      </div>
      <div className="source-grid">
        {sources.map((source) => (
          <div className={`source ${source.status}`} key={source.source}>
            <b>{source.source}</b>
            <span>{sourceLabels[source.status]}</span>
            {outcomeNote(source) && <small>{outcomeNote(source)}</small>}
            {source.message && <small>{source.message}</small>}
          </div>
        ))}
      </div>
    </section>
  );
}
