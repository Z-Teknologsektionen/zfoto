import { z } from "zod";
import {
  albumBaseSchema,
  imageBaseSchema,
  updateManyAlbumsBaseSchema,
} from "./helpers/zodScheams";
import { objectId } from "./helpers/zodTypes";

export const setReceptionAlbumVisibilitySchema = z.object({
  isVisible: z.boolean(),
});

export const updateAlbumSchema = albumBaseSchema.partial().extend({
  albumId: objectId,
});

export const createAlbumAPISchema = albumBaseSchema.extend({
  images: z
    .array(imageBaseSchema)
    .min(1, "Det måste vara minst 1 bild i ett album"),
});

export const updateManyAlbumsSchema = z.object({
  albumIds: objectId.array().min(1, "Måste vara minst 1 album id"),
  data: updateManyAlbumsBaseSchema,
});
