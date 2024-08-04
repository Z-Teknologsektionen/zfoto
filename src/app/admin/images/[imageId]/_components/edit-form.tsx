"use client";

import { imageBaseSchema } from "@/schemas/helpers/zodScheams";
import type { getImagebyId } from "@/server/data-access/images";
import type { Prisma } from "@prisma/client";
import type { FC } from "react";
import { BasicFormWrapper } from "~/components/form/basic-form-wrapper";
import {
  FormFieldInput,
  FormFieldInputDateTimeLocal,
} from "~/components/form/form-field-input";
import { FormFieldSwitch } from "~/components/form/form-field-switch";
import { Button } from "~/components/ui/button";
import { useFormWithZod } from "~/hooks/use-form-with-zod";
import { useUpdateImageById } from "~/hooks/use-update-image-by-id";
import { getLocalDateTimeFromUTC } from "~/utils/date-utils";

type AdminImage = Prisma.PromiseReturnType<typeof getImagebyId>;

// eslint-disable-next-line max-lines-per-function
export const EditImageForm: FC<AdminImage> = ({
  isCoverImage,
  date,
  id,
  photographer,
  isVisible,
  filename,
}) => {
  const { execute: updateImage, isExecuting } = useUpdateImageById();

  const form = useFormWithZod({
    schema: imageBaseSchema,
    defaultValues: {
      filename,
      photographer,
      isCoverImage,
      isVisible,
      date: getLocalDateTimeFromUTC(date).toISOString(),
    },
  });

  return (
    <BasicFormWrapper
      form={form}
      schema={imageBaseSchema}
      onValid={(values) => {
        updateImage({ imageId: id, ...values });
      }}
      className="grid gap-4 md:grid-cols-2"
    >
      <FormFieldInput
        form={form}
        name="photographer"
        label="Fotograf"
        placeholder="Fyll i fotografensnamn..."
        description="Namnet på fotografen"
      />
      <FormFieldInputDateTimeLocal
        form={form}
        name="date"
        label="Datum och tid"
        placeholder="Fyll i datum och tid"
        description="Datumet och tiden då bilden togs"
      />
      <FormFieldSwitch
        form={form}
        name="isVisible"
        label="Visas på hemsidan"
        description="Välj om bilden ska visas för användare eller inte."
      />
      <FormFieldSwitch
        form={form}
        name="isCoverImage"
        label="Omslagsbild"
        description="Välj om bilden ska visas som omslagsbild"
      />
      <div className="col-span-full flex flex-row justify-end gap-2">
        <Button
          disabled={isExecuting}
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
          }}
        >
          Återställ
        </Button>
        <Button disabled={isExecuting} type="submit">
          Spara
        </Button>
      </div>
    </BasicFormWrapper>
  );
};
