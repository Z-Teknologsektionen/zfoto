import { createTRPCRouter } from "../trpc";
import { albumRouter } from "./albums";
import { emailRouter } from "./email";
import { imageRouter } from "./images";

export const appRouter = createTRPCRouter({
  album: albumRouter,
  email: emailRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
