import { useState } from "react";

import { useBootSession, useSearchHotkey } from "composition/hooks";
import { AppShell, LoginShell } from "composition/layer";
import type { AppView } from "composition/settings";
import { useUserStore } from "entities/user";
import { SearchMonitorPage } from "pages/search";
import { LoginPage, SettingsPage } from "pages/user";

export default function App() {
  const bootstrapped = useUserStore((state) => state.bootstrapped);
  const user = useUserStore((state) => state.user);
  const [view, setView] = useState<AppView>("search");

  useBootSession();
  useSearchHotkey();

  if (!bootstrapped) return <div className="boot">Загрузка контура…</div>;
  if (!user) {
    return (
      <LoginShell>
        <LoginPage />
      </LoginShell>
    );
  }

  return (
    <AppShell view={view} onView={setView}>
      {view === "settings" ? <SettingsPage onBack={() => setView("search")} /> : <SearchMonitorPage />}
    </AppShell>
  );
}
