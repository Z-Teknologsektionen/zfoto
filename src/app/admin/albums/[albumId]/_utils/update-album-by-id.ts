"use server";

import { db } from "~/utils/db";

type UpdateAlbumByIdProps = {
  albumId: string;
  data: {
    date?: string | Date | undefined;
    title?: string | undefined;
    visible?: boolean | undefined;
    isReception?: boolean | undefined;
  };
};

export const updateAlbumById = async ({
  albumId,
  data,
}: UpdateAlbumByIdProps) => {
  return await db.album.update({
    where: {
      id: albumId,
    },
    data,
  });
};
