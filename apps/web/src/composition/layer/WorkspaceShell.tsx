import type { ReactNode } from "react";

export function WorkspaceShell({ main, chat }: { main: ReactNode; chat: ReactNode }) {
  return (
    <div className="workspace-split">
      <div className="workspace-main">{main}</div>
      <aside className="workspace-chat">{chat}</aside>
    </div>
  );
}
