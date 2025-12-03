// @ts-nocheck
import { defineMiddleware } from "astro:middleware";

// Name of the session cookie (matches what we use when setting the cookie in auth code)
const SESSION_COOKIE_NAME =
  import.meta.env.SESSION_COOKIE_NAME ?? "ans_session";

// Primary domain for Ansiversa (used to build the root app URL)
const COOKIE_DOMAIN =
  import.meta.env.ANSIVERSA_COOKIE_DOMAIN ?? "ansiversa.com";

// Root app URL – prefers explicit PUBLIC_ROOT_APP_URL if you ever set it,
// otherwise builds from ANSIVERSA_COOKIE_DOMAIN, with a safe default.
const ROOT_APP_URL =
  import.meta.env.PUBLIC_ROOT_APP_URL ?? `https://${COOKIE_DOMAIN}`;

// Simple cookie parser
function parseCookies(header: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!header) return cookies;

  const parts = header.split(";");
  for (const part of parts) {
    const [name, ...rest] = part.trim().split("=");
    if (!name) continue;
    cookies[name] = decodeURIComponent(rest.join("=") ?? "");
  }
  return cookies;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, locals, url } = context as any;

  const cookieHeader = request.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);

  // Read our session cookie
  const sessionToken = cookies[SESSION_COOKIE_NAME] ?? null;
  const isAuthenticated = !!sessionToken;

  // Expose useful values to the rest of the app
  locals.sessionToken = sessionToken;
  locals.isAuthenticated = isAuthenticated;
  locals.rootAppUrl = ROOT_APP_URL;

  // 🔒 Example (keep commented until we decide the exact routes to protect):
  //
  // const pathname = url.pathname;
  // const isAuthRoute = pathname.startsWith("/auth");
  // const isPublicAsset =
  //   pathname.startsWith("/_astro") ||
  //   pathname.startsWith("/favicon") ||
  //   pathname.startsWith("/assets") ||
  //   pathname.startsWith("/api/public");
  //
  // // Protect app routes if needed later:
  // if (!isAuthenticated && !isAuthRoute && !isPublicAsset && pathname.startsWith("/app")) {
  //   const redirectTo = encodeURIComponent(url.toString());
  //   return Response.redirect(
  //     `${ROOT_APP_URL}/login?redirect=${redirectTo}`,
  //     302
  //   );
  // }

  return next();
});
