export type ThemeMode = "auto" | "light" | "dark";
const KEY = "price-radar:theme";
export const THEME_LABELS: Record<ThemeMode, string> = { auto: "Тема: как в системе", light: "Тема: светлая", dark: "Тема: тёмная" };

export function readTheme(): ThemeMode {
  try {
    const value = localStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : "auto";
  } catch {
    return "auto";
  }
}

export function applyTheme(mode: ThemeMode): void {
  document.documentElement.dataset.theme = mode;
  try {
    if (mode === "auto") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, mode);
  } catch {
    /* private mode */
  }
}

export const nextTheme = (mode: ThemeMode): ThemeMode => (mode === "auto" ? "light" : mode === "light" ? "dark" : "auto");
