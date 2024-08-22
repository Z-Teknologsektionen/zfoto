import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const objectId = z.string().refine(isValidObjectId);

export const fullDatetimeString = z.string().datetime({
  precision: 3,
  offset: false,
  message: "Otilllåtet datum/tids format",
});

export const fullDatetimeStringToDate = fullDatetimeString.transform(
  (str) => new Date(str),
);

export const validDateInputsToDate = fullDatetimeStringToDate.or(z.date());
