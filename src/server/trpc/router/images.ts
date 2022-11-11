import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const imageRouter = router({
  getOne: publicProcedure
    .input(
      z.object({
        imageId: z.string().cuid(),
      })
    )
    .query(({ input: { imageId }, ctx }) => {
      const album = ctx.prisma.image.findUnique({
        where: {
          id: imageId,
        },
        include: {
          album: true,
        },
      });

      return album;
    }),
});
