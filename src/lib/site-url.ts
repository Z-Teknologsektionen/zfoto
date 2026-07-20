import { env } from "@/env.mjs";

// Falls back to the known production domain for environments without Vercel's
// system env vars (e.g. local dev).
const FALLBACK_BASE_URL = "https://zfoto.ztek.se";

export const getBaseUrl = () =>
  env.VERCEL_PROJECT_PRODUCTION_URL !== undefined
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : FALLBACK_BASE_URL;
