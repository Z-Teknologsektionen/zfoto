import type { ReactNode } from "react";
import type {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

export type FormWrapperProps<
  TSchema extends z.ZodObject | z.ZodPipe<z.ZodObject>,
> = {
  form: UseFormReturn<z.input<TSchema>, unknown, z.output<TSchema>>;
  schema: TSchema;
  onValid: SubmitHandler<z.output<TSchema>>;
  onInvalid?: SubmitErrorHandler<z.input<TSchema>>;
  children: ReactNode;
  className?: string;
};
