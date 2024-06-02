import { env } from "@/env.mjs";
import { appRouter } from "@/server/trpc";
import { createTRPCContext } from "@/server/trpc/trpc";
import { createNextApiHandler } from "@trpc/server/adapters/next";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path = "", error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error.message}`);
        }
      : undefined,
});
