import { randomBytes, scrypt, scryptSync, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import type { SessionUser, UserRole, UserSettings } from "@peremena/contracts";

import type { AuthStore, PasswordChange } from "../domain/auth-store.js";

interface StoredUser extends SessionUser {
  passwordHash: string;
}

const scryptAsync = promisify(scrypt) as (password: string, salt: string, keylen: number) => Promise<Buffer>;

// Checked when the login is unknown, so a missing user costs the same time as a wrong password.
const DUMMY_HASH = hashPassword("dummy-password-for-timing");

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

  async authenticate(login: string, password: string): Promise<SessionUser | undefined> {
    const user = [...this.users.values()].find(
      (candidate) => candidate.login.toLocaleLowerCase("ru") === login.trim().toLocaleLowerCase("ru"),
    );
    const valid = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
    return user && valid ? toSession(user) : undefined;
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

  async changePassword(id: string, change: PasswordChange): Promise<SessionUser | undefined> {
    const user = this.users.get(id);
    if (!user || !(await verifyPassword(change.currentPassword, user.passwordHash))) return undefined;
    if (change.newPassword.trim().length < 8) return undefined;
    user.passwordHash = await hashPasswordAsync(change.newPassword);
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

async function hashPasswordAsync(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(password, salt, 32)).toString("hex");
  return `${salt}:${hash}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const actual = await scryptAsync(password, salt, 32);
  const expected = Buffer.from(hash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
