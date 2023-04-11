import { isValidObjectId } from "mongoose";
import { z } from "zod";

import {
  getAlbum,
  getAlbumAsAdmin,
  getAlbums,
  getAlbumsAsAdmin,
} from "../../../utils/fetchDataFromPrisma";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const albumRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    const albums = getAlbums();
    return albums;
  }),
  getAllAsAdmin: protectedProcedure.query(() => {
    const albums = getAlbumsAsAdmin();
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
    .query(({ input: { albumId } }) => {
      const album = getAlbum(albumId);
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
    .query(async ({ input: { albumId } }) => {
      const album = await getAlbumAsAdmin(albumId);
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
