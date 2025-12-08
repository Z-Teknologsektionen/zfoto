import { ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";

type FormFieldSwitchProps<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
> = Omit<
  Parameters<typeof Switch>[0],
  "description" | "form" | "label" | "name"
> & {
  form: UseFormReturn<TFieldValues, unknown, TTransformedValues>;
  name: Path<TFieldValues>;
  label: string;
  description: string;
};

export const FormFieldSwitch = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
>({
  form,
  name,
  label,
  description,
  ...rest
}: FormFieldSwitchProps<TFieldValues, TTransformedValues>): ReactNode => (
  <FormField
    //@ts-expect-error TTransformedValues could be initialized to something more specifik than FieldValues
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <FormLabel className="text-base">{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </div>
        <FormControl>
          <Switch
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
            {...rest}
          />
        </FormControl>
      </FormItem>
    )}
  />
);
