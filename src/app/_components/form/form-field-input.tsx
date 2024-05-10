import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type FormFieldInputProps<TFieldValues extends FieldValues> = Omit<
  Parameters<typeof Input>[0],
  "form" | "name" | "label" | "description"
> & {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
};

type CustomFormFieldInputProps<TFieldValues extends FieldValues> = Omit<
  FormFieldInputProps<TFieldValues>,
  "type" | "autoComplete"
>;

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const FormFieldInput = <TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description,
  ...rest
}: FormFieldInputProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...rest} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldInputEmail = <TFieldValues extends FieldValues>({
  label = "Epost",
  placeholder = "Fyll i epost...",
  ...rest
}: PartialBy<
  CustomFormFieldInputProps<TFieldValues>,
  "label" | "placeholder"
>) =>
  FormFieldInput({
    label,
    placeholder,
    type: "email",
    autoComplete: "em",
    ...rest,
  });

export const FormFieldInputPassword = <TFieldValues extends FieldValues>({
  label = "Epost",
  placeholder = "Fyll i epost...",
  ...rest
}: PartialBy<
  CustomFormFieldInputProps<TFieldValues>,
  "label" | "placeholder"
>) =>
  FormFieldInput({
    label,
    placeholder,
    type: "password",
    autoComplete: "current-password",
    ...rest,
  });
