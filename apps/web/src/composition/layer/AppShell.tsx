import type { ReactNode } from "react";

import { useUserStore } from "entities/user";
import { Topbar } from "widgets/user";

import type { AppView } from "../settings";

export function AppShell({
  view,
  onView,
  children,
}: {
  view: AppView;
  onView: (view: AppView) => void;
  children: ReactNode;
}) {
  const user = useUserStore((state) => state.user);
  const health = useUserStore((state) => state.health);

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        К содержимому
      </a>
      <Topbar view={view} onView={onView} />
      {children}
      {view !== "settings" && (
        <footer className="app-footer">
          <div>
            <span>ПЕРЕМЕНА · Price Radar</span>
            {user?.role === "admin" && health && (
              <span>{health.mode === "hybrid" ? "Гибридный контур" : "Демо-контур"}</span>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
