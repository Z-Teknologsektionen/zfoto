import { db } from "./db";

export const updateImageById = async (
  imageId: string,
  data: {
    albumId?: string;
    coverImage?: boolean;
    date?: Date | string;
    filename?: string;
    photographer?: string;
    updatedAt?: Date | string;
    visible?: boolean;
  },
) =>
  db.image.update({
    where: {
      id: imageId,
    },
    data,
  });
