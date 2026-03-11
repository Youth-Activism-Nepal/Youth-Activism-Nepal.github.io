import { API_BASE_URL } from "@/config/api";

export const ADMIN_TOKEN_KEY = "yan_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
  } catch {
    // ignore
  }
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  } catch {
    // ignore
  }
}

export async function adminFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAdminToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  return res;
}

