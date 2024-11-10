import { auth } from "@/auth";

const apiAuthPrefix = "/api/auth";
const publicRoutes = ["/"];
const authRoutes = ["/signin", "/register"];
const defaultRedirectUrl = "/";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const { pathname } = nextUrl;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) {
    return;
  }

  const isAuthRoute = authRoutes.includes(pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(defaultRedirectUrl, nextUrl));
    }
    return;
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/signin", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
