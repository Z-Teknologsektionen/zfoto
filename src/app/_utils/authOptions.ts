/* eslint-disable no-unused-vars */

import { env } from "@/env/server.mjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Roles } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import type { NextAuthOptions } from "next-auth";
import { DefaultSession, DefaultUser, getServerSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "~/utils/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      email: string;
      id: string;
      name: string;
      picture: string;
      role: Roles;
    };
  }

  interface User extends DefaultUser {
    role: Roles;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: Roles;
  }
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

export default authOptions;
