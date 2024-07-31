"use client";

import { albumBaseSchema } from "@/schemas/helpers/zodScheams";
import type { FC } from "react";
import {
  FormFieldInput,
  FormFieldInputDateTimeLocal,
} from "~/components/form/form-field-input";
import { FormFieldSwitch } from "~/components/form/form-field-switch";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useFormWithZod } from "~/hooks/use-form-with-zod";
import { getLocalDateTimeFromUTC } from "~/utils/date-utils";
import { useUpdateAlbum } from "../_hooks/use-update-album";

type EditAlbumFormProps = {
  title: string;
  id: string;
  isVisible: boolean;
  isReception: boolean;
  date: Date;
};

// eslint-disable-next-line max-lines-per-function
export const EditAlbumForm: FC<EditAlbumFormProps> = ({
  title,
  id,
  isReception,
  isVisible,
  date,
}) => {
  const { execute: updateAlbum, status: updateAlbumstatus } = useUpdateAlbum();

  const form = useFormWithZod({
    schema: albumBaseSchema,
    defaultValues: {
      title,
      isReception,
      isVisible,
      date: getLocalDateTimeFromUTC(date).toISOString(),
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={
          void form.handleSubmit((values) => {
            updateAlbum({ albumId: id, ...values });
          })
        }
        className="grid gap-4 md:grid-cols-2"
      >
        <FormFieldInput
          form={form}
          name="title"
          label="Titel"
          placeholder="Fyll i titeln..."
          description="Rubriken som visas på albumet"
        />
        <FormFieldInputDateTimeLocal form={form} name="date" />
        <FormFieldSwitch
          form={form}
          description="Välj om albumet ska visas för användare eller inte"
          label="Visas på hemsidan"
          name="isVisible"
        />
        <FormFieldSwitch
          form={form}
          label="Album från mottagningen"
          description="Tagg för att dölja album när mottagningen närmar sig"
          name="isReception"
        />
        <div className="col-span-full flex flex-row justify-end gap-2">
          <Button
            disabled={updateAlbumstatus === "executing"}
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
            }}
          >
            Återställ
          </Button>
          <Button disabled={updateAlbumstatus === "executing"} type="submit">
            Spara
          </Button>
        </div>
      </form>
    </Form>
  );
};
