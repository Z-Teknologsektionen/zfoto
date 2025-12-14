"use client";

import { updateManyAlbumsBaseSchema } from "@/schemas/helpers/zodSchemas";
import type { AdminAlbumType } from "@/types/data-access";
import type { Row } from "@tanstack/react-table";
import { Pen } from "lucide-react";
import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { z } from "zod";
import { BasicFormWrapper } from "~/components/form/basic-form-wrapper";
import { FormFieldCheckbox } from "~/components/form/form-field-checkbox";
import { FormFieldRelativeTime } from "~/components/form/form-field-relative-time";
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
import { getValueIfUnique } from "~/utils/utils";
import { useUpdateManyAlbumsByIds } from "../../_hooks/use-update-many-albums-by-ids";

export const UpdateManyAlbumsDialog: FC<{
  selectedRows: Row<AdminAlbumType>[];
  // eslint-disable-next-line max-lines-per-function
}> = ({ selectedRows }) => {
  const [open, setOpen] = useState(false);
  const { allIds, isVisible, isReception } = useMemo(() => {
    const allIds = selectedRows.map((row) => row.original.id);
    const allIsVisible = selectedRows.map((row) => row.original.isVisible);
    const allIsReception = selectedRows.map((row) => row.original.isReception);

    return {
      allIds,
      isVisible: getValueIfUnique(allIsVisible) ?? ("indeterminate" as const),
      isReception:
        getValueIfUnique(allIsReception) ?? ("indeterminate" as const),
    };
  }, [selectedRows]);

  const form = useFormWithZod({
    debug: true,
    schema: updateManyAlbumsBaseSchema,
    values: {
      isVisible,
      isReception,
      relativeDate: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    },
  });

  const { execute: updateManyAlbums, isExecuting: isUpdatingMany } =
    useUpdateManyAlbumsByIds({
      onSuccess: () => {
        setOpen(false);
      },
    });

  const onValid = useCallback(
    (values: z.output<typeof updateManyAlbumsBaseSchema>): undefined => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (Object.values(values).every((el) => el === undefined)) {
        toast.error("Alla fält är tomma, inget kommer uppdateras");
        setOpen(false);
        return;
      }

      updateManyAlbums({
        albumIds: allIds,
        data: form.getValues(),
      });
    },
    [allIds, form, updateManyAlbums],
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
          schema={updateManyAlbumsBaseSchema}
          onValid={onValid}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Redigera {selectedRows.length} album</DialogTitle>
            <DialogDescription>
              Alla album kommer redigeras till samma värden, denna åtgärd kommer
              inte gå att ångra. Om alla album har samma värde på ett fält
              kommer ett standardvärde att visas, annars kommer det vara tomt.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-fit max-h-80">
            <div className="flex flex-col gap-2">
              <FormFieldCheckbox
                form={form}
                name="isVisible"
                label="Visas på hemsidan"
                description="Välj om bilden ska visas för användare eller inte. Lämnas med icke ifylld check för att behålla nuvarande värden"
                resetText="Behåll nuvarande"
              />
              <FormFieldCheckbox
                form={form}
                name="isReception"
                label="Album från mottagningen"
                description="Tagg för att dölja album när mottagningen närmar sig. Lämnas med icke ifylld check för att behålla nuvarande värden"
                resetText="Behåll nuvarande"
              />
              <FormFieldRelativeTime
                label="Relativ datum och tid"
                description="Används för att justera varje album i förhållande till dess nuvarande tid. Lämnas med 0 för att behålla nuvarande värden."
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
