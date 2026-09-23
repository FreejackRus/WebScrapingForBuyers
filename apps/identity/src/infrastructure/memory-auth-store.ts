import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

import type { SessionUser, UserRole, UserSettings } from "@peremena/contracts";

import type { AuthStore, PasswordChange } from "../domain/auth-store.js";

interface StoredUser extends SessionUser {
  passwordHash: string;
}

const defaultPrompt = "Выбери три лучших предложения с гарантией и объясни риски";

export class MemoryAuthStore implements AuthStore {
  private readonly users = new Map<string, StoredUser>();

  constructor(users: StoredUser[]) {
    for (const user of users) this.users.set(user.id, user);
  }

  static fromEnv(): MemoryAuthStore {
    const raw = process.env.AUTH_USERS?.trim();
    const parsed = raw ? parseUserLines(raw) : defaultUsers();
    return new MemoryAuthStore(parsed);
  }

  authenticate(login: string, password: string): SessionUser | undefined {
    const user = [...this.users.values()].find(
      (candidate) => candidate.login.toLocaleLowerCase("ru") === login.trim().toLocaleLowerCase("ru"),
    );
    if (!user || !verifyPassword(password, user.passwordHash)) return undefined;
    return toSession(user);
  }

  getById(id: string): SessionUser | undefined {
    const user = this.users.get(id);
    return user ? toSession(user) : undefined;
  }

  updateSettings(id: string, settings: Partial<UserSettings>): SessionUser | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    if (settings.displayName?.trim()) user.displayName = settings.displayName.trim();
    if (settings.city?.trim()) user.city = settings.city.trim();
    if (settings.analysisPrompt?.trim()) user.analysisPrompt = settings.analysisPrompt.trim();
    return toSession(user);
  }

  changePassword(id: string, change: PasswordChange): SessionUser | undefined {
    const user = this.users.get(id);
    if (!user || !verifyPassword(change.currentPassword, user.passwordHash)) return undefined;
    if (change.newPassword.trim().length < 8) return undefined;
    user.passwordHash = hashPassword(change.newPassword);
    return toSession(user);
  }
}

function defaultUsers(): StoredUser[] {
  return [
    makeUser("admin", "peremena-admin", "admin", "Администратор"),
    makeUser("manager", "peremena-manager", "manager", "Менеджер закупок"),
  ];
}

function parseUserLines(raw: string): StoredUser[] {
  return raw
    .split(/[;\n]/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [login, password, role, displayName, city] = line.split(":");
      if (!login || !password) throw new Error("AUTH_USERS: ожидается login:password:role:имя");
      return makeUser(
        login,
        password,
        role === "admin" ? "admin" : "manager",
        displayName?.trim() || login,
        city?.trim() || "Воронеж",
      );
    });
}

function makeUser(
  login: string,
  password: string,
  role: UserRole,
  displayName: string,
  city = "Воронеж",
): StoredUser {
  return {
    id: `user-${login}`,
    login,
    displayName,
    role,
    city,
    analysisPrompt: defaultPrompt,
    passwordHash: hashPassword(password),
  };
}

function toSession(user: StoredUser): SessionUser {
  const { passwordHash: _passwordHash, ...session } = user;
  return session;
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const actual = scryptSync(password, salt, 32);
  const expected = Buffer.from(hash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
