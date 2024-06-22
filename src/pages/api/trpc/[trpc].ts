import { env } from "@/env.mjs";
import { appRouter } from "@/server/trpc";
import { createTRPCContext } from "@/server/trpc/trpc";
import { createNextApiHandler } from "@trpc/server/adapters/next";

// Export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path = "", error }): undefined => {
          // eslint-disable-next-line no-console
          console.error(`❌ tRPC failed on ${path}: ${error.message}`);
        }
      : undefined,
});
