import type { NextRequestWithAuth } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Roles } from "prisma/generated/enums";
import { adminLikeRoles } from "./constants/admin";

export default withAuth(
  function proxy(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    const { token } = request.nextauth;

    if (token === null)
      return NextResponse.rewrite(new URL("/denied", request.url));

    if (pathname.startsWith("/admin") && !adminLikeRoles.includes(token.role))
      return NextResponse.rewrite(new URL("/denied", request.url));

    if (pathname.startsWith("/admin/users") && token.role !== Roles.ADMIN)
      return NextResponse.rewrite(new URL("/denied", request.url));

    return undefined;
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
  },
);

export const config = { matcher: "/admin/:path*" };
