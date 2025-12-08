import type { FormWrapperProps } from "@/types/form";
import { ReactNode } from "react";
import type { z } from "zod";
import { cn } from "~/utils/utils";
import { BasicFormWrapper } from "./basic-form-wrapper";

export const FormWrapper = <TSchema extends z.ZodObject>({
  className,
  ...props
}: FormWrapperProps<TSchema>): ReactNode => (
  <BasicFormWrapper
    className={cn("mx-auto grid max-w-3xl grid-cols-2 gap-2", className)}
    {...props}
  />
);
