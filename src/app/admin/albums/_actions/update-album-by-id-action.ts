"use server";

import { updateAlbumSchema } from "@/schemas/album";
import { updateAlbumById } from "@/server/data-access/albums";
import { adminLikeSafeAction } from "~/actions/safe-action";

export const updateAlbumByIdAction = adminLikeSafeAction
  .schema(updateAlbumSchema)
  .action(async ({ parsedInput: { albumId, ...data } }) =>
    updateAlbumById(albumId, data),
  );
