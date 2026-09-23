import { FormEvent, useState } from "react";

import { useLogin } from "features/user";
import { logoUrl } from "shared/config";

export function LoginCard() {
  const { signIn, activity, error } = useLogin();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn(login, password);
  };

  return (
    <form className="login-card" onSubmit={(event) => void submit(event)}>
      <div className="login-brand">
        <img className="brand-logo" src={logoUrl} alt="Перемена" />
        <span className="product-badge solid">Price Radar</span>
      </div>
      <h1>Вход в систему</h1>
      <p className="login-lead">Корпоративный мониторинг публичных цен для отдела закупок ГК «Перемена».</p>
      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}
      <label>
        Корпоративный логин
        <input value={login} onChange={(event) => setLogin(event.target.value)} autoComplete="username" required />
      </label>
      <label>
        Пароль
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      <button disabled={activity === "login" || login.trim().length === 0}>
        {activity === "login" ? "Входим…" : "Войти в систему"}
      </button>
    </form>
  );
}
