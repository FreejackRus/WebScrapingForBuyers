import { apiBase } from "shared/config";

export const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error ?? `Ошибка API: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const apiUrl = (path: string) => `${apiBase}${path}`;
