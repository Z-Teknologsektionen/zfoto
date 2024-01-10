import { z } from "zod";
import { updateAlbumAPISchema } from "../helpers/zodScheams";
import { objectId } from "../helpers/zodTypes";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const albumRouter = createTRPCRouter({
  getAlbumById: publicProcedure
    .input(
      z.object({
        albumId: objectId,
      }),
    )
    .query(({ ctx, input }) =>
      ctx.prisma.album.findUniqueOrThrow({
        where: {
          id: input.albumId,
        },
      }),
    ),
  updateAlbumById: adminProcedure
    .input(updateAlbumAPISchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.album.update({
        where: {
          id: input.albumId,
        },
        data: {
          title: input.title,
          date: input.date,
          visible: input.visible,
          isReception: input.isReception,
        },
      }),
    ),
  setReceptionVisibility: adminProcedure
    .input(z.object({ visible: z.boolean() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.album.updateMany({
        where: {
          isReception: true,
        },
        data: {
          visible: input.visible,
        },
      }),
    ),
});
