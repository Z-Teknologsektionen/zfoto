"use server";

import { updateImageSchema } from "@/schemas/image";
import { updateImageById } from "@/server/data-access/images";
import { adminLikeSafeAction } from "./safe-action";

export const updateImageByIdAction = adminLikeSafeAction
  .schema(updateImageSchema)
  .action(async ({ parsedInput: { imageId, ...data } }) =>
    updateImageById(imageId, data),
  );
