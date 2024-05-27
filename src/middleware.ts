import { Roles } from "@prisma/client";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { adminLikeRoles } from "./constants/admin";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const pathname = request.nextUrl.pathname;
    const token = request.nextauth.token;

    if (!token) return NextResponse.rewrite(new URL("/denied", request.url));

    if (pathname.startsWith("/admin") && !adminLikeRoles.includes(token.role))
      return NextResponse.rewrite(new URL("/denied", request.url));

    if (pathname.startsWith("/admin/users") && token.role !== Roles.ADMIN)
      return NextResponse.rewrite(new URL("/denied", request.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = { matcher: "/admin/:path*" };
