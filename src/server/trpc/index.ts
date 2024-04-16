import { albumRouter } from "./router/albums";
import { emailRouter } from "./router/email";
import { imageRouter } from "./router/images";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  album: albumRouter,
  image: imageRouter,
  user: userRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
