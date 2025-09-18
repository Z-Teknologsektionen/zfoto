"use client";

import { useUpdateManyImagesByIds } from "@/app/admin/_hooks/use-update-many-images-by-ids";
import { updateManyImagesBaseSchema } from "@/schemas/helpers/zodSchemas";
import type { AdminImageType } from "@/types/data-access";
import type { Row } from "@tanstack/react-table";
import { Pen } from "lucide-react";
import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { z } from "zod";
import { BasicFormWrapper } from "~/components/form/basic-form-wrapper";
import { FormFieldCheckbox } from "~/components/form/form-field-checkbox";
import {
  FormFieldInput,
  FormFieldInputDateTimeLocal,
} from "~/components/form/form-field-input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useFormWithZod } from "~/hooks/use-form-with-zod";
import { getLocalDateTimeFromUTC, getUTCFromLocalDate } from "~/utils/date-utils";
import { getValueIfUnique } from "~/utils/utils";
import { FormFieldRelativeTime } from "../../../_components/form/form-field-relative-time";

export const UpdateManyImagesDialog: FC<{
  selectedRows: Row<AdminImageType>[];
  // eslint-disable-next-line max-lines-per-function
}> = ({ selectedRows }) => {
  const [open, setOpen] = useState(false);
  const { absoluteDate, allIds, isVisible, photographer } = useMemo(() => {
    const allIds = selectedRows.map((row) => row.original.id);
    const allDates = selectedRows.map((row) =>
      getLocalDateTimeFromUTC(row.original.date).toISOString(),
    );
    const allIsVisible = selectedRows.map((row) => row.original.isVisible);
    const allPhotographers = selectedRows.map(
      (row) => row.original.photographer,
    );

    return {
      allIds,
      absoluteDate: getValueIfUnique(allDates),
      isVisible: getValueIfUnique(allIsVisible) ?? ("indeterminate" as const),
      photographer: getValueIfUnique(allPhotographers),
    };
  }, [selectedRows]);

  const form = useFormWithZod({
    schema: updateManyImagesBaseSchema,
    values: {
      absoluteDate,
      isVisible,
      photographer,
      relativeDate: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    },
  });

  const { execute: updateManyImages, isExecuting: isUpdatingMany } =
    useUpdateManyImagesByIds({
      onSuccess: () => {
        setOpen(false);
      },
    });

  const onValid = useCallback(
    (values: z.output<typeof updateManyImagesBaseSchema>): undefined => {
      if (Object.values(values).every((el) => el === undefined)) {
        toast.error("Alla fält är tomma, inget kommer uppdateras");
        return;
      }

      const data = form.getValues()

      updateManyImages({
        imageIds: allIds,
        data: {
          ...data,
          absoluteDate: data.absoluteDate === undefined ? undefined : getUTCFromLocalDate(new Date(data.absoluteDate))
        },
      });
    },
    [allIds, form, updateManyImages],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="space-x-1"
          disabled={isUpdatingMany || selectedRows.length < 2}
        >
          <Pen className="size-5" />
          <span>Redigera valda</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <BasicFormWrapper
          form={form}
          schema={updateManyImagesBaseSchema}
          onValid={onValid}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Redigera {selectedRows.length} bilder</DialogTitle>
            <DialogDescription>
              Alla bilder kommer redigeras till samma värden, denna åtgärd
              kommer inte gå att ångra. Om alla bilder har samma värde på ett
              fält kommer ett standardvärde att visas, annars kommer det vara tomt.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-fit max-h-80">
            <div className="flex flex-col gap-2">
              <FormFieldInput
                form={form}
                name="photographer"
                label="Fotograf"
                placeholder="Fyll i fotografens namn..."
                description="Namnet på fotografen. Lämnas tom för att behålla nuvarande värden"
              />
              <FormFieldCheckbox
                form={form}
                name="isVisible"
                label="Visas på hemsidan"
                description="Välj om bilden ska visas för användare eller inte. Lämnas med icke ifylld check för att behålla nuvarande värden"
                resetText="Behåll nuvarande"
              />
              <FormFieldInputDateTimeLocal
                form={form}
                name="absoluteDate"
                label="Absolut datum och tid"
                placeholder="Fyll i datum och tid"
                description="Datumet och tiden då bilden togs. Lämnas tom för att behålla nuvarande värden"
              />
              <FormFieldRelativeTime
                label="Relativ datum och tid"
                description="Används för att justera varje bild i förhållande till dess nuvarande tid. Bra om kameran går x timmar/minuter/sekunder fel. Lämnas med 0 för att behålla nuvarande värden."
              />
            </div>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Avbryt</Button>
            </DialogClose>
            <Button type="submit">Uppdatera</Button>
          </DialogFooter>
        </BasicFormWrapper>
      </DialogContent>
    </Dialog>
  );
};
