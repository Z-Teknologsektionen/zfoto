import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "../env/server.mjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      email: string;
      id: string;
      name: string;
      picture: string;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user && user.email) {
        // eslint-disable-next-line no-param-reassign
        session.user.email = user.email;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
    signIn(params) {
      const adminEmails = env.ADMIN_MAILS_ENDSWITH.split(", ");

      for (const email of adminEmails) {
        if (params.user.email?.endsWith(email.trim())) {
          return true;
        }
      }

      return false;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

export default authOptions;
