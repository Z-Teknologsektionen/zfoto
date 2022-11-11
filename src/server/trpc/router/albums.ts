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
});
