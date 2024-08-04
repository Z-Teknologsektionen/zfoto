"use server";

import { updateImageSchema } from "@/schemas/image";
import { updateImageById } from "@/server/data-access/images";
import { getUTCFromLocalDate } from "~/utils/date-utils";
import { adminLikeSafeAction } from "./safe-action";

export const updateImageByIdAction = adminLikeSafeAction
  .schema(updateImageSchema)
  .action(
    async ({
      parsedInput: {
        imageId,
        albumId,
        date,
        filename,
        isCoverImage,
        isVisible,
        photographer,
      },
    }) =>
      updateImageById(imageId, {
        albumId,
        isCoverImage,
        date: date === undefined ? undefined : getUTCFromLocalDate(date),
        filename,
        photographer,
        isVisible,
      }),
  );
