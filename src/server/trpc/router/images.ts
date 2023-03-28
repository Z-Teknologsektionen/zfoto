import { isValidObjectId } from "mongoose";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const imageRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      z.object({
        imageId: z.string().cuid(),
      })
    )
    .query(({ input: { imageId }, ctx }) => {
      const album = ctx.prisma.image.findUnique({
        include: {
          album: true,
        },
        where: {
          id: imageId,
        },
      });

      return album;
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        imageId: z.string().refine((val) => {
          return isValidObjectId(val);
        }),
        visible: z.boolean(),
        coverImage: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedImage = await ctx.prisma.image.update({
          where: {
            id: input.imageId,
          },
          data: {
            visible: input.visible,
            coverImage: input.coverImage,
          },
        });
        return updatedImage;
      } catch (error) {
        return error;
      }
    }),
});
