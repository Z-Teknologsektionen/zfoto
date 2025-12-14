import type { ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type FormFieldInputProps<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
> = Omit<
  Parameters<typeof Input>[0],
  "description" | "form" | "label" | "name"
> & {
  form: UseFormReturn<TFieldValues, unknown, TTransformedValues>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const FormFieldInput = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
>({
  form,
  name,
  label,
  description,
  type,
  ...rest
}: FormFieldInputProps<TFieldValues, TTransformedValues>): ReactNode => (
  <FormField
    //@ts-expect-error TTransformedValues could be initialized to something more specifik than FieldValues
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {/* @ts-expect-error refs don't match but this is valid code */}
          <Input
            {...field}
            type={type}
            onChange={(e) => {
              // eslint-disable-next-line ts/switch-exhaustiveness-check
              switch (type) {
                case "number":
                  field.onChange(e.target.valueAsNumber);
                  break;
                case "datetime-local":
                  field.onChange(
                    e.target.value !== "" ? `${e.target.value}:00.000Z` : "",
                  );
                  break;
                default:
                  field.onChange(e);
              }
            }}
            value={
              type === "datetime-local"
                ? (field.value as string | null | undefined)?.slice(0, -8)
                : field.value
            }
            {...rest}
          />
        </FormControl>
        {description !== undefined && (
          <FormDescription>{description}</FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);

export const FormFieldInputEmail = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
>({
  label = "Epost",
  placeholder = "Fyll i epost...",
  ...rest
}: PartialBy<
  FormFieldInputProps<TFieldValues, TTransformedValues>,
  "label" | "placeholder"
>): ReactNode =>
  FormFieldInput({
    label,
    placeholder,
    type: "email",
    autoComplete: "email",
    ...rest,
  });

export const FormFieldInputPassword = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
>({
  label = "Lösenord",
  placeholder = "Fyll i lösenord...",
  type = "password",
  autoComplete = "current-password",
  ...rest
}: PartialBy<
  FormFieldInputProps<TFieldValues, TTransformedValues>,
  "label" | "placeholder"
>): ReactNode =>
  FormFieldInput({
    label,
    placeholder,
    type,
    autoComplete,
    ...rest,
  });

export const FormFieldInputDateTimeLocal = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
>({
  label = "Datum och tid",
  placeholder = "Fyll i datum och tid...",
  form,
  name,
  ...rest
}: PartialBy<
  Omit<
    FormFieldInputProps<TFieldValues, TTransformedValues>,
    "onChange" | "type" | "value"
  >,
  "label" | "placeholder"
>): ReactNode =>
  FormFieldInput({
    label,
    placeholder,
    type: "datetime-local",
    form,
    name,
    ...rest,
  });

export const FormFieldInputNumber = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
>({
  label,
  placeholder,
  form,
  name,
  ...rest
}: Omit<
  FormFieldInputProps<TFieldValues, TTransformedValues>,
  "onChange" | "type" | "value"
>): ReactNode =>
  FormFieldInput({
    label,
    placeholder,
    type: "number",
    form,
    name,
    ...rest,
  });
