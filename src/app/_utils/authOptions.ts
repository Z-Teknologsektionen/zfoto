/* eslint-disable no-unused-vars */

import { env } from "@/env.mjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Roles } from "@prisma/client";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { DefaultSession, DefaultUser, getServerSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "~/utils/db";
import { isValidCredentials } from "./isValidCredentials";

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

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/sign-in",
  },
  /*
   * Om du lägger till providers bör du även uppdatera
   * src\app\auth\sign-in\sign-in-content.tsx
   * med en ny knapp så du kan logga in med den nya providern
   */
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Patetinlogg",
      type: "credentials",
      credentials: {
        email: {
          label: "Epost",
          type: "email",
          placeholder: "Fyll i din epost",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Fyll i ditt lösenord",
        },
      },
      async authorize(credentials, req) {
        return isValidCredentials(credentials);
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, //30 dagars
    updateAge: 60 * 60 * 24, //24 timmar
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token = { ...token, ...user };
      return token;
    },
    async session({ session }) {
      const user = await db.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          role: true,
          email: true,
          image: true,
          name: true,
          id: true,
        },
      });
      return {
        ...session,
        user: { ...session.user, ...user },
      };
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = (
  ctx:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | [] = [],
) => {
  return getServerSession(...ctx, authOptions);
};
