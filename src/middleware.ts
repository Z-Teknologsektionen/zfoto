import { Roles } from "@prisma/client";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextauth.token?.role);

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== Roles.ADMIN
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = { matcher: "/admin/:path*" };
