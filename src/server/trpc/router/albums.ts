import type { Album, Image, Prisma } from "@prisma/client";
import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

type FormatedAlbumsForGrid = {
  coverImage: {
    date: Date;
    filename: string;
    id: string;
  };
  date: Date;
  id: string;
  title: string;
};

type FormatedAlbumsForAdminTable = Album & {
  _count: Prisma.AlbumCountOutputType;
  coverImage: Image;
};

export const albumRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const albums = await prisma.album.findMany({
      where: {
        visible: {
          equals: true,
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
            id: true,
            date: true,
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

    const formatedAlbums: FormatedAlbumsForGrid[] = albums
      .map((album) => {
        const coverImage = album.images[0];
        if (!coverImage) {
          return null;
        }
        return {
          id: album.id,
          title: album.title,
          coverImage: {
            filename: coverImage.filename,
            id: coverImage.id,
            date: coverImage.date.toISOString(),
          },
          date: album.date.toISOString(),
        };
      })
      .filter(
        (album) => album !== null
      ) as unknown[] as FormatedAlbumsForGrid[];

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

    const formatedAlbums: FormatedAlbumsForAdminTable[] = albums
      .map((album) => {
        const coverImage = album.images[0];
        if (!coverImage) {
          return null;
        }
        return {
          ...album,
          coverImage: {
            filename: coverImage.filename,
            id: coverImage.id,
            date: coverImage.date.toISOString(),
          },
          date: album.date.toISOString(),
        };
      })
      .filter(
        (album) => album !== null
      ) as unknown[] as FormatedAlbumsForAdminTable[];

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
