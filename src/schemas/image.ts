import { imageBaseSchema } from "./helpers/zodScheams";
import { objectId } from "./helpers/zodTypes";

export const createImageAPISchema = imageBaseSchema.extend({
  albumId: objectId,
});

export const updateImageSchema = imageBaseSchema
  .extend({
    albumId: objectId,
  })
  .partial()
  .extend({
    imageId: objectId,
  });
