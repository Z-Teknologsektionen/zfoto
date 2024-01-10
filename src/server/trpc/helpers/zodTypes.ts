import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const objectId = z.string().refine(isValidObjectId);

export const fullDatetimeString = z.string().datetime({
  precision: 3,
  offset: false,
  message: "Otilllåtet datum/tids format",
});

// Följer följande format 'YYYY-MM-DDTHH:MM'
export const frontEndDatetimeString = z
  .string()
  .length(16)
  .refine((val) => fullDatetimeString.safeParse(val + ":00.000Z").success);
