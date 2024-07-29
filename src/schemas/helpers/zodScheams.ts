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
  date: fullDatetimeString.transform((str) => new Date(str)),
});

export const updateAlbumFrontEndSchema = updateAlbumBaseSchema;

export const updateAlbumAPISchema = updateAlbumBaseSchema
  .partial()
  .extend({ albumId: objectId });

const updateImageBaseSchema = z.object({
  filename: z.string().min(1).optional(),
  photographer: z
    .string()
    .min(1, "Fotografens namn måste vara minst 1 tecken lång")
    .optional(),
  visible: z.boolean().optional(),
  coverImage: z.boolean().optional(),
  albumId: objectId.optional(),
});

export const updateImageFrontEndSchema = updateImageBaseSchema.extend({
  date: frontEndDatetimeString,
});

export const updateImageAPISchema = updateImageBaseSchema
  .extend({
    date: fullDatetimeString,
  })
  .partial()
  .extend({
    imageId: objectId,
  });

export const userSignInForm = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().trim().min(8),
});

export const emailSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(3).max(100),
  message: z.string().min(10).max(100_000),
});
