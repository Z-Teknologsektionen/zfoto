"use server";

import { updateAlbumAPISchema } from "@/schemas/helpers/zodScheams";
import { updateAlbumById } from "@/server/data-access/albums";
import { adminLikeSafeAction } from "~/actions/safe-action";

export const updateAlbumByIdAction = adminLikeSafeAction
  .schema(updateAlbumAPISchema)
  .action(async ({ parsedInput: { albumId, ...data } }) =>
    updateAlbumById(albumId, data),
  );
