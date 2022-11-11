import { router } from "../trpc";
import { albumRouter } from "./albums";
import { exampleRouter } from "./example";
import { imageRouter } from "./images";

export const appRouter = router({
  example: exampleRouter,
  album: albumRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
