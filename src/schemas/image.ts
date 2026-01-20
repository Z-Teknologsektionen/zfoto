import { z } from "zod";
import { updateManyImagesBaseSchema } from "./helpers/zodSchemas";
import {
  filenameString,
  isCoverImageBoolean,
  isVisibleBoolean,
  objectId,
  photographerString,
  validDateInputsToDate,
} from "./helpers/zodTypes";

export const createImageAPISchema = z
  .object({
    filename: filenameString,
    photographer: photographerString.default("zFoto"),
    isVisible: isVisibleBoolean.optional().default(true),
    isCoverImage: isCoverImageBoolean.optional().default(false),
    date: validDateInputsToDate.optional().default(new Date()),
  })
  .extend({
    albumId: objectId,
  });

export const updateImageSchema = z
  .object({
    filename: filenameString,
    photographer: photographerString,
    isVisible: isVisibleBoolean,
    isCoverImage: isCoverImageBoolean,
    date: validDateInputsToDate,
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
