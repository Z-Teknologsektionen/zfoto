"use server";

import { objectId } from "@/schemas/helpers/zodTypes";
import { deleteAlbumById } from "@/server/data-access/albums";
import { z } from "zod";
import { adminLikeSafeAction } from "~/actions/safe-action";

export const deleteAlbumByIdAction = adminLikeSafeAction
  .schema(z.object({ id: objectId }))
  .action(async ({ parsedInput: { id } }) => deleteAlbumById(id));
