import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "../../../env/server.mjs";
import { appRouter } from "../../../server/trpc/router/_app";
import { createTRPCContext } from "../../../server/trpc/trpc";

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
