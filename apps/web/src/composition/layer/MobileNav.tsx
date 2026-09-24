import type { AppView } from "../settings";

type NavId = AppView | "procurement";

const items: {
  id: NavId;
  label: string;
  icon: string;
  disabled?: boolean;
}[] = [
  { id: "search", label: "Радар", icon: "◎" },
  { id: "procurement", label: "Закупки", icon: "▣", disabled: true },
  { id: "chat", label: "AI Копилот", icon: "✦" },
  { id: "settings", label: "Профиль", icon: "◉" },
];

function isAppView(id: NavId): id is AppView {
  return id === "search" || id === "chat" || id === "settings";
}

export function MobileNav({
  view,
  onView,
}: {
  view: AppView;
  onView: (view: AppView) => void;
}) {
  return (
    <nav className="mobile-nav" aria-label="Мобильная навигация">
      {items.map((item) => {
        if (item.disabled || !isAppView(item.id)) {
          return (
            <span
              key={item.id}
              className="mobile-nav-item is-disabled"
              title="Недоступно в MVP"
              aria-disabled="true"
            >
              <span className="mobile-nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </span>
          );
        }
        const target = item.id;
        const active = target === view;
        return (
          <button
            key={target}
            type="button"
            className={`mobile-nav-item${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={() => onView(target)}
          >
            <span className="mobile-nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
