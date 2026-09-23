import { afterEach, describe, expect, it } from "vitest";

import { buildIdentityApp } from "./app.js";

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
