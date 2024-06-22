"use server";

import { updateAlbumAPISchema } from "@/server/trpc/helpers/zodScheams";
import { adminLikeSafeAction } from "~/actions/safe-action";
import { getUTCFromLocalDate } from "~/utils/date-utils";
import { updateAlbumById } from "../_utils/update-album-by-id";

export const updateAlbumAction = adminLikeSafeAction(
  updateAlbumAPISchema,
  async ({ albumId, date, isReception, title, visible }) => {
    const album = await updateAlbumById({
      albumId,
      data: {
        isReception,
        title,
        visible,
        date:
          date === undefined ? undefined : getUTCFromLocalDate(new Date(date)),
      },
    });

    return album;
  },
);
