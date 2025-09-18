import type { CheckedState } from "@radix-ui/react-checkbox";
import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const baseString = z
  .string({
    invalid_type_error: "Måste vara en sträng",
    required_error: "Obligatoriskt fält",
  })
  .trim();

export const baseBoolean = z.boolean({
  invalid_type_error: "Måste vara en boolean",
  required_error: "Obligatoriskt fält",
});

export const baseNumber = z.number({
  invalid_type_error: "Måste vara ett nummer",
  required_error: "Obligatoriskt fält",
});

export const objectId = baseString.refine(isValidObjectId, "Ogiltigt objectId");

export const fullDatetimeString = baseString.datetime({
  precision: 3,
  offset: false,
  message:
    'Otillåtet datum/tids format. Måste vara på följande format: "YYYY-MM-DDTHH:mm:ss.000Z"',
});

export const fullDatetimeStringToDate = fullDatetimeString.transform(
  (str) => new Date(str),
);

export const validDateInputsToDate = fullDatetimeStringToDate.or(z.date());

export const emptyString = z.literal("");

export const wholeNumber = baseNumber.int("Måste vara ett heltal");

export const wholeNumberMinMax = (min: number, max: number) =>
  wholeNumber
    .min(min, `Måste vara större eller lika med ${min}`)
    .max(max, `Måste vara mindre eller lika med ${max}`);

export const checkedState = z.custom<CheckedState>(
  (data) =>
    typeof data === "boolean" ||
    (typeof data === "string" && data === "indeterminate"),
);

export const albumTitleString = baseString.min(
  3,
  "Namnet på albumet måste vara minst ",
);

export const filenameString = baseString
  .min(
    5,
    "Filnamnet måste vara minst 5 tecken långt men förslagsvis även innehålla datumet då bilden togs",
  )
  .includes(".", {
    message: "Filnamn måste innehålla en punkt före filändelsen ",
  });

export const photographerString = baseString
  .min(3, "Namnet på fotografen måste vara minst 3 tecken")
  .refine(
    (str) => !str.includes('"'),
    `Får inte innehålla ". Använd ' eller motsvarande istället.`,
  );

export const isVisibleBoolean = baseBoolean.optional().default(true);

export const isCoverImageBoolean = baseBoolean.optional().default(false);

export const isReceptionBoolean = baseBoolean.optional().default(false);
