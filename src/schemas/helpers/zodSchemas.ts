import { z } from "zod";
import {
  emptyStringToUndefined,
  indeterminateToUndefined,
} from "./zodTransforms";
import {
  checkedState,
  emptyString,
  photographerString,
  validDateInputsToDate,
  wholeNumberMinMax,
} from "./zodTypes";

export const relativeDate = z.object({
  hours: wholeNumberMinMax(-23, 23).catch(0),
  minutes: wholeNumberMinMax(-59, 59).catch(0),
  seconds: wholeNumberMinMax(-59, 59).catch(0),
});

export const updateManyImagesBaseSchema = z
  .object({
    photographer: photographerString
      .or(emptyString.transform(emptyStringToUndefined))
      .optional(),
    isVisible: checkedState.transform(indeterminateToUndefined),
    absoluteDate: validDateInputsToDate.optional(),
    relativeDate: relativeDate
      .transform((values) =>
        Object.values(values).some((num) => num !== 0) ? values : undefined,
      )
      .optional(),
  })
  .superRefine(({ absoluteDate, relativeDate }, ctx) => {
    if (absoluteDate !== undefined && relativeDate !== undefined) {
      ctx.addIssue({
        code: "custom",
        message: "Du kan inte både ange en relativ och en absolut tid",
        path: ["absoluteDate"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Du kan inte både ange en relativ och en absolut tid",
        path: ["relativeDate"],
      });
    }

    return z.NEVER;
  })
  .transform(({ absoluteDate, relativeDate, ...rest }) => ({
    date: absoluteDate ?? relativeDate,
    ...rest,
  }));

export const updateManyAlbumsBaseSchema = z.object({
  isVisible: checkedState.transform(indeterminateToUndefined).optional(),
  isReception: checkedState.transform(indeterminateToUndefined).optional(),
  relativeDate: relativeDate
    .transform((values) =>
      Object.values(values).some((num) => num !== 0) ? values : undefined,
    )
    .optional(),
});
