import { afterEach, describe, expect, it } from "vitest";

import { buildIdentityApp } from "./app.js";
import { LoginLimiter } from "./http/login-limiter.js";

const apps: ReturnType<typeof buildIdentityApp>[] = [];
afterEach(async () => Promise.all(apps.splice(0).map((app) => app.close())));

describe("identity", () => {
  it("rejects unknown credentials", async () => {
    const app = buildIdentityApp();
    apps.push(app);
    const response = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: { login: "nobody", password: "wrong" },
    });
    expect(response.statusCode).toBe(401);
  });

  it("logs manager in and returns the session user", async () => {
    const app = buildIdentityApp();
    apps.push(app);
    const login = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: { login: "manager", password: "peremena-manager" },
    });
    expect(login.statusCode).toBe(200);
    expect(login.json().user.role).toBe("manager");
    const cookie = login.headers["set-cookie"];
    const me = await app.inject({
      method: "GET",
      url: "/auth/me",
      headers: { cookie: String(cookie) },
    });
    expect(me.json().user.displayName).toBe("Менеджер закупок");
  });
});

describe("login rate limit", () => {
  async function attempt(app: ReturnType<typeof buildIdentityApp>, login: string, password: string) {
    return app.inject({ method: "POST", url: "/auth/login", payload: { login, password } });
  }

  it("blocks a login after repeated failures, even with the right password", async () => {
    const app = buildIdentityApp({ loginLimiter: new LoginLimiter(3, 60_000) });
    apps.push(app);
    for (let i = 0; i < 3; i += 1) expect((await attempt(app, "manager", "wrong")).statusCode).toBe(401);
    const blocked = await attempt(app, "manager", "peremena-manager");
    expect(blocked.statusCode).toBe(429);
    expect(Number(blocked.headers["retry-after"])).toBeGreaterThan(0);
    // other accounts are unaffected
    expect((await attempt(app, "admin", "peremena-admin")).statusCode).toBe(200);
  });

  it("a successful login clears the failure count", async () => {
    const app = buildIdentityApp({ loginLimiter: new LoginLimiter(3, 60_000) });
    apps.push(app);
    for (let i = 0; i < 2; i += 1) await attempt(app, "manager", "wrong");
    expect((await attempt(app, "manager", "peremena-manager")).statusCode).toBe(200);
    for (let i = 0; i < 2; i += 1) expect((await attempt(app, "manager", "wrong")).statusCode).toBe(401);
  });
});

describe("LoginLimiter", () => {
  it("frees the login when the window ends", () => {
    let now = 0;
    const limiter = new LoginLimiter(2, 1000, 10, () => now);
    limiter.recordFailure("A");
    limiter.recordFailure("a ");
    expect(limiter.retryAfterSeconds("a")).toBe(1);
    now = 1001;
    expect(limiter.retryAfterSeconds("a")).toBe(0);
  });
});
