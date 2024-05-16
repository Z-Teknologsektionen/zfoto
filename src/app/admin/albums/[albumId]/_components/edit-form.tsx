"use client";

import { updateAlbumFrontEndSchema } from "@/server/trpc/helpers/zodScheams";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  FormFieldInput,
  FormFieldInputDateTimeLocal,
} from "~/components/form/form-field-input";
import { FormFieldSwitch } from "~/components/form/form-field-switch";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { getLocalDateTimeFromUTC } from "~/utils/date-utils";
import { updateAlbumAction } from "../_actions/updateAlbumAction";

type EditAlbumFormProps = {
  title: string;
  id: string;
  visible: boolean;
  isReception: boolean;
  date: Date;
};

export const EditAlbumForm: FC<EditAlbumFormProps> = ({
  title,
  id,
  isReception,
  visible,
  date,
}) => {
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.input<typeof updateAlbumFrontEndSchema>>({
    resolver: zodResolver(updateAlbumFrontEndSchema),
    defaultValues: {
      title: title,
      isReception: isReception,
      visible: visible,
      date: getLocalDateTimeFromUTC(date).toISOString(),
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          startTransition(async () => {
            const loadingToastId = toast.loading("Uppdaterar album...");

            const results = await updateAlbumAction({ albumId: id, ...values });

            toast.dismiss(loadingToastId);

            if (!results.success) {
              toast.error(results.error);
              return;
            }

            toast.success("Album uppdaterat!");
          }),
        )}
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
          name="visible"
        />
        <FormFieldSwitch
          form={form}
          label="Album från mottagningen"
          description="Tagg för att dölja album när mottagningen närmar sig"
          name="isReception"
        />
        <div className="col-span-full flex flex-row justify-end gap-2">
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Återställ
          </Button>
          <Button disabled={isLoading} type="submit">
            Spara
          </Button>
        </div>
      </form>
    </Form>
  );
};
