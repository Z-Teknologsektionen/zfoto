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
        include: {
          album: true,
        },
        where: {
          id: imageId,
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
        data: {
          visible: input.visibility,
        },
        where: {
          id: input.imageId,
        },
      });
      return album;
    }),
  setCoverImage: publicProcedure
    .input(
      z.object({
        imageId: z.string().refine((val) => {
          return isValidObjectId(val);
        }),
        coverImage: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const album = await ctx.prisma.image.update({
        data: {
          coverImage: input.coverImage,
        },
        where: {
          id: input.imageId,
        },
      });
      return album;
    }),
  setImageProps: publicProcedure
    .input(
      z.object({
        imageId: z.string().refine((val) => {
          return isValidObjectId(val);
        }),
        coverImage: z.boolean(),
        visibility: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const image = await ctx.prisma.image.update({
        data: {
          coverImage: input.coverImage,
          visible: input.visibility,
        },
        where: {
          id: input.imageId,
        },
      });
      return image;
    }),
  updateOne: publicProcedure
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
