import type { ReactNode } from "react";

export function WorkspaceShell({
  lead,
  chat,
  offers,
}: {
  lead: ReactNode;
  chat: ReactNode;
  offers: ReactNode;
}) {
  return (
    <div className="workspace-split">
      <div className="workspace-lead">{lead}</div>
      <aside className="workspace-chat" id="analysis-panel">
        {chat}
      </aside>
      <div className="workspace-offers">{offers}</div>
    </div>
  );
}
