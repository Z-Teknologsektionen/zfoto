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
  ...rest
}: FormFieldInputProps<TFieldValues, TTransformedValues>): JSX.Element => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} {...rest} />
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
>): JSX.Element =>
  FormFieldInput({
    label,
    placeholder,
    type: "email",
    autoComplete: "em",
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
>): JSX.Element =>
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
  type = "datetime-local",
  form,
  name,
  onChange = (e) => {
    const { value } = e.target;
    form.setValue(
      name,
      (value !== "" ? e.target.value + ":00.000Z" : undefined) as PathValue<
        TFieldValues,
        Path<TFieldValues>
      >,
    );
  },
  value = (form.getValues(name) as string | undefined)?.slice(0, -8),
  ...rest
}: PartialBy<
  FormFieldInputProps<TFieldValues, TTransformedValues>,
  "label" | "placeholder"
>): JSX.Element =>
  FormFieldInput({
    label,
    placeholder,
    type,
    form,
    name,
    onChange,
    value,
    ...rest,
  });

export const FormFieldInputNumber = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues,
>({
  label,
  placeholder,
  type = "number",
  form,
  name,
  onChange = (e) => {
    form.setValue(
      name,
      e.target.valueAsNumber as PathValue<TFieldValues, Path<TFieldValues>>,
    );
  },
  value = form.getValues(name) as number | undefined,
  ...rest
}: PartialBy<
  FormFieldInputProps<TFieldValues, TTransformedValues>,
  "onChange" | "value"
>): JSX.Element =>
  FormFieldInput({
    label,
    placeholder,
    type,
    form,
    name,
    onChange,
    value,
    ...rest,
  });
