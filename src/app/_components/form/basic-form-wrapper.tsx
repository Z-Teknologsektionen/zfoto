import { ReactNode } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";
import { cn } from "~/utils/utils";
import { Form } from "../ui/form";

export const BasicFormWrapper = <TSchema extends z.Schema>({
  form,
  onInvalid,
  onValid,
  children,
  className,
}: {
  form: UseFormReturn<z.input<TSchema>>;
  schema: TSchema;
  onValid: SubmitHandler<z.output<TSchema>>;
  onInvalid?: SubmitErrorHandler<z.output<TSchema>>;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid, onInvalid)}
        className={cn(className)}
      >
        {children}
      </form>
    </Form>
  );
};
