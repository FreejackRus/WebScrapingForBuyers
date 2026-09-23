import type { SessionUser, UserSettings } from "@peremena/contracts";

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}

export interface AuthStore {
  authenticate(login: string, password: string): SessionUser | undefined;
  getById(id: string): SessionUser | undefined;
  updateSettings(id: string, settings: Partial<UserSettings>): SessionUser | undefined;
  changePassword(id: string, change: PasswordChange): SessionUser | undefined;
}
