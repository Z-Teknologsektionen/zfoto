import { isValidObjectId } from "mongoose";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const albumRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    const albums = ctx.prisma.album.findMany({
      include: {
        images: true,
      },
    });
    return albums;
  }),
  getOne: publicProcedure
    .input(
      z.object({
        albumId: z.string().refine((val) => {
          return isValidObjectId(val);
        }),
      })
    )
    .query(({ input: { albumId }, ctx }) => {
      const album = ctx.prisma.album.findUnique({
        where: {
          id: albumId,
        },
        include: {
          images: true,
        },
      });

      return album;
    }),
  createOne: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        date: z.date().optional(),
        images: z
          .array(
            z.object({
              filename: z.string().min(1),
              photographer: z.string().min(1),
              date: z.date().optional(),
            })
          )
          .min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const createdAlbum = await ctx.prisma.album.create({
        data: {
          title: input.title,
          images: {
            createMany: {
              data: input.images,
            },
          },
        },
        include: {
          images: true,
        },
      });
      return createdAlbum;
    }),
  updateInfo: publicProcedure
    .input(
      z.object({
        albumId: z.string().refine((val) => {
          return isValidObjectId(val);
        }),
        title: z.string().min(1),
        date: z.date(),
        visible: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const album = await ctx.prisma.album.update({
        where: { id: input.albumId },
        data: {
          title: input.title,
          date: input.date,
          visible: input.visible,
        },
      });
      return album;
    }),
});
