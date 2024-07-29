"use server";

import { updateImageById } from "@/server/data-access/images";
import { updateImageAPISchema } from "@/server/schemas/helpers/zodScheams";
import { adminLikeSafeAction } from "./safe-action";

export const updateImageByIdAction = adminLikeSafeAction
  .schema(updateImageAPISchema)
  .action(async ({ parsedInput: { imageId, ...data } }) =>
    updateImageById(imageId, data),
  );
