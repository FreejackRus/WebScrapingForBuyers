import { useState } from "react";

const KEY = "price-radar:tips-v1";

function seen(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return true;
  }
}

/** One-time hints for a new buyer, shown above the first results table. */
export function OnboardingTips() {
  const [hidden, setHidden] = useState(seen);
  if (hidden) return null;
  const close = () => {
    setHidden(true);
    try { localStorage.setItem(KEY, "1"); } catch { /* private mode */ }
  };
  return (
    <aside className="onboarding-tips" aria-labelledby="onboarding-tips-title">
      <h2 id="onboarding-tips-title">Как читать таблицу</h2>
      <ol>
        <li>Вкладки «Маркетплейсы» и «Дистрибуторы» — разные условия: у дистрибуторов счёт с НДС и документы.</li>
        <li>«Лучшая цена» — самая низкая среди подходящих предложений в наличии; у остальных строк видно, на сколько процентов дороже.</li>
        <li>Строки «Требует уточнения» собраны внизу — их можно разобрать с ИИ, но решение за вами.</li>
        <li>Откройте «Карточку», чтобы проверить товар, добавить в корзину или скопировать предложение для письма.</li>
        <li>«Ссылка на поиск» открывает тот же поиск у коллеги; <kbd>/</kbd> — фильтр по таблице, <kbd>Ctrl</kbd>+<kbd>K</kbd> — строка поиска.</li>
      </ol>
      <button type="button" className="ghost onboarding-tips-close" onClick={close} aria-label="Скрыть подсказки">×</button>
    </aside>
  );
}
