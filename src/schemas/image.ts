import { z } from "zod";
import {
  imageBaseSchema,
  updateManyImagesBaseSchema,
} from "./helpers/zodScheams";
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

export const updateManyImagesSchema = z.object({
  imageIds: objectId.array().min(1),
  data: updateManyImagesBaseSchema,
});
