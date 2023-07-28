import { prisma } from "~/server/db/client";

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
