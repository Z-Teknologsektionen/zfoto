"use client";

import { updateImageFrontEndSchema } from "@/schemas/helpers/zodScheams";
import type { getImagebyId } from "@/server/data-access/images";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Prisma } from "@prisma/client";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  FormFieldInput,
  FormFieldInputDateTimeLocal,
} from "~/components/form/form-field-input";
import { FormFieldSwitch } from "~/components/form/form-field-switch";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useUpdateImageById } from "~/hooks/use-update-image-by-id";
import { getLocalDateTimeFromUTC } from "~/utils/date-utils";

type AdminImage = Prisma.PromiseReturnType<typeof getImagebyId>;

// eslint-disable-next-line max-lines-per-function
export const EditImageForm: FC<AdminImage> = ({
  coverImage,
  date,
  id,
  photographer,
  visible,
}) => {
  const { execute: updateImage, isExecuting } = useUpdateImageById();

  const form = useForm<z.infer<typeof updateImageFrontEndSchema>>({
    resolver: zodResolver(updateImageFrontEndSchema),
    defaultValues: {
      photographer,
      coverImage,
      visible,
      date: getLocalDateTimeFromUTC(date).toISOString().slice(0, -8),
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={
          void form.handleSubmit((values) => {
            updateImage({
              ...values,
              imageId: id,
              date: new Date(values.date).toISOString(),
            });
          })
        }
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
          name="visible"
          label="Visas på hemsidan"
          description="Välj om bilden ska visas för användare eller inte."
        />
        <FormFieldSwitch
          form={form}
          name="coverImage"
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
      </form>
    </Form>
  );
};
