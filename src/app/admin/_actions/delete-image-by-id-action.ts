"use server";

import { objectId } from "@/schemas/helpers/zodTypes";
import { deleteImageById } from "@/server/data-access/images";
import { z } from "zod";
import { adminLikeSafeAction } from "../../_actions/safe-action";

export const deleteImageByIdAction = adminLikeSafeAction
  .schema(z.object({ id: objectId }))
  .action(async ({ parsedInput: { id } }) => deleteImageById(id));
