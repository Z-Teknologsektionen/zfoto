import { db } from "~/utils/db";

export const getImagebyId = async (id: string) =>
  db.image.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      album: true,
    },
  });
