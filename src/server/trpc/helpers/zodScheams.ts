import { z } from "zod";
import {
  frontEndDatetimeString,
  fullDatetimeString,
  objectId,
} from "./zodTypes";

const updateAlbumBaseSchema = z.object({
  title: z.string().min(1, {
    message: "Rubiken måste vara minst 1 tecken lång",
  }),
  visible: z.boolean(),
  isReception: z.boolean(),
});

export const updateAlbumFrontEndSchema = updateAlbumBaseSchema.extend({
  date: frontEndDatetimeString,
});

export const updateAlbumAPISchema = updateAlbumBaseSchema
  .extend({
    date: fullDatetimeString,
  })
  .partial()
  .extend({ albumId: objectId });

export const updateImageSchema = z.object({
  imageId: objectId,
  filename: z.string().min(1).optional(),
  photographer: z
    .string()
    .min(1, {
      message: "Fotografens namn måste vara minst 1 tecken lång",
    })
    .optional(),
  visible: z.boolean().optional(),
  coverImage: z.boolean().optional(),
  date: fullDatetimeString.optional(),
  albumId: objectId.optional(),
});
