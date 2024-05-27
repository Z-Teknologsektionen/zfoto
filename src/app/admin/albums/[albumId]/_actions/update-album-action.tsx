"use server";

import { updateAlbumAPISchema } from "@/server/trpc/helpers/zodScheams";
import { adminLikeSafeAction } from "~/actions/safe-action";
import { getUTCFromLocalDate } from "~/utils/date-utils";
import { updateAlbumById } from "../_utils/update-album-by-id";

export const updateAlbumAction = adminLikeSafeAction(
  updateAlbumAPISchema,
  async ({ albumId, date, isReception, title, visible }, { session }) => {
    const album = await updateAlbumById({
      albumId,
      data: {
        isReception,
        title,
        visible,
        date: date ? getUTCFromLocalDate(new Date(date)) : undefined,
      },
    });

    return album;
  },
);
