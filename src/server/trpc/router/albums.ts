import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const albumRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const albums = await prisma.album.findMany({
      where: {
        visible: {
          equals: true,
        },
        images: {
          some: {
            coverImage: true,
            visible: true,
          },
        },
      },
      select: {
        id: true,
        title: true,
        images: {
          orderBy: { date: "asc" },
          take: 1,
          select: {
            filename: true,
          },
        },
        date: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    const formatedAlbums = albums.map((album) => {
      const { images, ...formatedAlbum } = album;
      return {
        ...formatedAlbum,
        coverImageFilename: images.at(0)?.filename ?? "",
      };
    });
    return formatedAlbums;
  }),
  getAllAsAdmin: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    const albums = await prisma.album.findMany({
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

    const formatedAlbums = albums.map((album) => {
      const { images, ...formatedAlbum } = album;
      return {
        ...formatedAlbum,
        coverImageFilename: images.at(0)?.filename ?? "",
      };
    });
    return formatedAlbums;
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
    .query(({ input: { albumId }, ctx: { prisma } }) => {
      const album = prisma.album.findFirstOrThrow({
        where: {
          id: albumId,
        },
        select: {
          id: true,
          title: true,
          images: {
            where: {
              visible: {
                equals: true,
              },
            },
            orderBy: [{ date: "asc" }, { filename: "desc" }],
            select: {
              date: true,
              filename: true,
              photographer: true,
              id: true,
            },
          },
          date: true,
          _count: true,
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
    .query(async ({ input: { albumId }, ctx: { prisma } }) => {
      const album = await prisma.album.findFirstOrThrow({
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
