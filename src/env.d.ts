/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Secret used for JWT / session signing */
  readonly ANSIVERSA_AUTH_SECRET: string;

  /** Secret used for cookie encryption / session management */
  readonly ANSIVERSA_SESSION_SECRET: string;

  /** Domain for cookies (e.g., ansiversa.com) */
  readonly ANSIVERSA_COOKIE_DOMAIN: string;

  /** Optional: Override the default session cookie name */
  readonly SESSION_COOKIE_NAME?: string;

  /** Optional: Override the root app URL (fallback: https://ansiversa.com) */
  readonly PUBLIC_ROOT_APP_URL?: string;

  /** Optional: Parent app URL (fallback to root app URL) */
  readonly PARENT_APP_URL?: string;
}

interface Window {
  Alpine: import('alpinejs').Alpine;
}

declare namespace App {
  interface Locals {
    user?: {
      id: string;
      email: string;
      name?: string;
      roleId?: number;
      stripeCustomerId?: string;
    };
    sessionToken?: string | null;
    isAuthenticated?: boolean;
    rootAppUrl?: string;
  }
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
