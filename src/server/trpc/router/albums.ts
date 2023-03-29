import { isValidObjectId } from "mongoose";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const albumRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const albums = ctx.prisma.album.findMany({
      include: {
        images: {
          where: {
            coverImage: true,
          },
          take: 1,
        },
        _count: {
          select: {
            images: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
    return albums;
  }),
  getAllAsAdmin: protectedProcedure.query(({ ctx }) => {
    const albums = ctx.prisma.album.findMany({
      include: {
        _count: true,
        images: {
          orderBy: { date: "asc" },
          take: 1,
          where: {
            coverImage: true,
            visible: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
    return albums;
  }),
  getOne: publicProcedure
    .input(
      z.object({
        albumId: z
          .string()
          .optional()
          .refine((val) => {
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
  getOneAsAdmin: protectedProcedure
    .input(
      z.object({
        albumId: z
          .string()
          .optional()
          .refine((val) => {
            return isValidObjectId(val);
          }),
      })
    )
    .query(async ({ input: { albumId }, ctx }) => {
      const album = await ctx.prisma.album.findFirstOrThrow({
        where: {
          id: albumId,
        },
        include: {
          _count: true,
          images: {
            orderBy: { date: "asc" },
          },
        },
        orderBy: {
          date: "desc",
        },
      });
      return album;
    }),
  updateInfo: protectedProcedure
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
  updateOne: protectedProcedure
    .input(
      z.object({
        albumId: z.string().refine((val) => {
          return isValidObjectId(val);
        }),
        title: z.string().min(1).optional(),
        date: z.date().optional(),
        visible: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const updatedAlbum = await ctx.prisma.album.update({
          where: { id: input.albumId },
          data: {
            title: input.title,
            date: input.date,
            visible: input.visible,
          },
        });
        return updatedAlbum;
      } catch (error) {
        return error;
      }
    }),
});
