"use server";

import { updateManyImagesSchema } from "@/schemas/image";
import {
  updateImageById,
  updateManyImagesByIds,
} from "@/server/data-access/images";
import { adjustDate, getUTCFromLocalDate } from "~/utils/date-utils";
import { db } from "~/utils/db";
import { adminLikeSafeAction } from "../../_actions/safe-action";

export const updateManyImagesByIdsAction = adminLikeSafeAction
  .schema(updateManyImagesSchema)
  .action(
    async ({
      parsedInput: {
        imageIds,
        data: { date, isVisible, photographer },
      },
    }) => {
      if (typeof date === "object" && !(date instanceof Date)) {
        const { hours, minutes, seconds } = date;
        const allImages = await db.image.findMany({
          where: {
            id: {
              in: imageIds,
            },
          },
        });

        return Promise.allSettled(
          allImages.map(async ({ id, date }) =>
            updateImageById(id, {
              date: adjustDate(date, { hours, minutes, seconds }),
              photographer,
              isVisible,
            }),
          ),
        );
      }

      return updateManyImagesByIds(imageIds, {
        date: date instanceof Date ? getUTCFromLocalDate(date) : undefined,
        photographer,
        isVisible,
      });
    },
  );
