import { updateImageAPISchema } from "@/server/trpc/helpers/zodScheams";
import { updateImageById } from "~/utils/update-image-by-id";
import { adminLikeSafeAction } from "./safe-action";

export const updateImageByIdAction = adminLikeSafeAction(
  updateImageAPISchema,
  async ({ imageId, ...data }) => updateImageById(imageId, data),
);
