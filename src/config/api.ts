// Central place to control API base URLs for
// local development, test, and production.
//
// In Vercel/GitHub deployments, prefer setting
// `NEXT_PUBLIC_API_BASE_URL` or `NEXT_PUBLIC_API_ENV`.

export const LOCAL_API_BASE_URL = "http://127.0.0.1:8000";

// You can edit these two URLs as needed:
export const TEST_API_BASE_URL = "https://test.youthactivismnepal.org.np";
export const PROD_API_BASE_URL = "https://data.youthactivismnepal.org.np";

type EnvKey = "local" | "test" | "production";

const ENV_FROM_VAR =
  (process.env.NEXT_PUBLIC_API_ENV as EnvKey | undefined) ?? "production";

const BY_ENV: Record<EnvKey, string> = {
  local: LOCAL_API_BASE_URL,
  test: TEST_API_BASE_URL,
  production: PROD_API_BASE_URL,
};

function inferRuntimeEnv(): EnvKey {
  if (typeof window === "undefined") {
    return ENV_FROM_VAR;
  }

  const host = window.location.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1") {
    return "local";
  }

  return ENV_FROM_VAR;
}

// Final base URL used by the frontend.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  BY_ENV[inferRuntimeEnv()] ??
  PROD_API_BASE_URL;
