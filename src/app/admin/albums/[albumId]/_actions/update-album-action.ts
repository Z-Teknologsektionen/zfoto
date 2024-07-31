"use server";

import { updateAlbumSchema } from "@/schemas/album";
import { updateAlbumById } from "@/server/data-access/albums";
import { adminLikeSafeAction } from "~/actions/safe-action";
import { getUTCFromLocalDate } from "~/utils/date-utils";

export const updateAlbumAction = adminLikeSafeAction
  .schema(updateAlbumSchema)
  .action(
    async ({
      parsedInput: { albumId, date, isReception, title, isVisible },
    }) => {
      const album = await updateAlbumById(albumId, {
        isReception,
        title,
        visible: isVisible,
        date: date === undefined ? undefined : getUTCFromLocalDate(date),
      });

      return album;
    },
  );
