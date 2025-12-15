import type { FormWrapperProps } from "@/types/form";
import type { z } from "zod";
import { cn } from "~/utils/utils";
import { Form } from "../ui/form";

export const BasicFormWrapper = <TSchema extends z.ZodObject | z.ZodPipe<z.ZodObject>>({
  form,
  onInvalid,
  onValid,
  children,
  className,
}: FormWrapperProps<TSchema>): JSX.Element => (
  <Form {...form}>
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={form.handleSubmit(onValid, onInvalid)}
      className={cn(className)}
    >
      {children}
    </form>
  </Form>
);
