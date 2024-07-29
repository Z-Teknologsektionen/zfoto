"use server";

import { updateAlbumAPISchema } from "@/schemas/helpers/zodScheams";
import { updateAlbumById } from "@/server/data-access/albums";
import { adminLikeSafeAction } from "~/actions/safe-action";
import { getUTCFromLocalDate } from "~/utils/date-utils";

export const updateAlbumAction = adminLikeSafeAction
  .schema(updateAlbumAPISchema)
  .action(
    async ({ parsedInput: { albumId, date, isReception, title, visible } }) => {
      const album = await updateAlbumById(albumId, {
        isReception,
        title,
        visible,
        date: date === undefined ? undefined : getUTCFromLocalDate(date),
      });

      return album;
    },
  );
