"use client";

import { updateManyImagesBaseSchema } from "@/schemas/helpers/zodScheams";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormFieldInput,
  FormFieldInputNumber,
} from "~/components/form/form-field-input";
import { Button } from "~/components/ui/button";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

export const FormFieldRelativeTime: FC<{
  form: UseFormReturn<
    z.input<typeof updateManyImagesBaseSchema>,
    unknown,
    z.output<typeof updateManyImagesBaseSchema>
  >;
}> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name={"relativeDate.root" as "relativeDate"}
      render={() => (
        <FormItem>
          <FormLabel>Relativ tid</FormLabel>
          <FormDescription>
            Används för att justera varje bild i förhållande till dess nuvarande
            tid. Bra om kameran går x timmar/minuter/sekunder fel. Lämnas med 0
            för att behålla nuvarande värden.
          </FormDescription>
          <div className="grid grid-cols-4 place-items-center gap-2">
            <FormFieldInput
              label="Timmar"
              name="relativeDate.hours"
              form={form}
              type="number"
              min={-23}
              max={23}
            />
            <FormFieldInputNumber
              label="Minuter"
              name="relativeDate.minutes"
              form={form}
              min={-59}
              max={59}
            />
            <FormFieldInput
              label="Sekunder"
              name="relativeDate.seconds"
              form={form}
              min={-59}
              max={59}
            />
            <Button
              type="button"
              onClick={() => {
                form.setValue("relativeDate.hours", 0);
                form.setValue("relativeDate.minutes", 0);
                form.setValue("relativeDate.seconds", 0);
              }}
              variant="outline"
              className="text-sm"
            >
              Nollställ
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
