import type { FormWrapperProps } from "@/types/form";
import type { z } from "zod";
import { cn } from "~/utils/utils";
import { BasicFormWrapper } from "./basic-form-wrapper";

export const FormWrapper = <TSchema extends z.Schema>({
  className,
  ...props
}: FormWrapperProps<TSchema>): JSX.Element => (
  <BasicFormWrapper
    className={cn("mx-auto grid max-w-3xl grid-cols-2 gap-2", className)}
    {...props}
  />
);
