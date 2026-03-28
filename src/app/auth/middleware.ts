import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── Routes that require authentication ────────────────────────────────────────
const PROTECTED_PREFIXES = ["/dashboard"];

// ── Routes only for guests (redirect to dashboard if already signed in) ───────
const GUEST_ONLY = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read your session token — adjust cookie name to match your auth provider
  // e.g. NextAuth uses "next-auth.session-token"
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("auth-token")?.value ||
    null;

  const isAuthenticated = Boolean(token);

  // 1. If user tries to access a protected route without a token → redirect to sign-in
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !isAuthenticated) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    // Preserve the originally requested path so we can redirect back after login
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 2. If user is already authenticated and tries to visit sign-in/sign-up → redirect to dashboard
  const isGuestOnly = GUEST_ONLY.includes(pathname);
  if (isGuestOnly && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to these paths only — excludes static files and API routes
  matcher: [
    "/dashboard/:path*",
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
  ],
};