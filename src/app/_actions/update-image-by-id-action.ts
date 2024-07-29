"use server";

import { updateImageAPISchema } from "@/schemas/helpers/zodScheams";
import { updateImageById } from "@/server/data-access/images";
import { adminLikeSafeAction } from "./safe-action";

export const updateImageByIdAction = adminLikeSafeAction
  .schema(updateImageAPISchema)
  .action(async ({ parsedInput: { imageId, ...data } }) =>
    updateImageById(imageId, data),
  );
