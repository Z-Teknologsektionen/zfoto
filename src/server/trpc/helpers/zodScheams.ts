import { z } from "zod";
import { datetimeString, objectId } from "./zodTypes";

export const updateAlbumSchema = z.object({
  albumId: objectId,
  title: z
    .string()
    .min(1, {
      message: "Rubiken måste vara minst 1 tecken lång",
    })
    .optional(),
  visible: z.boolean().optional(),
  isReception: z.boolean().optional(),
  date: datetimeString.optional(),
});

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
  date: datetimeString.optional(),
  albumId: objectId.optional(),
});
