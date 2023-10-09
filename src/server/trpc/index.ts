import { albumRouter } from "./router/albums";
import { imageRouter } from "./router/images";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  album: albumRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
