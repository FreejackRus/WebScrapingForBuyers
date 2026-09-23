import type { SessionUser } from "@peremena/contracts";
import { create } from "zustand";

import { userApi } from "../api";

interface UserState {
  user: SessionUser | undefined;
  health: { status: string; mode: "demo" | "hybrid"; analysisProvider: string } | undefined;
  bootstrapped: boolean;
  activity: "login" | "settings" | null;
  error: string;
  boot: () => Promise<void>;
  signIn: (login: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveSettings: (payload: {
    displayName: string;
    city: string;
    analysisPrompt: string;
    currentPassword?: string;
    newPassword?: string;
  }) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  health: undefined,
  bootstrapped: false,
  activity: null,
  error: "",
  boot: async () => {
    const health = await userApi.health().catch(() => undefined);
    try {
      const { user } = await userApi.me();
      set({ user, health, bootstrapped: true, error: "" });
    } catch {
      set({ user: undefined, health, bootstrapped: true });
    }
  },
  signIn: async (login, password) => {
    set({ activity: "login", error: "" });
    try {
      const { user } = await userApi.login(login, password);
      set({ user, activity: null });
    } catch (reason) {
      set({
        activity: null,
        error: reason instanceof Error ? reason.message : "Ошибка входа",
      });
    }
  },
  signOut: async () => {
    await userApi.logout().catch(() => undefined);
    set({ user: undefined });
  },
  saveSettings: async (payload) => {
    set({ activity: "settings", error: "" });
    const { user } = await userApi.saveSettings(payload);
    set({ user, activity: null });
  },
}));

export const useSessionUser = () => useUserStore((state) => state.user);
