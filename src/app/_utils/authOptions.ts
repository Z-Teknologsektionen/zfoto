/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable no-unused-vars */

import { env } from "@/env.mjs";
import { getUserByEmailForSession } from "@/server/data-access/users";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Roles } from "@prisma/client";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type {
  DefaultSession,
  DefaultUser,
  NextAuthOptions,
  Session,
} from "next-auth";
import { getServerSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
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

      async authorize(credentials) {
        if (credentials === undefined) return null;

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
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session }) {
      const user = await getUserByEmailForSession(session.user.email);
      return {
        ...session,
        user: { ...session.user, ...user },
      };
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = async (
  ctx:
    | []
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse] = [],
): Promise<Session | null> => getServerSession(...ctx, authOptions);
