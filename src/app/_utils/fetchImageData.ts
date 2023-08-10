import { prisma } from "~/utils/db";

export const getImagebyId = (id: string) => {
  return prisma.image.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      album: true,
    },
  });
};
