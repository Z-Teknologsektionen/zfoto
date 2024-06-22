"use server";

import "server-only";
import { db } from "~/utils/db";

export const setReceptionAlbumVisibility = async (isVisible: boolean) =>
  db.album.updateMany({
    where: {
      isReception: true,
    },
    data: {
      visible: isVisible,
    },
  });
