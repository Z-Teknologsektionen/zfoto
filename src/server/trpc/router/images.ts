import { z } from "zod";
import { updateImageAPISchema } from "../helpers/zodScheams";
import { objectId } from "../helpers/zodTypes";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const imageRouter = createTRPCRouter({
  getOneById: publicProcedure
    .input(
      z.object({
        imageId: objectId,
      }),
    )
    .query(({ ctx, input }) =>
      ctx.prisma.image.findUniqueOrThrow({
        where: {
          id: input.imageId,
        },
      }),
    ),
  updateImageById: adminProcedure
    .input(updateImageAPISchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.image.update({
        where: {
          id: input.imageId,
        },
        data: {
          filename: input.filename,
          date: input.date,
          photographer: input.photographer,
          visible: input.visible,
          coverImage: input.coverImage,
          albumId: input.albumId,
        },
      }),
    ),
});
