import { useEffect } from "react";

export function useSearchHotkey() {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === "k") {
        const input = document.getElementById("procurement-query") as HTMLInputElement | null;
        if (!input || input.disabled) return;
        event.preventDefault();
        input.focus();
        input.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
