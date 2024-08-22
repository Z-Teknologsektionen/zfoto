import { z } from "zod";
import { albumBaseSchema, imageBaseSchema } from "./helpers/zodScheams";
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
    .min(1, "There needs to be at least 1 image in the album"),
});
