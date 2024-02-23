import { albumRouter } from "./router/albums";
import { emailRouter } from "./router/email";
import { imageRouter } from "./router/images";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  album: albumRouter,
  image: imageRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
