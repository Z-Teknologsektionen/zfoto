import type { CheckedState } from "@radix-ui/react-checkbox";
import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const baseString = z
  .string({
    error: (issue) =>
      issue.input === undefined ? "Obligatoriskt fält" : "Måste vara en sträng",
  })
  .trim();

export const baseBoolean = z.boolean({
  error: (issue) =>
    issue.input === undefined ? "Obligatoriskt fält" : "Måste vara en boolean",
});

export const baseNumber = z.number({
  error: (issue) =>
    issue.input === undefined ? "Obligatoriskt fält" : "Måste vara ett nummer",
});

export const objectId = baseString.refine(isValidObjectId, "Ogiltigt objectId");

export const fullDatetimeString = baseString.datetime({
  precision: 3,
  offset: false,
  error:
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
    error: "Filnamn måste innehålla en punkt före filändelsen ",
  });

export const photographerString = baseString
  .min(3, "Namnet på fotografen måste vara minst 3 tecken")
  .refine(
    (str) => !str.includes('"'),
    `Får inte innehålla ". Använd ' eller motsvarande istället.`,
  );

export const isVisibleBoolean = baseBoolean;

export const isCoverImageBoolean = baseBoolean;

export const isReceptionBoolean = baseBoolean;
