import type { ReactNode } from "react";
import type {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";
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
}): JSX.Element => (
  <Form {...form}>
    <form
      onSubmit={void form.handleSubmit(onValid, onInvalid)}
      className={cn(className)}
    >
      {children}
    </form>
  </Form>
);
