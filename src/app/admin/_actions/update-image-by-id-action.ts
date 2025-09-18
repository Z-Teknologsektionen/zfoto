"use server";

import { updateImageSchema } from "@/schemas/image";
import { updateImageById } from "@/server/data-access/images";
import { adminLikeSafeAction } from "../../_actions/safe-action";

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
        date,
        filename,
        photographer,
        isVisible,
      }),
  );
