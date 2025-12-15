import NextAuth from "next-auth";
import { authOptions } from "~/utils/authOptions";

// eslint-disable-next-line ts/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
