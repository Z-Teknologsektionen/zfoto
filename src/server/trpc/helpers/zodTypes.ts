import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const objectId = z.string().refine(isValidObjectId);

export const datetimeString = z.string().datetime({
  precision: 3,
  offset: false,
  message: "Otilllåtet datum/tids format",
});
