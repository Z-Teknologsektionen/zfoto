import { z } from "zod";
import { updateManyAlbumsBaseSchema } from "./helpers/zodSchemas";
import {
  albumTitleString,
  isReceptionBoolean,
  isVisibleBoolean,
  objectId,
  validDateInputsToDate,
} from "./helpers/zodTypes";
import { createImageAPISchema } from "./image";

export const setReceptionAlbumVisibilitySchema = z.object({
  isVisible: z.boolean(),
});

export const updateAlbumSchema = z
  .object({
    title: albumTitleString,
    isVisible: isVisibleBoolean,
    isReception: isReceptionBoolean,
    date: validDateInputsToDate,
  })
  .partial()
  .extend({
    id: objectId,
  });

export const createAlbumAPISchema = z
  .object({
    title: albumTitleString,
    isVisible: isVisibleBoolean.default(true),
    isReception: isReceptionBoolean.default(false),
    date: validDateInputsToDate.default(new Date()),
  })
  .extend({
    images: z
      .array(createImageAPISchema.omit({ albumId: true }))
      .min(1, "Det måste vara minst 1 bild i ett album"),
  });

export const updateManyAlbumsSchema = z.object({
  albumIds: objectId.array().min(1, "Måste vara minst 1 album id"),
  data: updateManyAlbumsBaseSchema,
});
