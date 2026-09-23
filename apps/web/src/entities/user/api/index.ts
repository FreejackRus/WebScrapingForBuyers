import type { SessionUser, UserSettings } from "@peremena/contracts";

import { apiUrl, request } from "shared/api";

export const userApi = {
  health: () =>
    request<{ status: string; mode: "demo" | "hybrid"; analysisProvider: string }>(apiUrl("/health")),
  login: (login: string, password: string) =>
    request<{ user: SessionUser }>(apiUrl("/auth/login"), {
      method: "POST",
      body: JSON.stringify({ login, password }),
    }),
  logout: () => request<{ ok: boolean }>(apiUrl("/auth/logout"), { method: "POST" }),
  me: () => request<{ user: SessionUser }>(apiUrl("/auth/me")),
  saveSettings: (settings: Partial<UserSettings> & { currentPassword?: string; newPassword?: string }) =>
    request<{ user: SessionUser }>(apiUrl("/auth/settings"), {
      method: "PATCH",
      body: JSON.stringify(settings),
    }),
};
