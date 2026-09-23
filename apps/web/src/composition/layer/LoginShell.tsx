import type { ReactNode } from "react";

export function LoginShell({ children }: { children: ReactNode }) {
  return (
    <div className="login-shell">
      <header className="login-topbar">
        <span>Корпоративный контур закупок</span>
        <span>Воронеж</span>
      </header>
      <main className="login-page">{children}</main>
      <footer className="app-footer">
        <span>ПЕРЕМЕНА · Price Radar</span>
        <a href="https://peremena.ru" target="_blank" rel="noreferrer">
          peremena.ru
        </a>
      </footer>
    </div>
  );
}
