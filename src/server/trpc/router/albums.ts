import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const albumRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        year: z.number().min(2022).optional(),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      const { year } = input ?? {};
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
          date: {
            lte: new Date(year || new Date().getFullYear(), 12).toISOString(),
            gte: new Date(year || 2022, 1).toISOString(),
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
            where: {
              coverImage: true,
              visible: true,
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
  infiniteAlbums: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const albums = await ctx.prisma.album.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
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
            where: {
              coverImage: true,
              visible: true,
            },
          },
          date: true,
        },
        orderBy: {
          date: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
      });
      let nextCursor: typeof cursor | undefined;
      if (albums.length > limit) {
        const nextItem = albums.pop();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        nextCursor = nextItem!.id;
      }

      const formatedAlbums = albums.map((album) => {
        const { images, ...formatedAlbum } = album;
        return {
          ...formatedAlbum,
          coverImageFilename: images.at(0)?.filename ?? "",
        };
      });

      return {
        albums: formatedAlbums,
        nextCursor,
      };
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
        reception: z.boolean().optional(),
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
            isReception: input.reception,
          },
        });
        return updatedAlbum;
      } catch (error) {
        return error;
      }
    }),
  hideReceptionAlbums: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.album.updateMany({
      where: {
        isReception: true,
      },
      data: {
        visible: false,
      },
    });
  }),
  showReceptionAlbums: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.album.updateMany({
      where: {
        isReception: true,
      },
      data: {
        visible: true,
      },
    });
  }),
});
