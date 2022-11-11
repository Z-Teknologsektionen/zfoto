import { router } from "../trpc";
import { albumRouter } from "./albums";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  album: albumRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
