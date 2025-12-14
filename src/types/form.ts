import type { ReactNode } from "react";
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

export type FormWrapperProps<TSchema extends z.Schema> = {
  form: UseFormReturn<z.input<TSchema>, unknown, z.output<TSchema>>;
  schema: TSchema;
  onValid: z.output<TSchema> extends undefined
    ? SubmitHandler<z.input<TSchema>>
    : z.output<TSchema> extends FieldValues
      ? SubmitHandler<z.output<TSchema>>
      : never;
  onInvalid?: SubmitErrorHandler<z.input<TSchema>>;
  children: ReactNode;
  className?: string;
};
