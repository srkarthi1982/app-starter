// starter/src/lib/auth.ts
import { createHmac } from "node:crypto";

const getEnv = (key: string): string | undefined => {
  const metaEnv =
    typeof import.meta !== "undefined" &&
    (import.meta as { env?: Record<string, string> }).env;
  if (metaEnv?.[key]) return metaEnv[key];

  const nodeEnv = typeof process !== "undefined" ? process.env : undefined;
  return nodeEnv?.[key];
};

// Same secret as parent app
const SESSION_SECRET =
  getEnv("ANSIVERSA_SESSION_SECRET") ?? "dev-ansiversa-session-secret";

// Shared cookie name for all Ansiversa apps
export const SESSION_COOKIE_NAME =
  getEnv("SESSION_COOKIE_NAME") ?? "ans_session";

export type SessionPayload = {
  userId: string;
  email: string;
  issuedAt: number;
};

export function verifySessionToken(token: string): SessionPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const hmac = createHmac("sha256", SESSION_SECRET);
  hmac.update(body);
  const expected = hmac.digest("base64url");
  if (expected !== sig) return null;

  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}
