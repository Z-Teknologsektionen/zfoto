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
  getImageIds: publicProcedure
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
        select: {
          images: {
            select: {
              id: true,
            },
          },
        },
      });
      return album;
    }),
});
