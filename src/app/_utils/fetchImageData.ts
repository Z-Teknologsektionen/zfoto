import { db } from "~/utils/db";

export const getImagebyId = (id: string) => {
  return db.image.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      album: true,
    },
  });
};
