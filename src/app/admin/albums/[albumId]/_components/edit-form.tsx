"use client";

import { albumBaseSchema } from "@/schemas/helpers/zodScheams";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { DeleteDialog } from "~/components/dialog/delete-dialog";
import { BasicFormWrapper } from "~/components/form/basic-form-wrapper";
import {
  FormFieldInput,
  FormFieldInputDateTimeLocal,
} from "~/components/form/form-field-input";
import { FormFieldSwitch } from "~/components/form/form-field-switch";
import { Button } from "~/components/ui/button";
import { useFormWithZod } from "~/hooks/use-form-with-zod";
import { getLocalDateTimeFromUTC } from "~/utils/date-utils";
import { useDeleteAlbumById } from "../../_hooks/use-delete-album-by-id";
import { useUpdateAlbumById } from "../../_hooks/use-update-album-by-id";

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
  const router = useRouter();

  const { execute: deleteAlbum, isExecuting: isDeleting } = useDeleteAlbumById({
    onSuccess: () => {
      router.push("/admin/albums");
    },
  });
  const { execute: updateAlbum, isExecuting: isUpdating } =
    useUpdateAlbumById();

  const isExecuting = isDeleting || isUpdating;

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
    <BasicFormWrapper
      form={form}
      schema={albumBaseSchema}
      onValid={(values) => {
        updateAlbum({ albumId: id, ...values });
      }}
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
        <DeleteDialog
          title={`Vill du verkligen radera: ${title}`}
          description="Denna åtgärd går inte att ångra! Alla bilder som tillhör albummet kommer också att raderas!"
          onDelete={() => {
            deleteAlbum({ id });
          }}
          isDisabled={isExecuting}
        />
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
