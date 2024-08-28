"use server";

import { updateManyAlbumsSchema } from "@/schemas/album";
import {
  updateAlbumById,
  updateManyAlbumsByIds,
} from "@/server/data-access/albums";
import { adjustDate } from "~/utils/date-utils";
import { db } from "~/utils/db";
import { adminLikeSafeAction } from "../../_actions/safe-action";

export const updateManyAlbumsByIdsAction = adminLikeSafeAction
  .schema(updateManyAlbumsSchema)
  .action(
    async ({
      parsedInput: {
        albumIds: albumdIds,
        data: { isReception, isVisible, relativeDate },
      },
    }) => {
      if (relativeDate !== undefined) {
        const allImages = await db.album.findMany({
          where: {
            id: {
              in: albumdIds,
            },
          },
        });

        return Promise.allSettled(
          allImages.map(async ({ id, date }) =>
            updateAlbumById(id, {
              date: adjustDate(date, relativeDate),
              isReception,
              isVisible,
            }),
          ),
        );
      }

      return updateManyAlbumsByIds(albumdIds, {
        isVisible,
        isReception,
      });
    },
  );
