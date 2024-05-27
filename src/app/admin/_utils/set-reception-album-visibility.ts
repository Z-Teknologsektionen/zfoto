"use server";

import "server-only";
import { db } from "~/utils/db";

export const setReceptionAlbumVisibility = async (isVisible: boolean) =>
  await db.album.updateMany({
    where: {
      isReception: true,
    },
    data: {
      visible: isVisible,
    },
  });
