import { PropsWithChildren } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { Form } from "~/components/ui/form";
import { cn } from "~/utils/utils";

interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
  className?: string;
}

const FormWrapper = <T extends FieldValues>({
  form,
  onSubmit,
  onInvalid,
  children,
  className = "",
}: PropsWithChildren<FormWrapperProps<T>>) => {
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

export default FormWrapper;
