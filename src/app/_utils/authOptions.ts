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
import type { DefaultJWT } from "next-auth/jwt";
import type { Roles } from "prisma/generated/enums";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env.mjs";
import { getUserByEmailForSession } from "@/server/data-access/users";
import { db } from "~/utils/db";
import { isValidCredentials } from "./isValidCredentials";

declare module "next-auth" {
  // @ts-expect-error Typescript does not like that session is imported and used but this is the way to set it up according to the documentation
  type Session = {
    user: DefaultSession["user"] & {
      email: string;
      id: string;
      name: string;
      picture: string;
      role: Roles;
    };
  } & DefaultSession;

  // @ts-expect-error Typescript does not like that session is imported and used but this is the way to set it up according to the documentation
  type User = {
    role: Roles;
  } & DefaultUser;
}

declare module "next-auth/jwt" {
  // @ts-expect-error Typescript does not like that session is imported and used but this is the way to set it up according to the documentation
  type JWT = {
    role: Roles;
  } & DefaultJWT;
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

export const authOptions: NextAuthOptions = {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore PrismaAdapter is not updated for newer versions of prisma but this works well
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/sign-in",
  },
  /*
   * Om du lägger till providers bör du även uppdatera
   * src\app\auth\sign-in\sign-in-content.tsx
   * med en ny knapp så du kan logga in med den nya metoden
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
      const user =
        session.user?.email !== undefined && session.user.email !== null
          ? await getUserByEmailForSession(session.user.email)
          : null;
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
