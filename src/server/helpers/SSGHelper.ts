import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { prisma } from "../db/client";
import { appRouter } from "../trpc/router/_app";

export const ssg = createProxySSGHelpers({
  router: appRouter,
  ctx: { prisma, session: null },
  transformer: superjson, // optional - adds superjson serialization
});
