import { router } from "../trpc";
import { albumRouter } from "./albums";
import { emailRouter } from "./email";
import { exampleRouter } from "./example";
import { imageRouter } from "./images";

export const appRouter = router({
  album: albumRouter,
  email: emailRouter,
  example: exampleRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
