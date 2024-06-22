"use server";

import { Roles } from "@prisma/client";
import { z } from "zod";
import { authSafeAction } from "~/actions/safe-action";
import { ActionError } from "~/actions/safe-action-helpers";
import { setReceptionAlbumVisibility } from "../_utils/set-reception-album-visibility";

const setReceptionAlbumVisibilitySchema = z.object({ isVisible: z.boolean() });

export const setReceptionAlbumVisibilityAction = authSafeAction(
  setReceptionAlbumVisibilitySchema,
  async ({ isVisible }, { session }) => {
    if (session.user.role !== Roles.ADMIN) {
      throw new ActionError(
        "Obehörig: Du har inte behörighet att göra den här åtgärden",
      );
    }

    return setReceptionAlbumVisibility(isVisible);
  },
);
