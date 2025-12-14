"use client";

import type { FC } from "react";
import type { z } from "zod";
import type { updateManyAlbumsBaseSchema } from "@/schemas/helpers/zodSchemas";
import { useFormContext } from "react-hook-form";
import { FormFieldInputNumber } from "~/components/form/form-field-input";
import { Button } from "~/components/ui/button";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

export const FormFieldRelativeTime: FC<{
  label: string;
  description?: string;
  resetText?: string;

}> = ({ resetText = "Nollställ", description, label }) => {
  const form = useFormContext<
    Pick<z.input<typeof updateManyAlbumsBaseSchema>, "relativeDate">,
    unknown,
    Pick<z.output<typeof updateManyAlbumsBaseSchema>, "relativeDate">
  >();

  return (
    <FormField
      control={form.control}
      name={"relativeDate.root" as "relativeDate"}

      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <div className="grid grid-cols-4 place-items-center gap-2">
            <FormFieldInputNumber
              label="Timmar"
              name="relativeDate.hours"
              form={form}
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
            <FormFieldInputNumber
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
              {resetText}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
