"use server";

import { setReceptionAlbumVisibility } from "@/server/data-access/albums";
import { z } from "zod";
import { adminSafeAction } from "~/actions/safe-action";

const setReceptionAlbumVisibilitySchema = z.object({ isVisible: z.boolean() });

export const setReceptionAlbumVisibilityAction = adminSafeAction
  .schema(setReceptionAlbumVisibilitySchema)
  .action(async ({ parsedInput: { isVisible } }) =>
    setReceptionAlbumVisibility(isVisible),
  );
