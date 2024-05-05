import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";

type FormFieldSwitchProps<TFieldValues extends FieldValues> = Omit<
  Parameters<typeof Switch>[0],
  "form" | "name" | "label" | "description"
> & {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  description: string;
};

export const FormFieldSwitch = <TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description,
  ...rest
}: FormFieldSwitchProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
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
};