import { isValidObjectId } from "mongoose";
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
  setVisibility: publicProcedure
    .input(
      z.object({
        imageId: z.string().refine((val) => {
          return isValidObjectId(val);
        }),
        visibility: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const album = await ctx.prisma.image.update({
        where: {
          id: input.imageId,
        },
        data: {
          visible: input.visibility,
        },
      });
      return album;
    }),
});
