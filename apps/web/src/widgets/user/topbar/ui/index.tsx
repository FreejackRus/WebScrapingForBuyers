import type { AppView } from "composition/settings";
import { logout } from "features/user";
import { useUserStore } from "entities/user";
import { initials } from "shared/lib";
import { logoUrl } from "shared/config";

export function Topbar({ view, onView }: { view: AppView; onView: (view: AppView) => void }) {
  const user = useUserStore((state) => state.user);
  const health = useUserStore((state) => state.health);
  if (!user) return null;
  const isAdmin = user.role === "admin";

  return (
    <header className="topbar">
      <nav aria-label="Основная навигация">
        <a
          className="brand"
          href={import.meta.env.BASE_URL}
          onClick={(event) => {
            event.preventDefault();
            onView("search");
          }}
        >
          <img className="brand-logo" src={logoUrl} alt="Перемена" />
          <span className="product-badge">Price Radar</span>
        </a>
        <div className="topbar-meta">
          <span className="city city-chip">
            <span className="city-pin" aria-hidden="true">
              ⌖
            </span>
            <b className="city-label">{user.city}</b>
          </span>
          {isAdmin && health && (
            <span className={`mode-badge ${health.mode}`}>
              {health.mode === "hybrid" ? "Гибридный контур" : "Локальный контур"}
            </span>
          )}
          <button
            className="ghost topbar-settings"
            type="button"
            onClick={() => onView(view === "settings" ? "search" : "settings")}
          >
            {view === "settings" ? "К поиску" : "Настройки"}
          </button>
          <button
            className="avatar"
            type="button"
            onClick={() => onView("settings")}
            title={user.displayName}
            aria-label={`Профиль, ${user.displayName}`}
          >
            {initials(user.displayName)}
          </button>
          <button className="ghost topbar-logout" type="button" onClick={() => void logout()}>
            Выйти
          </button>
        </div>
      </nav>
    </header>
  );
}
