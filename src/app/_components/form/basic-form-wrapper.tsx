import type { FormWrapperProps } from "@/types/form";
import type { z } from "zod";
import { cn } from "~/utils/utils";
import { Form } from "../ui/form";

export const BasicFormWrapper = <TSchema extends z.Schema>({
  form,
  onInvalid,
  onValid,
  children,
  className,
}: FormWrapperProps<TSchema>): JSX.Element => (
  <Form {...form}>
    <form
      onSubmit={void form.handleSubmit(onValid, onInvalid)}
      className={cn(className)}
    >
      {children}
    </form>
  </Form>
);
