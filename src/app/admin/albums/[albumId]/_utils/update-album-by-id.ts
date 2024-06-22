"use server";

import { db } from "~/utils/db";

type UpdateAlbumByIdProps = {
  albumId: string;
  data: {
    date?: Date | string | undefined;
    title?: string | undefined;
    visible?: boolean | undefined;
    isReception?: boolean | undefined;
  };
};

export const updateAlbumById = async ({
  albumId,
  data,
}: UpdateAlbumByIdProps) =>
  db.album.update({
    where: {
      id: albumId,
    },
    data,
  });
