import { z } from "zod";
import { updateAlbumAPISchema } from "../helpers/zodScheams";
import { objectId } from "../helpers/zodTypes";
import {
  adminLikeProcedure,
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "../trpc";

export const albumRouter = createTRPCRouter({
  getAlbumById: publicProcedure
    .input(
      z.object({
        albumId: objectId,
      }),
    )
    .query(async ({ ctx, input }) =>
      ctx.prisma.album.findUniqueOrThrow({
        where: {
          id: input.albumId,
        },
      }),
    ),
  updateAlbumById: adminLikeProcedure
    .input(updateAlbumAPISchema)
    .mutation(async ({ ctx, input }) =>
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
    .mutation(async ({ ctx, input }) =>
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
