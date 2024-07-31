import { z } from "zod";
import { validDateInputsToDate } from "./zodTypes";

export const albumBaseSchema = z.object({
  title: z.string().min(1, {
    message: "Rubiken måste vara minst 1 tecken lång",
  }),
  isVisible: z.boolean().optional().default(true),
  isReception: z.boolean().default(false),
  date: validDateInputsToDate.optional().default(new Date()),
});

export const imageBaseSchema = z.object({
  filename: z.string().min(3).includes("."),
  photographer: z.string().min(3).optional().default("zFoto"),
  isCoverImage: z.boolean().optional().default(false),
  isVisible: z.boolean().optional().default(true),
  date: validDateInputsToDate.optional().default(new Date()),
});
