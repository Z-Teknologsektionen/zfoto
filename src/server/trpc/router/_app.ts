import { router } from "../trpc";
import { albumRouter } from "./albums";
import { exampleRouter } from "./example";
import { imageRouter } from "./images";

export const appRouter = router({
  album: albumRouter,
  example: exampleRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
