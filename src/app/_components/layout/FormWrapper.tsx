import { PropsWithChildren } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { Form } from "~/components/ui/form";
import { cn } from "~/utils/utils";

type FormWrapperProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  onInvalid?: SubmitErrorHandler<TFieldValues>;
  className?: string;
};

export const FormWrapper = <TFieldValues extends FieldValues>({
  form,
  onSubmit,
  onInvalid,
  children,
  className = "",
}: PropsWithChildren<FormWrapperProps<TFieldValues>>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className={cn("mx-auto grid max-w-3xl grid-cols-2 gap-2", className)}
        spellCheck
      >
        {children}
      </form>
    </Form>
  );
};
