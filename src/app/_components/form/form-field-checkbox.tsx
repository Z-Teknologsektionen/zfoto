import { ReactNode } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

type FormFieldCheckboxProps<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
> = Omit<
  Parameters<typeof Checkbox>[0],
  "description" | "form" | "label" | "name"
> & {
  form: UseFormReturn<TFieldValues, unknown, TTransformedValues>;
  name: Path<TFieldValues>;
  label: string;
  description: string;
  resetText?: string;
};

export const FormFieldCheckbox = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
>({
  form,
  name,
  label,
  description,
  resetText = "Återställ",
  ...rest
}: FormFieldCheckboxProps<TFieldValues, TTransformedValues>): ReactNode => (
  <FormField
    //@ts-expect-error TTransformedValues could be initialized to something more specifik than FieldValues
    control={form.control}
    name={name}
    render={({ field: { value, onChange, ...field } }) => (
      <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
        <div className="flex flex-row items-center gap-2">
          <FormControl>
            <Checkbox
              className="size-5"
              {...field}
              checked={value}
              onCheckedChange={onChange}
              {...rest}
            />
          </FormControl>
          <div className="space-y-0.5">
            <FormLabel className="text-sm">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </div>
        </div>
        <Button
          type="button"
          onClick={() => {
            form.setValue(
              name,
              "indeterminate" as PathValue<TFieldValues, Path<TFieldValues>>,
            );
          }}
          variant="outline"
          className="text-sm"
        >
          {resetText}
        </Button>
      </FormItem>
    )}
  />
);
