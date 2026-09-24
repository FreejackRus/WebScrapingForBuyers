import { FormEvent, useState } from "react";

import { logout } from "features/user";
import { useAnalysisStore } from "entities/analysis";
import { useUserStore } from "entities/user";

const roleLabels = {
  admin: "Администратор",
  manager: "Менеджер закупок",
};

type SettingsSection = "profile" | "ai" | "security";

export function UserSettings({ onBack }: { onBack: () => void }) {
  const user = useUserStore((state) => state.user);
  const saveSettings = useUserStore((state) => state.saveSettings);
  const setPrompt = useAnalysisStore((state) => state.setPrompt);
  const [section, setSection] = useState<SettingsSection>("profile");
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [analysisPrompt, setAnalysisPrompt] = useState(user?.analysisPrompt ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const resetForm = () => {
    setDisplayName(user.displayName);
    setCity(user.city);
    setAnalysisPrompt(user.analysisPrompt);
    setCurrentPassword("");
    setNewPassword("");
    setError("");
    setSaved(false);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSaved(false);
    try {
      await saveSettings({
        displayName,
        city,
        analysisPrompt,
        ...(newPassword ? { currentPassword, newPassword } : {}),
      });
      setPrompt(analysisPrompt);
      setCurrentPassword("");
      setNewPassword("");
      setSaved(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось сохранить");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="settings-page" onSubmit={(event) => void submit(event)}>
      <aside className="settings-nav" aria-label="Разделы настроек">
        <div className="settings-nav-head">
          <p className="eyebrow">Настройки</p>
          <h2>Профиль и рабочая среда</h2>
          <p>Price Radar · закрытый контур</p>
        </div>
        <nav>
          <button className={section === "profile" ? "active" : ""} type="button" onClick={() => setSection("profile")}>
            Профиль и аккаунт
          </button>
          <button className={section === "ai" ? "active" : ""} type="button" onClick={() => setSection("ai")}>
            AI-копайлот
          </button>
          <button className={section === "security" ? "active" : ""} type="button" onClick={() => setSection("security")}>
            Безопасность
          </button>
        </nav>
        <div className="settings-nav-note">
          <strong>{roleLabels[user.role]}</strong>
          <p>
            {user.role === "manager"
              ? "Доступ к коннекторам и агрегаторам ограничен администратором системы."
              : "Администратор видит статусы источников. Менеджер работает только с поиском и таблицей предложений."}
          </p>
        </div>
      </aside>

      <div className="settings-workspace">
        <div className="settings-crumbs">
          <button className="linkish" type="button" onClick={onBack}>
            Поиск закупок
          </button>
          <span aria-hidden="true">/</span>
          <span>Настройки профиля</span>
        </div>
        <div className="settings-heading">
          <div>
            <h1 id="settings-title">Настройки профиля и рабочей среды</h1>
            <p>Имя в шапке, город закупки и запрос AI по умолчанию. Пароль меняется только здесь.</p>
          </div>
          <span className="status-pill">Учетная запись активна</span>
        </div>

        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}
        {saved && !error && (
          <div className="notice-ok" role="status">
            Параметры профиля сохранены
          </div>
        )}

        {section === "profile" && (
          <section className="settings-card" aria-labelledby="profile-card-title">
            <div className="settings-card-head">
              <div>
                <h2 id="profile-card-title">Отображаемое имя и корпоративный профиль</h2>
                <p>Имя в шапке и город, от которого считаются закупки.</p>
              </div>
              <span className="mono settings-id">{user.login}</span>
            </div>
            <div className="settings-grid">
              <label>
                Отображаемое имя
                <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} required />
                <small>Показывается коллегам в шапке Price Radar</small>
              </label>
              <label>
                Роль
                <input value={roleLabels[user.role]} readOnly />
                <small>Назначается администратором контура</small>
              </label>
              <label>
                Корпоративный логин
                <input className="mono" value={user.login} readOnly />
                <small>Смена логина через администратора контура</small>
              </label>
              <label>
                Рабочий регион
                <input value={city} onChange={(event) => setCity(event.target.value)} required />
                <small>Город закупки в шапке и в выгрузках</small>
              </label>
            </div>
          </section>
        )}

        {section === "ai" && (
          <section className="settings-card ai" aria-labelledby="ai-card-title">
            <div className="settings-card-head">
              <div>
                <h2 id="ai-card-title">Параметры AI-копайлота закупок</h2>
                <p>Этот текст уходит в локальную модель как запрос по умолчанию.</p>
              </div>
              <span className="model-badge">Закрытый контур</span>
            </div>
            <label>
              Запрос AI по умолчанию
              <textarea value={analysisPrompt} onChange={(event) => setAnalysisPrompt(event.target.value)} required />
              <small>Можно изменить прямо на экране поиска перед расчетом</small>
            </label>
          </section>
        )}

        {section === "security" && (
          <section className="settings-card" aria-labelledby="security-card-title">
            <div className="settings-card-head">
              <div>
                <h2 id="security-card-title">Пароль учетной записи</h2>
                <p>Оставьте поля пустыми, если пароль менять не нужно.</p>
              </div>
            </div>
            <div className="settings-grid">
              <label>
                Текущий пароль
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </label>
              <label>
                Новый пароль
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                />
                <small>Не меньше 8 символов</small>
              </label>
            </div>
          </section>
        )}
      </div>

      <footer className="settings-savebar">
        <p>{saved ? "Изменения записаны в профиль" : "Сохраняется только имя, город, запрос AI и пароль"}</p>
        <div>
          <button className="ghost" type="button" onClick={resetForm}>
            Сбросить
          </button>
          <button className="ghost" type="button" onClick={onBack}>
            К поиску
          </button>
          <button className="ghost settings-logout" type="button" onClick={() => void logout()}>
            Выйти
          </button>
          <button type="submit" disabled={busy}>
            {busy ? "Сохраняем…" : "Сохранить изменения"}
          </button>
        </div>
      </footer>
    </form>
  );
}
