import type { SourceState, UserRole } from "@peremena/contracts";

const sourceLabels: Record<SourceState["status"], string> = {
  pending: "В очереди",
  loading: "Собираем",
  done: "Готово",
  error: "Ошибка",
};

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
            {source.message && <small>{source.message}</small>}
          </div>
        ))}
      </div>
    </section>
  );
}
