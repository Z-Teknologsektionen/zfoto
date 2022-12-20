import { PrismaClient } from "@prisma/client";

import { env } from "../../env/server.mjs";

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prismaClient: PrismaClient | undefined;
}

export const prisma =
  global.prismaClient ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  global.prismaClient = prisma;
}
