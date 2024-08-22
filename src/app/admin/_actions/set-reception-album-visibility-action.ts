"use server";

import { setReceptionAlbumVisibilitySchema } from "@/schemas/album";
import { setReceptionAlbumVisibility } from "@/server/data-access/albums";
import { adminSafeAction } from "~/actions/safe-action";

export const setReceptionAlbumVisibilityAction = adminSafeAction
  .schema(setReceptionAlbumVisibilitySchema)
  .action(async ({ parsedInput: { isVisible } }) =>
    setReceptionAlbumVisibility(isVisible),
  );
